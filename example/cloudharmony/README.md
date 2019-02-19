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

# Javascript Solution
This is the method we used.
1. [google](google/)
2. [azure](azure/)

# Old Data
Compressed csv files:
1. [latency.zip](latency.zip):116049 records
2. [uplink.zip](uplink.zip):110292 records
3. [downlink.zip](downlink.zip):386728 records
Compressed SQL dump for the above datasets (combined): [cloud_3_bak_6_merged.zip](cloud_3_bak_6_merged.zip)

The [Javascript method](#javascript-solution) wasn't available in 2014, that's when the data were collected.
So it's different from the current data.
