# Data Mapping Example: Google Cloud Storage
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

Recorded
1. [v1.41 24-July-2018](../data/gcloud/v1.41.json)
2. [v1.62 12-February-2019](../data/gcloud/v1.62.json)

## Cleaning and Transformation
Apply transformation using `jq`
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
Result
1. 24-July-2018: [file](../jq/gcloud/v1.41/storage.json), https://jqplay.org/s/tt302_aTzV
2. 12-February-2019: [file](../jq/gcloud/v1.62/storage.json), https://jqplay.org/s/1Gd4tz0rj9

## Mapping to ontology
Query:[v1.0.0 24-July-2018](../sparql-generate/gcloud/v1.0.0/storage.rqg)
Result:[v1.0.0 24-July-2018](../sparql-generate/result/gcloud/v1.0.0/storage.ttl)

Query:[v1.0.0 24-July-2018](../sparql-generate/gcloud/v1.0.1/2019-02-12/storage.rqg)
Result:[v1.0.0 24-July-2018](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/storage.ttl)
```
java -jar sparql-generate-jena.jar --output result/azure/v1.0.0/managed-disks.ttl --query-file azure/v1.0.0/managed-disks.rqg --log-level ERROR
```

