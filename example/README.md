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

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile userAgent=\&quot;Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36\&quot; version=\&quot;9.0.8\&quot; editor=\&quot;www.draw.io\&quot; type=\&quot;github\&quot;&gt;&lt;diagram name=\&quot;Page-1\&quot; id=\&quot;2c0d36ab-eaac-3732-788b-9136903baeff\&quot;&gt;7Vpdd+IoGP41XrYnQhLNpdXaOXPa6ezY3XYu0WBkJgaHYKv99QsJJJDEre3o6DlZbxpeCIHnfd4vaAcOl5sbhlaLOxriuAOccNOBow4AXdeB4o+UbHOJ7we5IGIkVINKwYS8YiV0lHRNQpxaAzmlMScrWzijSYJn3JIhxuiLPWxOY/urKxThmmAyQ7GWXnql/JGEfKHkXb0R2fEJk2ihPt4HvbxjimY/I0bXifpiB8B59su7l0jPpbaaLlBIXwwRvO7AIaOU50/LzRDHEl0NXP7eeEdvsR+GE77XC9BVC+FbvX0cCjRUkzK+oBFNUHxdSq+yDWI5hSNaC76MxWNXPIqvsu2TlAsIVfO7GoaTcCCVI5oJTXAuGZM4Vv0/MOdbRQa05lSIyq/fUrpS35jThA9pTFm2WhgE43EQCHl96wqNlK7ZTO0NKDohFmE9Cqpxct/GiwqwG0yXWGxDDGA4Rpw829xBimxRMa6EWzwoxJvRV6t5RvFaTTr5Ovj2121NJSXgGQICNAMBAF3XGwl5xFBIcImOgjnljP7EFWEFxXH2U3KtfI32GC1JLG35AS3oEulRuaq67k7gnzHjePOfkKpe4Cj7UR6j63vaBl8M+wuU1SxM03N+Xw9d98BWcA5M9+pUB/7JmO7VqH6fcLG3aNs6skPHscjuuk6d6rCB6v4BqK4pYChiSIf0Pmm9Gjz4J9UQ1NRwh1YrkkQyb8JzkhBOaJK2Titur/+2cXj942il2+Cm/iHpGsUkRVIfKhNtn1Z8cNL4DL3Dxuczz1K7upw4kzy1WI8ZvvkCM7kVmqZkKgAHzjqVhVXbbKMH7Djyx22jXkUc1ljOwSA09y2D0N76BAbhBu3AWOcpJ4DYc1oC8elY7LcE4q53ssK3WI/hnq83nKEZTwspcOaMLrMmI3QtO0iyWvOOrNZgV4I34ZThfC3AmeAlSjiZiccHRlZZ8G1d3IV9aMXdop4zoi50GyqFw0TdekY0mS2EXi4piwy93T/eGq1vo7HdmhjNpztz6NNkZLTG9wPzzdHQaGA+uzSa7SNCpZD3/T0LeeC472YCnf6QVw7AidEUx2a6VeYGwFiu4s0OD4vjKX0xnWsmEB1y92SG4kID+hoCVDzwXkeBfoNL1AR+0yUqlC96FZih1wCz0wBzIWyCWX3vKyUJN1Tqe7ZKYWWKfHvqLWDcb1QmuvB3rVrPlINSm0lEMrQ1hq3kgHT/FfccV1UBu5YGKv5L7NF+Qzzkqyh5WKiliZqiqdi5K2mFNZ8l/EbMlU125I2aNmr/11reQQlvIsxL/kyRH8m/f6fZcdVYhDMR6LPnfDIhy+fLx9UckrBrbqcODKfkFU2zAdKHKbTFaO+qk7knFJMoEYKZILqoO+GVtpCB6liSMMxMKDPMq+IezvBT6ibuXRmGq6urqjsqrh/VsjvmBd7HcopmnnQtllwE9vt0Pk8xr9DmDaI0MOOw5ysbwo3jFdH6fl4pYuPpyr7+8AiVTr2Cv6E0kmldEdUHj2aqMHhdM6s3JlM0Rf8nBeWJZWCfWPpecNKkwIPnlhQEDUagmbh3UuA59nE9dBtgPlBS4Hn2JbHXr/jCvZMCd9eqD5wUVFfcc+AbSYHbqyQ+IDhyUuC1yvVrgn+M9Udw/fXr2BHiqHXu2u/baboLG/zI0a79vHox/3ly/8WIn5/N6PvpwarURahtc6T1A7cSafunjbT9M4u0hZHbTue99Td0/ErQasD5QKG2p7OlItT2Pxhqwa5VHzjUVlfcc8Abodbv2cHZB/1jh9rDXhqde6htqrL2Zv3vhlrRLP+LNtdd+c/K8Ppf&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://www.draw.io/js/viewer.min.js"></script>

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
