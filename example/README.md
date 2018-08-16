# Request ontology from url
[GET rdf/ttl via Ajax](ajax.html)

# SPARQL

Default Protégé Example:
```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?subject ?object
WHERE { ?subject rdfs:subClassOf ?object }
```

What `subject`s are `subClassOf` `cocoon:IaaS`?
```
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX cocoon: <https://w3id.org/cocoon/def#>
SELECT ?subject 
WHERE { ?subject rdfs:subClassOf cocoon:IaaS}
```

# JSON-LD Macros example
https://miranda-zhang.github.io/cloud-computing-schema/json-ld-macros/gcloud.html

Created with https://github.com/ariutta/json-ld-macros

# Define custom mapper

Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json
[A cached version of the json input.](pricelist.json)

Apply transformation using `jq`, view the live snippet https://jqplay.org/s/OM19tnmhr2
```
.gcp_price_list | . |=with_entries(select(.key|contains("VMIMAGE"))) | 
[ to_entries[] | 
    {
        "name": .key,
        "cores": .value.cores,
        "memory": .value.memory,
        "gceu": .value.gceu,
        "price": 
         [ 
            .value | del(
                .cores, .memory, .gceu,
                .fixed, .maxNumberOfPd, .maxPdSize, .ssd,
                .nam3)
            | to_entries[] | { "region": .key, "price": .value }
         ] 
    } 
]
```
[A cached version of the result after transformation.](jq/gcloud_vm.json)

Mapper
http://w3id.org/sparql-generate/
```rq
BASE <http://example.com/> 
PREFIX iter: <http://w3id.org/sparql-generate/iter/>
PREFIX fun: <http://w3id.org/sparql-generate/fn/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX cocoon: <https://w3id.org/cocoon/def>

GENERATE { 
  ?IRI a cocoon:IaaS;
            rdfs:label ?name;
            a gr:Offering 
            cocoon:hasPrice ?price .
    
}
SOURCE <https://cloudpricingcalculator.appspot.com/static/data/pricelist.json> AS ?source
ITERATOR iter:JSONPath(?source,"$..gcp_price_list") AS ?gloudPrice
WHERE {
    BIND (fun:JSONPath(?gloudPrice,".name") AS ?name)
    BIND (IRI( REPLACE( CONCAT("http://ex.com/",?name) , " " , "_" ) ) as ?IRI)
    BIND (fun:JSONPath(?gloudPrice,".price") AS ?price)
}
```

Result: RDF
```
```
