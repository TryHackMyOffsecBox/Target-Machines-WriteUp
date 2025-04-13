# Pleasure

## 信息收集

```bash
Detected ss and lsof, executing related commands...
Port: 33060, PID: 783
—> Command: /usr/sbin/mysqld 
Port: 3306, PID: 783
—> Command: /usr/sbin/mysqld 
Port: 8080, PID: 731
—> Command: nginx: master process /usr/sbin/nginx -g daemon on; master_process on; 
Port: 80, PID: 731
—> Command: nginx: master process /usr/sbin/nginx -g daemon on; master_process on; 
Port: 53, PID: 527
—> Command: /lib/systemd/systemd-resolved 
Port: 22, PID: 768
—> Command: sshd: /usr/sbin/sshd -D [listener] 0 of 10-100 startups 

## ———————————————————————————— ##

Detected nginx, analyzing its configuration...
Device "eth0" does not exist.
File: /etc/nginx/sites-enabled/default
Root: /var/www/html/valentine.htb
Hosts:
  valentine.htb www.valentine.htb
  _
———
File: /etc/nginx/sites-enabled/flowers
Root: /var/www/html/flowers
Hosts:
  _
———

Unique Hosts:

  _
  valentine.htb www.valentine.htb

## ———————————————————————————— ##

Apache is not installed.

## ———————————————————————————— ##

Checking /etc/sudoers (active configurations only):
  Defaults      env_reset
  Defaults      mail_badpass
  Defaults      secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/snap/bin"
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding SUID files:
  root  ALL=(ALL:ALL) ALL
  %admin ALL=(ALL) ALL
  %sudo ALL=(ALL:ALL) ALL
———
Finding files with special capabilities:
  /usr/bin/mtr-packet = cap_net_raw+ep
  /usr/bin/ping = cap_net_raw+ep
  /usr/bin/traceroute6.iputils = cap_net_raw+ep
  /usr/lib/x86_64-linux-gnu/gstreamer1.0/gstreamer-1.0/gst-ptp-helper = cap_net_bind_service,cap_net_admin+ep
———
```

## wpscan

