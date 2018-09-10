# CoCoOn Units

```
:GB rdf:type owl:NamedIndividual ,
             :UnitOfMeasure ,
             qudt:InformationEntropyUnit , qudt:DerivedUnit ;
    dc:description "Gigabyte (GB): There are 1024MB in one gigabyte."@en ;
    rdfs:label "Gigabyte"@en .

:TB rdf:type owl:NamedIndividual ,
             :UnitOfMeasure ,
             qudt:InformationEntropyUnit , qudt:DerivedUnit ;
    dc:description "Terabyte is more precisely defined as 1,024 gigabytes (GB)"@en ;
    rdfs:label "Terabyte"@en .

:GBPerMonth
      rdf:type qudt:DerivedUnit , qudt:DataRateUnit ;
      rdfs:label "Gigabyte per Month"@en ;
      dc:description "Often describe 1 GB per Month usage."@en .

```
Tenative
* dollar per hour
* USD per core/hour
* 