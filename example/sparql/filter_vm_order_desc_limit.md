# SPARQL example
## v1.0.0
Data set: [gcloud_vm.ttl](../sparql-generate/result/gcloud/v1.0.0/vm.ttl)

Query
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>

SELECT ?VM ?cores
WHERE {
    ?VM a cocoon:VM ;
        cocoon:numberOfCores ?cores .
	FILTER( ?cores > 4) .
}
ORDER BY DESC(?cores) 
LIMIT 5
```

Result
```
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-ULTRAMEM-160-PREEMPTIBLE	"160"^^<http://www.w3.org/2001/XMLSchema#decimal>	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-ULTRAMEM-160	"160"^^<http://www.w3.org/2001/XMLSchema#decimal>	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-96-PREEMPTIBLE	"96"^^<http://www.w3.org/2001/XMLSchema#decimal>	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-96	"96"^^<http://www.w3.org/2001/XMLSchema#decimal>	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-96	"96"^^<http://www.w3.org/2001/XMLSchema#decimal>
```
## v1.0.1
```
PREFIX cocoon: <https://w3id.org/cocoon/v1.0.1#>

SELECT ?VM ?cores
WHERE {
    ?VM a cocoon:ComputeService ;
        cocoon:numberOfCores ?cores .
	FILTER( ?cores > 4) .
}
ORDER BY DESC(?cores) 
LIMIT 5
```
Result:[csv](filter_vm_order_desc_limit.csv)

Gephi
```
PREFIX cocoon: <https://w3id.org/cocoon/v1.0.1#>
PREFIX gr: <http://purl.org/goodrelations/v1#>
construct {
    ?vm cocoon:inRegion ?region .
} where {
    ?vm a cocoon:ComputeService;
        rdfs:label                ?label ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudServicePriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      ?price ;
                                    gr:hasUnitOfMeasurement  ?unit ;
                                    cocoon:inRegion          ?region
                                  ]  ;
        cocoon:hasProvider        ?provider .
}

```

```
PREFIX cocoon: <https://w3id.org/cocoon/v1.0.1#>
PREFIX gr: <http://purl.org/goodrelations/v1#>
PREFIX gephi: <http://gephi.org/>
construct {
    ?vm cocoon:inRegion ?region .
    ?vm gephi:type "ComputeService" .
    ?region gephi:type "Region" .
    
} where {
    ?vm a cocoon:ComputeService;
        rdfs:label                ?label ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudServicePriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      ?price ;
                                    gr:hasUnitOfMeasurement  ?unit ;
                                    cocoon:inRegion          ?region
                                  ] ;
        cocoon:hasProvider        ?provider .
}
```
Result:[vm_in_region.ttl](../stardog/vm_in_region.ttl)
