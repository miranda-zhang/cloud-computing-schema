<script
src="https://code.jquery.com/jquery-1.12.4.min.js"
integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
crossorigin="anonymous"></script>

<script>

            $(document).ready(
                function () {
                    $("a").each(function(){
                        var title = $(this).attr('title');
                        var name = $(this).attr('name');
                        var old_id = this.href.split("#")[1];
                        var id;
                        if (typeof title !== typeof undefined && title !== false){
                            id = title.split("#")[1];
                            $("#"+old_id).prop("id",id);
                            this.href = "#"+id;
                        }else if(typeof name !== typeof undefined && name !== false){
                            id = name.split("#")[1];
                            $("#"+old_id).prop("id",id); 
                            this.href = "#"+id;
                        }else if( $(this).is(":contains('Class')") ){                         
                            this.href="#classes";
                        }else if( $(this).is(":contains('Data Propert')") ){         
                            this.href="#dataproperties";
                        }else if( $(this).is(":contains('Namespace Declarations')") ){  
                            this.href="#namespacedeclarations";                             
                        }else if( $(this).is(":contains('LODE')") ){                         
                        }else if( $(this).is(":contains('Silvio Peroni')") ){
                        }else if( $(this).is(":contains('Ontology source')") ){
                            this.href="ontology/cocoon.rdf"; 
                        }else{
                            this.href="#toc";
                        }
                    });
                }
            );
</script>