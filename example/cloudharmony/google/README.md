# Google Platform Network Test
43 services: http://cloudharmony.com/speedtest-for-google

# Collect Data
Download [test.html](test.html) [speedtest-googlecompute.js](speedtest-googlecompute.js) 

View test.html in browser, a live demo is also available here.

Cached result: [0.json](0.json)

# Reconstruct JSON with Only Key Parameters
Run jq query on [data](#collect-data)
```
[
    .[] | select(.[1].status=="success") | {
        "location": .[0].location,
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

[Cached Result.](../../jq/gcloud/qos_network.json)

# schema.org compliance

https://schema.org/GeoCoordinates

https://www.w3.org/TR/vocab-ssn/#seismograph

# My Device
IP: 150.203.213.249
Hanna Neumann Building #145, Science Road, Canberra ACT 2601
Latitude: -35.271475
Longitude: 149.121434

# SPARQL-Generate


Run [queries](../../sparql-generate/gcloud/qos_network.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/region.ttl)

# Future Work
https://pending.schema.org/QuantitativeValueDistribution
