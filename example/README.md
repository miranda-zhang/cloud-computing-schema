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

List of examples:
1. [Google Cloud VM](gcloud_vm.md)
1. [Google Cloud Storage](gcloud_storage.md)

## Link Regions with GeoNames Ontology
How regions from each Cloud provider are linked to GeoNames
are exlained in:
1. [Google Cloud Region](gcloud_region.md) 
