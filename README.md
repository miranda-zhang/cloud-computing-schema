# Linked Data Fragments Server
https://github.com/LinkedDataFragments/Server.js

# Config file examples
 https://github.com/LinkedDataFragments/Server.js/blob/master/config/

# Ubuntu
Installation (need `sudo` access):

    apt update
    apt upgrade
    apt install npm nano
    npm install -g ldf-server

Start the server

    ldf-server config.json 5000 1

# Google Cloud
`gcloud` sdk commands (on windows)

    gcloud config set project "cocoon-ldf-server"
    gcloud config set compute/zone "us-east1-b"
    gcloud compute scp C:\Users\admin-u5214628\Documents\iaas_cloud_price\nodejs\ldf-server "instance-1":. --recurse 

# Ubuntu on gCloud
Ubuntu 18.04 LTS Minimal

    gcloud compute --project "cocoon-ldf-server" ssh --zone "us-east1-b" "instance-1"
    
On the instance:

    sudo apt update
    sudo apt install npm -y
    sudo npm install -g ldf-server

Make sure firewall rules allow `tcp:5000`

## Deployment as Linux service

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

## Setup git repo

    sudo apt install git -y
    ssh-keygen -t rsa -C "admin-u5214628@instance-1"
    cat /home/admin-u5214628/.ssh/id_rsa.pub
    git clone --single-branch -b ldf-server git@github.com:miranda-zhang/cloud-computing-schema.git ldf-server

## Add Swap Space
References:
1. [Swap Space Ubuntu-18-04](https://linuxize.com/post/how-to-add-swap-space-on-ubuntu-18-04/)
2. [Check disk space ubuntu](https://askubuntu.com/questions/432836/how-can-i-check-disk-space-used-in-a-partition-using-the-terminal-in-ubuntu-12-0/432842)
3. [Tee](https://stackoverflow.com/questions/84882/sudo-echo-something-etc-privilegedfile-doesnt-work)

```bash
 free -h
 sudo swapon --show
 df -Th
 sudo fallocate -l 1G /swapfile
 sudo chmod 600 /swapfile
 sudo mkswap /swapfile
 sudo nano /etc/fstab
```
Add `/swapfile swap swap defaults 0 0`

    sudo swapon --show
    sudo free -h
    cat /proc/sys/vm/swappiness
    sudo sysctl vm.swappiness=10
    cat /etc/sysctl.conf
    sudo nano /etc/sysctl.conf

Add `vm.swappiness=10`, high swappiness = more likely for system to use swap, hence less responsive.

## Reserve a static IP
When instance become unresponsive, need to stop then start instance,
ephemeral IP can change after that, better reserve a static IP,
and it is free when in use.
https://cloud.google.com/compute/pricing#ipaddress

Check whether a static external IP address is in use

    gcloud compute addresses list

# Issues
https://github.com/LinkedDataFragments/Server.js/issues/89

It's recomanded to load the data.ttl locally (i.e. using Protoge) and search with SPARQL.

Other questions:
1. [View Blank node](https://github.com/LinkedDataFragments/Server.js/issues/91)

# Generate config
[generate_ldfserver_config.py](generate_ldfserver_config.py)
```
mv config.json config.json.bak
python generate_ldfserver_config.py > config.json
```
# Update commands

    gcloud compute --project "cocoon-ldf-server" ssh --zone "us-east1-b" "instance-1"

## Security updates
https://askubuntu.com/questions/194/how-can-i-install-just-security-updates-from-the-command-line

    unattended-upgrade --help
    sudo unattended-upgrade
    cd /var/log/unattended-upgrades

## Update npm package
Determining which global packages need updating

    sudo npm outdated -g --depth=0

Updating a single global package

    sudo npm update -g ldf-server

Find the version of globally installed packages

    sudo npm list -g

## Update data
 
    git pull
    sudo systemctl restart ldf
    sudo systemctl status ldf

http://35.231.131.100:5000/
