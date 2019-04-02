#!/bin/bash
# chmod +x *.sh
# set -o xtrace

version="1.0.1"
previous_version="0.1"

# backword slash for windows style dir, put qoutation around
ontFile='C:\Users\admin-u5214628\Documents\cloud-computing-schema\ontology_dev\cocoon'$version'.ttl'

configFileDir="config_file/"
configFile=$configFileDir$version

sed -i '\|^dateOfRelease=.*|d' $configFile
today=$(date +%F)
echo "dateOfRelease=$today" >> $configFile

url_prefix="https://w3id.org/cocoon/v"
ontologyNamespaceURI="$url_prefix$version#"

sed -i '\|^ontologyNamespaceURI=.*|d' $configFile
echo "ontologyNamespaceURI=$ontologyNamespaceURI" >> $configFile

sed -i '\|^thisVersionURI=.*|d' $configFile
echo "thisVersionURI=$ontologyNamespaceURI" >> $configFile

sed -i '\|^latestVersionURI=.*|d' $configFile
echo "latestVersionURI=$ontologyNamespaceURI" >> $configFile

sed -i '\|^previousVersionURI=.*|d' $configFile
# need the owl file for changelog generation
previousVersionURI="https://miranda-zhang.github.io/cloud-computing-schema/v$previous_version/ontology/cocoon.owl"
echo "previousVersionURI=$previousVersionURI" >> $configFile

sed -i '\|^ontologyRevisionNumber=.*|d' $configFile
echo "ontologyRevisionNumber=$version" >> $configFile

folder="v"$version
rm -fr $folder

java -jar widoco-1.4.8-jar-with-dependencies.jar -ontFile $ontFile -outFolder $folder -oops -rewriteAll -includeImportedOntologies -webVowl -includeAnnotationProperties -confFile $configFile

index="v$version/index-en.html"
echo "Fix page:"$index
echo "Change url to use permalink"
sed -i 's|'$previousVersionURI'|https://w3id.org/cocoon/v'$previous_version'|g' $index

introduction="v$version/sections/introduction-en.html"
echo "Fix page:"$introduction

echo "Delete namespace cocoon itself from NS used list."
sed -i '\|<b>cocoon</b>|d' $introduction
echo "Delete namespace turtle."
sed -i '/turtle/d' $introduction
echo "Delete namespace xsd."
sed -i '/xsd/d' $introduction
echo "Delete namespace miranda-zhang."
sed -i '/miranda-zhang/d' $introduction
echo "Delete namespace github-com."
sed -i '/github-com/d' $introduction
echo "Rename namespace terms to dcterms."
sed -i 's#<b>terms</b>#<b>dcterms</b>#' $introduction
echo "Rename namespace v1 to gr."
sed -i 's#<b>v1</b>#<b>gr</b>#' $introduction
echo "Rename namespace ontology to gn."
sed -i 's#<b>ontology</b>#<b>gn</b>#' $introduction
echo "Rename namespace ns to cc."
sed -i 's#<b>ns</b>#<b>cc</b>#' $introduction

echo "Use the original ttl file instead of the re-generated one."
ontology_ttl="v$version/ontology.ttl"
rm -f $ontology_ttl
cp $ontFile $ontology_ttl

echo "Update done."
# set +o xtrace
