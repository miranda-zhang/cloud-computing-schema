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
![Workflow](cococon_usage_workflow.png "Workflow Overview")

## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
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
[A cached version of the result after transformation.](data/gcloud_vm.json)

## Mapping to ontology
Mapper library
http://w3id.org/sparql-generate/
```rqg
BASE <https://w3id.org/cocoon/> 
PREFIX iter: <http://w3id.org/sparql-generate/iter/>
PREFIX fun: <http://w3id.org/sparql-generate/fn/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX crm: <http://www.cidoc-crm.org/cidoc-crm/>
PREFIX gr: <http://purl.org/goodrelations/v1#>
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology/1.0/cocoon.ttl>

GENERATE { 
  <data#{?name}> a cocoon:VM;
    rdfs:label ?name;
    cocoon:numberOfCores ?cores;
    cocoon:hasCPUcapacity[
        a cocoon:PhysicalQuantity;
            cocoon:numericValue ?gceu;
            cocoon:hasUnitOfMeasurement cocoon:gceu;
    ];
    cocoon:hasMemory [
        a cocoon:PhysicalQuantity;
            cocoon:numericValue ?memory;
            cocoon:hasUnitOfMeasurement cocoon:GB;
    ];
    GENERATE {
        <data#{?name}> gr:hasPriceSpecification [ 
            a gr:UnitPriceSpecification ; 
                gr:hasCurrency "USD"^^xsd:string; 
                gr:hasCurrencyValue "{?regionalPrice}"^^xsd:float; 
                gr:hasRegion "{?region}"^^xsd:string;
        ] 
    } 
  	ITERATOR iter:JSONPath(?gcloudVM,".price[*]") AS ?price
    WHERE {
        BIND (fun:JSONPath(?price,".price") AS ?regionalPrice)
        BIND (fun:JSONPath(?price,".region") AS ?region)
    }   
  	.
 
}
SOURCE <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/example/data/gcloud_vm.json> AS ?source
ITERATOR iter:JSONPath(?source,"$[*]") AS ?gcloudVM
WHERE {
    BIND (fun:JSONPath(?gcloudVM,".name") AS ?name)
    BIND (fun:JSONPath(?gcloudVM,".cores") AS ?cores)
    BIND (fun:JSONPath(?gcloudVM,".memory") AS ?memory)
    BIND (fun:JSONPath(?gcloudVM,".gceu") AS ?gceu)
    BIND (fun:JSONPath(?price,".price") AS ?regionalPrice)
    BIND (fun:JSONPath(?price,".region") AS ?region)
}
```

## Result
[RDF turtle](data/gcloud_vm.ttl)
