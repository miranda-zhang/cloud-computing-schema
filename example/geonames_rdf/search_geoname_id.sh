#!/bin/bash
# chmod +x *.sh
# workon geonames_rdf
export PYTHONIOENCODING=UTF-8
echo "-----------Searching--------------"
# https://stackoverflow.com/a/5750463/646732
# set -o xtrace

inputfile=$1
column_input=$2
column_output=$3
matched_output_file=$4
not_matched_output_file=$5
isNewOutput=$6
separator=";"
tempfile1="temp1"
tempfile2="temp2"

# remove empty lines
sed -i.bak '/^$/d' $inputfile
header=$(sed 1q $inputfile)
# remove header
sed 1d $inputfile > $tempfile1
if [ $column_input -eq $column_output ]; then
    awk -F ""$separator"" "{print $"$column_input"}" "$tempfile1" > "$tempfile2"
    # remove the following words
    sed -i 's/\<Undisclosed\>//g' $tempfile2
    cat "$tempfile2" | sort | uniq > $tempfile1
fi

# clear output doc
> $not_matched_output_file
if $isNewOutput ; then
    echo "$header;geoname_id" > $matched_output_file
fi
not_matched=0
matched=0
while IFS="" read -r line || [ -n "$line" ]
do
    if [ $column_input -eq $column_output ]; then
        name_original=$(echo "$line" | xargs)
        name_to_search=$name_original
    else
        name_to_search=$(awk -F ""$separator"" "{print $"$column_input"}" <<< "$line" | xargs)
        name_original=$(awk -F ""$separator"" "{print $"$column_output"}" <<< "$line" | xargs)
    fi

    gn_search dsoprea -p query "$name_to_search" -p max_rows 10 > $tempfile2
    occurrence=$(grep -Ec "\[$name_to_search\]" $tempfile2)

    if [ $occurrence -eq 1 ]; then 
        geoname_uri_no=$(grep -E "\[$name_to_search\]" $tempfile2 | grep -Eo "\/[0-9]+\/" | grep -Eo "[0-9]+")
        echo "$name_to_search: $geoname_uri_no"
        result="$line$separator$geoname_uri_no"
        echo $result >> $matched_output_file
        ((matched++))
    else
        echo "$line"
        echo "$line" >> $not_matched_output_file
        ((not_matched++))
    fi
done < $tempfile1

echo "-------------------------"
echo "Matched:"$matched
echo "Not Matched:"$not_matched

# set +o xtrace
