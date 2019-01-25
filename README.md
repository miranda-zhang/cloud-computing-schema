# Linked Data Fragments Server
https://github.com/LinkedDataFragments/Server.js

# Ubuntu
Installation (need `sudo` access):

    apt update
    apt upgrade
    apt install npm
    npm install -g ldf-server

Start the server

    ldf-server config.json 5000 1

# Google Cloud
`gcloud` sdk commands (on windows)

    gcloud config set project "cocoon-ldf-server"
    gcloud config set compute/zone "us-east1-b"
    gcloud compute scp C:\Users\admin-u5214628\Documents\iaas_cloud_price\nodejs\ldf-server "instance-1":. --recurse 

## Ubuntu
18.04.1 LTS (GNU/Linux 4.15.0-1026-gcp x86_64)

    gcloud compute --project "cocoon-ldf-server" ssh --zone "us-east1-b" "instance-1"
    
On the instance:

    sudo apt update
    sudo apt install npm
    sudo npm install -g ldf-server
    ldf-server config.json 5000 1

Change Firewall rules to allow `tcp:5000`

http://35.227.26.187:5000/

### Deployment as Linux service

    sudo apt install nano
    which ldf-server
    sudo nano /lib/systemd/system/ldf.service

```
[Unit]
Description=LDF - Linked Data Fragments Server
After=network.target

[Service]
Type=simple
User=admin-u5214628
WorkingDirectory=/home/admin-u5214628/ldf-server
ExecStart=/usr/bin/node /usr/local/bin/ldf-server /home/admin-u5214628/ldf-server/config.json 5000 1
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

    $ sudo systemctl daemon-reload
    $ sudo systemctl restart ldf
    $ sudo systemctl status ldf
    $ sudo systemctl enable ldf

https://github.com/LinkedDataFragments/Server.js/wiki/Deployment-as-Linux-service

### Setup git repo

    ssh-keygen -t rsa -C "admin-u5214628@instance-1"
    sudo apt install git
    git clone --single-branch -b ldf-server git@github.com:miranda-zhang/cloud-computing-schema.git ldf-server

### Maintenance
Unresponsive instance: Stop then Start (*Allocates new external IP*).

    service ldf status
    sudo service ldf restart

# Multiple files as a datasource 
https://github.com/LinkedDataFragments/Server.js/issues/34

https://github.com/LinkedDataFragments/Server.js/blob/master/config/config-composite.json
