# Data Mapping: Microsoft Azure Cloud Regions
## code or slug
Obtained by run `jq '.regions'` on [vm_base.json](../data/azure/vm_base.json)
```
[
  {
    "slug": "asia-pacific-east",
    "displayName": "East Asia"
  },
  {
    "slug": "asia-pacific-southeast",
    "displayName": "Southeast Asia"
  },
  {
    "slug": "australia-central",
    "displayName": "Australia Central"
  },
  {
    "slug": "australia-central-2",
    "displayName": "Australia Central 2"
  },
  {
    "slug": "australia-east",
    "displayName": "Australia East"
  },
  {
    "slug": "australia-southeast",
    "displayName": "Australia Southeast"
  },
  {
    "slug": "brazil-south",
    "displayName": "Brazil South"
  },
  {
    "slug": "canada-central",
    "displayName": "Canada Central"
  },
  {
    "slug": "canada-east",
    "displayName": "Canada East"
  },
  {
    "slug": "central-india",
    "displayName": "Central India"
  },
  {
    "slug": "south-india",
    "displayName": "South India"
  },
  {
    "slug": "west-india",
    "displayName": "West India"
  },
  {
    "slug": "europe-north",
    "displayName": "North Europe"
  },
  {
    "slug": "europe-west",
    "displayName": "West Europe"
  },
  {
    "slug": "france-central",
    "displayName": "France Central"
  },
  {
    "slug": "france-south",
    "displayName": "France South"
  },
  {
    "slug": "germany-central",
    "displayName": "Germany Central"
  },
  {
    "slug": "germany-northeast",
    "displayName": "Germany Northeast"
  },
  {
    "slug": "japan-east",
    "displayName": "Japan East"
  },
  {
    "slug": "japan-west",
    "displayName": "Japan West"
  },
  {
    "slug": "korea-central",
    "displayName": "Korea Central"
  },
  {
    "slug": "korea-south",
    "displayName": "Korea South"
  },
  {
    "slug": "united-kingdom-south",
    "displayName": "UK South"
  },
  {
    "slug": "united-kingdom-west",
    "displayName": "UK West"
  },
  {
    "slug": "us-central",
    "displayName": "Central US"
  },
  {
    "slug": "us-east",
    "displayName": "East US"
  },
  {
    "slug": "us-east-2",
    "displayName": "East US 2"
  },
  {
    "slug": "us-north-central",
    "displayName": "North Central US"
  },
  {
    "slug": "us-south-central",
    "displayName": "South Central US"
  },
  {
    "slug": "us-west-central",
    "displayName": "West Central US"
  },
  {
    "slug": "us-west",
    "displayName": "West US"
  },
  {
    "slug": "us-west-2",
    "displayName": "West US 2"
  },
  {
    "slug": "usgov-arizona",
    "displayName": "US Gov. Arizona"
  },
  {
    "slug": "usgov-iowa",
    "displayName": "US Gov. Iowa"
  },
  {
    "slug": "usgov-texas",
    "displayName": "US Gov. Texas"
  },
  {
    "slug": "usgov-virginia",
    "displayName": "US Gov. Virginia"
  }
]

```

## Documentation
https://azure.microsoft.com/en-au/global-infrastructure/locations/

## Geonames
GeonamesRdf Client library
https://github.com/dsoprea/GeonamesRdf

Example
```
$ gn_search dsoprea -p query "europe" -p max_rows 5
[http://sws.geonames.org/9408659/]: [Western Europe]
[http://sws.geonames.org/7729884/]: [Eastern Europe]
[http://sws.geonames.org/9408658/]: [Southern Europe]
[http://sws.geonames.org/6255148/]: [Europe]
[http://sws.geonames.org/7729883/]: [Northern Europe]
```
Site http://www.geonames.org/

[Region inJurisdiction example mapping (json)](data/jq/gcloud/region_inJurisdiction.json)

This is most useful for 
[multi-region .](https://cloud.google.com/spanner/docs/instances#available-configurations-multi-region)

[Example queries for this input.](region_jq.md#SPARQL-Generate)

## Additional inforamtion from documentation
[Region inPhysicalLocation example mapping (json)](../data/jq/gcloud/region.json)

## SPARQL-Generate
Run [queries](sparql-generate/gcloud_region.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](sparql-generate/result/gcloud_region.ttl)
