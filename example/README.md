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
<iframe src="https://www.draw.io/?lightbox=1&highlight=0000ff&nav=1&title=cococon_usage_workflow.xml#R7Vpdd%2BIoGP41XrYnQhLNpdXaOXPa6ezY3XYu0WBkJgaHYKv99QsJJJDEre3o6DlZbxpeCIHnfd4vaAcOl5sbhlaLOxriuAOccNOBow4AXdeB4o%2BUbHOJ7we5IGIkVINKwYS8YiV0lHRNQpxaAzmlMScrWzijSYJn3JIhxuiLPWxOY%2FurKxThmmAyQ7GWXnql%2FJGEfKHkXb0R2fEJk2ihPt4HvbxjimY%2FI0bXifpiB8B59su7l0jPpbaaLlBIXwwRvO7AIaOU50%2FLzRDHEl0NXP7eeEdvsR%2BGE77XC9BVC%2BFbvX0cCjRUkzK%2BoBFNUHxdSq%2ByDWI5hSNaC76MxWNXPIqvsu2TlAsIVfO7GoaTcCCVI5oJTXAuGZM4Vv0%2FMOdbRQa05lSIyq%2FfUrpS35jThA9pTFm2WhgE43EQCHl96wqNlK7ZTO0NKDohFmE9Cqpxct%2FGiwqwG0yXWGxDDGA4Rpw829xBimxRMa6EWzwoxJvRV6t5RvFaTTr5Ovj2121NJSXgGQICNAMBAF3XGwl5xFBIcImOgjnljP7EFWEFxXH2U3KtfI32GC1JLG35AS3oEulRuaq67k7gnzHjePOfkKpe4Cj7UR6j63vaBl8M%2BwuU1SxM03N%2BXw9d98BWcA5M9%2BpUB%2F7JmO7VqH6fcLG3aNs6skPHscjuuk6d6rCB6v4BqK4pYChiSIf0Pmm9Gjz4J9UQ1NRwh1YrkkQyb8JzkhBOaJK2Titur%2F%2B2cXj942il2%2BCm%2FiHpGsUkRVIfKhNtn1Z8cNL4DL3Dxuczz1K7upw4kzy1WI8ZvvkCM7kVmqZkKgAHzjqVhVXbbKMH7Djyx22jXkUc1ljOwSA09y2D0N76BAbhBu3AWOcpJ4DYc1oC8elY7LcE4q53ssK3WI%2Fhnq83nKEZTwspcOaMLrMmI3QtO0iyWvOOrNZgV4I34ZThfC3AmeAlSjiZiccHRlZZ8G1d3IV9aMXdop4zoi50GyqFw0TdekY0mS2EXi4piwy93T%2FeGq1vo7HdmhjNpztz6NNkZLTG9wPzzdHQaGA%2BuzSa7SNCpZD3%2FT0LeeC472YCnf6QVw7AidEUx2a6VeYGwFiu4s0OD4vjKX0xnWsmEB1y92SG4kID%2BhoCVDzwXkeBfoNL1AR%2B0yUqlC96FZih1wCz0wBzIWyCWX3vKyUJN1Tqe7ZKYWWKfHvqLWDcb1QmuvB3rVrPlINSm0lEMrQ1hq3kgHT%2FFfccV1UBu5YGKv5L7NF%2BQzzkqyh5WKiliZqiqdi5K2mFNZ8l%2FEbMlU125I2aNmr%2F11reQQlvIsxL%2FkyRH8m%2Ff6fZcdVYhDMR6LPnfDIhy%2BfLx9UckrBrbqcODKfkFU2zAdKHKbTFaO%2Bqk7knFJMoEYKZILqoO%2BGVtpCB6liSMMxMKDPMq%2BIezvBT6ibuXRmGq6urqjsqrh%2FVsjvmBd7HcopmnnQtllwE9vt0Pk8xr9DmDaI0MOOw5ysbwo3jFdH6fl4pYuPpyr7%2B8AiVTr2Cv6E0kmldEdUHj2aqMHhdM6s3JlM0Rf8nBeWJZWCfWPpecNKkwIPnlhQEDUagmbh3UuA59nE9dBtgPlBS4Hn2JbHXr%2FjCvZMCd9eqD5wUVFfcc%2BAbSYHbqyQ%2BIDhyUuC1yvVrgn%2BM9Udw%2FfXr2BHiqHXu2u%2FbaboLG%2FzI0a79vHox%2F3ly%2F8WIn5%2FN6PvpwarURahtc6T1A7cSafunjbT9M4u0hZHbTue99Td0%2FErQasD5QKG2p7OlItT2Pxhqwa5VHzjUVlfcc8Abodbv2cHZB%2F1jh9rDXhqde6htqrL2Zv3vhlrRLP%2BLNtdd%2Bc%2FK8Ppf"></iframe>

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
```rq
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
