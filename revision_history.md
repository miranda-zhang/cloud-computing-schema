# Latest Changes
# v1.0.1

We areaware of the popularity of schema.org, and hence made this version compatible with its vocabularies, in the hope that CoCoOn can become an extension to schema.org, as there are no existing definitions within schema.org that cover the Cloud service domain.

Some major changes:
1. Additional external vocabularies. 
2. Additional annotations, including version number, modification dates, metadata like author, web page etc.
3. Removed classes and properties which are not core, and possibly covered by some other ontologies, e.g. Input, Output, Interface, User.
4. New class and properties focusing on IaaS and price specifications. Like [cocoon:CloudOSPriceSpecification](https://w3id.org/cocoon/v1.0.1#CloudOSPriceSpecification) and various other extensions to [gr:UnitPriceSpecification](http://purl.org/goodrelations/v1#UnitPriceSpecification); subclasses for specific Cloud features i.e. [cocoon:LoadBalancing](https://w3id.org/cocoon/v1.0.1#LoadBalancing); classes for describing network properties like [cocoon:TrafficDirection](https://w3id.org/cocoon/v1.0.1#TrafficDirection), which specifies network data flow direction.

A detailed change log can also be find on the online documentation
["Changes from last version" section](https://w3id.org/cocoon/v1.0.1#changes).
