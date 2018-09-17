# Data Mapping Example: Azure Cloud Managed Disks
# Doc
https://azure.microsoft.com/en-au/pricing/details/managed-disks/

# Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/managed-disks/calculator/?culture=en-au&discount=mosp

[A cached version of the json input.](../data/azure/managed-disks.json)

# Managed Disk
## Transform input
Apply transformation `jq '.offers | del ( ."transactions-hdd", ."transactions-ssd")'`
on [input](#input)
to get [result](../jq/azure/managed-disks.json).

## Mapping to ontology
Run [queries](../sparql-generate/azure/managed-disks.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/azure/managed-disks.ttl)

# Data transactions cost
From the [doc](#doc)
>There are no transaction costs for Premium Disks.
>We charge $0.001 (preview price) per 10,000 transactions for Standard SSD Managed Disks. Any type of operation against the storage is counted as a transaction, including reads, writes and deletes.
>We charge $0.0005 per 10,000 transactions for Standard HDD Managed Disks. Any type of operation against the storage is counted as a transaction, including reads, writes and deletes.

## Transform input
Apply the following transformations on [input](#input)
```
.offers | . |=with_entries(
    select ( .key |contains("transactions"))
)
```
Result: [managed-disk-transactions.json](../jq/azure/managed-disk-transactions.json)

```
.offers | . |=with_entries(
    select ( .key |
        (
            contains("hdd") and
            (contains("snapshot") | not) and
            (contains("transactions") | not)
        )
    )
) | [to_entries[] | .key]
```
Result: [managed-disk-hdd.json](../jq/azure/managed-disk-hdd.json)

```
.offers | . |=with_entries(
    select ( .key |
        (
            contains("ssd") and
            (contains("snapshot") | not) and
            (contains("transactions") | not)
        )
    )
) | [to_entries[] | .key]
```
Result: [managed-disk-ssd.json](../jq/azure/managed-disk-ssd.json)

## Mapping to ontology
In [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
run the following queries: 
1. [map storage transactions price spec(json) to](../sparql-generate/azure/managed-disk-transactions.rqg)
   [RDF](../sparql-generate/result/azure/managed-disk-transactions.ttl)
2. [map hdd storage to its transaction price](../sparql-generate/azure/managed-disk-hdd.rqg)
   : [View result RDF (turtle)](../sparql-generate/result/azure/managed-disks.ttl)
3. [map ssd storage to its transaction price](../sparql-generate/azure/managed-disk-hdd.rqg)
   : [View result RDF (turtle)](../sparql-generate/result/azure/managed-disks.ttl)

SOURCE <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/example/jq/azure/managed-disks-hdd.json> AS ?managed-disks-hdd

# Disk Snapshots
From the [doc](#doc)
>You can store Managed Disk snapshots and images for **Premium SSD Managed Disks** on Standard storage. You can choose between locally redundant (LRS) and Zone redundant (ZRS) options. These snapshots and images are charged at $0.05/GB per month for both Standard LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 64 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB. If you choose to store them on Premium SSD Managed Disk storage, you’ll be charged at $0.132/GB per month.
>You can store snapshots and images for **Standard SSD Managed Disks** on Standard HDD storage. You can choose between locally redundant (LRS) and Zone redundant (ZRS) options. These snapshots and images are charged at $0.05/GB per month for both Standard LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 128 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB. If you choose to store them on SSD storage, you’ll be charged at $0.0858/GB per month.
>Managed snapshots and images are charged at $0.05/GB per month for both LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 64 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB.