# Data Mapping Example: Azure Cloud VM
## Getting Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-au&discount=mosp
[A cached version of the json input.](../data/azure/vm_base.json)

## Cleaning and Transformation
Apply transformation `jq '.offers | del( .transactions)'`
on [input](#Getting-Input)
to get [result](../jq/azure/vm_base_offers.json).

## SPARQL-Generat Executable
https://ci.mines-stetienne.fr/sparql-generate/language-cli.html
```
java -jar sparql-generate-jena.jar --output result/azure/vm_base.ttl --query-file azure/vm_base.rqg --log-level ERROR
```

## Mapping to ontology
Run [queries](../sparql-generate/azure/vm_base.rqg)
with [SPARQL-Generat Executable]()
to get [results (RDF turtle)](../sparql-generate/result/azure/vm_base.ttl)
