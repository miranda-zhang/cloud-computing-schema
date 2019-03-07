# Data Mapping Example: Azure Cloud VM

# Getting Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/virtual-machines-base/calculator/?culture=en-au&discount=mosp

Cached data:
1. [2018-03-02/vm_base.json](../data/azure/2018-03-02/vm_base.json)
2. [2019-03-07/vm_base.json](../data/azure/2019-03-07/vm_base.json)

# Storage transactions
Data Access incur Fees for Azure Virtual Machines on local disk.
For example, every single block access incurs a transaction.
The default block size is 4 Megabytes, meaning uploading a 32Mb file will incur 8 Storage Transactions.
Deleting the file will also incur 8 transactions, so will updating it, and any other time the file is touched.
The transactions are charged at a cost of around $0.00046 AUD per **10,000** transactions.
So 32Mb file will cost $0.000000368 AUD.

The only exception to Storage Transactions is when Premium Storage (persistent SSD storage) is used. That is, when you provision a P10, P20 or a P30 disk for your Virtual Machine those disks are exempt from Storage Transactions.

Further reading
https://www.rhipe.com/azure-storage-transactions/

## Data extraction
Apply transformation `jq '.offers.transactions'`
on [input](#getting-input).
Result:[2018-03-02](../jq/azure/2018-03-02/vm_base_storageTransactions.json)

jq: `.offers.transactions.prices`
[view on jqplay](https://jqplay.org/s/eOI_lLytRP)

Result:[2019-03-07](../jq/azure/2019-03-07/vm_base_storageTransactions.json)

## Mapping storage transactions price
Query:[v1.0.0 2018-03-02](../sparql-generate/azure/v1.0.0/vm_base_storageTransactions.rqg)
Result:[v1.0.0 2018-03-02](../sparql-generate/result/azure/v1.0.0/vm_base_storageTransactions.ttl)

```
java -jar sparql-generate-jena.jar --query-file azure/v1.0.1/2019-03-07/vm_base_storageTransactions.rqg --output result/azure/v1.0.1/2019-03-07/vm_base_storageTransactions.ttl --log-level ERROR
```
Query:[v1.0.1 2019-03-07](../sparql-generate/azure/v1.0.1/2019-03-07/vm_base_storageTransactions.rqg)
Result:[v1.0.1 2019-03-07](../sparql-generate/result/azure/v1.0.1/2019-03-07/vm_base_storageTransactions.ttl)

# VM Basic
## Data extraction
Apply transformation `jq '.offers | del( .transactions)'`
on [input](#getting-input).

Result:
1. [2018-03-02/vm_base_offers.json](../jq/azure/2018-03-02/vm_base_offers.json)
2. [2019-03-07/vm_base_offers.json](../jq/azure/2019-03-07/vm_base_offers.json),
   [view on jqplay](https://jqplay.org/s/NbdTDztQbb)

## Mapping to ontology
Query:[v1.0.0 2018-03-02 vm_base.rqg](../sparql-generate/azure/v1.0.0/vm_base.rqg)
Result:[v1.0.0 2018-03-02 vm_base.ttl](../sparql-generate/result/azure/v1.0.0/vm_base.ttl)

```
java -jar sparql-generate-jena.jar --query-file azure/2019-03-07/vm_base.rqg --output result/azure/2019-03-07/vm_base.ttl --log-level ERROR
```
Query:[v1.0.1/2019-03-07/vm_base.rqg](../sparql-generate/azure/v1.0.1/2019-03-07/vm_base.rqg)
Result:[v1.0.1/2019-03-07/vm_base.ttl](../sparql-generate/result/azure/v1.0.1/2019-03-07/vm_base.ttl)
