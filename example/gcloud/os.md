# Data Mapping Example: Google Cloud Premium images
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

Recorded:
1. [v1.41 24-July-2018](../data/gcloud/v1.41.json)
2. [v1.58 17-January-2019](../data/gcloud/v1.58.json)
3. [v1.62 12-February-2019](../data/gcloud/v1.62.json)

## Cleaning and Transformation
Apply transformation using `jq`:
```
.gcp_price_list | ."CP-COMPUTEENGINE-OS" | map_values(
    if .cores == "shared" 
    then .cores = 0.5 
    else . end 
) | ."windows-server-core" = ."win"

```
Result:
1. v1.41 24-July-2018: [file](../jq/gcloud/v1.41/os.json), https://jqplay.org/s/1s7kQ1l13V
2. v1.62 12-February-2019: [file](../jq/gcloud/v1.62/os.json), https://jqplay.org/s/gIIdxtzkWY

Replace all "shared" with 0.5. According to
[additional info from doc](#Additional-inforamtion-from-documentation).

Because `windows-server-core` has `null` value from json input.
We process it separately. 
From the [doc](#-Windows-Server-images), it seems `windows-server-core`
and `win` have the same price spec.

## Additional inforamtion from documentation 
https://cloud.google.com/compute/pricing

**Premium images**

The price for a premium image is different depending on which machine type you use. For example, a standard SUSE image costs $0.02 per hour to run on an f1-micro instance, but the same image costs $0.11 per hour to run on an n1-standard-8 instance. The prices for premium images are the same worldwide and *do not differ based on zones or regions*.

All prices for premium images are in addition to charges for using a machine type. For example, the total price to use an n1-standard-8 instance with a SUSE image would be the sum of the machine type cost and the image cost:

    n1-standard-8 cost + SUSE image cost = $0.3800 + $0.11 = $0.49 per hour

### Red Hat Enterprise Linux (RHEL) and RHEL for SAP images

    $0.06 USD/hour for instances with 4 or fewer vCPUs
    $0.13 USD/hour for instances with more than 4 vCPUs

All RHEL and RHEL for SAP images are charged a 1 minute minimum. After 1 minute, RHEL images are charged in 1 second increments.

### SUSE Images and SLES for SAP Images

SLES images:

    $0.02 USD/hour for f1-micro and g1-small machine types
    $0.11 USD/hour for all other machine types

SLES for SAP images:

    $0.17 USD/hour for instances with 1 - 2 vCPUs
    $0.34 USD/hour for instances with 3 - 4 vCPUs
    $0.41 USD/hour for instances with 5 or more vCPUs

All SUSE images are charged a 1 minute minimum. After 1 minute, SUSE images are charged in 1 second increments.

### Windows Server Images
Public images for several versions of Windows Server are available in either the Server Core configuration or the Server with Desktop Experience configuration. Both configurations are available at the following prices:

    $0.02 USD/hour for f1-micro and g1-small machine types
    $0.04 USD per core/hour for all other machine types

Standard machine types, high-CPU machine types, and high-memory machine types are charged based on the number of CPUs. For example, n1-standard-4, n1-highcpu-4, and n1-highmem-4 are machine-types with 4 vCPUs, and are charged at $0.16 USD/hour (4 x $0.04 USD/hour).

Windows Server images are charged a 1 minute minimum. After 1 minute, Windows images are charged in 1 second increments.

### SQL Server Images
SQL Server images incur costs in addition to the base cost for normal Windows Server images.

    $0.399 USD per core/hour for SQL Server Enterprise
    $0.1645 USD per core/hour for SQL Server Standard
    $0.011 USD per core/hour for SQL Server Web

No additional charge for SQL Server Express
Microsoft SQL Server licensing requires a core license to be applied to each virtual CPU on your virtual machine instance with a four core minimum for each instance. For example, on instances with fewer than 4 vCPUs, Compute Engine charges for SQL Server Standard at 4 x $0.1645 USD/hour ($0.658 USD/hour).

For instances with 4 or more vCPUs, Compute Engine charges you for Microsoft SQL Server licenses in increments of 2. Instances with custom machine types receive a number of SQL Server licenses that is equal to the number of vCPUs.

Google recommends that you do not use SQL Server images on f1-micro or g1-small machine types based on Microsoft's minimum hardware and software recommendations.

Unlike other premium images, SQL Server images are charged a 10 minute minimum. After 10 minutes, SQL Server images are charged in 1 minute increments.

## About suse-sap mapping
Most images has two tiers of prices, but `suse-sap` has an additional tier, we treated it as a special case during mapping.
jq
```
.gcp_price_list."CP-COMPUTEENGINE-OS"."suse-sap"
```
jq result
```
{
  "low": 0.17,
  "high": 0.34,
  "highest": 0.41,
  "cores": "2",
  "percore": false
}
```
sparql result
```
<https://w3id.org/cocoon/data/os/glcoud/suse-sap>
        a                         cocoon:SystemImage ;
        rdfs:label                "suse-sap" ;
        gr:hasPriceSpecification  [ a                        cocoon:OSPriceSpecification ;
                                    gr:hasCurrency           "USD" ;
                                    gr:hasCurrencyValue      0.41 ;
                                    cocoon:chargedPerCore    false ;
                                    cocoon:forCoresMoreThan  "4"^^xsd:decimal
                                  ] ;
        gr:hasPriceSpecification  [ a                         cocoon:OSPriceSpecification ;
                                    gr:hasCurrency            "USD" ;
                                    gr:hasCurrencyValue       "0.34"^^xsd:double ;
                                    cocoon:chargedPerCore     false ;
                                    cocoon:forCoresLessEqual  "4"^^xsd:decimal ;
                                    cocoon:forCoresMoreThan   "2"^^xsd:decimal
                                  ] ;
        gr:hasPriceSpecification  [ a                         cocoon:OSPriceSpecification ;
                                    gr:hasCurrency            "USD" ;
                                    gr:hasCurrencyValue       "0.17"^^xsd:double ;
                                    cocoon:chargedPerCore     false ;
                                    cocoon:forCoresLessEqual  "2"^^xsd:decimal
                                  ] ;
        cocoon:hasProvider        cocoon:gcloud .
```

## Mapping OS
v1.0.0 17-January-2019:
[Query](../sparql-generate/gcloud/v1.0.0/os.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.0/os.ttl)

v1.0.1 12-February-2019:
[Query](../sparql-generate/gcloud/v1.0.1/2019-02-12/os.rqg)
[Result](../sparql-generate/result/gcloud/v1.0.1/2019-02-12/os.ttl)
```
java -jar sparql-generate-jena.jar --query-file gcloud/v1.0.1/2019-02-12/os.rqg --output result/gcloud/v1.0.1/2019-02-12/os.ttl --log-level ERROR 
```
