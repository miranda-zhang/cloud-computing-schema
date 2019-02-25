# CoCoOn Units
Defined with reference to
[QUDT Unit ontology](QUDT.md)

```ttl
###  https://w3id.org/cocoon/v1.0#GB
cocoon:GB rdf:type owl:NamedIndividual ,
                   qudt:DerivedUnit ,
                   qudt:InformationEntropyUnit ,
                   cocoon:UnitOfMeasure ;
          rdfs:comment "Gigabyte (GB): There are 1024MB in one gigabyte."@en ;
          rdfs:label "Gigabyte"@en .


###  https://w3id.org/cocoon/v1.0#GBPerMonth
cocoon:GBPerMonth rdf:type owl:NamedIndividual ,
                           qudt:DataRateUnit ,
                           qudt:DerivedUnit ,
                           cocoon:UnitOfMeasure ;
                  rdfs:comment "Often describe 1 GB per Month usage."@en ;
                  rdfs:label "Gigabyte per Month"@en .


###  https://w3id.org/cocoon/v1.0#IOPs
cocoon:IOPs rdf:type owl:NamedIndividual ,
                     qudt:DataRateUnit ,
                     qudt:DerivedUnit ,
                     cocoon:UnitOfMeasure ;
            rdfs:comment "Azure Managed Disks provide different input/output operations per sec (IOPs)"@en ;
            rdfs:label "Input/output operations per sec"@en .


###  https://w3id.org/cocoon/v1.0#TB
cocoon:TB rdf:type owl:NamedIndividual ,
                   qudt:DerivedUnit ,
                   qudt:InformationEntropyUnit ,
                   cocoon:UnitOfMeasure ;
          rdfs:comment "Terabyte is more precisely defined as 1,024 gigabytes (GB)"@en ;
          rdfs:label "Terabyte"@en .


###  https://w3id.org/cocoon/v1.0#gceu
cocoon:gceu rdf:type owl:NamedIndividual ,
                     cocoon:UnitOfMeasure ;
            rdfs:comment "GCEU (Google Compute Engine Unit), or GQ for short, is a unit of CPU capacity that we use to describe the compute power of our instance types. We chose 2.75 GQ's to represent the minimum power of one logical core (a hardware hyper-thread) on our Sandy Bridge platform."@en ;
            rdfs:label "Google Compute Engine Unit"@en .


###  https://w3id.org/cocoon/v1.0#1TB
<https://w3id.org/cocoon/v1.0#1TB> rdf:type owl:NamedIndividual ,
                                            cocoon:QuantityOfThings ;
                                   cocoon:hasUnitOfMeasurement cocoon:GB ;
                                   cocoon:numericValue "1024"^^xsd:nonNegativeInteger .


###  https://w3id.org/cocoon/v1.0#10TB
cocoon:10TB rdf:type owl:NamedIndividual ,
                                             cocoon:QuantityOfThings ;
                                    cocoon:hasUnitOfMeasurement cocoon:GB ;
                                    cocoon:numericValue "10240"^^xsd:nonNegativeInteger .


###  https://w3id.org/cocoon/v1.0#90TB
cocoon:90TB rdf:type owl:NamedIndividual ,
                                             cocoon:QuantityOfThings ;
                                    cocoon:hasUnitOfMeasurement cocoon:GB ;
                                    cocoon:numericValue "92160"^^xsd:nonNegativeInteger .
```
