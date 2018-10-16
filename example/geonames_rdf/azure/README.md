# Script Example: Microsoft Azure Regions

1. [Input](azure_region_in.csv)
2. Run [script](../search_geoname_id.sh), default search depths **10**, i.e.
   ```
   . search_geoname_id.sh "azure_region_in.csv" 2 1 "azure_region_geoname.csv" "not_matched_locations.txt" true
   ```
   The positional arguments are:
    1. inputfile
    2. column used for searching
    3. column used for output key
    4. output file for matched results, script will append to this file, you need to clear it yourself if needed.
    5. output file for not matched data
    6. `true` to create a new output file for matched results, `false` to append to existing file.
3. Try a different name to search for on "not matched" data:
   ```
   . search_geoname_id.sh "not_matched_locations.txt" 3 1 "azure_region_geoname.csv" "not_matched_locations.txt" false
   ```
   New results will be appended to the output file `azure_region_geoname.csv`

4. Single column search, would remove duplicated terms,
   i.e. *column used for searching* = *column used for output key*
   ```
   . search_geoname_id.sh "not_matched_locations.txt" 2 2 "location2geoname.csv" "not_matched_locations_1column.txt" true
   ```
5. Manually match the rest.
   1. If data left is large, you can try to guess some values to search.
    i.e. bulk edit the *Continent* column:
    `Asia Pacific`->`Asia`
    `Middle East and Africa`->`Middle East`
    
    `. search_geoname_id.sh "guess_mapping.txt" 3 1 "azure_region_geoname.csv" "not_matched_locations.txt" false`
   2. If data left is small, each entry can be inspected manually
    i.e. for some names there are multiple entries associated with it 
    ```
        [http://sws.geonames.org/292968/]: [Abu Dhabi]
        [http://sws.geonames.org/292969/]: [Abu Dhabi]
    ```
    in this case we pick `292968`

6. Result is the combination of
   [azure_region_geoname.csv](azure_region_geoname.csv) and
   [manually_matched.csv](manually_matched.csv)

   `cat "azure_region_geoname.csv" "manually_matched.csv" > "azure_region_out.csv"`
