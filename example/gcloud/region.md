# Data Mapping Example: Google Cloud Regions
## Extract region codes from json imput useing jq
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

Recorded:
1. [v1.41 24-July-2018](../data/gcloud/v1.41.json)
2. [v1.58 17-January-2019](../data/gcloud/v1.58.json)
3. [v1.62 12-February-2019](../data/gcloud/v1.62.json)

## Provider specific region codes
List of codes can be extracted from imput.
Apply transformation using `jq`:
```
def set(s): reduce s as $x ({}; .[$x | (type[0:1] + tostring)] = $x);

def distinct(s): set(s)[];

.gcp_price_list
| del(.sustained_use_base,.sustained_use_tiers)
| [ 
    distinct(.[]
           | keys_unsorted[] as $k
           | select( getpath([$k]) | type == "number")
           | $k)
] - ["maxNumberOfPd", "maxPdSize", "gceu"]
```
v1.41 24-July-2018 result: https://jqplay.org/s/IrbiQWTZbQ
```json
[
  "us",
  "us-central1",
  "us-east1",
  "us-east4",
  "us-west1",
  "us-west2",
  "europe",
  "europe-west1",
  "europe-west2",
  "europe-west3",
  "europe-west4",
  "europe-north1",
  "northamerica-northeast1",
  "asia",
  "asia-east",
  "asia-northeast",
  "asia-southeast",
  "australia-southeast1",
  "australia",
  "southamerica-east1",
  "asia-south1",
  "asia-east1",
  "asia-northeast1",
  "asia-southeast1",
  "nam3",
  "nam-eur-asia1"
]
```

v1.62 12-February-2019 : https://jqplay.org/s/6TqXSWl_0w
```json
[
  "us",
  "us-central1",
  "us-east1",
  "us-east4",
  "us-west1",
  "us-west2",
  "europe",
  "europe-west1",
  "europe-west2",
  "europe-west3",
  "europe-west4",
  "europe-north1",
  "northamerica-northeast1",
  "asia",
  "asia-east",
  "asia-east1",
  "asia-east2",
  "asia-northeast",
  "asia-southeast",
  "australia-southeast1",
  "australia",
  "southamerica-east1",
  "asia-south1",
  "asia-northeast1",
  "asia-southeast1",
  "nam3",
  "nam-eur-asia1",
  "nam6",
  "eur3"
]
```

## Getting Data From Google Website
[Programtically extract region codes from json imput](#extract-region-codes-from-json-imput-useing-jq)
can only obtain region codes,
by inspecting the documentation https://cloud.google.com/about/locations/,
more detailed mapping can be manually constructed.

[Region inJurisdiction example mapping (v1.41)](../jq/gcloud/v1.41/region_inJurisdiction.json)

This is most useful for 
[multi-region](https://cloud.google.com/spanner/docs/instances#available-configurations-multi-region) .

[Example queries for this input.](region_jq.md#SPARQL-Generate)

Additional inforamtion from documentation:
[Region inPhysicalLocation example mapping (v1.41)](../jq/gcloud/v1.41/region.json)

## Jurisdiction data
v1.41 24-July-2018：
[queries](../sparql-generate/gcloud/v1.0.0/region_inJurisdiction.rqg)
[results (RDF turtle)](../sparql-generate/result/gcloud/v1.0.0/region_inJurisdiction.ttl)

## Pysical location data
v1.0.0:
[queries](../sparql-generate/gcloud/v1.0.0/region_geonames.rqg)
[results (RDF turtle)](../sparql-generate/result/gcloud/v1.0.0/region_geonames.ttl)

## CloudHarmony Data
Run jq query on [data collected via CloudHarmony](../cloudharmony/gcloud/README.md#collect-data)
```
[
    .[][0] | select(.region != null) | {
        "location": .location,
        "region": .region
    }
] | unique

See live https://jqplay.org/s/aajIEQqBjy

[Cached Result.](../jq/gcloud/cloudharmony/region_geo_coord.json)

```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/region_geo_coord.rqg --output result/gcloud/v1.0.1/region_geo_coord.ttl --log-level ERROR
```
v1.0.1:
[Query](../sparql-generate/gcloud/v1.0.1/region_geo_coord.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.1/region_geo_coord.ttl)
