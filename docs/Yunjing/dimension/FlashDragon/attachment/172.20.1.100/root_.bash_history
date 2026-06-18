ifconfig
ls -al
wget https://files.zimbra.com/downloads/8.7.0_GA/zcs-8.7.0_GA_1659.UBUNTU16_64.20160628202554.tgz
vim /etc/resolv.conf 
vim /etc/resolv.conf
ifconfig
vim /etc/hosts
vim /etc/hostname
reboot -h now
cat /tmp/install.log.5fDPOwJJ
reboot -h now
ls -al
vim /etc/resolv.conf 
vim /etc/resolvconf/resolv.conf.d/base
/etc/init.d/networking restart
/etc/init.d/resolvconf restart
cat /etc/resolv.conf 
apt update
apt install lsb-release
ls
tar -zxvf zcs-8.7.0_GA_1659.UBUNTU16_64.20160628202554.tgz 
cd zcs-8.7.0_GA_1659.UBUNTU16_64.20160628202554/
ls
./install.sh 
apt remove lsb-invalid-mta
./install.sh 
cat 
cat /tmp/install.log.trCMfE9S
su zimbra
ufw enable
ufw allow 443
ufw reload
ls
cd zcs-8.7.0_GA_1659.UBUNTU16_64.20160628202554/
ls
./install.sh 
netstat -ant
netstat -ant | grep 443
ifconfig
history
ufw status
ls
wget https://github.com/ginuerzh/gost/releases/download/v2.11.2/gost-linux-amd64-2.11.2.gz
ls
tar -xvf gost
ls -al
ls
tar -zxvf gost-linux-amd64-2.11.2.gz
ls -al
gzip -d gost-linux-amd64-2.11.2.gz 
ls
ls -al
chmod +x gost-linux-amd64-2.11.2 
ls
./gost-linux-amd64-2.11.2 
cp gost-linux-amd64-2.11.2 /usr/bin/gost
gost 
systemctl enable
ls -al
vim /etc/systemd/system/gogs.service
ls /etc/systemd/system/
cd /etc/systemd/system/
ls
vim gost-socks5.service
gost -L=admin:ciQdqPtdswfM4y@0.0.0.0:8080
netstat -ant
gost -L=admin:ciQdqPtdswfM4y@0.0.0.0:48080
ls /etc/systemd/system/
vim gost-socks5.service 
systemctl daemon-reload
systemctl start gost-socks5
systemctl status gost-socks5
systemctl stop gost-socks5
netstat -ant
netstat -ant | grep 48080
vim gost-socks5.service 
systemctl start gost-socks5
systemctl status gost-socks5
systemctl stop gost-socks5
/usr/bin/gost -L=admin:ciQdqPtdswfM4y@0.0.0.0:1080
systemctl enable gost-socks5.service 
systemctl start gost-socks5.service 
systemctl status gost-socks5
ls -al
cp gost-gogs.service
cp gost-socks5.service gost-gogs.service
vim gost-gogs.service 
gost -L=tcp://:2222/172.20.1.192:3000
gost -L=tcp://:8081/172.20.1.192:3000
vim gost-gogs.service 
gost -L=tcp://:8081/172.20.1.192:3000
systemctl daemon-reload
systemctl enable gost-gogs
systemctl start gost-gogs
systemctl status gost-gogs
systemctl status gost-socks5
ls -al /opt/zimbra/jetty-distribution-9.3.5.v20151012/webapps/
ls -al /opt/zimbra/jetty-distribution-9.3.5.v20151012/webapps/zimbra
reboot -h now
ufw
ufw stautys
ufw status
ufw stop
ufw stop all
ufw disable
ufw disabled
ufw disable
netstat -ant
su - zimbra
history
cd /etc/systemd/system/
ls -al
cat gost-gogs.service
ls -al
vim zimbra.service
su - zimbra
vim zimbra.service
systemctl reload
systemctl daemon-reload
systemctl status zimbra
su - zimbra
service disable zimbra
service unable zimbra
systemctl 
systemctl  -h
systemctl disable zimbra
systemctl start zimbra
systemctl status zimbra
netstat -ant
ls
vim zimbra.service 
netstat -ant
/opt/zimbra/bin/zmcontrol start
systemctl reload-daemon
ls
rm zimbra.service
systemctl daemon-reload
systemctl status zimbra
netstat -ant
systemctl stop zimbra
systemctl daemon-reload
systemctl start zimbra
systemctl status zimbra
ls -al
cd multi-user.target.wants/
ls
cd ..
ls
find ./ -name "zimbra"
systemctl status zimbra
netstat -ant
systemctl stop zimbra
ls -al
cat gost-gogs.service
vim zimbra.service
systemctl daemon-reload
systemctl -h
systemctl list-jobs
systemctl systemctl list-units
systemctl list-units
systemctl status zimbra
systemctl enable zimbra
systemctl disable zimbra
/lib/systemd/systemd-sysv-install disable zimbra
vim zimbra.service 
netstat -ant
systemctl start zimbra
systemctl status zimbra
netstat -ant
systemctl restart zimbra
netstat -ant
systemctl status zimbra
ps -auxf
ps -auxf | grep zimbra
systemctl status zimbra
ps -auxf | grep zimbra
systemctl status zimbra
ps -auxf | grep zimbra
systemctl status zimbra
systemctl stop zimbra
systemctl status zimbra
ps -auxf | grep zimbra
systemctl disable zimbra
vim /etc/rc.local 
su - zimbra -c "/opt/zimbra/bin/zmcontrol start"
su - zimbra -c "/opt/zimbra/bin/zmcontrol stop"
cd /etc/init.d/
ls
vim zimbra.sh
chmod +x zimbra.sh 
update-rc.d zimbra.sh defaults 90
cd ../rc2.d/S02aegis
cd ../rc2.d/
ls
vim S02aegis 
update-rc.d -f zimbra.sh remove
cd ../init.d/
ls
ls -al
vim zimbra
rm zimbra.sh 
ls -al
reboot -h now
netstat -ant
cd /var/log/
ls -al
cat zimbra.log 
ls -al
vim zimbra-stats.log
netstat -ant
ps -ef | grep zimbra
dmesg
dmesg | greo zimbra
dmesg | grep zimbra
ls -al
vim syslog 
systemctl disable zimbra
vim /etc/systemd/
find / -name "zimbra.service"
vim /etc/systemd/system/zimbra.service
cd /etc/systemd/system/
ls
rm -rf zimbra.service 
ls -al
systemctl daemon-reload
systemctl status zimbra
reboot -h now
systemctl status zimbra
netstat -ant
cd /var/log/
vim bootstrap.log 
ls -al
update-rc.d -h
update-rc.d -l
service --status-all
service -h
service --help
man service
service zimbra start
systemctl enable zimbra
/lib/systemd/systemd-sysv-install
/lib/systemd/systemd-sysv-install enable

