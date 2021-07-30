# CloudHarmony
# Old Data
The [Javascript method](#javascript-solution) wasn't available in 2014, that's when the old data were collected.
So it's different from the current data.
See [Old Data Archive](old_data_archive/).

# Alternatives
http://www.azurespeed.com provide tests for Azure services only.
We choose to use CloudHarmony because it features more providers.

# Command Line Tool
https://github.com/cloudharmony/network

## Ubuntu Install

    sudo apt update
    sudo apt -y install curl php5-cli dnsutils geoip-bin traceroute

If using a shell under Windows, you may need to convert file endings :

    dos2unix run.sh save.sh

If any lib can't be found, search with

    apt-cache search dig dns

## Some Usage Example

    cd /mnt/c/Users/admin-u5214628/Documents/cloudharmony_test/network

    ./run.sh --test latency --test_endpoint europe-west1.gce.cloudharmony.net --test_endpoint asia-east1.gce.cloudharmony.net --test_service_id google:compute
    ./save.sh

    ./run.sh --test downlink --test_endpoint us-central1.gce.cloudharmony.net/probe --test_service_id google:compute 

# Javascript Solution
This method is suitable for doing tests on local machine, if run tests on remote server the [Command Line Tool](#command-line-tool) maybe more suitable.
1. [Google](gcloud/README.md)
2. [Azure](azure/README.md)

## Uplink
I have [problem with API uplink option](https://github.com/cloudharmony/network/issues/1),
Javascript tag also failed to get results. Some commands I tired, or used to investigate the issue:

    ./run.sh --test uplink --test_endpoint http://us-central1.gce.cloudharmony.net/probe --test_service_id google:compute --verbose --test_files_dir ../web-probe/ --verbose --tcp_file "small"

    curl --verbose -X POST http://asia-east1.gce.cloudharmony.net/probe/u.html?http://cloudharmony.com/probe/up.html
    curl -X POST http://us-central1.gce.cloudharmony.net/probe/up.html --data 'example=moredata'  -w '%{size_request} %{size_upload}'

Alternativly, browser automation with [selenium](selenium/) is possible.

## Device
Desktop computer is used to collect the measurements:
1. IP: 150.203.213.249
2. Latitude: -35.271475
3. Longitude: 149.121434
4. Address: Hanna Neumann Building #145, Science Road, Canberra ACT 2601

The above information can be captured with this [device.ttl](../sparql-generate/result/device.ttl)

## QoS Properties
The tests properties can be described using the `cocoon:QualityOfService` sub classes.
The full example is available here: [qos_property](../sparql-generate/result/qos_property.ttl)
