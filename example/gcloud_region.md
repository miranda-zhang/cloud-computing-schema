# Data Mapping Example: Google Cloud Regions
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Provider specific region codes
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/IrbiQWTZbQ
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
Result
```
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

## Geonames
GeonamesRdf Client library
https://github.com/dsoprea/GeonamesRdf

Example
```
$ gn_search dsoprea -p query "united states" -p max_rows 5
[http://sws.geonames.org/6255150/]: [South America]
[http://sws.geonames.org/6252001/]: [United States]
[http://sws.geonames.org/6255149/]: [North America]
[http://sws.geonames.org/7729890/]: [Northern America]
[http://sws.geonames.org/11887752/]: [South]
$ gn_search dsoprea -p query "europe" -p max_rows 5
[http://sws.geonames.org/9408659/]: [Western Europe]
[http://sws.geonames.org/7729884/]: [Eastern Europe]
[http://sws.geonames.org/9408658/]: [Southern Europe]
[http://sws.geonames.org/6255148/]: [Europe]
[http://sws.geonames.org/7729883/]: [Northern Europe]
```
Map region with country 

[Google Cloud Regions relation to GeoNames](data/gcloud_region.json)

## SPARQL-Generate
[SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)

[Queries](sparql-generate/gcloud_region.rqg)

[Results in RDF turtle](sparql-generate/result/gcloud_storage.ttl)
