# Examples
# Request ontology from url
[GET rdf/ttl via Ajax](ajax.html)

# JSON-LD Macros example
https://miranda-zhang.github.io/cloud-computing-schema/json-ld-macros/gcloud.html

Created with https://github.com/ariutta/json-ld-macros

# Mapping data to ontology
![Workflow](cococon_usage_workflow.png "Workflow Overview")

## List of Cloud Service Examples:
1. [Google Cloud Compute Service](gcloud/compute.md)
2. [Microsoft Azure Compute Service](azure/compute.md)
3. [Google Cloud Storage](gcloud/storage.md)
4. [Google Cloud OS images](gcloud/os.md)
5. [Microsoft Azure Storage](azure/storage.md)
6. [Google Cloud Network Service](gcloud/network.md)

## Link Regions with GeoNames Ontology
How regions from each Cloud provider are linked to GeoNames
are exlained in:
1. [Google Cloud Region](gcloud/region.md)
2. [Microsoft Azure Cloud Region](azure/region.md) 

## Units of Measure
We have considered the following options, but non can support all units we need.
So we used vocabularies from QUDT in our schema, and used available CDT units in our datasets.

1. [QUDT Unit ontology](unit/QUDT.md): CoCoOn [defined additional units](unit/README.md) are compatible with QUDT 1.1.
2. [cdt:ucum](unit/cdt.md) has powerful features, it could be a future work to implement our Custom Datatypes with this framework.
3. Schema.org used [UN/CEFACT Common Codes](http://wiki.goodrelations-vocabulary.org/Documentation/UN/CEFACT_Common_Codes) for Units of Measurement. Appart from not having the units we need, there is no support for unit conversion like CDT.

## Network QoS
Used http://cloudharmony.com to collect data, details explained in [cloudharmony](cloudharmony/README.md).

# SPARQL
Tested with Protégé.
Default Example:
```
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
SELECT ?subject ?object
WHERE { ?subject rdfs:subClassOf ?object }
```

Examples with the following keywords:
1. [SELECT FILTER ORDER BY LIMIT](sparql/filter_vm_order_desc_limit.md)
2. [DISTINCT](sparql/vm_less_or_equal_4cores.md)
3. [ORDER BY ASC](sparql/storage_size_greater_than.md)
4. [COUNT Nested query VALUES](sparql/gcloud_stat_count.md)

Additional external examples
https://www.w3.org/2009/Talks/0615-qbe/

## SPARQL Documentation
https://www.w3.org/TR/sparql11-query/
