# Data Mapping Example: Azure Cloud Managed Disks
# Doc
https://azure.microsoft.com/en-au/pricing/details/managed-disks/

# Input
Data: original json for Azure Cloud
https://azure.microsoft.com/api/v2/pricing/managed-disks/calculator/?culture=en-au&discount=mosp

Recorded on:
1. [2018-03-02](../data/azure/2018-03-02/managed-disks.json)
2. [2019-03-07](../data/azure/2019-03-07/managed-disks.json)

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
Result:
1. 2018-03-02: [file](../jq/azure/2018-03-02/managed-disk-transactions.json)
2. 2019-03-07: [file](../jq/azure/2019-03-07/managed-disk-transactions.json), https://jqplay.org/s/mr2judqaqw

## Mapping storage transactions prices
Query:[v1.0.0 2018-03-02](../sparql-generate/azure/v1.0.0/managed-disk-transactions.rqg)
Result:[v1.0.0 2018-03-02](../sparql-generate/result/azure/v1.0.0/managed-disk-transactions.ttl)

Query:[v1.0.1 2019-03-07](../sparql-generate/azure/v1.0.1/2019-03-07/managed-disk-transactions.rqg)
Result:[v1.0.1 2019-03-07](../sparql-generate/result/azure/v1.0.1/2019-03-07/managed-disk-transactions.ttl)
```
java -jar sparql-generate-jena.jar --query-file azure/v1.0.1/2019-03-07/managed-disk-transactions.rqg --output result/azure/v1.0.1/2019-03-07/managed-disk-transactions.ttl --log-level ERROR
```

# Disk Snapshots
From the [doc](#doc)
>You can store Managed Disk snapshots and images for **Premium SSD Managed Disks** on Standard storage. You can choose between locally redundant (LRS) and Zone redundant (ZRS) options. These snapshots and images are charged at **$0.05/GB** per month for both Standard LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 64 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB. If you choose to store them on **Premium SSD** Managed Disk storage, you’ll be charged at $0.132/GB per month.
>You can store snapshots and images for **Standard SSD Managed Disks** on **Standard HDD** storage. You can choose between **locally redundant (LRS)** and **Zone redundant (ZRS)** options. These snapshots and images are charged at **$0.05/GB** per month for both Standard LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 128 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB. If you choose to store them on **SSD** storage, you’ll be charged at $0.0858/GB per month.
>Managed snapshots and images are charged at **$0.05/GB** per month for both LRS and ZRS options based on the used portion of the disk. For example, if you create a snapshot of a managed disk with provisioned capacity of 64 GB and actual used data size of 10 GB, the snapshot will only be billed for the used data size of 10 GB.

Interpreting the document:
1. `premiumssd*` disks can have
   `standardssd-snapshot` `standardhdd-snapshot-lrs` `standardhdd-snapshot-zrs` `premiumssd-snapshot`
2. `standardssd*` disks can have
   `standardhdd-snapshot-lrs` `standardhdd-snapshot-zrs` `standardssd-snapshot`

# Managed Disk
## Ultra SSD Managed Disks 
From the [doc](#doc) (8th Mar 2019)
>Ultra SSD Managed Disks are our next-generation high-performance Solid State Drive (SSD) with configurable performance attributes that provide the lowest latency and consistent high IOPS/throughput. Ultra SSD Managed Disks offer unprecedented and extremely scalable performance with sub-millisecond latency. As a customer, you can start small on IOPS and throughput and adjust your performance as your workload becomes more IO intensive.
>The total cost of Ultra SSD Managed Disks depends on the size of the disks and their performance configuration and will be affected by the number of disks.
>Ultra SSD Managed Disks come in different sizes that provide a configurable range of input/output operations per sec (IOPS), and a configurable range of throughput (MB/s), and are billed on an hourly rate. You choose the option that best meets your required storage size, IOPS and throughput. All VMs that support Premium SSD can leverage Ultra SSD Managed Disks.
>Below are the preview prices: Ultra SSD storage is in preview in East US 2 and is billed hourly at:
* $0.000113 per GiB/hour
* $0.000047 per provisioned IOPS/hour
* $0.000941 per provisioned MB/s/hour
* $0.004119 per vcpu/hour provisioned reservation charge 
>Ultra SSD Managed Disks are billed on the provisioned sizes, provisioned IOPS and provisioned throughput. Azure maps the provisioned size (rounded up) to the nearest disk size offer. Each disk is billed accordingly on an hourly basis. For example, if you provisioned a 200 GiB Ultra SSD Disk, with 20,000 IOPS and 1,000 MB/second and deleted it after 20 hours, it will map to the disk size offer of 256 GiB and you’ll be billed for the 256 GiB, 20,000 IOPS and 1,000 MB/second for 20 hours. This is regardless of the amount of actual data and number of IOs written to the disk.
>Ultra SSD Managed disks are only available for Locally Redundant Storage (LRS). 

```jq
|.|=with_entries(
    select ( .key |contains("ultrassd"))
)
```
## Transform input
Apply transformation `jq '.offers | del ( ."transactions-hdd", ."transactions-ssd")'`
on [input](#input).

Result:
1. 2018-03-02: [file](../jq/azure/2018-03-02/managed-disks.json)
2. 2019-03-07: [file](../jq/azure/2019-03-07/managed-disks.json), https://jqplay.org/s/bMReXuJv-h

## Mapping to ontology
v1.0.0 2018-03-02:
[Query](../sparql-generate/azure/v1.0.0/managed-disks.rqg)
[Result](../sparql-generate/result/azure/v1.0.0/managed-disks.ttl)
```
java -jar sparql-generate-jena.jar --output result/azure/v1.0.0/managed-disks.ttl --query-file azure/v1.0.0/managed-disks.rqg --log-level ERROR
```

v1.0.1 2019-03-07:
[Query](../sparql-generate/azure/v1.0.1/2019-03-07/managed-disks.rqg)
[Result](../sparql-generate/result/azure/v1.0.1/2019-03-07/managed-disks.ttl)
```
java -jar sparql-generate-jena.jar --query-file azure/v1.0.1/2019-03-07/managed-disks.rqg --output result/azure/v1.0.1/2019-03-07/managed-disks.ttl --log-level ERROR
```
