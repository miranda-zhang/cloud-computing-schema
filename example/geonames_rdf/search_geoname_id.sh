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
matched_output=$4
not_matched_output=$5
separator=";"
tempfile1="temp1"
tempfile2="temp2"

# remove empty lines
sed -i.bak '/^$/d' $inputfile
if [ $column_input -eq $column_output ]; then
    awk -F ""$separator"" "{print $"$column_input"}" "$inputfile" > "$tempfile1"
    cat "$tempfile1" | sort | uniq > $tempfile2
    # remove the following words
    sed -i 's/\<Location\>//g' $tempfile2
    sed -i 's/\<Continent\>//g' $tempfile2
    sed -i 's/\<Undisclosed\>//g' $tempfile2
else
    cat $inputfile > $tempfile2
fi

# clear output doc
> $not_matched_output
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

    gn_search dsoprea -p query "$name_to_search" -p max_rows 10 > $tempfile1
    occurrence=$(grep -Ec "\[$name_to_search\]" $tempfile1)

    if [ $occurrence -eq 1 ]; then 
        geoname_uri_no=$(grep -E "\[$name_to_search\]" $tempfile1 | grep -Eo "\/[0-9]+\/" | grep -Eo "[0-9]+")
        result="$name_original$separator$geoname_uri_no"
        echo "$name_to_search: $result"
        echo $result >> $matched_output
        ((matched++))
    else
        echo "$line"
        echo "$line" >> $not_matched_output
        ((not_matched++))
    fi
done < $tempfile2

echo "-------------------------"
echo "Matched:"$matched
echo "Not Matched:"$not_matched

# set +o xtrace
