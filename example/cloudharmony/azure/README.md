# Azure Platform Network QoS
71 services: http://cloudharmony.com/speedtest-for-azure

# Collect Data
Download [test.html](test.html) [speedtest-azure.js](speedtest-azure.js) 

View test.html in browser, a live demo is also [available here](https://miranda-zhang.github.io/cloud-computing-schema/cloudharmony/azure/test.html).

Cached result: [0.json](data/0.json)

How to process region related data is documented in  [the regions page](../../azure/region.md#cloudHarmony-data).

# Reconstruct JSON with Only Key Parameters
Run jq query on [data](#collect-data)
```
[
    .[] | select(.[1].status=="success") | {
        "provider_id": .[0].provider_id,
        "service": .[0].service,
        "service_type": .[0].service_type,
        "type": .[0].type,
        "average": .[1].mean,
        "completion_time": .[2].completion_time,
        "region": .[0].region,
        "zone":(
            if (.[0].subregion != null) then
                .[0].subregion | split("-")[2] 
            else null end
        ),
        "max_size": .[0].max_size,
        "min_size": .[0].min_size
    }
]
```
See live https://jqplay.org/s/ZdLvSR_Fyj

[Cached Result.](../../jq/azure/downlink_latency.json)

# SPARQL-Generate
```
java -jar sparql-generate-jena.jar --output result/azure/downlink_latency.ttl --query-file azure/downlink_latency.rqg --log-level ERROR
```
Query: [downlink_latency.rqg](../../sparql-generate/azure/downlink_latency.rqg)

Result: [downlink_latency.ttl](../../sparql-generate/result/azure/downlink_latency.ttl)

# Uplink Data
See [selenium](../selenium) about how to collect the data.
```
java -jar sparql-generate-jena.jar --output result/azure/uplink.ttl --query-file azure/uplink.rqg --log-level ERROR
```
Query: [uplink.rqg](../../sparql-generate/azure/uplink.rqg)

Result: [downlink_latency.ttl](../../sparql-generate/result/azure/uplink.ttl)
