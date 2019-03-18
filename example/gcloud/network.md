# Data Mapping Example: Google Cloud Internet
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

Recorded:
1. [v1.41 24-July-2018](../data/gcloud/v1.41.json)
2. [v1.58 17-January-2019](../data/gcloud/v1.58.json)
3. [v1.62 12-February-2019](../data/gcloud/v1.62.json)

## Internet
https://cloud.google.com/compute/pricing#internet_egress

>It is generally no charge to ingress traffic, unless there is a load balancer used. 
Internet egress rates are based on usage and destination.

>There are 3 (monthly) usage tiers, 0-1 TB, 1-10 TB, 10+ TB;
and 3 destination groups, Worldwide Destinations (excluding China & Australia,
but including Hong Kong), China Destinations(excluding Hong Kong),
Australia Destinations.

>Egress between zones in the same region (per GB)	$0.01.
>Egress between regions within the US (per GB)	$0.01.

[New pricing maybe applied after 2019](https://cloud.google.com/network-tiers/pricing)

### Egress traffic
Apply transformation using `jq`
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key | contains("INTERNET")  
    )
)
```
Result
1. 17-January-2019: [file](../jq/gcloud/v1.58/internet.json), https://jqplay.org/s/dtvjDF6QKj
2. 12-February-2019: [file](../jq/gcloud/v1.62/internet.json), https://jqplay.org/s/Gvh3qis9pj

### Internet Destinationas
For the v1.58 data (17-January-2019) we manually added in the destination and special rate info.
[Result after manual change.](../jq/gcloud/v1.58/internet_destination.json)

But for v1.62 data (12-February-2019), we standardised this process more.
We change the original file to only contain the destination info, so price can be dynamically extracted from another file:
[internet_destination.json](../jq/gcloud/v1.62/internet_destination.json)

## Load balancing
Ingress data processed by load balancer	are charged	(Per GB) based on region.
Compute Engine charges for forwarding rules that are created for load balancing or other uses of forwarding rules.

The following examples use US pricing:

Up to 5 forwarding rules you create are charged at $0.025/hour. For example, if you create one forwarding rule, you will be charged $0.025/hour. If you have 3 forwarding rules, you will still be charged $0.025/hour. However, if you have 10 rules, you will be charged:

5 forwarding rules = $0.025/hour
Each additional forwarding rule = $0.01/hour
$0.025/hour for 5 rules + (5 additional rules * $0.01/hour) = $0.075/hour

### Load balancing ingress data
Apply transformation `.gcp_price_list.NETWORK_LOAD_BALANCED_INGRESS` using `jq` on data.

Result：
1. 24-July-2018: [file](../jq/gcloud/v1.41/load_balancing_data.json), https://jqplay.org/s/yP8J1oVhfs
2. 12-February-2019: [file](../jq/gcloud/v1.62/load_balancing_data.json), https://jqplay.org/s/_hy6zyaSBd

### Load balancing rule
Apply `jq` transformation on data:
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key | contains("RULE")   
    )
)
```
Result：
1. 24-July-2018: [file](../jq/gcloud/v1.41/load_balancing_rule.json), https://jqplay.org/s/1Ugkd8zB3B
2. 12-February-2019: [file](../jq/gcloud/v1.62/load_balancing_rule.json), https://jqplay.org/s/95EyhhroA9

## Static external IP
https://cloud.google.com/compute/pricing#ipaddress
If you reserve a static external IP address but do not use it, you will be charged $0.010/Hour. 

If you reserve a static external IP address and use it with a Compute Engine resource, such as VM instance or a forwarding rule, the address is considered in use and you will not be charged for it.

## Mapping to ontology
### Internet
v1.0.0 17-January-2019:
[Query](../sparql-generate/gcloud/v1.0.0/internet.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.0/internet.ttl)

v1.0.1 12-February-2019:
[Query](../sparql-generate/gcloud/v1.0.1/2019-02-12/internet.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/internet.ttl)
```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/2019-02-12/internet.rqg --output result/gcloud/v1.0.1/2019-02-12/internet.ttl  --log-level ERROR 
```
### Load Balancing Data
v1.0.0 17-January-2019:
[Query](../sparql-generate/gcloud/v1.0.0/load_balancing_data.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.0/load_balancing_data.ttl)

v1.0.1 12-February-2019:
[Query](../sparql-generate/gcloud/v1.0.1/2019-02-12/load_balancing_data.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/load_balancing_data.ttl)
```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/2019-02-12/load_balancing_data.rqg --output result/gcloud/v1.0.1/2019-02-12/load_balancing_data.ttl  --log-level ERROR 
```

### Load Balancing Forwarding Rule
v1.0.0 17-January-2019:
[Query](../sparql-generate/gcloud/v1.0.0/load_balancing_rule.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.0/load_balancing_rule.ttl)

v1.0.1 12-February-2019:
[Query](../sparql-generate/gcloud/v1.0.1/2019-02-12/load_balancing_rule.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/load_balancing_rule.ttl)
```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/2019-02-12/load_balancing_rule.rqg --output result/gcloud/v1.0.1/2019-02-12/load_balancing_rule.ttl  --log-level ERROR 
```
