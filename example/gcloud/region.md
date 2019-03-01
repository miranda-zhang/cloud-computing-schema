# Data Mapping Example: Google Cloud Regions
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

### Getting Data From Google Website
[Programtically extract region codes from json imput](region_jq.md)
can only obtain region codes,
by inspecting the documentation https://cloud.google.com/about/locations/,
more detailed mapping can be manually constructed.

[Region inJurisdiction example mapping (json)](../jq/gcloud/region_inJurisdiction.json)

This is most useful for 
[multi-region .](https://cloud.google.com/spanner/docs/instances#available-configurations-multi-region)

[Example queries for this input.](region_jq.md#SPARQL-Generate)

Additional inforamtion from documentation:
[Region inPhysicalLocation example mapping (json)](../jq/gcloud/region.json)

### SPARQL-Generate
Run [queries](../sparql-generate/gcloud/region_geonames.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/region_geonames.ttl)

## CloudHarmony Data
Run jq query on [data collected via CloudHarmony](../cloudharmony/google/README.md#collect-data)
```
[
    .[][0] | select(.region != null) | {
        "location": .location,
        "region": .region
    }
] | unique

See live https://jqplay.org/s/aajIEQqBjy

[Cached Result.](../jq/gcloud/region_geo_coord.json)

Even when there is no location data, we still keep the region for correct mapping to cloudharmony data.

```
java -jar sparql-generate-jena.jar --output result/gcloud/region_geo_coord.ttl --query-file gcloud/region_geo_coord.rqg --log-level ERROR
```
Query: [region_geo_coord.rqg](../sparql-generate/gcloud/region_geo_coord.rqg)

Result: [region_geo_coord.ttl](../sparql-generate/result/gcloud/region_geo_coord.ttl)
