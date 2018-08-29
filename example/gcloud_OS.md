# Data Mapping Example: Google Cloud Storage
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/zZcN03Tdyp
```
.gcp_price_list | ."CP-COMPUTEENGINE-OS"
```
[A cached version of the result after transformation.](data/gcloud_os.json)

## Mapping to ontology
Mapper library
http://w3id.org/sparql-generate/

[SPARQL-Generate Queries](sparql-generate/gcloud_os.rqg)

## Result
[RDF turtle](sparql-generate/result/gcloud_os.ttl)
