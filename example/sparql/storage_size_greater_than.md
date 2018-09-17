# SPARQL example
## Data set 
[managed-disks.ttl](../sparql-generate/result/azure/managed-disks.ttl)

## Query
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT ?storage ?size
WHERE {
    ?storage a cocoon:NetworkStorage ;
        cocoon:hasStorageSize [
            a cocoon:QuantityOfThings;
                cocoon:numericValue ?size;
        ];
	FILTER( ?size > 30) .
}
ORDER BY ASC(?size) 
LIMIT 5
```

## Result
```
https://w3id.org/cocoon/data/storage/azure/standardhdd-s4	"32"^^<http://www.w3.org/2001/XMLSchema#int>	
https://w3id.org/cocoon/data/storage/azure/premiumssd-p4	"32"^^<http://www.w3.org/2001/XMLSchema#int>	
https://w3id.org/cocoon/data/storage/azure/premiumssd-p6	"64"^^<http://www.w3.org/2001/XMLSchema#int>	
https://w3id.org/cocoon/data/storage/azure/standardhdd-s6	"64"^^<http://www.w3.org/2001/XMLSchema#int>	
https://w3id.org/cocoon/data/storage/azure/standardhdd-s10	"128"^^<http://www.w3.org/2001/XMLSchema#int>
```
