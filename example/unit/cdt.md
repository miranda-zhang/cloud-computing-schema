# cdt:ucum

    @prefix cdt: <http://w3id.org/lindt/custom_datatypes#> .

Schema Doc
https://ci.mines-stetienne.fr/lindt/v2/custom_datatypes.html

Unified Code for Units of Measure (UCUM)
http://unitsofmeasure.org/ucum.html#section-Prefixes-and-Units-Used-in-Information-Technology

# Relavent Vocabularies
```
"1 s"^^cdt:time # second
"1 min"^^cdt:time # minute
"1 h"^^cdt:time # hour
"1 d"^^cdt:time # day
"1 a"^^cdt:time # year
"1 mo"^^cdt:time # month
```

# Playground
https://ci.mines-stetienne.fr/lindt/playground.html
```
PREFIX iter: <http://w3id.org/sparql-generate/iter/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX cdt: <http://w3id.org/lindt/custom_datatypes#> 
PREFIX ex: <http://example.org/>

SELECT ?position1 ?position2 ?equal

WHERE{ 

  VALUES ( ?position1 ?position2) {

    # working
    ( "60 /h"^^cdt:ucum "1 /min"^^cdt:ucum )
    ( "3600 bit/h"^^cdt:ucum "1 bit/s"^^cdt:ucum )

  }

  BIND( ?position1 = ?position2 AS ?equal )
  
}
```
# Issues
We need GB, TB, but cdt doesn't seem to support those yet.
https://github.com/sparql-generate/sparql-generate/issues/22#issuecomment-420139134
