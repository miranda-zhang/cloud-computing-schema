# WIDOCO
https://github.com/dgarijo/Widoco

## Issues
First time open page not got to hash tag position: https://github.com/dgarijo/Widoco/issues/192

## Google Analytics
Tracking ID `UA-127651281-1`

The `-analytics` flag will add a code snippet for Google analytics to track your page.
You need to add your code next to it. For example: `-analytics UA-127651281-1`

https://www.businessnewsdaily.com/6027-how-to-use-google-analytics.html

## Config file
Example
https://github.com/dgarijo/Widoco/blob/master/doc/configurationSamples/config/config.properties

http://linked.earth/ontology/core/1.2.0/index-en.html

https://github.com/dgarijo/Widoco/issues/263

```
Attribution 4.0 International (CC BY 4.0)
https://creativecommons.org/licenses/by/4.0/
```

# OOPs
https://miranda-zhang.github.io/cloud-computing-schema/v1.0/OOPSevaluation/oopsEval.html

# Ontology Diff
http://www.ebi.ac.uk/efo/bubastis/bubastis.html

## v0.1
First time options
1. `[-saveConfig configOutFile]`
   The `-saveConfig` option allows you to save a configuration file on the "configOutFile" route with the properties of a given ontology.
2. The `-includeAnnotationProperties` flag will include annotation properties defined in your ontology (by default they are not included)
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile cocoon0.1.owl -outFolder v0.1 -getOntologyMetadata -rewriteAll -includeImportedOntologies -htaccess -webVowl -saveConfig configOutFile0.1 -includeAnnotationProperties
```
Using config:
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile cocoon0.1.owl -outFolder v0.1 -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile confFile0.1
```

## v1.0
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile "C:\Users\admin-u5214628\Documents\cloud-computing-schema\ontology_dev\cocoon.ttl" -outFolder v1.0 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile propertiesFile 
```
`[-confFile propertiesFile] or [-getOntologyMetadata]`
The `-confFile` allows you to choose your own configuration file for the ontology metadata. However you can tell WIDOCO to try to extract some of the metadata from the ontology with `getOntologyMetadata`, to use with save config file:`-getOntologyMetadata -saveConfig configOutFile `

## v1.0.1
```bash
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile "C:\Users\admin-u5214628\Documents\cloud-computing-schema\ontology_dev\cocoon1.0.1.ttl" -outFolder v1.0.1 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile config_file/1.0.1 
```
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile ~/Documents/cloud-computing-schema/ontology_dev/cocoon1.0.1.ttl -outFolder v1.0.1 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile config_file/1.0.1.bak
```

## Script
There are problems with the generated doc, need some post generation fix.

https://github.com/dgarijo/Widoco/issues/116#issuecomment-422322174

The script [update.sh](update.sh) will call the command to generate doc, then adjust the namespaces table.