```bash
[+] URL: http://valentine.htb/ [10.10.110.101]
[+] Started: Sun Apr 13 21:30:11 2025

Interesting Finding(s):

[+] Headers
 | Interesting Entry: Server: nginx/1.18.0 (Ubuntu)
 | Found By: Headers (Passive Detection)
 | Confidence: 100%

[+] XML-RPC seems to be enabled: http://valentine.htb/xmlrpc.php
 | Found By: Link Tag (Passive Detection)
 | Confidence: 100%
 | Confirmed By: Direct Access (Aggressive Detection), 100% confidence
 | References:
 |  - http://codex.wordpress.org/XML-RPC_Pingback_API
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_ghost_scanner/
 |  - https://www.rapid7.com/db/modules/auxiliary/dos/http/wordpress_xmlrpc_dos/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_xmlrpc_login/
 |  - https://www.rapid7.com/db/modules/auxiliary/scanner/http/wordpress_pingback_access/

[+] Upload directory has listing enabled: http://valentine.htb/wp-content/uploads/
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 100%

[+] The external WP-Cron seems to be enabled: http://valentine.htb/wp-cron.php
 | Found By: Direct Access (Aggressive Detection)
 | Confidence: 60%
 | References:
 |  - https://www.iplocation.net/defend-wordpress-from-ddos
 |  - https://github.com/wpscanteam/wpscan/issues/1299

[+] WordPress version 5.9 identified (Insecure, released on 2022-01-25).
 | Found By: Rss Generator (Passive Detection)
 |  - http://valentine.htb/?feed=rss2, <generator>https://wordpress.org/?v=5.9</generator>
 |  - http://valentine.htb/?feed=comments-rss2, <generator>https://wordpress.org/?v=5.9</generator>

[+] WordPress theme in use: lovestory
 | Location: http://valentine.htb/wp-content/themes/lovestory/
 | Style URL: http://valentine.htb/wp-content/themes/lovestory/style.css?ver=5.9
 | Style Name: LoveStory
 | Style URI: http://lovestory.themerex.net/
 | Description: LoveStory - Multipurpose and Multiskin Responsive Wordpress theme...
 | Author: ThemeREX
 | Author URI: https://themerex.net/
 |
 | Found By: Css Style In Homepage (Passive Detection)
 |
 | Version: 1.3.1 (80% confidence)
 | Found By: Style (Passive Detection)
 |  - http://valentine.htb/wp-content/themes/lovestory/style.css?ver=5.9, Match: 'Version: 1.3.1'

[+] Enumerating All Plugins (via Passive Methods)
[+] Checking Plugin Versions (via Passive and Aggressive Methods)

[i] Plugin(s) Identified:

[+] contact-form-7
 | Location: http://valentine.htb/wp-content/plugins/contact-form-7/
 | Last Updated: 2025-04-10T06:47:00.000Z
 | [!] The version is out of date, the latest version is 6.0.6
 |
 | Found By: Urls In Homepage (Passive Detection)
 | Confirmed By: Hidden Input (Passive Detection)
 |
 | Version: 5.5.4 (100% confidence)
 | Found By: Query Parameter (Passive Detection)
 |  - http://valentine.htb/wp-content/plugins/contact-form-7/includes/css/styles.css?ver=5.5.4
 | Confirmed By:
 |  Hidden Input (Passive Detection)
 |   - http://valentine.htb/, Match: '5.5.4'
 |  Readme - Stable Tag (Aggressive Detection)
 |   - http://valentine.htb/wp-content/plugins/contact-form-7/readme.txt

[+] essential-grid
 | Location: http://valentine.htb/wp-content/plugins/essential-grid/
 | Latest Version: 3.1.8
 | Last Updated: 2025-02-19T02:24:33.000Z
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | The version could not be determined.

[+] js_composer
 | Location: http://valentine.htb/wp-content/plugins/js_composer/
 | Last Updated: 2025-03-18T20:01:01.000Z
 | [!] The version is out of date, the latest version is 8.3.1
 |
 | Found By: Urls In Homepage (Passive Detection)
 | Confirmed By: Body Tag (Passive Detection)
 |
 | Version: 6.7.0 (90% confidence)
 | Found By: Body Tag (Passive Detection)
 |  - http://valentine.htb/, Match: 'js-comp-ver-6.7.0'
 | Confirmed By: Query Parameter (Passive Detection)
 |  - http://valentine.htb/wp-content/plugins/js_composer/assets/css/js_composer.min.css?ver=6.7.0
 |  - http://valentine.htb/wp-content/plugins/js_composer/assets/js/dist/js_composer_front.min.js?ver=6.7.0
 |  - http://valentine.htb/wp-content/plugins/js_composer/assets/lib/bower/isotope/dist/isotope.pkgd.min.js?ver=6.7.0

[+] mailchimp-for-wp
 | Location: http://valentine.htb/wp-content/plugins/mailchimp-for-wp/
 | Last Updated: 2025-02-28T07:20:00.000Z
 | [!] The version is out of date, the latest version is 4.10.2
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | Version: 4.8.6 (100% confidence)
 | Found By: Readme - Stable Tag (Aggressive Detection)
 |  - http://valentine.htb/wp-content/plugins/mailchimp-for-wp/readme.txt
 | Confirmed By: Change Log (Aggressive Detection)
 |  - http://valentine.htb/wp-content/plugins/mailchimp-for-wp/CHANGELOG.md, Match: '#### 4.8.6 - Jun 24, 2021'

[+] revslider
 | Location: http://valentine.htb/wp-content/plugins/revslider/
 | Last Updated: 2025-03-20T21:46:59.000Z
 | [!] The version is out of date, the latest version is 6.7.31
 |
 | Found By: Urls In Homepage (Passive Detection)
 | Confirmed By: Meta Generator (Passive Detection)
 |
 | Version: 6.5.6 (100% confidence)
 | Found By: Meta Generator (Passive Detection)
 |  - http://valentine.htb/, Match: 'Powered by Slider Revolution 6.5.6'
 | Confirmed By: Release Log (Aggressive Detection)
 |  - http://valentine.htb/wp-content/plugins/revslider/release_log.html, Match: 'Version 6.5.6 (06th August 2021)'

[+] trx_utils
 | Location: http://valentine.htb/wp-content/plugins/trx_utils/
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | The version could not be determined.

[+] vc-extensions-bundle
 | Location: http://valentine.htb/wp-content/plugins/vc-extensions-bundle/
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | The version could not be determined.

[+] woocommerce
 | Location: http://valentine.htb/wp-content/plugins/woocommerce/
 | Last Updated: 2025-04-09T11:56:00.000Z
 | [!] The version is out of date, the latest version is 9.8.1
 |
 | Found By: Urls In Homepage (Passive Detection)
 | Confirmed By: Meta Generator (Passive Detection)
 |
 | Version: 6.1.1 (100% confidence)
 | Found By: Query Parameter (Passive Detection)
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css?ver=6.1.1
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css?ver=6.1.1
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/css/woocommerce.css?ver=6.1.1
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/js/frontend/add-to-cart.min.js?ver=6.1.1
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/js/frontend/woocommerce.min.js?ver=6.1.1
 |  - http://valentine.htb/wp-content/plugins/woocommerce/assets/js/frontend/cart-fragments.min.js?ver=6.1.1
 | Confirmed By: Meta Generator (Passive Detection)
 |  - http://valentine.htb/, Match: 'WooCommerce 6.1.1'

[+] wp-gdpr-compliance
 | Location: http://valentine.htb/wp-content/plugins/wp-gdpr-compliance/
 | Latest Version: 2.0.23
 | Last Updated: 2024-01-29T09:20:00.000Z
 |
 | Found By: Urls In Homepage (Passive Detection)
 |
 | The version could not be determined.

[+] Enumerating Config Backups (via Passive and Aggressive Methods)
 Checking Config Backups - Time: 00:00:06 <=================================================================================================================================> (137 / 137) 100.00% Time: 00:00:06

[i] No Config Backups Found.

[!] No WPScan API Token given, as a result vulnerability data has not been output.
[!] You can get a free API token with 25 daily requests by registering at https://wpscan.com/register

[+] Finished: Sun Apr 13 21:30:45 2025
[+] Requests Done: 206
[+] Cached Requests: 5
[+] Data Sent: 52.57 KB
[+] Data Received: 1.05 MB
[+] Memory used: 271.578 MB
[+] Elapsed time: 00:00:34
```

## Grafana v8.0.0-beta1
