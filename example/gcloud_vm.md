# Data Mapping Example: Google Cloud VM
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/OM19tnmhr2
```
.gcp_price_list | . |=with_entries(select(.key|contains("VMIMAGE"))) | 
[ to_entries[] | 
    {
        "name": .key,
        "cores": .value.cores,
        "memory": .value.memory,
        "gceu": .value.gceu,
        "price": 
         [ 
            .value | del(
                .cores, .memory, .gceu,
                .fixed, .maxNumberOfPd, .maxPdSize, .ssd,
                .nam3)
            | to_entries[] | { "region": .key, "price": .value }
         ] 
    } 
]
```
[A cached version of the result after transformation.](data/gcloud_vm.json)

## Mapping to ontology
Mapper library
http://w3id.org/sparql-generate/

[SPARQL-Generate Queries](sparql-generate/gcloud_vm.rqg)

## Result
[RDF turtle](sparql-generate/result/gcloud_vm.ttl)