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
```json
    "CP-COMPUTEENGINE-VMIMAGE-F1-MICRO": {
      "us": 0.0076,
      "us-central1": 0.0076,
      "us-east1": 0.0076,
      "us-east4": 0.0086,
      "us-west1": 0.0076,
      "us-west2": 0.0091,
      "europe": 0.0086,
      "europe-west1": 0.0086,
      "europe-west2": 0.0096,
      "europe-west3": 0.0096,
      "europe-west4": 0.0084,
      "europe-north1": 0.0084,
      "northamerica-northeast1": 0.0084,
      "asia": 0.0090,
      "asia-east": 0.0090,
      "asia-northeast": 0.0092,
      "asia-southeast": 0.0092,
      "australia-southeast1": 0.0106,
      "australia": 0.0106,
      "southamerica-east1": 0.0118,
      "asia-south1": 0.0091,
      "cores": "shared",
      "memory": "0.6",
      "gceu": "Shared CPU, not guaranteed",
      "maxNumberOfPd": 16,
      "maxPdSize": 64,
      "ssd": [0]
    }
```
Apply transformation for cosumpition by mapper
```
.gcp_price_list | del(.sustained_use_base,.sustained_use_tiers, .CP-COMPUTEENGINE-OS) | 
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

```
.gcp_price_list | del(.sustained_use_base,.sustained_use_tiers) | 
[ to_entries[] | 
    {
        "name": .key,
        "cores": .cores,
        "memory": .memory,
        "gceu": .gceu       
    } 
]
```

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
            cocoon:Price ?price .
    
}
SOURCE <https://cloudpricingcalculator.appspot.com/static/data/pricelist.json> AS ?source
ITERATOR iter:JSONPath(?source,"$..gcp_price_list") AS ?gloudPrice
WHERE {
    BIND (fun:JSONPath(?gloudPrice,"|keys") AS ?name)
    BIND (IRI( REPLACE( CONCAT("http://ex.com/",?name) , " " , "_" ) ) as ?IRI)

    BIND (fun:JSONPath(?gloudPrice,".us") AS ?price)
}
```

Result: RDF
```
```
