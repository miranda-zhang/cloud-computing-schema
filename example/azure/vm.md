# Data Mapping Example: Azure Cloud VM
## Getting Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-au&discount=mosp
[A cached version of the json input.](../data/azure/vm_base.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet 
```

```
[A cached version of the result after transformation.]()

## Mapping to ontology
Run [queries](../sparql-generate/gcloud_vm.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud_vm.ttl)
