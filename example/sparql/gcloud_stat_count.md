# SPARQL example
## Data set 
[gcloud.ttl](../sparql-generate/result/gcloud/gcloud.ttl)

## Query
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT (COUNT(?VM) AS ?count_VM)
WHERE {
    ?VM a cocoon:VM .
}
```

```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT (COUNT(?storage) AS ?count_storage)
WHERE {
    ?storage a cocoon:Storage .
}
```

```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT (COUNT(*) AS ?count)
WHERE {
    ?x a cocoon:Region .
}
```

```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT (COUNT(*) AS ?count)
WHERE {
    ?x a cocoon:SystemImage .
}
```

```
PREFIX gr:    <http://purl.org/goodrelations/v1#>
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT (COUNT(*) AS ?count)
WHERE {
    ?x a gr:UnitPriceSpecification .
}
```

### Nested query
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
select * { 
    {
        select (count(?storage) AS ?count_storage)
        { ?storage a cocoon:Storage . }
    } 
    {
        select (count(?VM) AS ?count_VM) 
        { ?VM a cocoon:VM . } 
    } 
}
```

### VALUES
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
select ?cls (count(?s) AS ?count)
{VALUES ?cls {cocoon:Storage cocoon:VM} ?s a ?cls}
group by ?cls
```

## Result

| Class                    | Count         |
| -------------------------|:-------------:| 
| VM                       | 57            | 
| Storage                  | 8             |
| Region                   | 30            |
| SystemImage              | 9             |
| gr:UnitPriceSpecification| 1340          |
