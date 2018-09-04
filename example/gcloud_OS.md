# Data Mapping Example: Google Cloud Storage
## Getting Input
Data: original json for Google Cloud
https://cloudpricingcalculator.appspot.com/static/data/pricelist.json

[A cached version of the json input.](data/pricelist.json)

## Cleaning and Transformation
Apply transformation using `jq`, view the live snippet https://jqplay.org/s/zZcN03Tdyp
```
.gcp_price_list | ."CP-COMPUTEENGINE-OS"
```
[A cached version of the result after transformation.](data/gcloud_os.json)

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

### SUSE images and SLES for SAP images

SLES images:

    $0.02 USD/hour for f1-micro and g1-small machine types
    $0.11 USD/hour for all other machine types

SLES for SAP images:

    $0.17 USD/hour for instances with 1 - 2 vCPUs
    $0.34 USD/hour for instances with 3 - 4 vCPUs
    $0.41 USD/hour for instances with 5 or more vCPUs

All SUSE images are charged a 1 minute minimum. After 1 minute, SUSE images are charged in 1 second increments.

### Windows Server images
Public images for several versions of Windows Server are available in either the Server Core configuration or the Server with Desktop Experience configuration. Both configurations are available at the following prices:

    $0.02 USD/hour for f1-micro and g1-small machine types
    $0.04 USD per core/hour for all other machine types

Standard machine types, high-CPU machine types, and high-memory machine types are charged based on the number of CPUs. For example, n1-standard-4, n1-highcpu-4, and n1-highmem-4 are machine-types with 4 vCPUs, and are charged at $0.16 USD/hour (4 x $0.04 USD/hour).

Windows Server images are charged a 1 minute minimum. After 1 minute, Windows images are charged in 1 second increments.

### SQL Server images
SQL Server images incur costs in addition to the base cost for normal Windows Server images.

    $0.399 USD per core/hour for SQL Server Enterprise
    $0.1645 USD per core/hour for SQL Server Standard
    $0.011 USD per core/hour for SQL Server Web

No additional charge for SQL Server Express
Microsoft SQL Server licensing requires a core license to be applied to each virtual CPU on your virtual machine instance with a four core minimum for each instance. For example, on instances with fewer than 4 vCPUs, Compute Engine charges for SQL Server Standard at 4 x $0.1645 USD/hour ($0.658 USD/hour).

For instances with 4 or more vCPUs, Compute Engine charges you for Microsoft SQL Server licenses in increments of 2. Instances with custom machine types receive a number of SQL Server licenses that is equal to the number of vCPUs.

Google recommends that you do not use SQL Server images on f1-micro or g1-small machine types based on Microsoft's minimum hardware and software recommendations.

Unlike other premium images, SQL Server images are charged a 10 minute minimum. After 10 minutes, SQL Server images are charged in 1 minute increments.

## Mapping to ontology
Mapper library
http://w3id.org/sparql-generate/

[SPARQL-Generate Queries](sparql-generate/gcloud_os.rqg)

## Result
[RDF turtle](sparql-generate/result/gcloud_os.ttl)
