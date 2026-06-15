<?php
class WebSocket
{
  const HOST = '0.0.0.0';
  const PORT = '9501';
  const IMAGE_UPLOAD_API_URL = 'http://172.22.10.154/api/upload/image';
  const FILE_UPLOAD_API_URL = 'http://172.22.10.154/api/upload/file';

  public $server = null;
  const ALLOWED_IMAGE_EXTENSIONS = [
    'jpg', 'jpeg', 'png', 'gif', 'bmp', 'ico',
  ];

  const ALLOWED_FILE_EXTENSIONS = [
    'pdf', 'zip', 'rar', 'txt', 'doc', 'docx', 'psd', 'xls', 'xlsx', 'ppt',
  ];

  public function __construct()
  {
    $redis = new \Redis();
    $redis->pconnect('127.0.0.1', 6379, 0);

    $this->server = new swoole_websocket_server(self::HOST, self::PORT);
    $this->server->redis = $redis;

    $this->server->set([
      'task_worker_num' => 10,
      'max_connection' => 10000,
      'daemonize' => 0,
    ]);

    $this->server->on('open', [$this, 'onOpen']);
    $this->server->on('message', [$this, 'onMessage']);
    $this->server->on('task', [$this, 'onTask']);
    $this->server->on('finish', [$this, 'onFinish']);
    $this->server->on('close', [$this, 'onClose']);

    $this->server->start();
  }
  private function isImageExtensionAllowed($fileName)
  {
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    return in_array(strtolower($fileExtension), self::ALLOWED_IMAGE_EXTENSIONS);
  }
  private function isFileExtensionAllowed($fileName)
  {
    $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
    return in_array(strtolower($fileExtension), self::ALLOWED_FILE_EXTENSIONS);
  }


  public function onOpen($server, $frame)
  {
    // null
  }

  public function onMessage($server, $frame)
  {
    $data = json_decode($frame->data, true);
    if (isset($data['emit']) && isset($data['token'])) {
      $token = $data['token'];
      $messageKey = "chat:messages:$token";

      switch ($data['emit']) {
        case 'getHistoryMessages':
          $messages = $this->server->redis->lRange($messageKey, 0, -1);
          if ($messages) {
            $messages = array_map(function ($msg) {
              return json_decode($msg, true);
            }, $messages);
            $server->push($frame->fd, json_encode([
              'emit' => 'historyMessages',
              'messages' => $messages,
            ]));
          }
          break;
        case 'fileUpload':
          $server->task($data);
          break;
        case 'imageUpload':
          $server->task($data);
          break;
        case 'msg':
          $message = [
            'type' => 'text',
            'content' => $data['message'],
            'timestamp' => time()
          ];

          $command = escapeshellarg(json_encode($message));
          exec("redis-cli RPUSH $messageKey $command");
          break;
        case 'seatAssigned':
          $server->push($frame->fd, json_encode([
            'emit' => 'seatAssigned',
            'message' => '\u5750\u5e2d\u5206\u914d\u6210\u529f\uff0c\u60a8\u5df2\u4e0e\u5750\u5e2d\u4eba\u5458\u8fde\u63a5\u3002'
          ]));
          break;
        default:
          $server->push($frame->fd, json_encode([
            'emit' => 'error',
            'message' => 'Invalid message format'
          ]));
          break;
      }
    }
    elseif ($data === null) {
      $token = bin2hex(random_bytes(16));
      $server->push($frame->fd, json_encode([
        'emit' => 'status',
        'message' => 'success',
        'id' => $frame->fd,
        'token' => $token
      ]));
    } else {
      $server->push($frame->fd, json_encode([
        'emit' => 'error',
        'message' => 'Invalid message format'
      ]));
    }
  }

  public function onTask($server, $task_id, $src_worker_id, $data)
  {
    if ($data['emit'] === 'fileUpload') {
      $response = $this->uploadFile($data['file'], $data['token']);
      $this->sendUploadResponse($server, $data['id'], $response);
    } elseif ($data['emit'] === 'imageUpload') {
      $response = $this->uploadImage($data['file'], $data['token']);
      $this->sendUploadResponse($server, $data['id'], $response);
    }
  }

  private function sendUploadResponse($server, $fd, $response)
  {
    if (isset($response['emit'])) {
      $messageKey = "chat:messages:{$response['token']}";
      $this->server->redis->rPush($messageKey, json_encode([
        'type' => $response['emit'] === 'fileUploaded' ? 'file' : 'image',
        'content' => $response['fileUrl'] ?? $response['imageUrl'],
        'timestamp' => time()
      ]));

      try {
        $server->push($fd, json_encode($response));
      }catch (\Exception $exception){
        $server->push($fd, json_encode([
          'emit' => 'error',
          'message' => 'Type error',
        ]));
      }
    }
  }


  public function onFinish($server, $task_id, $data)
  {
    // null
  }


  public function onClose($server, $fd)
  {
    $this->server->redis->hDel('connections', $fd);
  }

  public function uploadFile($fileData, $token)
  {
    $fileName = $fileData['name'];
    $fileBase64 = base64_decode($fileData['data']);

    $tempFilePath = sys_get_temp_dir() . '/' . uniqid() . '-' . $fileName;
    file_put_contents($tempFilePath, $fileBase64);
    if (!$this->isFileExtensionAllowed($fileName)) {
      unlink($tempFilePath);
      return [
        'emit' => 'error',
        'message' => 'File type error',
      ];
    }
    $curl = curl_init();
    $postFields = [
      'File' => new CURLFile($tempFilePath, mime_content_type($tempFilePath), $fileName)
    ];

    curl_setopt_array($curl, [
      CURLOPT_URL => self::FILE_UPLOAD_API_URL,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => $postFields,
    ]);

    $response = curl_exec($curl);
    curl_close($curl);

    unlink($tempFilePath);

    if ($response) {
      $responseData = json_decode($response, true);
      if ($responseData['code'] === 0) {
        return [
          'emit' => 'fileUploaded',
          'token'=> $token,
          'fileUrl' => 'http://172.22.10.154' . $responseData['data']['src']
        ];
      }
    }

    return [
      'emit' => 'error',
      'message' => 'File upload failure'
    ];
  }

  public function uploadImage($fileData, $token)
  {
    $fileName = $fileData['name'];
    $fileBase64 = base64_decode($fileData['data']);

    $tempFilePath = sys_get_temp_dir() . '/' . uniqid() . '-' . $fileName;
    file_put_contents($tempFilePath, $fileBase64);
    if (!$this->isImageExtensionAllowed($fileName)) {
      unlink($tempFilePath);
      return [
        'emit' => 'error',
        'message' => 'Image type error',
      ];
    }
    $curl = curl_init();
    $postFields = [
      'File' => new CURLFile($tempFilePath, mime_content_type($tempFilePath), $fileName)
    ];

    curl_setopt_array($curl, [
      CURLOPT_URL => self::IMAGE_UPLOAD_API_URL,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => $postFields,
    ]);

    $response = curl_exec($curl);
    curl_close($curl);

    unlink($tempFilePath);

    if ($response) {
      $responseData = json_decode($response, true);
      if ($responseData['code'] === 0) {
        return [
          'emit' => 'imageUploaded',
          'token'=> $token,
          'imageUrl' => 'http://172.22.10.154' . $responseData['data']['src']
        ];
      }
    }

    return [
      'emit' => 'error',
      'message' => 'Image upload failure'
    ];
  }




}
$socket = new WebSocket();