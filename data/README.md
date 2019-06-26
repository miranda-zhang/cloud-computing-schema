# Data megring
# Script for merge all files
[dump_all_ttl.sh](dump_all_ttl.sh)

```
cd /mnt/c/Users/admin-u5214628/Documents/github/cloud-computing-schema/data
mv v1_0_1.ttl v1_0_1.ttl.bak
source dump_all_ttl.sh > v1_0_1.ttl
```

# Tools review
In case runing out of memory, try Jena TDB, Virtuoso, Stardog, GraphDB.
Otherwise riot is a good in memory solution.

## riot
- https://jena.apache.org/documentation/tools/
`riot` is a tool from Apache Jana.
```
# time riot --formatted=Turtle device.ttl qos_property.ttl > riot_test.ttl

real    0m1.633s
user    0m8.406s
sys     0m0.672s
```

## stardog
- https://www.stardog.com/docs/#_linux_and_osx
```
sudo su
curl http://packages.stardog.com/stardog.gpg.pub | apt-key add
echo "deb http://packages.stardog.com/deb/ stable main" >> /etc/apt/sources.list
apt update
apt install -y stardog
```

## rdfcat
`rdfcat` is a tool from [Apache Jana](https://jena.apache.org/documentation/tools/).
Although it seems to produce nice results, it is officially DEPRECATED.
```
$ rdfcat --version
$ rdfcat -out Turtle file_1 file_2 ... file_n > merged_file.ttl
```

## rapper
`rapper` is faster at serilization compare to `rdfproc`, but dosen't seem to combine files.
- http://arademaker.github.io/blog/2015/08/18/combine-rdf.html
```
$ rapper -i turtle vm_base.ttl
rapper: Parsing returned 110250 triples
$ rapper -i turtle -o ntriples vm_base.ttl > vm_base.nt
```

## rdfproc
We tried `rdfproc`, it took longer time to process and too much space, not recommend to use.

- http://librdf.org/utils/rdfproc.html
- https://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html

```bash
$ sudo su
$ apt install redland-utils
$ rdfproc --help
$ rdfproc test parse qos_property.ttl turtle
$ rdfproc test print
$ rdfproc test serialize turtle
$ rdfproc test serialize turtle > out.ttl
$ time source dump_all_ttl.sh > v1_0_1.ttl
BDB0137 write: 0x1ea1670, 512: No space left on device
BDB3015 ./temp_store-so2p.db: write failed for page 6387
BDB3027 ./temp_store-so2p.db: unable to flush page: 6387
rdfproc: Parsing URI file:///mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/example/sparql-generate/result/gcloud/v1.0.1/region_geo_coord.ttl with turtle parser
rdfproc: Error - Cannot add statement to model
rdfproc: Parsing URI file:///mnt/c/Users/admin-u5214628/Documents/cloud-computing-schema/example/sparql-generate/result/gcloud/v1.0.1/uplink.ttl with turtle parser

real    103m24.082s
user    66m30.203s
sys     36m23.609s
```
