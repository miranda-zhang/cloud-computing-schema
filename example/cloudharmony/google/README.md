# Google Platform Network Test
43 services: http://cloudharmony.com/speedtest-for-google

# Collect Data
Download [test.html](test.html) [speedtest-googlecompute.js](speedtest-googlecompute.js) 

View test.html in browser, a live demo is also [available here](https://miranda-zhang.github.io/cloud-computing-schema/cloudharmony/google/test.html).

Cached result: [2.json](data/2.json)

How to process region related data is documented in  [the regions page](../../gcloud/region.md#cloudHarmony-data).

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
See live https://jqplay.org/s/A5tzRAzOnW

[Cached Result.](../../jq/gcloud/downlink_latency.json)

# SPARQL-Generate
```
java -jar sparql-generate-jena.jar --output result/gcloud/downlink_latency.ttl --query-file gcloud/downlink_latency.rqg --log-level ERROR
```
Query: [downlink_latency.rqg](../../sparql-generate/gcloud/downlink_latency.rqg)

Result: [downlink_latency.ttl](../../sparql-generate/result/gcloud/downlink_latency.ttl)

# Future Work
The following schema.org extensions maybe helpfull, but can't be used until it made into core.
1. https://pending.schema.org/geospatiallyWithin
2. https://pending.schema.org/QuantitativeValueDistribution
