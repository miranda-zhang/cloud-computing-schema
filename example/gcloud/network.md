# Data Mapping Example: Google Cloud Internet
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](../data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/dtvjDF6QKj
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key | contains("INTERNET")  
    )
)
```
[A cached version of the result after transformation.](../jq/gcloud/internet.json)

Manually add in the destination and special rate info.
Removed duplicated entry of "CP-COMPUTEENGINE-INTERNET-EGRESS-APAC-APAC",
it is the same as "CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA".
[Result after manual change.](../jq/gcloud/internet_destination.json)

Apply transformation `.gcp_price_list.NETWORK_LOAD_BALANCED_INGRESS` using `jq`,
view the live snippet https://jqplay.org/s/yP8J1oVhfs

[A cached version of the result after transformation.](../jq/gcloud/load_balancing_data.json)
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key | contains("RULE")   
    )
)
```
[A cached version of the result after transformation.](../jq/gcloud/load_balancing_rule.json)
## Internet
https://cloud.google.com/compute/pricing#internet_egress

It is generally no charge to ingress traffic, unless there is a load balancer used. 
Internet egress rates are based on usage and destination.

There are 3 (monthly) usage tiers, 0-1 TB, 1-10 TB, 10+ TB;
and 3 destination groups, Worldwide Destinations (excluding China & Australia,
but including Hong Kong), China Destinations(excluding Hong Kong),
Australia Destinations.

Egress between zones in the same region (per GB)	$0.01.
Egress between regions within the US (per GB)	$0.01.

[New pricing maybe applied after 2019](https://cloud.google.com/network-tiers/pricing)

## Load balancing
Ingress data processed by load balancer	are charged	(Per GB) based on region.
Compute Engine charges for forwarding rules that are created for load balancing or other uses of forwarding rules.

The following examples use US pricing:

Up to 5 forwarding rules you create are charged at $0.025/hour. For example, if you create one forwarding rule, you will be charged $0.025/hour. If you have 3 forwarding rules, you will still be charged $0.025/hour. However, if you have 10 rules, you will be charged:

5 forwarding rules = $0.025/hour
Each additional forwarding rule = $0.01/hour
$0.025/hour for 5 rules + (5 additional rules * $0.01/hour) = $0.075/hour

## Static external IP
https://cloud.google.com/compute/pricing#ipaddress
If you reserve a static external IP address but do not use it, you will be charged $0.010/Hour. 

If you reserve a static external IP address and use it with a Compute Engine resource, such as VM instance or a forwarding rule, the address is considered in use and you will not be charged for it.

## Mapping to ontology
Internet:
Run [queries](../sparql-generate/gcloud/internet.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/internet.ttl)

Load Balancing Data:
Run [queries](../sparql-generate/gcloud/load_balancing_data.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/load_balancing_data.ttl)

Load Balancing Forwarding Rule:
Run [queries](../sparql-generate/gcloud/load_balancing_rule.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/load_balancing_data.ttl)