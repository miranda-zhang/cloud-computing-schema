## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet 
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key |
        contains("CP-COMPUTEENGIN") and (
            contains("PD") or
            contains("SSD")
        ) 
    )
) | [ to_entries[] | 
    {
        "name": .key,
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
```rq

```

## Result
[RDF turtle](data/gcloud_.ttl)
