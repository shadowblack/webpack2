module.exports = function () {
    var host = "http://192.168.3.187:8088/api-rest/";
    //var host = "http://prueba.conectium.com/api-rest/";

    var html;

    var run = function(){

        var centerContent = $("#content-center");

        var htmlString = centerContent.html();

        var dataJson = [];

        centerContent.find("[category]").each(function(i,object){
            var category = $( this ).attr("category");

            var params = [];
            $( this ).find("[params]").each(function(e,objectChild){
                var param = JSON.parse( $(this).attr("params") );
                var nameAttr = Object.keys( param );

                console.log(nameAttr);

                var attributes = [];
                for (var index in  nameAttr){
                    eval('var value = param.'+nameAttr[index]);
                    eval('var parser_object = {name:"'+nameAttr[index]+'",value:"'+value+'"}');
                    attributes.push(parser_object);
                }

                /*console.log(attributes);
                alert(attributes);*/
                //eval('params.push("'++'")')
                params.push(attributes);
                /*if ($( this ).attr("type") === "Text"){
                    getServices($( this ));
                }*/

            });

            var data = {
                category    : category,
                params      : params,
                site        : $("#site_present").val()
            };

            //console.log(JSON.stringify(dataJson))
            //console.log(data);

            dataJson.push(data);
        });

        // verificnado si el componente seleccionado esta dentro de un div o bloque category
        /*centerContent.find("[params]").each(function(i){
            if($(this).parents("[category]:eq(0)").length === 0){
                Materialize.toast('Ups, para poder utilizar esta funcionalidad correctamente, el componente debe estar dentro de un bloque', 4000)
                return false;
            }
        });*/

        if ($("#site_present").val() !== "")
        $.ajax({
            url: host+"/parse/",
            method: "POST",
            dataType: "JSON",
            data: JSON.stringify(dataJson),
            contentType: "application/json"
        }).done(function() {
            $( this ).addClass( "done" );
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
            /*if(paramsObject.isGetData !== undefined && paramsObject.isGetData === true && paramsObject.getData !== undefined){

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
            }*/
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

            html = $("#content-center").html();
    };

    var destroy = function(){
        var modal = $('#modal');
        modal.modal('open');
        modal.find(".modal-content");
        var iframe = modal.find("iframe");
        iframe[0].contentWindow.destroy();
    };

    var init = function(){
        // guardando el html
        $("#save_html").click(function(){

            var type_environment = $("#select_site_plublish").val();
            if (type_environment === "" || type_environment === 1)
                type_environment = "desarrollo";
            else if(type_environment === 2)
                type_environment = "preproduccion";
            else if(type_environment === 3)
                type_environment = "produccion";
            else
                type_environment = "desarrollo";

            html = $("#content-center").html();

            $.ajax({
                url: host+"parserlanding/",
                method: "POST",
                dataType: "JSON",
                contentType: "application/json",
                data : JSON.stringify([{
                    siteid          :   $("#site_present").val(),
                    nombre          :   "landing3",
                    tipo_ambiente   :   type_environment,
                    status          :   $("#ispublish").is(":checked"),
                    html            : html
                }])
            }).done(function(result) {

                $("#modal").modal("close");
            });

        });
    };

    return {
        run             : run,
        getAllService   : getAllService,
        make            : make,
        destroy         : destroy,
        init            : init
    }
};