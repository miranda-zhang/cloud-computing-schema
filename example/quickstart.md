# CoCoOn v1.0.1
This page contains some simple modelling examples for classes in the CoCoOn v1.0.1 ontology.
There are other usecase scenarios listed in [examples page](README.md).

# Table of contents
- [CoCoOn v1.0.1](#cocoon-v101)
- [Table of contents](#table-of-contents)
  - [Prifix](#prifix)
  - [Compute Service](#compute-service)
  - [Storage Service](#storage-service)
  - [Internet Service](#internet-service)
    - [Load Balancing Data](#load-balancing-data)
    - [Forwarding Rule](#forwarding-rule)
  - [Cloud Service Price Specification](#cloud-service-price-specification)
    - [Cloud OS Price Specification](#cloud-os-price-specification)
    - [Cloud Storage Transactions Price Specification](#cloud-storage-transactions-price-specification)
    - [Cloud Network Price Specification](#cloud-network-price-specification)
  - [Quanlity Of Service](#quanlity-of-service)
    - [Downlink Speed](#downlink-speed)
    - [Latency](#latency)
  - [Measurement](#measurement)
  - [Device](#device)
  - [Location and Region](#location-and-region)

## Prifix
```
@prefix schema: <https://schema.org/> .
@prefix unit:  <http://qudt.org/vocab/unit#> .
@prefix xsd:   <http://www.w3.org/2001/XMLSchema#> .
@prefix rdfs:  <http://www.w3.org/2000/01/rdf-schema#> .
@prefix gr:    <http://purl.org/goodrelations/v1#> .
@prefix cocoon: <https://w3id.org/cocoon/v1.0.1#> .
@prefix unit:  <http://qudt.org/1.1/vocab/unit#> .
@prefix ssn:   <http://www.w3.org/ns/ssn/> .
@prefix sosa:  <http://www.w3.org/ns/sosa/> .
```
## Compute Service
[cocoon:ComputeService](https://w3id.org/cocoon/v1.0.1#ComputeService)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<2019-02-12/ComputeService/Gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-96-PREEMPTIBLE>
        a                         cocoon:ComputeService ;
        rdfs:label                "CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-96-PREEMPTIBLE" ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudServicePriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      "0.72"^^xsd:float ;
                                    gr:hasUnitOfMeasurement  unit:Hour ;
                                    cocoon:inRegion         <Region/Gcloud/us-east1>
                                  ] ;
        cocoon:hasMemory          [ a                        schema:TypeAndQuantityNode ;
                                    schema:amountOfThisGood  86.4 ;
                                    schema:unitCode          cocoon:GB
                                  ] ;
        cocoon:hasProvider        cocoon:Gcloud ;
        cocoon:numberOfCores      "96"^^xsd:decimal ;
        schema:dateModified       "2019-02-12"^^xsd:date .
```

## Storage Service
[cocoon:StorageService](https://w3id.org/cocoon/v1.0.1#StorageService)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<2019-03-07/NetworkStorage/Azure/premiumssd-p30>
        a                               cocoon:NetworkStorage ;
        rdfs:label                      "premiumssd-p30" ;
        gr:hasPriceSpecification        <CloudStorageTransactionsPriceSpecification/Azure/managed_disk/transactions-ssd> ;
        gr:hasPriceSpecification        [ a                        gr:CloudServicePriceSpecification ;
                                          gr:hasCurrency           "USD" ;
                                          gr:hasCurrencyValue      "135.17e0"^^xsd:float ;
                                          gr:hasUnitOfMeasurement  cocoon:GBPerMonth ;
                                          cocoon:inRegion         <Region/Azure/australia-east>
                                        ] ;
        cocoon:canHaveSnapshot          <NetworkStorage/Azure/standardssd-snapshot> , <NetworkStorage/Azure/standardhdd-snapshot-zrs> , <NetworkStorage/Azure/premiumssd-snapshot> , </NetworkStorage/Azure/standardhdd-snapshot-lrs> ;
        cocoon:hasProvider              cocoon:Azure ;
        cocoon:hasStorageIOMax          [ a                        schema:TypeAndQuantityNode ;
                                      schema:amountOfThisGood  "5000"^^xsd:nonNegativeInteger ;
                                      schema:unitCode          cocoon:IOPs
                                        ] ;
        cocoon:hasStorageSize           [ a                        schema:TypeAndQuantityNode ;
                                      schema:amountOfThisGood  "1024"^^xsd:nonNegativeInteger ;
                                      schema:unitCode          cocoon:GB
                                        ] ;
        cocoon:hasStorageThroughputMax  [ a                        schema:TypeAndQuantityNode ;
                                      schema:amountOfThisGood  "200"^^xsd:nonNegativeInteger ;
                                      schema:unitCode          unit:MegabitsPerSecond
                                        ].
```
## Internet Service
[cocoon:InternetService](https://w3id.org/cocoon/v1.0.1#InternetService)

Google Cloud Network Price Worldwide Egress:
```
@base <https://w3id.org/cocoon/data/v1.0.1/2019-02-12/> .
<InternetService/Gcloud/CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA>
        a                           cocoon:InternetService ;
        rdfs:label                  "CP-COMPUTEENGINE-INTERNET-EGRESS-NA-NA" ;
        gr:hasPriceSpecification    [ a                         cocoon:CloudNetworkPriceSpecification ;
                                      gr:hasCurrency            "USD" ;
                                      gr:hasCurrencyValue       "0.11"^^xsd:float ;
                                      gr:hasUnitOfMeasurement   cocoon:GBPerMonth ;
                                      cocoon:forUsageLessEqual  cocoon:10TB ;
                                      cocoon:forUsageMoreThan   cocoon:1TB
                                    ] ;
        gr:hasPriceSpecification    [ a                         cocoon:CloudNetworkPriceSpecification ;
                                      gr:hasCurrency            "USD" ;
                                      gr:hasCurrencyValue       "0.08"^^xsd:float ;
                                      gr:hasUnitOfMeasurement   cocoon:GBPerMonth ;
                                      cocoon:forUsageLessEqual  cocoon:90TB ;
                                      cocoon:forUsageMoreThan   cocoon:10TB
                                    ] ;
        gr:hasPriceSpecification    [ a                         cocoon:CloudNetworkPriceSpecification ;
                                      gr:hasCurrency            "USD" ;
                                      gr:hasCurrencyValue       "0.12"^^xsd:float ;
                                      gr:hasUnitOfMeasurement   cocoon:GBPerMonth ;
                                      cocoon:forUsageLessEqual  cocoon:1TB ;
                                      cocoon:forUsageMoreThan   [ a                        schema:TypeAndQuantityNode ;
                                                                  schema:amountOfThisGood  "0"^^xsd:nonNegativeInteger ;
                                                                  schema:unitCode          cocoon:GB
                                                                ]
                                    ] ;
        cocoon:excludesDestination  <Location/China> , <Location/Australia> ;
        cocoon:hasDestination       <Location/Worldwide> , <Hong%20Kong> ;
        cocoon:hasDirection         cocoon:Egress ;
        cocoon:hasProvider          cocoon:Gcloud ;
        schema:dateModified         "2019-02-12"^^xsd:date .
```
### Load Balancing Data
[cocoon:LoadBalancingData](https://w3id.org/cocoon/v1.0.1#LoadBalancingData)

Load Balancing Data Price Specification:
```
@base <https://w3id.org/cocoon/data/v1.0.1/2019-02-12/> .
<LoadBalancingData/Gcloud>
        a                         cocoon:LoadBalancingData ;
        gr:hasPriceSpecification  [ a                        gr:CloudServicePriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      "0.008e0"^^xsd:float ;
                                    gr:hasUnitOfMeasurement  cocoon:GB ;
                                    cocoon:inRegion         <Region/Gcloud/us>
                                  ] ;
        cocoon:hasDirection       cocoon:Ingress ;
        cocoon:hasProvider        cocoon:Gcloud ;
        schema:dateModified       "2019-02-12"^^xsd:date .
```
### Forwarding Rule
[cocoon:ForwardingRule](https://w3id.org/cocoon/v1.0.1#ForwardingRule)

Load Balancing Forwarding Rules Price:
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<2019-02-12/ForwardingRule/Gcloud/base>
        a                         cocoon:ForwardingRule ;
        rdfs:comment              "Google Lord Balancing Forwarding Rule Base Rate. Flat rate price, regardless 1 rule or 5 rules used, charged the same per hour." ;
        rdfs:label                "FORWARDING_RULE_CHARGE_BASE" ;
        gr:hasPriceSpecification  [ a                         cocoon:CloudNetworkPriceSpecification ;
                                    gr:hasCurrency            "USD" ;
                                    gr:hasUnitOfMeasurement   unit:Hour ;
                                    cocoon:forUsageLessEqual  <TypeAndQuantityNode/5> ;
                                    cocoon:forUsageMoreThan   [ 
                                        a                        schema:TypeAndQuantityNode ;
                                        schema:amountOfThisGood  "0"^^xsd:nonNegativeInteger
                                                              ] ;
                                    cocoon:hasCurrencyValue   "0.038e0"^^xsd:float ;
                                    cocoon:inRegion          <Region/Gcloud/asia-northeast>
                                  ] .
<TypeAndQuantityNode/5>
        a                        schema:TypeAndQuantityNode ;
        schema:amountOfThisGood  "5"^^xsd:nonNegativeInteger .
```
## Cloud Service Price Specification
[cocoon:CloudServicePriceSpecification](https://w3id.org/cocoon/v1.0.1#CloudServicePriceSpecification)

Price specification for a Compute service from Azure:
```
@base <https://w3id.org/cocoon/data/v1.0.1/2019-03-07/> .
<ComputeService/Azure/linux-hc44rs-lowpriority>
        a                         cocoon:ComputeService ;
        gr:hasPriceSpecification  <CloudStorageTransactionsPriceSpecification/Azure/vm_base> ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudServicePriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      "0.317e0"^^xsd:float ;
                                    gr:hasUnitOfMeasurement  unit:Hour ;
                                    cocoon:inRegion          <Region/Azure/us-west-2>
                                  ] ;
        cocoon:hasMemory          [ a                        schema:TypeAndQuantityNode ;
                                    schema:amountOfThisGood  "352"^^xsd:decimal ;
                                    schema:unitCode          cocoon:GB
                                  ] ;
        cocoon:hasProvider        cocoon:Azure ;
        cocoon:hasStorage         [ a                        schema:TypeAndQuantityNode ;
                                    schema:amountOfThisGood  "700"^^xsd:decimal ;
                                    schema:typeOfGood        cocoon:LocalStorage ;
                                    schema:unitCode          cocoon:GB
                                  ] ;
        cocoon:numberOfCores      "44"^^xsd:decimal .
```
### Cloud OS Price Specification
[cocoon:CloudOSPriceSpecification](https://w3id.org/cocoon/v1.0.1#CloudOSPriceSpecification)
```
@base <https://w3id.org/cocoon/data/v1.0.1/2019-02-12/> .
<SystemImage/Gcloud/suse-sap>
        a                         cocoon:SystemImage ;
        rdfs:label                "suse-sap" ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudOSPriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      "0.41"^^xsd:float ;
                                    cocoon:chargedPerCore    false ;
                                    cocoon:forCoresMoreThan  "4"^^xsd:decimal
                                  ] ;
        gr:hasPriceSpecification  [ a                         cocoon:CloudOSPriceSpecification ;
                                    gr:hasCurrency            "USD" ;
                                    gr:hasCurrencyValue       "0.34"^^xsd:float ;
                                    cocoon:chargedPerCore     false ;
                                    cocoon:forCoresLessEqual  "4"^^xsd:decimal ;
                                    cocoon:forCoresMoreThan   "2"^^xsd:decimal
                                  ] ;
        gr:hasPriceSpecification  [ a                         cocoon:CloudOSPriceSpecification ;
                                    gr:hasCurrency            "USD" ;
                                    gr:hasCurrencyValue       "0.17"^^xsd:float ;
                                    cocoon:chargedPerCore     false ;
                                    cocoon:forCoresLessEqual  "2"^^xsd:decimal
                                  ] .
```
### Cloud Storage Transactions Price Specification
[cocoon:CloudStorageTransactionsPriceSpecification](https://w3id.org/cocoon/v1.0.1#CloudStorageTransactionsPriceSpecification)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<2019-03-07/CloudStorageTransactionsPriceSpecification/Azure/managed_disk/transactions-ssd>
        a                         cocoon:CloudStorageTransactionsPriceSpecification ;
        rdfs:label                "transactions-ssd" ;
        gr:hasPriceSpecification  [ a                    gr:CloudServicePriceSpecification ;
                                    gr:hasCurrency       "USD" ;
                                    gr:hasCurrencyValue  2.0E-7 ;
                                    cocoon:inRegion      <Region/Azure/brazil-south>
                                  ] .
```
### Cloud Network Price Specification
[cocoon:CloudNetworkPriceSpecification](https://w3id.org/cocoon/v1.0.1#CloudNetworkPriceSpecification)

Price for Google Internet Egress between Zones in the Same Region:
```
@base <https://w3id.org/cocoon/data/v1.0.1/2019-02-12/> .
<InternetService/Gcloud/CP-COMPUTEENGINE-INTERNET-EGRESS-ZONE>
        a                         cocoon:InternetService ;
        rdfs:label                "CP-COMPUTEENGINE-INTERNET-EGRESS-ZONE" ;
        gr:hasPriceSpecification  [ a                        cocoon:CloudNetworkPriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      "0.01e0"^^xsd:float ;
                                    gr:hasUnitOfMeasurement  cocoon:GBPerMonth ;
                                    cocoon:specialRateType   "Egress between zones in the same region"
                                  ] ;
        cocoon:hasDirection       cocoon:Egress .
```
## Quanlity Of Service
[cocoon:QuanlityOfService](https://w3id.org/cocoon/v1.0.1#QuanlityOfService)
### Downlink Speed
[cocoon:DownlinkSpeed](https://w3id.org/cocoon/v1.0.1#DownlinkSpeed)

Downlink speed measured with file sizes between 256 KB and 10240 KB:
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<256-KB> a schema:TypeAndQuantityNode;
    schema:amountOfThisGood "256"^^xsd:interger;
    schema:unitText "KB";
    schema:unitCode "2P".

<QuanlityOfService/DownlinkSpeed-256-10240-KB> a cocoon:DownlinkSpeed;
    cocoon:transferedFileSizeMin <256-KB>;
    cocoon:transferedFileSizeMax <10240-KB>.
```
### Latency
[ssn-system:Latency](http://www.w3.org/ns/ssn/systems/Latency)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<Measurement/Latency/ComputeService/Gcloud/150.203.213.249/lat=-35.271475/long=149.121434/2019-02-26T07%3A17%3A01.259Z/europe-north1-b>
        a                          cocoon:Measurement ;
        sosa:hasFeatureOfInterest  <Latency/ComputeService/Gcloud/europe-north1-b> ;
        sosa:hasResult             [ a                        schema:TypeAndQuantityNode ;
                                     schema:amountOfThisGood  361.33e0 ;
                                     schema:unitCode          unit:MilliSecond
                                   ] ;
        sosa:madeBySensor          <Device/150.203.213.249/lat=-35.271475/long=149.121434> ;
        sosa:resultTime            "2019-02-26T07:17:01.259Z"^^xsd:dateTime .

<Latency/ComputeService/Gcloud/europe-north1-b>
        a                   cocoon:ComputeService ;
        cocoon:hasProvider  cocoon:Gcloud ;
        cocoon:inRegion     <Region/Gcloud/europe-north1> ;
        cocoon:inZone       "b" ;
        ssn:hasProperty     <QuanlityOfService/Latency> .

<QuanlityOfService/Latency> a cocoon:Latency .
```
## Measurement
[cocoon:Measurement](https://w3id.org/cocoon/v1.0.1#Measurement)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<Measurement/DownlinkSpeed-1-128-KB/StorageService/Gcloud/150.203.213.249/lat=-35.271475/long=149.121434/2019-02-26T07%3A14%3A19.932Z/australia-southeast1>
        a                          cocoon:Measurement ;
        sosa:hasFeatureOfInterest  <DownlinkSpeed-1-128-KB/StorageService/Gcloud/australia-southeast1> ;
        sosa:hasResult             [ a                        schema:TypeAndQuantityNode ;
                                     schema:amountOfThisGood  11.22e0 ;
                                     schema:unitCode          unit:MegabitsPerSecond
                                   ] ;
        sosa:madeBySensor          <Device/150.203.213.249/lat=-35.271475/long=149.121434> ;
        sosa:resultTime            "2019-02-26T07:14:19.932Z"^^xsd:dateTime .
```
## Device
[cocoon:Device](https://w3id.org/cocoon/v1.0.1#Device)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<Device/150.203.213.249/lat=-35.271475/long=149.121434>
        a                          cocoon:Device ;
        rdfs:comment               "The computer used to conduct the tests, belongs to Australian National University College of Engineering & Computer Science."@en ;
        rdfs:label                 "CECS-030929"@en ;
        cocoon:inPhisicalLocation  [ a           schema:Place ;
                                     schema:geo  [ a                 schema:GeoCoordinates ;
                                                   schema:address    "Hanna Neumann Building #145, Science Road, Canberra ACT 2601" ;
                                                   schema:latitude   "-35.271475" ;
                                                   schema:longitude  "149.121434"
                                                 ]
                                   ] ;
        cocoon:ipv4                "150.203.213.249" .
```
## Location and Region
[cocoon:Location](https://w3id.org/cocoon/v1.0.1#Location),
[cocoon:Region](https://w3id.org/cocoon/v1.0.1#Region)
```
@base <https://w3id.org/cocoon/data/v1.0.1/> .
<Region/Gcloud/asia-southeast1>
        a                          cocoon:Region ;
        cocoon:inPhysicalLocation  <http://sws.geonames.org/1880252/> .
<Region/azure/us-west-2>
        a                      cocoon:Region ;
        rdfs:label             "West US 2" ;
        cocoon:continent       "Americas" ;
        cocoon:hasProvider     cocoon:Azure ;
        cocoon:inJurisdiction  <http://sws.geonames.org/10861432/> .
<Region/Gcloud/asia-southeast1>
        a                    cocoon:Region ;
        rdfs:label           "asia-southeast1" ;
        cocoon:city          "Singapore" ;
        cocoon:hasProvider   cocoon:Gcloud ;
        schema:dateModified  "2019-02-12"^^xsd:date ;
        schema:geo           [ a                      schema:GeoCoordinates ;
                               schema:addressCountry  "SG" ;
                               schema:latitude        1.3521e0 ;
                               schema:longitude       103.8198e0
                             ] .
```
