# Cloud IaaS Schema

Intended as a Schema.org extension.

# Github page

https://miranda-zhang.github.io/cloud-computing-schema/

Source code in the `gh-page` branch.

# w3id.org Permanent Identifier

Entry for this project:
https://github.com/miranda-zhang/w3id.org/tree/master/cocoon

# Examples

Code in [example folder](example/) shows some ways to obtain, use this ontology.

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

# Ref

JSON Linked Data https://json-ld.org/
