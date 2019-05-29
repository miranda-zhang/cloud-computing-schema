# Data megring using rdfproc
- http://arademaker.github.io/blog/2015/08/18/combine-rdf.html
- http://librdf.org/utils/rdfproc.html
- https://www.tldp.org/LDP/Bash-Beginners-Guide/html/sect_10_02.html

```bash
sudo su
apt install redland-utils
rdfproc --help
rdfproc test parse qos_property.ttl turtle
rdfproc test print
rdfproc test serialize turtle
rdfproc test serialize turtle > out.ttl
```
# Script for merge all files
[dump_all_ttl.sh](dump_all_ttl.sh)
```bash
time source dump_all_ttl.sh > v1_0_1.ttl
```
