# Helper scripts link regions to GeoNames
# GeoNames Ontology
http://www.geonames.org/ontology/documentation.html

GeoNames Search Webservice
http://www.geonames.org/export/geonames-search.html

e.g. 
http://api.geonames.org/search?q="united states"&country=us&maxRows=10&type=rdf&username=demo

# GeonamesRdf Client library
https://github.com/dsoprea/GeonamesRdf

    $ sudo pip install geonames_rdf

# Scripts
Microsoft Azure Regions Example:

1. [Input](azure_region.csv)
2. Run script, default search depths **10**
   ```
   . search_geoname_id.sh "azure_region.csv" 2 1 "mapping_name2uri.csv" "not_matched_locations.txt"
   ```
   The positional arguments are:
    1. inputfile
    2. column used for searching
    3. column used for output key
    4. output file for matched results, script will append to this file, you need to clear it yourself if needed.
    5. output file for not matched data
3. Example matched result:
   ```
    North Central US;4896861
    South Central US;4736286
    West US;5332921
    North Europe;2963597
    West Europe;2750405
    France Central;2988507
    France South;2995469
    Germany Northeast;2874545
    Norway East;3144096
    Norway West;3144096
    Australia East;2155400
    South India;1264527
    Japan West;1853909
    US Gov. Arizona;5551752
    US Gov. Texas;4736286
    South Africa West;3369157
    South Africa North;993800

   ```
4. Try a different name to search for on not matched data:
   ```
   . search_geoname_id.sh "not_matched_locations.txt" 3 1 "mapping_name2uri.csv" "not_matched_locations.txt"
   ```
   New results will be appended to the output file `mapping_name2uri.csv`

5. Try a single column search to see a non duplicated list:
   ```
   . search_geoname_id.sh "not_matched_locations.txt" 2 2 "location2geoname.csv" "not_matched_locations_1column.txt"
    -----------Searching--------------
    Abu Dhabi
    Beijing
    Busan
    Canberra
    Dubai
    Hong Kong

    Mumbai
    Pune
    Seoul
    Shanghai
    Singapore
    Tokyo, Saitama
    Victoria
    -------------------------
    Matched:0
    Not Matched:14
   ```
6. Manually match the rest.
   1. If data still large, you can try to guess some values to search.
    i.e. bulk edit the *Continent* column:
    `Asia Pacific`->`Asia`
    `Middle East and Africa`->`Middle East`
    `. search_geoname_id.sh "guess_mapping.txt" 3 1 "mapping_name2uri.csv" "not_matched_locations.txt"`
   2. If data left are small, each entry can be inspected manually
    i.e. for some names there are multiple entries associated with it 
    ```
        [http://sws.geonames.org/292968/]: [Abu Dhabi]
        [http://sws.geonames.org/292969/]: [Abu Dhabi]
    ```
    Add a manual entry like
    ```
    UAE Central;292968
    ```
