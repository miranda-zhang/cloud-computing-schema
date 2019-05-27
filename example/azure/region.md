# Data Mapping: Microsoft Azure Cloud Regions
https://azure.microsoft.com/en-au/global-infrastructure/regions/
## Getting Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-au&discount=mosp

Recorded on:
1. [2018-03-02](../data/azure/2018-03-02/vm_base.json)
2. [2019-03-07](../data/azure/2019-03-07/vm_base.json)

## human-readbale name to slug mapping
Obtained by run
```
.regions | 
[
  to_entries[] |
  {
    "key": .value.displayName, 
    "value": .value.slug
  }
] | from_entries
```
on [input](#Getting-Input)

Try live on jq playground 

Result:
1. 2018-03-02: [file](../jq/azure/2018-03-02/region.json), https://jqplay.org/s/eRBisoYbDb
2. 2019-03-07: [file](../jq/azure/2019-03-07/region.json), https://jqplay.org/s/cFmrjydbkC

## Geonames Mapping
See example in [geonames_rdf](../geonames_rdf/azure/README.md) directory.

## SPARQL-Generate
2018-03-02 cocoon v1.0.0:
[Queries](../sparql-generate/azure/v1.0.0/region.rqg)
[Results (RDF turtle)](../sparql-generate/result/azure/v1.0.0/region.ttl)

## CloudHarmony Data
Run jq query on [data collected via CloudHarmony](../cloudharmony/azure/README.md#collect-data)
```
[
    .[][0] | select(.region != null) | {
        "location": .location,
        "region": .region
    }
] | unique
```

### CoCoOn v1.0.1
[json](../jq/azure/cloudharmony/region/1.json), https://jqplay.org/s/8Hd1vD-PmF
```
java -jar sparql-generate-jena.jar --query-file azure/v1.0.1/region_geo_coord.rqg --output result/azure/v1.0.1/region_geo_coord.ttl --log-level ERROR
```
[Query](../sparql-generate/azure/v1.0.1/region_geo_coord.rqg) ->

[Result](../sparql-generate/result/azure/v1.0.1/region_geo_coord.ttl)
