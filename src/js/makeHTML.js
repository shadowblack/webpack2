module.exports = function () {

    var run = function(){

        var centerContent = $("#content-center");

        var htmlString = centerContent.html();

        var dataJson = [];

        centerContent.find("[category]").each(function(i,object){
            var category = $( this ).attr("category");

            var params = [];
            $( this ).find("[params]").each(function(e,objectChild){
                var param = JSON.parse( $(this).attr("params") );
                params.push(param);
                if ($( this ).attr("type") === "Text"){
                    getServices($( this ));
                }

            });

            var data = {
                category    : category,
                params      : params
            };

            dataJson.push(data);
        });

        // verificnado si el componente seleccionado esta dentro de un div o bloque category
        centerContent.find("[params]").each(function(i){
            if($(this).parents("[category]:eq(0)").length === 0){
                Materialize.toast('Ups, para poder utilizar esta funcionalidad correctamente, el componente debe estar dentro de un bloque', 4000)
                return false;
            }
        });

        console.log(JSON.stringify(dataJson));
        console.log(htmlString);
    };

    var getAllService = function(){
      getServices("[params]");
    };

    var getServices = function(param){
        $(param).each(function(i){
            var self = $( this );
            var paramsObject = JSON.parse( $(this).attr("params") );
            if(paramsObject.isGetData !== undefined && paramsObject.isGetData === true && paramsObject.getData !== undefined){

                 $.ajax({
                     url:paramsObject.getData,
                     dataType: 'text',
                     statusCode: {
                         404: function() {
                             console.log( "page not found" );
                             self.text("La URL no existe");
                         }
                     }
                 }).done(function( text ) {
                     paramsObject.caption = text;
                     self.text(text);
                 });
            }
        });
    };

    var make = function(){

            var modal = $('#modal');
            modal.modal('open');
            modal.find(".modal-content");
            var iframe = modal.find("iframe");

            iframe
                .contents()
                .find("#content")
                .empty()
                .append($("#content-center")
                    .html());

            iframe[0].contentWindow.execute();

    };

    var destroy = function(){
        var modal = $('#modal');
        modal.modal('open');
        modal.find(".modal-content");
        var iframe = modal.find("iframe");
        iframe[0].contentWindow.destroy();
    };

    return {
        run             : run,
        getAllService   : getAllService,
        make            : make,
        destroy         : destroy
    }
};