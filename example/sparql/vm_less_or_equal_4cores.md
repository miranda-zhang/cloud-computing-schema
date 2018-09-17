# SPARQL example
## Data set 
[gcloud_vm.ttl](../sparql-generate/result/gcloud/vm.ttl)

## Query
```
PREFIX cocoon: <https://raw.githubusercontent.com/miranda-zhang/cloud-computing-schema/master/ontology_dev/cocoon.ttl>
SELECT DISTINCT ?VM 
WHERE {
    ?VM a cocoon:VM ;
        cocoon:numberOfCores ?cores .
FILTER( ?cores <= 4) .
}
```

## Result
```
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-2	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-F1-MICRO	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-4	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-F1-MICRO-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-G1-SMALL	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-4-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-2-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-1-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-4-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-STANDARD-1	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-2-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-4	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-4-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-2	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-4	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHMEM-2-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-G1-SMALL-PREEMPTIBLE	
https://w3id.org/cocoon/data/vm/gcloud/CP-COMPUTEENGINE-VMIMAGE-N1-HIGHCPU-2
```
