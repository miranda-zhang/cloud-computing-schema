# Data Mapping Example: Azure Cloud VM
# SPARQL-Generate Executable
https://ci.mines-stetienne.fr/sparql-generate/language-cli.html

# Getting Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-au&discount=mosp
[A cached version of the json input.](../data/azure/vm_base.json)

# VM Basic
## Data extraction
Apply transformation `jq '.offers | del( .transactions)'`
on [input](#Getting-Input)
to get [result](../jq/azure/vm_base_offers.json).

## Mapping to ontology
Run [queries](../sparql-generate/azure/vm_base.rqg)
with [SPARQL-Generate Executable](#SPARQL-Generate-Executable)
```
java -jar sparql-generate-jena.jar --output result/azure/vm_base.ttl --query-file azure/vm_base.rqg --log-level ERROR
```
to get [results (RDF turtle)](../sparql-generate/result/azure/vm_base.ttl)

# Storage transactions
Data Access incur Fees for Azure Virtual Machines on local disk.
For example, every single block access incurs a transaction.
The default block size is 4 Megabytes, meaning uploading a 32Mb file will incur 8 Storage Transactions.
Deleting the file will also incur 8 transactions, so will updating it, and any other time the file is touched.
The transactions are charged at a cost of around $0.00036 USD per **10,000** transactions.
So 32Mb file will cost $0.000000368 AUD.

The only exception to Storage Transactions is when Premium Storage (persistent SSD storage) is used. That is, when you provision a P10, P20 or a P30 disk for your Virtual Machine those disks are exempt from Storage Transactions.

Further reading
https://www.rhipe.com/azure-storage-transactions/

## Data extraction
Apply transformation `jq '.offers.transactions'`
on [input](#Getting-Input)
to get [result](../jq/azure/vm_base_storageTransactions.json).

## Mapping to ontology
Run [queries](../sparql-generate/azure/vm_base_storageTransactions.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/azure/vm_base_storageTransactions.ttl)
