# Data Mapping Example: Google Cloud Regions

[Programtically extract region codes from json imput](region_jq.md)
can only obtain region codes,
by inspecting the documentation https://cloud.google.com/about/locations/,
more detailed mapping can be manually constructed.

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

[Region inJurisdiction example mapping (json)](../jq/gcloud/region_inJurisdiction.json)

This is most useful for 
[multi-region .](https://cloud.google.com/spanner/docs/instances#available-configurations-multi-region)

[Example queries for this input.](region_jq.md#SPARQL-Generate)

## Additional inforamtion from documentation
[Region inPhysicalLocation example mapping (json)](../jq/gcloud/region.json)

## SPARQL-Generate
Run [queries](../sparql-generate/gcloud/region.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/region.ttl)
