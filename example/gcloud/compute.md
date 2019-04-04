# Data Mapping Example: Google Cloud VM
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](../data/gcloud/v1.62.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/iy0C1YR1Hq
```
.gcp_price_list | . |=with_entries(select(.key| contains("VMIMAGE") )) | 
[ to_entries[] | 
    {
        "name": .key,
        "cores":(
            if (.key|contains("F1-MICRO")) then
                0.2 
            elif (.key|contains("G1-SMALL")) then
                0.5
            else .value.cores end
        ),
        "memory": .value.memory,
        "gceu": (
            if .value.gceu == "Shared CPU, not guaranteed" then
                null
            else .value.gceu end
        ),
        "maxNumberOfPd": .value.maxNumberOfPd,
        "maxPdSize": .value.maxPdSize,
        "price": 
         [ 
            .value | del(
                .cores, .memory, .gceu,
                .fixed, .maxNumberOfPd, .maxPdSize, .ssd)
            | to_entries[] | { "region": .key, "price": .value }
         ] 
    } 
]
```
[A cached version of the result after transformation.](../jq/gcloud/v1.62/compute.json)

### Shared-core machine types
Get the **vCPUs** values for *F1-MICRO* and *G1-SMALL*
from doc https://cloud.google.com/compute/docs/machine-types

### Old Version
v1.41 https://jqplay.org/s/8bvhcfLZV4 [Cached result](../jq/gcloud/v1.41/vm.json)

## Mapping to ontology
CoCoOn v1.0.1 2019-02-12:
[Query](../sparql-generate/gcloud/v1.0.1/2019-02-12/compute.rqg) ->
[Result](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/compute.ttl)
```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/2019-02-12/compute.rqg --output result/gcloud/v1.0.1/2019-02-12/compute.ttl  --log-level ERROR 
```

