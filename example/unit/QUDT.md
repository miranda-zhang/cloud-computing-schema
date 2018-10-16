# QUDT Units
Schema Doc
http://www.qudt.org/qudt/owl/1.0.0/qudt/index.html

Vocabulary Version 1.1
http://qudt.org/1.1/vocab/OVG_units-qudt-(v1.1).ttl

    @prefix qudt:      <http://qudt.org/schema/qudt#> .
    @prefix unit:    <http://qudt.org/vocab/unit#> .

## Eelevant Vocabularies
Individuals
```
unit:Byte
      rdf:type qudt:InformationEntropyUnit , qudt:DerivedUnit ;
      rdfs:label "Byte"^^xsd:string ;
      qudt:abbreviation "B"^^xsd:string ;
      qudt:code "3040"^^xsd:string ;
      qudt:conversionMultiplier
              "5.54517744"^^xsd:double ;
      qudt:conversionOffset
              "0.0"^^xsd:double ;
      qudt:symbol "B"^^xsd:string ;
      skos:exactMatch <http://dbpedia.org/resource/Byte> .
unit:Giga
      rdf:type qudt:DecimalPrefixUnit ;
      rdfs:label "Giga"^^xsd:string ;
      qudt:conversionMultiplier
              1.0E9 ;
      qudt:conversionOffset
              "0.0"^^xsd:double ;
      qudt:symbol "G"^^xsd:string ;
      skos:exactMatch <http://dbpedia.org/resource/Giga-> .
unit:Hour
      rdf:type qudt:UsedWithSIUnit , qudt:TimeUnit ;
      rdfs:label "Hour"^^xsd:string ;
      qudt:abbreviation "hr"^^xsd:string ;
      qudt:code "0830"^^xsd:string ;
      qudt:conversionMultiplier
              "3600.0"^^xsd:double ;
      qudt:conversionOffset
              "0.0"^^xsd:double ;
      qudt:symbol "hr"^^xsd:string ;
      skos:exactMatch <http://dbpedia.org/resource/Hour> .
unit:Day
      rdf:type qudt:TimeUnit , qudt:UsedWithSIUnit ;
      rdfs:label "Day"^^xsd:string ;
      qudt:abbreviation "d"^^xsd:string ;
      qudt:code "0490"^^xsd:string ;
      qudt:conversionMultiplier
              "86400"^^xsd:double ;
      qudt:conversionOffset
              "0.0"^^xsd:double ;
      qudt:description "Mean solar day"^^xsd:string ;
      qudt:symbol "d"^^xsd:string ;
      skos:exactMatch <http://dbpedia.org/resource/Day> .
unit:Year365Day
      rdf:type qudt:TimeUnit , qudt:NotUsedWithSIUnit ;
      rdfs:label "Year (365 Day)"^^xsd:string ;
      qudt:abbreviation "yr"^^xsd:string ;
      qudt:code "1980"^^xsd:string ;
      qudt:conversionMultiplier
              "31536000"^^xsd:double ;
      qudt:conversionOffset
              "0.0"^^xsd:double ;
      qudt:symbol "yr"^^xsd:string .
unit:MegabitsPerSecond
      rdf:type qudt:DerivedUnit , qudt:DataRateUnit ;
      rdfs:label "Megabit per Second"^^xsd:string ;
      qudt:abbreviation "mbps"^^xsd:string ;
      qudt:code "3015"^^xsd:string ;
      qudt:symbol "mbps"^^xsd:string .
```
Classes
1. qudt:DataRateUnit
2. qudt:ComputingUnit
3. qudt:TimeUnit
4. qudt:DerivedUnit
5. qudt:VolumePerTimeUnit
