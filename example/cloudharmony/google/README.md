# Google Platform Network Test
43 services: http://cloudharmony.com/speedtest-for-google

# Collect Data
Download [test.html](test.html) [speedtest-googlecompute.js](speedtest-googlecompute.js) 

View test.html in browser, a live demo is also available here.

Cached result: [2.json](data/2.json)

How to process region related data are documented in  [the regions page](../../gcloud/region.md#cloudHarmony-data).

# Reconstruct JSON with Only Key Parameters
Run jq query on [data](#collect-data)
```
[
    .[] | select(.[1].status=="success") | {
        "provider_id": .[0].provider_id,
        "region": .[0].region,
        "service": .[0].service,
        "service_type": .[0].service_type,
        "zone": .[0].subregion | split("-")[2],
        "type": .[0].type,
        "average": .[1].mean,
        "completion_time": .[2].completion_time
    }
]
```
See live https://jqplay.org/s/LsE9srR2Cv

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
