# Cloud IaaS Schema

Intended as a Schema.org extension.

# Github page

https://miranda-zhang.github.io/cloud-computing-schema/

Source code in the `gh-page` branch.

# w3id.org Permanent Identifier

Added folder to w3id
https://github.com/miranda-zhang/w3id.org/tree/master/cocoon

# Workflow

```
                  SPARQL         Visualisation tool

                    ^                       ^
                    |                       |
                +---+-----------------------+------+
                |extracts value from various input |
                |store as Semantic Triple          |
                +----------------^-----------------+
                                 |
                                 |
                                 |
           +--------------------------------------------+
           +                     +                      +
       Ontology         Mapping definitions            Data
           +                     +                      +
      +----+----+                +                      +
      | CoCoOn  |           gcloud.jsonld?  <-------+ gcloud.json
      +----^----+                +                      +
           |                     +                      +
schema.org++                aws.jsonld?     <-------+ aws.js
           | using/              +                      +
      rdfs++ extending           +                      +
           |                  etc...                  etc...
       xsd++
           |
    etc... +

```

Drawn with http://asciiflow.com/

# JSON Linked Data

https://json-ld.org/