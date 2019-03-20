# Helper scripts link regions to GeoNames
# GeoNames Ontology
http://www.geonames.org/ontology/documentation.html

GeoNames Search Webservice
http://www.geonames.org/export/geonames-search.html

e.g. 
http://api.geonames.org/search?q="united states"&country=us&maxRows=10&type=rdf&username=demo

# GeonamesRdf Client library
https://github.com/dsoprea/GeonamesRdf

    $ sudo pip install geonames_rdf

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

# Scripts Usage Example
1. [Microsoft Azure Regions](azure/README.md)
