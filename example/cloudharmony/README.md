# Command Line Tool
https://github.com/cloudharmony/network

## Ubuntu Install

    sudo apt update
    sudo apt -y install curl php5-cli dnsutils geoip-bin

If using a shell under Windows, you may need to convert file endings :

    dos2unix run.sh save.sh

If any lib can't be found, search with

    apt-cache search dig dns

## Some Usage Example

    cd /mnt/c/Users/admin-u5214628/Documents/cloudharmony/network

    ./run.sh --test latency --test_endpoint europe-west1.gce.cloudharmony.net --test_endpoint asia-east1.gce.cloudharmony.net --test_service_id google:compute
    ./save.sh

    ./run.sh --test downlink --test_endpoint us-central1.gce.cloudharmony.net/probe --test_service_id google:compute 

# Websites
http://cloudharmony.com/speedtest-for-google
http://cloudharmony.com/speedtest-for-azure

Javascript Tag solution are described in folders: [google](google/) [azure](azure/)
