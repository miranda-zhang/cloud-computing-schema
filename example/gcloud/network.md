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
A cached version of the result after transformation.
[A cached version of the result after transformation.](../jq/gcloud/internet.json)


Apply transformation using `jq`, view the live snippet https://jqplay.org/s/tt302_aTzV
```
.gcp_price_list | . |=with_entries
( 
    select(
        .key |
        contains("NETWORK") or
        contains("RULE")   
    )
)
```
A cached version of the result after transformation.
```
{
  "FORWARDING_RULE_CHARGE_BASE": {
    "us": 0.025,
    "us-central1": 0.025,
    "us-east1": 0.025,
    "us-east4": 0.028,
    "us-west1": 0.025,
    "us-west2": 0.028,
    "europe": 0.025,
    "europe-west1": 0.025,
    "europe-west2": 0.03,
    "europe-west3": 0.03,
    "europe-west4": 0.028,
    "europe-north1": 0.028,
    "northamerica-northeast1": 0.028,
    "asia-east": 0.025,
    "asia-east1": 0.025,
    "asia-east2": 0.035,
    "asia-northeast": 0.038,
    "asia-southeast": 0.028,
    "australia-southeast1": 0.034,
    "australia": 0.034,
    "southamerica-east1": 0.038,
    "asia-south1": 0.03,
    "fixed": true
  },
  "FORWARDING_RULE_CHARGE_EXTRA": {
    "us": 0.01,
    "us-central1": 0.01,
    "us-east1": 0.01,
    "us-east4": 0.011,
    "us-west1": 0.01,
    "us-west2": 0.012,
    "europe": 0.01,
    "europe-west1": 0.01,
    "europe-west2": 0.012,
    "europe-west3": 0.012,
    "europe-west4": 0.011,
    "europe-north1": 0.011,
    "northamerica-northeast1": 0.011,
    "asia-east": 0.01,
    "asia-east1": 0.01,
    "asia-east2": 0.014,
    "asia-northeast": 0.011,
    "asia-southeast": 0.011,
    "australia-southeast1": 0.014,
    "australia": 0.014,
    "southamerica-east1": 0.015,
    "asia-south1": 0.012
  },
  "NETWORK_LOAD_BALANCED_INGRESS": {
    "us": 0.008,
    "us-central1": 0.008,
    "us-east1": 0.008,
    "us-east4": 0.009,
    "us-west1": 0.008,
    "us-west2": 0.01,
    "europe": 0.008,
    "europe-west1": 0.008,
    "europe-west2": 0.01,
    "europe-west3": 0.01,
    "europe-west4": 0.009,
    "europe-north1": 0.009,
    "northamerica-northeast1": 0.009,
    "asia-east": 0.008,
    "asia-east1": 0.008,
    "asia-east2": 0.009,
    "asia-northeast": 0.012,
    "asia-southeast": 0.009,
    "australia-southeast1": 0.011,
    "australia": 0.011,
    "southamerica-east1": 0.012,
    "asia-south1": 0.01
  },
  "CP-COMPOSER-NETWORK-EGRESS": {
    "us-central1": 0.156,
    "europe-west1": 0.156,
    "us-east1": 0.156,
    "asia-northeast1": 0.156
  }
}
```
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
If you reserve a static external IP address but do not use it, you will be charged for the IP address according to the table below. If you reserve a static external IP address and use it with a Compute Engine resource, such as VM instance or a forwarding rule, the address is considered in use and you will not be charged for it.

## Mapping to ontology
Run [queries](../sparql-generate/gcloud/storage.rqg)
in [SPARQL-Generat Playground](https://ci.mines-stetienne.fr/sparql-generate/playground.html)
to get [results (RDF turtle)](../sparql-generate/result/gcloud/storage.ttl)
