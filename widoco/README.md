# WIDOCO
https://github.com/dgarijo/Widoco

# Issues
First time open page (with Chrome) not go to hash tag position: https://github.com/dgarijo/Widoco/issues/192

# Command Line Options
First time options:
1. `[-saveConfig configOutFile]`
   The `-saveConfig` option allows you to save a configuration file on the "configOutFile" route with the properties of a given ontology.
2. The `-includeAnnotationProperties` flag will include annotation properties defined in your ontology (by default they are not included)
3. The `-analytics` flag will add a code snippet for Google analytics to track your page. You need to add your code next to it. For example: `-analytics UA-127651281-1`. You can also read this [online tutorial](https://www.businessnewsdaily.com/6027-how-to-use-google-analytics.html).
4. Using config file: `[-confFile propertiesFile] or [-getOntologyMetadata]`. The `-confFile` allows you to choose your own configuration file for the ontology metadata. However you can tell WIDOCO to try to extract some of the metadata from the ontology with `getOntologyMetadata`, to use with save config file:`-getOntologyMetadata -saveConfig configOutFile `

# Config file examples
External Examples:
- https://github.com/dgarijo/Widoco/blob/master/doc/configurationSamples/config/config.properties
- http://linked.earth/ontology/core/1.2.0/index-en.html

Licenses example:
```
licenseURI=https://creativecommons.org/licenses/by/4.0/
licenseName=Attribution 4.0 International (CC BY 4.0)
licenseIconURL=https://i.creativecommons.org/l/by/4.0/88x31.png
```

**Example with CoCoOn v0.1 files**
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile cocoon0.1.owl -outFolder v0.1 -getOntologyMetadata -rewriteAll -includeImportedOntologies -htaccess -webVowl -saveConfig configOutFile0.1 -includeAnnotationProperties
```

```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile cocoon0.1.owl -outFolder v0.1 -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile confFile0.1
```

**Example with CoCoOn v1.0 files** 
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile "C:\Users\admin-u5214628\Documents\cloud-computing-schema\ontology_dev\cocoon.ttl" -outFolder v1.0 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile propertiesFile 
```

**Example with CoCoOn v1.0.1 files **
```bash
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile "C:\Users\admin-u5214628\Documents\cloud-computing-schema\ontology_dev\cocoon1.0.1.ttl" -outFolder v1.0.1 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile config_file/1.0.1 
```
```
java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile ~/Documents/cloud-computing-schema/ontology_dev/cocoon1.0.1.ttl -outFolder v1.0.1 -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile config_file/1.0.1.bak
```

# Ontology Diff
http://www.ebi.ac.uk/efo/bubastis/bubastis.html

# Post generation fix
There are problems with the generated doc, I need to do some fix after the documents are generated.

https://github.com/dgarijo/Widoco/issues/116#issuecomment-422322174

The script [update.sh](update.sh) will do the following in summary:
1. Update the `dateOfRelease` in configuration file to today.
2. Call the Widoco commands to generate documents.
3. Adjust some urls and namespaces.
4. Use the original supplied input `ttl` file instead of the re-generated one by Widoco for displaying to users.
