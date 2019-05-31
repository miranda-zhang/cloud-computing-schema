#!/bin/bash
# chmod +x dump_all_ttl.sh
# Usage:
# $ source dump_all_ttl.sh > test_v1_0_1.ttl

#set -o xtrace
current_dir=$(pwd)
base_dir="/mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/"
input_dirs_exclude_subfolder=("example/sparql-generate/result")
input_dirs_include_subfolder=(
    "example/sparql-generate/result/azure/v1.0.1"
    "example/sparql-generate/result/gcloud/v1.0.1"
)

concat_files=""

for d in ${input_dirs_exclude_subfolder[@]}
do
    files=$(ls $base_dir$d/*.ttl)
    for f in $files
    do
        concat_files="$concat_files $f"
    done  
done

for d in ${input_dirs_include_subfolder[@]}
do
    #  finds all files ( -type f ) in directory $1 and in all sub directories
    files=$(find "$base_dir$d" -type f)
    for f in $files
    do
        concat_files="$concat_files $f"
    done
done

time riot --formatted=Turtle $concat_files
cd $current_dir
#set +o xtrace