systemctl enable zimbra
/lib/systemd/systemd-sysv-install enable zimbra
insserv /etc/init.d/zimbra
ncsd
service ncsd
service ncsd start
service nscd start
systemctl nscd
systemctl start nscd
systemctl enable zimbra
/lib/systemd/systemd-sysv-install enable zimbra
systemctl status zimbra
systemctl status nscd.service 
find / -name "nscd.service"
apt install nscd
find / -name "nscd.service"
systemctl enable zimbra
/lib/systemd/systemd-sysv-install enable zimbra
ls -al
reboot -h now
netstat -ant
ps -ef | grep zimbra
systemctl status zimbra
ps -ef | grep zimbra
systemctl status zimbra
ps -ef | grep zimbra
systemctl status zimbra
reboot -h now
ps -ef | grep zimbra
systemctl status zimbra
netstat -ant
vim /etc/resolv.conf 
vim /etc/hosts
cd /var/log/
ls
vim zimbra.log 
netstat -ant | grep 53
netstat -antp | grep 53
ps -ef | grep 2783
ps -auxf | grep 2783
/opt/zimbra/common/sbin/unbound
/opt/zimbra/common/sbin/unbound -h
vim /opt/zimbra/conf/unbound.conf
vim zimbra.log 
vim /opt/zimbra/conf/unbound.conf
cp /opt/zimbra/conf/unbound.conf /opt/zimbra/conf/unbound.conf.bak
vim /opt/zimbra/conf/unbound.conf
cp /opt/zimbra/conf/unbound.conf /opt/zimbra/conf/unbound.conf.bak
vim zimbra.log 
ssh root@127.0.0.1
vim /etc/ssh/sshd_config 
service ssh restart
service sshd restart
ssh root@127.0.0.1
passwd root
ifconfig
cd /opt/zimbra/
ls
grep -rn "flag{" ./*
vim ./store/0/5/msg/0/267-46.msg
grep -rn "flag{" ./*
su - zimbra
grep -rn "ciQdqPtdswfM4y" ./*
cd ./store/
grep -rn "ciQdqPtdswfM4y" ./*
sed -i 's/ciQdqPtdswfM4y/QupH4wF7fQKs69/g' ./*
sed -i 's/ciQdqPtdswfM4y/QupH4wF7fQKs69/g' ./
sed -i 's/ciQdqPtdswfM4y/QupH4wF7fQKs69/g' 
sed -i 's/ciQdqPtdswfM4y/QupH4wF7fQKs69/g' `grep -rl "ciQdqPtdswfM4y"./* `
grep -rn "ciQdqPtdswfM4y" ./*
grep -rn "QupH4wF7fQKs69" ./*
su - zimbra
ps -ef | grep gost
history | grep gost
history
cd /etc/systemd/system/
ls
vim gost-socks5.service 
service gost-socks5 restart
systemctl restart gost-socks5
systemctl gost-socks5 restart
systemctl status gost-socks5
systemctl daemon-reload
systemctl status gost-socks5
systemctl restart gost-socks5
systemctl status gost-socks5
reboot -h now