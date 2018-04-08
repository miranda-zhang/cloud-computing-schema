# Cloud IaaS Schema

Intended as a Schema.org extension.

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