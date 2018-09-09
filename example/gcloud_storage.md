# Data Mapping Example: Google Cloud Storage
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/tt302_aTzV
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
) | 
[ to_entries[] | 
    {
        "name": .key,
        "prices": 
         [ 
            .value | to_entries[] |
            { "region": .key, "price": .value }
         ] 
    } 
]
```
[A cached version of the result after transformation.](data/gcloud_storage.json)

## Mapping to ontology
Run [queries](sparql-generate/gcloud_storage.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](sparql-generate/result/gcloud_storage.ttl)
