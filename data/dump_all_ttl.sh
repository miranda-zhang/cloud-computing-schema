#!/bin/bash
# chmod +x dump_all_ttl.sh
# Usage:
# $ source dump_all_ttl.sh > v1_0_1.ttl

data_dirs_exclude_subfolder=("/mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/example/sparql-generate/result")

data_dirs_include_subfolder=(
    "/mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/example/sparql-generate/result/azure/v1.0.1"
    "/mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/example/sparql-generate/result/gcloud/v1.0.1"
)

for d in ${data_dirs_exclude_subfolder[@]}
do
    cd $d
    files=$(ls $d/*.ttl)
    for f in $files
    do
        rdfproc temp_store parse $f turtle
    done   
done

for d in ${data_dirs_include_subfolder[@]}
do
    #  finds all files ( -type f ) in directory $1 and in all sub directories
    files=$(find "$d" -type f)
    for f in $files
    do
        rdfproc temp_store parse $f turtle
    done
done

rdfproc temp_store serialize turtle
