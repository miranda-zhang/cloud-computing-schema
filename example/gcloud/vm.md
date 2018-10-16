# Data Mapping Example: Google Cloud VM
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](../data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/8bvhcfLZV4
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
[A cached version of the result after transformation.](../jq/gcloud/vm.json)

### Shared-core machine types
Get the **vCPUs** values for *F1-MICRO* and *G1-SMALL*
from doc https://cloud.google.com/compute/docs/machine-types

## Mapping to ontology
Run [queries](../sparql-generate/gcloud/vm.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/vm.ttl)
