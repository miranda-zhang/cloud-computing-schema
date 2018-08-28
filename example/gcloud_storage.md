## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/tt302_aTzV
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key |
        contains("CP-COMPUTEENGIN") and (
            contains("PD") or
            contains("SSD")
        ) 
    )
) | 
[ to_entries[] | 
    {
        "name": .key,
        "prices": 
         [ 
            .value | to_entries[] |
            { "region": .key, "price": .value }
         ] 
    } 
]
```
[A cached version of the result after transformation.](data/gcloud_storage.json)

## Mapping to ontology
Mapper library
http://w3id.org/sparql-generate/
```rqg
BASE <https://w3id.org/cocoon/> 
PREFIX iter: <http://w3id.org/sparql-generate/iter/>
PREFIX fun: <http://w3id.org/sparql-generate/fn/>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX gr: <http://purl.org/goodrelations/v1#>
PREFIX cocoon: <https://w3id.org/cocoon/v1.0#>

GENERATE { 
  <data#{?name}> a cocoon:Storage;
    rdfs:label ?name;
    GENERATE {
        <data#{?name}> gr:hasPriceSpecification [ 
            a gr:UnitPriceSpecification ; 
                gr:hasCurrency "USD"^^xsd:string; 
                gr:hasCurrencyValue "{?regionalPrice}"^^xsd:double; 
                gr:hasRegion "{?region}"^^xsd:string;
        ] 
    } 
  	ITERATOR iter:JSONPath(?gcloudStorage,".prices[*]") AS ?prices
    WHERE {
        BIND (fun:JSONPath(?prices,".price") AS ?regionalPrice)
        BIND (fun:JSONPath(?prices,".region") AS ?region)
    }   
  	.
 
}
SOURCE <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/example/data/gcloud_storage.json> AS ?source
ITERATOR iter:JSONPath(?source,"$[*]") AS ?gcloudStorage
WHERE {
    BIND (fun:JSONPath(?gcloudStorage,".name") AS ?name)
}
```

## Result
[RDF turtle](data/gcloud_storage.ttl)
