module.exports = function () {
    //var host = "http://192.168.3.92:8088/api-rest/";
    var host = "http://prueba.conectium.com/api-rest/";

    var elementForm = require('./elementsForm'),
    makeHTML = require('./makeHTML');

    var init = function(){
        return $("#content-right")
            .find("div.container:eq(0)").empty();
    };

    var body = function($this_element){


        var params = JSON.parse($this_element.attr("params"));
        var _html = "";
        _html += elementForm().checkbox('isBackgroundImage','background Image?','body');
        _html += elementForm().inputFile('file-image','Imagen de Fondo','body');
        _html += elementForm().checkbox('isBackgroundColor','background Color?','body');
        _html += elementForm().inputColor('block-color','Color de Fondo','body');

        var dom = init().append(_html);

        // is background image
        dom.find("#isBackgroundImage").click(function(){
            params.isBackgroundImage = $(this).is(":checked");
            if (params.isBackgroundImage === false)
                $this_element.css({"background-image":"none"});
            else
                $this_element.css({"background-image":params.backgroundImage});
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("#elementBody").attr("params",JSON.stringify(params));
        }).attr("checked",params.isBackgroundImage);

        // is background color
        dom.find("#isBackgroundColor").click(function(){
            params.isBackgroundColor = $(this).is(":checked");
            if(params.isBackgroundColor === true){
                $this_element.css({"background-color":params.backgroundColor});
                //params.backgroundColor = params.backgroundColor;
            } else {
                $this_element.css({"background-color":"initial"});
                //params.backgroundColor = "initial";
            }

            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("#elementBody").attr("params",JSON.stringify(params));
        }).attr("checked",params.isBackgroundColor);

        // color
        dom.find("#block-color").change(function(){
            $this_element.css({"background-color":$(this).val()});
            params.backgroundColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("#elementBody").attr("params",JSON.stringify(params));
            dom.find("#isBackgroundColor").attr("checked",true);
            dom.find("#isBackgroundImage").attr("checked",false);
            params.isBackgroundColor = true;
            params.isBackgroundImage = false;

            $this_element.css('background-image','none');
            $this_element.css('background-repeat','none');
            /* $this_element.css('background-attachment','fixed');*/
            $this_element.css('background-position', 'none');
            $this_element.css('background-size','none');

            $this_element.find("#elementBody").attr("params",JSON.stringify(params));

            makeHTML().run();
        }).val(params.backgroundColor);

        // image background
        dom.find("#file-image").change(function(){

            var readURL = function(input) {

                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        params.backgroundImage = 'url("'+e.target.result+'")';
                        params.backgroundRepeat = 'no-repeat';
                        params.backgroundPosition = 'center center';
                        params.backgroundSize = 'cover';

                        $this_element.css('background-image',params.backgroundImage);
                        $this_element.css('background-repeat',params.backgroundRepeat);
                        /* $this_element.css('background-attachment','fixed');*/
                        $this_element.css('background-position', params.backgroundPosition);
                        $this_element.css('background-size',params.backgroundSize);

                        params.isBackgroundImage = true;
                        params.isBackgroundColor = false;

                        dom.find("#isBackgroundColor").attr("checked",false);
                        $this_element.attr("params",JSON.stringify(params));
                        dom.find("#isBackgroundImage").attr("checked",true);
                        $this_element.find("#elementBody").attr("params",JSON.stringify(params));
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            };

            readURL(this);
            makeHTML().run();
        });
    };

    var imagen = function($this_element){

        var params = JSON.parse($this_element.attr("params"));
        var _html = "";
        _html += elementForm().button('drop','Borrar','all');
        _html += elementForm().inputFile('file-image','Imagen','image');
        _html += elementForm().checkbox('link','Hipervinculo','image');
        _html += elementForm().checkbox('radius','Redondo','image');
        _html += elementForm().inputText('linkHiper','Hipervinculo','image',true);

        _html += elementForm().beginGroupElement();
        _html += elementForm().inputText('nameTarget','#nombre','image',true);

        var options = [

        ];

        // ajax aqui
        var data_influence = '';


        /*$.ajax({
            url: host+"/influencer",
            method: "GET",
            dataType: "JSON",
            async : false
        }).done(function(data) {
            data_influence = JSON.stringify(data);
        });*/

        data_influence = '[{"id":80,"nombre":"Veratrends","nombreima":"http://wap.alamano.com/sbk/banners/categoria/veratrends_1458_Smart.png","textoinvitacion":null},{"id":72,"nombre":"Nancy Patiño","nombreima":"http://wap.alamano.com/sbk/banners/categoria/nancy patino_1365_Smart.png","textoinvitacion":null},{"id":27,"nombre":"Marcos Calderon","nombreima":"http://wap.alamano.com/sbk/banners/categoria/marcos1_926_Smart.png","textoinvitacion":"textoejemplo"},{"id":69,"nombre":"Lovelygourmet","nombreima":"http://wap.alamano.com/sbk/banners/categoria/lovely_1394_Smart_926_Smart.png","textoinvitacion":null},{"id":70,"nombre":"Tomas Drever","nombreima":"http://wap.alamano.com/sbk/banners/categoria/tomas_926_Smart.png","textoinvitacion":null},{"id":74,"nombre":"Daniel Brito","nombreima":"http://wap.alamano.com/sbk/banners/categoria/daniel_1353_Smart.png","textoinvitacion":null},{"id":76,"nombre":"Eliana Jimenez","nombreima":"http://wap.alamano.com/sbk/banners/categoria/eliana-jimenez (2)_1357_Smart_1359_Smart.png","textoinvitacion":null},{"id":75,"nombre":"Andrea Rivas","nombreima":"http://wap.alamano.com/sbk/banners/categoria/andrea-rivas-_1357_Smart_1359_Smart.png","textoinvitacion":null},{"id":77,"nombre":"Roberto Villarreal","nombreima":"http://wap.alamano.com/sbk/banners/categoria/roberto_1357_Smart_1359_Smart.png","textoinvitacion":null},{"id":73,"nombre":"Irina Rodriguez","nombreima":"http://wap.alamano.com/sbk/banners/categoria/irina-rodrigez_1357_Smart_1359_Smart.png","textoinvitacion":null},{"id":78,"nombre":"Jaime Cherigo","nombreima":"http://wap.alamano.com/sbk/banners/categoria/jaime_1151_Smart.png","textoinvitacion":null}]';

        $("#influence").val(data_influence);
         $.each(JSON.parse(data_influence),function(i, object){
             options.push({value : object.id, text : object.nombre,
                 attributes:"image='"+object.nombreima+"' name='"+object.nombre+"'"
             })
         });

        _html += elementForm().select('influencer','influenciador','image',options);
        _html += elementForm().checkbox('isInfluencer','Es influenciador?','image');
        _html += elementForm().checkbox('isSlider','Es Slider?','image');
        _html += elementForm().endGroupElement();

        var dom = init().append(_html);

        function readURL(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $this_element.find("img").attr("src",e.target.result);
                    params.src = (e.target.result);
                    $this_element.attr("params",JSON.stringify(params));
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        // file
        dom.find("#file-image").change(function(){
            readURL(this);
            makeHTML().run();
        });

        // radial
        dom.find("#radius").click(function(){
            params.radius = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));

            if (params.radius === true){
                $this_element.find("div:eq(0)").removeClass("card");
                $this_element.find("img").addClass("circle");
                $this_element.find("img").addClass("responsive-img");
            } else {
                $this_element.find("div:eq(0)").addClass("card");
                $this_element.find("img").removeClass("circle");
                $this_element.find("img").removeClass("responsive-img");
            }
            makeHTML().run();
        }).attr("checked",params.link);

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#nameTarget").keyup(function(){
            params.nameTarget = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.nameTarget);

        // eventos del numero de bloques
        dom.find("#influencer").change(function(){

            var block = ($this_element);
            params.influencer = $(this).val();

            var image = $(this).find("option:selected").attr("image");
            var name = $(this).find("option:selected").attr("name");
            params.imagenInfluence = image;
            params.nameInfluence = name;

            $this_element.find("img").attr("src",params.imagenInfluence);

            block.attr("params",JSON.stringify(params));

            if (!dom.find("#isInfluencer").is(":checked"))
                dom.find("#isInfluencer").trigger("click");
            makeHTML().run();

        }).val(params.influencer);

        // is influence
        dom.find("#isInfluencer").click(function(){
            params.isInfluencer = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.isInfluencer === true)
                $this_element.find("img").attr("src",params.imagenInfluence);
            else
                $this_element.find("img").attr("src",params.src);
        }).attr("checked",params.isInfluencer);

        // is influence
        dom.find("#isSlider").click(function(){
            params.isSlider = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
        }).attr("checked",params.isSlider);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.link === true){
                $this_element.wrap("<a href='"+params.url+"'></a>")
                    .css({"color":params.colorLink});
            } else {
                $this_element.unwrap();
            }
            makeHTML().run();
        }).attr("checked",params.link);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            if ($this_element.parent().is("a") === true)
                $this_element.parent().attr("href",params.url);
            makeHTML().run();
        }).val(params.url);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });

    };

    var none = function($this_element){
        var params = JSON.parse($this_element.attr("params"));
        var _html = elementForm().button('drop','Borrar','all');
        var optionsArr = [
            {value:"na" , text: "Ninguno"},
            {value:"msisdn" , text: "MSISDN"}
        ];
        _html += elementForm().divSection('optionButtonAction','all',optionsArr);
        var dom = init().append(_html);

        // insertando valores en el selector
        $("#optionButtonAction")
            .empty()
            .append(elementForm().divRadioBox("optionsActions","Seleccion de opcion","radioOptionsAction",optionsArr))
            .find("input").click(function(){

            params.actionType = $(this).val();

            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        });

        dom.unbind("click");
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    // bloque de columnas
    var block = function($this_element){
        //var _html = elementForm().checkbox('color_block','color','block');
        var _html = "";

        var params = JSON.parse($this_element.attr("params"));

        _html += elementForm().button('drop','Borrar','all');

        var options = [
            {
                value   : "1",
                text    : "1",
                attributes : "selected"
            }
        ];

        for (var i= 2 ; i <= 12; i++){
            options.push({value : i, text : i, attributes:""})
        }

        _html += elementForm().select('columns_block','Reticulas','block',options);

        // aliniacion
        options = [
            {
                value   : "left",
                text    : "left",
                attributes : ""
            },
            {
                value   : "right",
                text    : "right",
                attributes : ""
            }
        ];

        _html += elementForm().select('columns_aligns','Alineacion','block',options);

        // aliniacion
        options = [
            {
                value   : "left-align",
                text    : "left-align",
                attributes : "left-align"
            },
            {
                value   : "right-align",
                text    : "right-align",
                attributes : ""
            },
            {
                value   : "center-align",
                text    : "center-align",
                attributes : ""
            }
        ];

        _html += elementForm().select('text_aligns','Alineacion de Texto','block',options);
        _html += elementForm().inputColor('block-color','Color de Fondo','block');
        _html += elementForm().beginGroupElement();
        _html += elementForm().checkbox('fondo','Fondo?','block');
        _html += elementForm().inputFile('file-image','Imagen de Fondo','block');
        _html += elementForm().checkbox('imagenFondo','Imagen de Fondo?','block');
        _html += elementForm().endGroupElement();
        _html += elementForm().inputRange('block-range','Opacidad','block');
        //_html += elementForm().checkbox('isMSISDN','Establecer MSISDN','block',true);
        //_html += elementForm().inputText('block-height','Altura, ej. 10px, 2%, 1em','block');

        options = [
            {
                value   : "auto",
                text    : "auto",
                attributes : ""
            },
            {
                value   : "25px",
                text    : "25px",
                attributes : ""
            },
            {
                value   : "50px",
                text    : "50px",
                attributes : ""
            },
            {
                value   : "75px",
                text    : "75px",
                attributes : ""
            },
            {
                value   : "100px",
                text    : "100px",
                attributes : ""
            },
            {
                value   : "125px",
                text    : "125px",
                attributes : ""
            },
            {
                value   : "150px",
                text    : "150px",
                attributes : ""
            },
            {
                value   : "175px",
                text    : "175px",
                attributes : ""
            },
            {
                value   : "200px",
                text    : "200px",
                attributes : ""
            },
            {
                value   : "225px",
                text    : "225px",
                attributes : ""
            },
            {
                value   : "250px",
                text    : "250px",
                attributes : ""
            },
            {
                value   : "275px",
                text    : "275px",
                attributes : ""
            },
            {
                value   : "300px",
                text    : "300px",
                attributes : ""
            }
        ];
        _html += elementForm().select('block-height','Altura','block',options);

        var dom = init().append(_html);

        // estableciendo logica para el MSISDN
        /*dom.find("#isMSISDN").click(function(){
            params.isMSISDN = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).attr("checked",params.isMSISDN === true);*/

        // slider
        dom.unbind("click");
        dom.unbind("change");
        dom.find("#block-range").change(function(){
            var value = ($(this).val()==="0" ? 0 : $(this).val() / 100);
            $this_element.css({"opacity":value});
            params.opacity = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.opacity);

        // color de fondo?
        dom.find("#fondo").click(function(){
            params.isImageBackground = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.isColor === true){
                $this_element.css("background",params.isImageBackground);
            } else {
                $this_element.css("background","none");
            }
            makeHTML().run();
        }).attr("checked",params.isImageBackground);

        dom.find("#imagenFondo").click(function(){
            params.isImagenFondo = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.isImagenFondo === true){
                $this_element.css("background-image",params.backgroundImage);
                $this_element.css('background-repeat',params.backgroundRepeat);
                $this_element.css('background-position', params.backgroundPosition);
                $this_element.css('background-size',params.backgroundSize);
            } else {
                $this_element.css("background-image","none");
            }
            makeHTML().run();
        }).attr("checked",params.isImagenFondo);

        // color
        dom.find("#block-color").change(function(){
            $this_element.css({"background-color":$(this).val()});
            params.backgroundColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            dom.find("#fondo").attr("checked",true);
            makeHTML().run();
        }).val(params.backgroundColor);

        // image background
        dom.find("#file-image").change(function(){

            var readURL = function(input) {

                if (input.files && input.files[0]) {
                    var reader = new FileReader();

                    reader.onload = function (e) {
                        params.backgroundImage = 'url("'+e.target.result+'")';
                        params.backgroundRepeat = 'no-repeat';
                        params.backgroundPosition = 'center center';
                        params.backgroundSize = 'cover';

                        $this_element.css('background-image',params.backgroundImage);
                        $this_element.css('background-repeat',params.backgroundRepeat);
                        /* $this_element.css('background-attachment','fixed');*/
                        $this_element.css('background-position', params.backgroundPosition);
                        $this_element.css('background-size',params.backgroundSize);

                        $("#imagenFondo").attr("checked",true);
                        $this_element.attr("params",JSON.stringify(params));
                    };

                    reader.readAsDataURL(input.files[0]);
                }
            }

            readURL(this);
            makeHTML().run();
        });

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });

        // align
        dom.find("#columns_aligns").change(function(){
            $this_element.removeClass("left");
            $this_element.removeClass("right");
            $this_element.addClass($(this).val());
            params.align = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.align);

        // align text
        dom.find("#text_aligns").change(function(){
            $this_element.removeClass("left-align");
            $this_element.removeClass("right-align");
            $this_element.removeClass("center-align");
            $this_element.addClass($(this).val());
            params.textAlign = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.textAlign);

        // altura
        /*dom.find("#block-height").keyup(function(){
            params.height = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("height",params.height);
            makeHTML().run();
        }).val(params.height);*/

        // altura
        dom.find("#block-height").change(function(){
            params.height = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("height",params.height);
            makeHTML().run();
        }).val(params.textAlign);

        // eventos del numero de bloques
        dom.find("#columns_block").change(function(){

            console.log("#"+$this_element.html());
            var block = ($this_element);

            block.removeClass("s1");
            block.removeClass("s2");
            block.removeClass("s3");
            block.removeClass("s4");
            block.removeClass("s5");
            block.removeClass("s6");
            block.removeClass("s7");
            block.removeClass("s8");
            block.removeClass("s9");
            block.removeClass("s10");
            block.removeClass("s11");
            block.removeClass("s12");

            params.c = $(this).val();
            block.addClass("s"+$(this).val());
            block.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.c);

        /*// width
        dom.find("#blockCaption").keyup(function(){
            params.width = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"width":params.width});
            makeHTML().run();
        }).val(params.width);*/
    };

    var button = function($this_element){
       $this_element.empty();
        var params = JSON.parse($this_element.attr("params"));
        var _html = "";
        _html += elementForm().button('drop','Borrar','button');
        _html += elementForm().inputText('buttonCaption','Etiqueta','button',true);
        _html += elementForm().inputText('buttonName','#Nombre del Boton','text',true);
        _html += elementForm().inputColor('buttonColor','Color de Fondo','button');
        _html += elementForm().inputColor('buttonTextColor','Color de Texto','button');
        _html += elementForm().inputRange('opacityRangeButton','Opacidad','button');
        _html += elementForm().inputText('buttonBorder','Borde, ej. 10px, 2%, 1em','button',true);
        _html += elementForm().inputColor('buttonBorderColor','Border Color','button');
        var options = [];

        options.push({value : "none", text : "none", attributes:"selected='selected'" });
        options.push({value : "hidden", text : "hidden", attributes:""});
        options.push({value : "dotted", text : "dotted", attributes:""});
        options.push({value : "solid", text : "solid", attributes:""});
        options.push({value : "double", text : "double", attributes:""});
        options.push({value : "groove", text : "groove", attributes:""});
        options.push({value : "ridge", text : "ridge", attributes:""});
        options.push({value : "inset", text : "inset", attributes:""});
        options.push({value : "outset", text : "outset", attributes:""});
        options.push({value : "dotted solid double dashed", text : "dotted2", attributes:""});
        options.push({value : "dotted solid", text : "dotted solid", attributes:""});
        options.push({value : "initial", text : "initial", attributes:""});

        _html += elementForm().select('buttonBorderStyle','Border Style','button',options);
        _html += elementForm().inputText('buttonTextSize','Tamaño de Texto, ej. 10px, 2%, 1em','button',true);
        _html += elementForm().inputText('buttonHeight','Altura, ej. 10px, 2%, 1em','button',true);
        _html += elementForm().inputText('buttonWidth','Altura, ej. 10px, 2%, 1em','button',true);

        options = [];
        options.push({value : "none", text : "none", attributes:""});
        options.push({value : "uppercase", text : "uppercase", attributes:""});
        _html += elementForm().select('buttonTextTransform','Transformacion','button',options);

        options = [];
        options.push({value : "Arial", text : "Arial", attributes:""});
        options.push({value : "Arial Black", text : "Arial Black", attributes:""});
        options.push({value : "Comic Sans MS", text : "Comic Sans MS", attributes:""});
        options.push({value : "Impact", text : "Impact", attributes:""});
        options.push({value : "Lucida Sans Unicode", text : "Lucida Sans Unicode", attributes:""});
        options.push({value : "Tahoma", text : "Tahoma", attributes:""});
        options.push({value : "Trebuchet MS", text : "Trebuchet MS", attributes:""});
        options.push({value : "Verdana", text : "Verdana", attributes:""});
        options.push({value : "Roboto", text : "Roboto", attributes:""});
        _html += elementForm().select('buttonFontFamily','Formato','button',options);
        _html += elementForm().inputText('action','URL Action Form or HREF','button',true);
        _html += elementForm().divSection('optionButtonAction','checkbox','button');

        var dom = init().append(_html);

        // insertando valores en el selector
        var optionsArr = [
            {value:"na" , text: "Ninguno"},
            {value:"action" , text: "Call to Action"},
            {value:"msisdn" , text: "MSISDN"},
            {value:"poll" , text: "Encuesta"}
        ];

        $("#optionButtonAction")
            .empty()
            .append(elementForm().divRadioBox("optionsActions","Seleccion de opcion","radioOptionsAction",optionsArr))
            .find("input").click(function(){

                params.actionType = $(this).val();
                params.esAction = $(this).val() === 'action';
                $this_element.attr("params",JSON.stringify(params));
                if (params.esAction === true){
                    params.action = params.href;
                    $this_element.attr("action", params.action);
                    delete params.href;
                    $this_element.removeAttr("href");
                }
                else {
                    params.href = params.action;
                    $this_element.attr("href", params.href);
                    delete params.action;
                    $this_element.removeAttr("action");
                }
                $this_element.attr("params",JSON.stringify(params))
                makeHTML().run();

        });

        // caption
        $this_element.text(params.caption);
        dom.find("#buttonCaption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.empty();
            $this_element.append(params.caption);
            makeHTML().run();
        }).val(params.caption);

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#buttonName").keyup(function(){
            params.buttonName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.buttonName);

        // opacity
        dom.find("#opacityRangeButton").change(function(){
            var value = ($(this).val()==="0" ? 0 : $(this).val() / 100);
            $this_element.css({"opacity":value});
            params.opacity = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.opacity);

        // background color
        dom.find("#buttonColor").change(function(){
            $this_element.css({"background-color":$(this).val()});
            params.backgroundColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.backgroundColor);

        // color de texto
        dom.find("#buttonTextColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.color);

        // borde
        dom.find("#buttonBorder").keyup(function(){
            params.border = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"border-width":params.border});
            makeHTML().run();
        }).val(params.border);

        // URL de la accion del formulario
        /*dom.find("#action").keyup(function(){
			debugger;
            params.action = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.action);*/

        // Nombres de los targets que estaran relacionados con el formulario
        dom.find("#elementForm").keyup(function(){
            params.elementForm = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.elementForm);

        /*// URL de la accion del formulario
        dom.find("#action").keyup(function(){
			debugger;
            params.action = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"border-width":params.action});
			$this_element.attr("action", $(this).val());
            makeHTML().run();
        }).val(params.action);*/

        // borde color
        dom.find("#buttonBorderColor").change(function(){
            $this_element.css({
                "border-color":$(this).val()
            });
            params.borderColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.borderColor);

        // border style
        dom.find("#buttonBorderStyle").change(function(){
            $this_element.css({"border-style":$(this).val()});
            params.borderStyle = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.borderStyle);

        // text size
        dom.find("#buttonTextSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
            makeHTML().run();
        }).val(params.textSize);

        // height
        dom.find("#buttonHeight").keyup(function(){
            params.height = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"height":params.height});
            makeHTML().run();
        }).val(params.height);

        // width
        dom.find("#buttonWidth").keyup(function(){
            params.width = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"width":params.width});
            makeHTML().run();
        }).val(params.width);

        // text transformacion
        dom.find("#buttonTextTransform").change(function(){
            $this_element.css({"text-transform":$(this).val()});
            params.textTransform = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.textTransform);

        // text type
        dom.find("#buttonFontFamily").change(function(){
            $this_element.css({"font-family":$(this).val()});
            params.fontFamily = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.fontFamily);
		
		 // URL de la accion o el href del formulario
        dom.find("#action").keyup(function(){
			var isChecked = dom.find("#esAction").is(":checked");
			if(isChecked){
				params.action = $(this).val();
				$this_element.attr("action", $(this).val());
				
				delete params.href;
				$this_element.removeAttr("href");
				
				$this_element.attr("params",JSON.stringify(params));
				
				makeHTML().run();
			}
			else{
				params.href = $(this).val();
				$this_element.attr("href", $(this).val());
				
				delete params.action;
				$this_element.removeAttr("action");
				
				$this_element.attr("params",JSON.stringify(params));
						
				makeHTML().run();
			}
        }).val(params.action);
		
		/* // URL del href del formulario
        dom.find("#href").keyup(function(){
			var isChecked = dom.find("#esAction").is(":checked");
			if(!isChecked){
				params.href = $(this).val();
				$this_element.attr("params",JSON.stringify(params));
				$this_element.attr("href", $(this).val());
				makeHTML().run();
			}
        }).val(params.action);*/
		
		// esAction
        dom.find("#esAction").click(function(){
            params.esAction = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.esAction === true){
				params.action = params.href;
				$this_element.attr("action", params.action);
				delete params.href;
				$this_element.removeAttr("href");
            } 
			else {
				params.href = params.action;
				$this_element.attr("href", params.href);
				delete params.action;
				$this_element.removeAttr("action");
            }
			$this_element.attr("params",JSON.stringify(params))
            makeHTML().run();
        }).attr("checked",params.link);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    var text = function($this_element){
        var params = JSON.parse($this_element.attr("params"));

        var _html = "";
        _html += elementForm().button('drop','Borrar','button');
        _html += elementForm().inputText('name','Nombre','text',true);
        _html += elementForm().inputText('buttonName','#Nombre del Boton','text',true);
        _html += elementForm().inputText('buttonCaption','Etiqueta','text',true);
        _html += elementForm().inputColor('buttonTextColor','Color de Texto','text');
        var options = [];
        options.push({value : "none", text : "none", attributes:""});
        options.push({value : "uppercase", text : "uppercase", attributes:""});
        _html += elementForm().select('buttonTextTransform','Transformacion','text',options);

        options = [];
        options.push({value : "Arial", text : "Arial", attributes:""});
        options.push({value : "Arial Black", text : "Arial Black", attributes:""});
        options.push({value : "Comic Sans MS", text : "Comic Sans MS", attributes:""});
        options.push({value : "Impact", text : "Impact", attributes:""});
        options.push({value : "Lucida Sans Unicode", text : "Lucida Sans Unicode", attributes:""});
        options.push({value : "Tahoma", text : "Tahoma", attributes:""});
        options.push({value : "Trebuchet MS", text : "Trebuchet MS", attributes:""});
        options.push({value : "Verdana", text : "Verdana", attributes:""});
        options.push({value : "Roboto", text : "Roboto", attributes:""});
        _html += elementForm().select('buttonFontFamily','Formato','button',options);
        _html += elementForm().beginGroupElement();
        _html += elementForm().checkbox('bold','Negrita','text');
        _html += elementForm().checkbox('italic','Italica','text');
        _html += elementForm().checkbox('subra','Subrayado','text');
        _html += elementForm().endGroupElement();
        _html += elementForm().inputText('marginLeft','Izquierdo, ej. 10px, 2%, 1em','text',true);
        _html += elementForm().inputText('marginRight','Derecho, ej. 10px, 2%, 1em','text',true);
        _html += elementForm().inputText('marginTop','Arriba, ej. 10px, 2%, 1em','text',true);
        _html += elementForm().inputText('marginBottom','Abajo, ej. 10px, 2%, 1em','text',true);
        _html += elementForm().inputText('textSize','Tamaño de Texto, ej. 10px, 2%, 1em','text',true);
        _html += elementForm().beginGroupElement();
        _html += elementForm().checkbox('link','Hipervinculo','text');
        _html += elementForm().inputColor('buttonTextColorLink','Color de Link','text');
        _html += elementForm().inputText('linkHiper','Hipervinculo','text',true);
        _html += elementForm().endGroupElement();

        _html += elementForm().beginGroupElement();
        _html += elementForm().checkbox('isPoll','Es Encuesta?','checkbox',true);
        // lista de encuestas ajax1
        var options = [];
        $.ajax({
            url: host+"encuestas",
            method: "GET",
            dataType: "JSON",
            contentType: "application/json"
        }).done(function(poll) {
            //var poll = '[{"id":4,"nombre":"Alma Guia Demo"},{"id":1,"nombre":"Encuesta De Prueba"}]';
            $.each(/*JSON.parse*/(poll), function(i,object){
                var option = {value : object.id, text : object.nombre};
                options.push(option);
            });
            dom.find("#poll").empty();
            var html_options = "";
            $(options).each(function(i,obj){
                html_options += '<option value="'+obj.value+'">'+obj.text+'</option>';
            });
            dom.find("#poll").append(html_options);
            dom.find("#poll").trigger("change");
        });

        _html += elementForm().select('poll','Encuesta','checkbox',options);
        _html += elementForm().divSection('listCheckBox','checkbox','Preguntas');
        _html += elementForm().endGroupElement();

        var dom = init().append(_html);

        // eventos del numero de bloques
        dom.find("#poll").change(function(){
            params.pollSelected = $(this).val();

            $.ajax({
                url: host+"preguntas/"+params.pollSelected,
                method: "GET",
                dataType: "JSON",
                contentType: "application/json"
            }).done(function(option) {

                //var option = JSON.parse('[{"id":7,"planteamiento":"como?","encuestas":1},{"id":2,"planteamiento":"Cual es su Color Favorito?..","encuestas":1},{"id":6,"planteamiento":"que?","encuestas":1},{"id":1,"planteamiento":"Que dia de la Semana Prefiere?","encuestas":1},{"id":3,"planteamiento":"Tu Edad Esta Entre:","encuestas":1}]');
                var polls = [];
                $.each(option,function(i,object){
                    polls.push({value:object.id,text:object.planteamiento});
                });

                $("#listCheckBox")
                    .empty()
                    .append(elementForm().divRadioBox("pollListRadio","Lista de Preguntas","ListPollQuestion",polls))
                    .find("input").click(function(e){
                    parameters_checkbox = {text : $(this).parent().find("label").text(), value:$(this).attr("value")};
                    if (dom.find("#isPoll").is(":checked")){
                        $this_element.text(parameters_checkbox.text);
                        params.questionSelect = parameters_checkbox.value;
                        $this_element.attr("params",JSON.stringify(params));
                    }
                })
                ;
                $this_element.attr("params",JSON.stringify(params));
                makeHTML().run();
            });
        }).val(params.pollSelected);

        // si es poll encuesta se le agrega la clase que posteriormente sera visible al generar el html
        var parameters_checkbox = {};
        dom.find("#isPoll").click(function(){
            params.isPoll = $(this).is(":checked");

            if (params.isPoll === true){
                $this_element.find("label:eq(0)").text(parameters_checkbox.text);
                $this_element.find("input:eq(0)").val(parameters_checkbox.value);
            }

            $this_element.attr("params",JSON.stringify(params));

            makeHTML().run();
        }).attr("checked",params.isPoll === true);

        // name
        dom.find("#name").keyup(function(){
            params.name = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.attr("id",params.name);
            $this_element.attr("name",params.name);
            makeHTML().run();
        }).val(params.name);

        //target

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#buttonName").keyup(function(){
            params.buttonName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.buttonName);

        // caption
        $this_element.text(params.caption);
        dom.find("#buttonCaption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.empty();
            $this_element.append(params.caption);
            makeHTML().run();
        }).val(params.caption);

        // color de texto
        dom.find("#buttonTextColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.color);

        // text transformacion
        dom.find("#buttonTextTransform").change(function(){
            $this_element.css({"text-transform":$(this).val()});
            params.textTransform = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.textTransform);

        // text type
        dom.find("#buttonFontFamily").change(function(){
            $this_element.css({"font-family":$(this).val()});
            params.fontFamily = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.fontFamily);

        // margin left
        dom.find("#marginLeft").keyup(function(){
            params.marginLeft = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-left",params.marginLeft);
            makeHTML().run();
        }).val(params.marginLeft);

        // margin right
        dom.find("#marginRight").keyup(function(){
            params.marginRight = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-right",params.marginRight);
            makeHTML().run();
        }).val(params.marginRight);

        // margin top
        dom.find("#marginTop").keyup(function(){
            params.marginTop = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-top",params.marginTop);
            makeHTML().run();
        }).val(params.marginTop);

        // margin buttom
        dom.find("#marginBottom").keyup(function(){
            params.marginBottom = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-bottom",params.marginBottom);
            makeHTML().run();
        }).val(params.marginBottom);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            /*$this_element.css("margin-right",params.link);*/
            if (params.link === true){
                $this_element.wrap("<a href='"+params.url+"'></a>")
                    .css({"color":params.colorLink});
            } else {
                $this_element.unwrap();
            }
            makeHTML().run();
        }).attr("checked",params.link);

        // bold
        dom.find("#bold").click(function(){
            params.bold = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.bold === true){
                $this_element.css("font-weight","bold");
            } else {
                $this_element.css("font-weight","normal");
            }
            makeHTML().run();
        }).attr("checked",params.bold);

        // italic
        dom.find("#italic").click(function(){
            params.italic = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.italic === true){
                $this_element.css("font-style","italic");
            } else {
                $this_element.css("font-style","normal");
            }
            makeHTML().run();
        }).attr("checked",params.italic);

        // italic
        dom.find("#subra").click(function(){
            params.subra = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.subra === true){
                $this_element.css("text-decoration","underline");
            } else {
                $this_element.css("text-decoration","initial");
            }
            makeHTML().run();
        }).attr("checked",params.subra);

        // text size
        dom.find("#textSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
            makeHTML().run();
        }).val(params.textSize);

        // color de link
        dom.find("#buttonTextColorLink").change(function(){
            $this_element.parent().css({"color":$(this).val()});
            params.colorLink = $(this).val();
            $this_element.parent().attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.colorLink);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            if ($this_element.parent().is("a") === true)
                $this_element.parent().attr("href",params.url);
            makeHTML().run();
        }).val(params.url);

        // is get data
        dom.find("#isGetData").click(function(){
            params.isGetData = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).attr("checked",params.isGetData);

        // get data from URL
        dom.find("#getData").keyup(function(){
            params.getData = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.getData);

        // borrar
        dom.find("#drop").click(function(){
            makeHTML().run();
            $this_element.remove();
        });
    };

    var video = function($this_element){
        var params = JSON.parse($this_element.attr("params"));

        var _html = "";
        _html += elementForm().button('drop','Borrar','video');
        _html += elementForm().inputText('urlVideo','URL','video',true);
        _html += elementForm().checkbox('autoplay','Autoplay','video');
        _html += elementForm().checkbox('loop','Loop','video');

        var dom = init().append(_html);

        // ruta del video
        dom.find("#urlVideo").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("source").attr("src",params.url);
            $this_element[0].load();
            makeHTML().run();
        }).val(params.url);

        // autoload
        dom.find("#autoplay").click(function(){
            params.autoplay = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.autoplay === true){
                $this_element.attr("autoload","autoload");
            } else {
                $this_element.removeAttr("autoload");
            }
            makeHTML().run();
        }).attr("checked",params.autoplay);

        // loop
        dom.find("#loop").click(function(){
            params.loop = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.loop === true){
                $this_element.attr("loop","loop");
            } else {
                $this_element.removeAttr("loop");
            }
            makeHTML().run();
        }).attr("checked",params.loop);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    var rrss = function($this_element){
        var params = JSON.parse($this_element.attr("params"));

        var _html = "";
        var icons = [];
        icons.push({value : "icon-twitter", text : "twitter", attributes:""});
        icons.push({value : "icon-instagram", text : "instagram", attributes:""});
        icons.push({value : "icon-facebook", text : "facebook", attributes:""});
        icons.push({value : "icon-dislike2", text : "dislike2", attributes:""});
        icons.push({value : "icon-like2", text : "like2", attributes:""});
        icons.push({value : "icon-dislike-outline", text : "outline", attributes:""});

        _html += elementForm().button('drop','Borrar','rrss');
        _html += elementForm().select('icon','Iconos','rrss',icons);
        _html += elementForm().inputText('textSize','Tamaño de Texto, ej. 10px, 2%, 1em','rrss',true);
        _html += elementForm().inputColor('textColor','Color de Texto','rrss');
        _html += elementForm().beginGroupElement();
        _html += elementForm().checkbox('link','Hipervinculo','rrss');
        _html += elementForm().inputText('linkHiper','Link','rrss',true);
        _html += elementForm().inputColor('buttonTextColorLink','Color de Link','text');
        _html += elementForm().endGroupElement();

        var dom = init().append(_html);

        // color de texto
        dom.find("#textColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.color);

        // text size
        dom.find("#textSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
            makeHTML().run();
        }).val(params.textSize);

        // text transformacion
        dom.find("#icon").change(function(){
            $.each(icons,function(i,icon){
                $this_element.removeClass(icon.value);
            });
            params.icon = $(this).val();
            $this_element.addClass(params.icon);
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.icon);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            /*$this_element.css("margin-right",params.link);*/
            if (params.link === true){
                $this_element.wrap("<a href='"+params.url+"'></a>")
                    .css({"color":params.colorLink});
            } else {
                $this_element.unwrap();
            }
            makeHTML().run();
        }).attr("checked",params.link);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.parent().attr("href",params.url);
            makeHTML().run();
        }).val(params.url);

        // color de link
        dom.find("#buttonTextColorLink").change(function(){
            $this_element.parent().css({"color":$(this).val()});
            params.colorLink = $(this).val();
            $this_element.parent().attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.colorLink);

        dom.find("#drop").click(function(){
            $this_element.remove()
            makeHTML().run();
        });
    };

    var radioOption = function($this_element){
        var params = JSON.parse($this_element.attr("params"));
        var _html = "";

        _html += elementForm().button('drop','Borrar','all');
        _html += elementForm().inputText('inputName','Nombre','radio',true);
        _html += elementForm().inputText('buttonName','#Nombre del Boton','radio',true);
        _html += elementForm().inputText('caption','Etiqueta','radio',true);
        _html += elementForm().inputText('group','Grupo','radio',true);
        _html += elementForm().inputText('value','Valor','radio',true);

        _html += elementForm().checkbox('isPoll','Es Encuesta?','checkbox',false);

        // lista de encuestas ajax1
        var options = [];
        $.ajax({
            url: host+"encuestas",
            method: "GET",
            dataType: "JSON",
            contentType: "application/json"
        }).done(function(poll) {
            //var poll = '[{"id":4,"nombre":"Alma Guia Demo"},{"id":1,"nombre":"Encuesta De Prueba"}]';
            $.each(/*JSON.parse*/(poll), function(i,object){
                var option = {value : object.id, text : object.nombre};
                options.push(option);
            });
            dom.find("#poll").empty();
            var html_options = "";
            $(options).each(function(i,obj){
                html_options += '<option value="'+obj.value+'">'+obj.text+'</option>';
            });
            dom.find("#poll").append(html_options);
            dom.find("#poll").trigger("change");
        });

        _html += elementForm().select('poll','Encuesta','checkbox',options);
        _html += elementForm().divSection('listCheckBoxRadio','checkbox','Preguntas');
        _html += elementForm().divSection('optionsQuestions','checkbox','Opciones');

        var dom = init().append(_html);

        // eventos del numero de bloques
        dom.find("#poll").change(function(){

            params.pollSelected = $(this).val();

            $.ajax({
                url: host+"preguntas/"+params.pollSelected,
                method: "GET",
                dataType: "JSON",
                contentType: "application/json"
            }).done(function(option) {

                //var option = JSON.parse('[{"id":7,"planteamiento":"como?","encuestas":1},{"id":2,"planteamiento":"Cual es su Color Favorito?..","encuestas":1},{"id":6,"planteamiento":"que?","encuestas":1},{"id":1,"planteamiento":"Que dia de la Semana Prefiere?","encuestas":1},{"id":3,"planteamiento":"Tu Edad Esta Entre:","encuestas":1}]');
                var polls = [];
                $.each(option,function(i,object){
                    polls.push({value:object.id,text:object.planteamiento});
                });

                $("#listCheckBoxRadio")
                    .empty()
                    .append(elementForm().divRadioBox("pollListRadio3","Lista de Preguntas","ListPollQuestion3",polls))
                    .find("input").click(function(e){
                    parameters_checkbox = {/*text : $(this).parent().find("label").text(),*/ value:$(this).attr("value")};

                    $.ajax({
                        url: host+"opciones/"+parameters_checkbox.value,
                        method: "GET",
                        dataType: "JSON",
                        contentType: "application/json"
                    }).done(function(option) {

                        var questions = [];
                        $.each(option, function (i, object) {
                            questions.push({value: object.id, text: object.opcion});
                        });

                        $("#optionsQuestions")
                            .empty()
                            .append(elementForm().divRadioBox("optionsQuestions","Lista de Opciones","ListPollQuestionRadio",questions))
                            .find("input").click(function(){
                            if (dom.find("#isPoll").is(":checked")){
                                $this_element.find("label:eq(0)").text($(this).parent().find("label[for='"+$(this).attr("id")+"']").text());
                                $this_element.find("input:eq(0)").val($(this).val());
                            }
                        });
                    });
                });

                $this_element.attr("params",JSON.stringify(params));
                makeHTML().run();
            });
        }).val(params.pollSelected);

        // si es poll encuesta se le agrega la clase que posteriormente sera visible al generar el html
        var parameters_checkbox = {};
        dom.find("#isPoll").click(function(){
            params.isPoll = $(this).is(":checked");

            if (params.isPoll === true){
                $this_element.find("label:eq(0)").text(parameters_checkbox.text);
                $this_element.find("input:eq(0)").val(parameters_checkbox.value);
            }

            $this_element.attr("params",JSON.stringify(params));

            makeHTML().run();
        }).attr("checked",params.isPoll === true);

        // valor
        dom.find("#value").keyup(function(){
            params.value = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("value",params.value);
            makeHTML().run();
        }).val(params.value);

        //target

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#buttonName").keyup(function(){
            params.buttonName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.buttonName);

        // input name, cambiando nombre y id
        dom.find("#inputName").keyup(function(){
            params.inputName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("id",params.inputName);
            $this_element.find("label").attr("for",params.inputName);
            makeHTML().run();
        }).val(params.inputName);

        // input name, cambiando nombre y id
        dom.find("#caption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("label").text(params.caption);
            makeHTML().run();
        }).val(params.caption);

        // input name, cambiando nombre y id
        dom.find("#group").keyup(function(){
            params.group = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("name",params.group);
            makeHTML().run();
        }).val(params.group);

        dom.unbind("click");
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    var inputText = function($this_element){

        var params = JSON.parse($this_element.attr("params"));
        var _html = "";

        _html += elementForm().button('drop','Borrar','all');
        _html += elementForm().inputText('inputName','Nombre','inputText',true);
        _html += elementForm().inputText('inputCaption','Etiqueta','inputText',true);
        _html += elementForm().validator('validator','inputText');
        _html += elementForm().checkbox('isCalendar','Es Calendario?','inputText',true);
        _html += elementForm().checkbox('isMSISDN','Establecer MSISDN','inputText',false);
        _html += elementForm().divSection('optionActionText','checkbox','inputText');

        var dom = init().append(_html);

        // insertando valores en el selector
        var optionsArr = [
            {value:"na" , text: "Ninguno"},
            /*{value:"action" , text: "Call to Action"},*/
            /*{value:"msisdn" , text: "MSISDN"},*/
            {value:"msisdn" , text: "MSISDN"}
        ];

        $("#optionActionText")
            .empty()
            .append(elementForm().divRadioBox("optionsActions","Seleccion de opcion","optionActionText",optionsArr))
            .find("input").click(function(){
                params.actionType = $(this).val();
                $this_element.attr("params",JSON.stringify(params));
                makeHTML().run();
            });

        // estableciendo logica para el MSISDN
        /*dom.find("#isMSISDN").click(function(){
            params.isMSISDN = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).attr("checked",params.isMSISDN === true);*/

        dom.find("[name='validator']").click(function(){
            params.validator = $(this).attr("values");
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.validator);

        // input caption
        dom.find("#inputCaption").keyup(function(){
            params.inputCaption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("label").text(params.inputCaption);
            makeHTML().run();
        }).val(params.inputCaption);

        // input name, cambiando nombre y id
        dom.find("#inputName").keyup(function(){
            params.inputName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("id",params.inputName);
            $this_element.find("input").attr("name",params.inputName);
            makeHTML().run();
        }).val(params.inputName);

        // si es datapicker se le agrega la clase que posteriormente sera visible al generar el html
        dom.find("#isCalendar").click(function(){
            params.isCalendar = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            if (params.isCalendar === true){
                $this_element.find("input").addClass("datepicker");
            } else {
                $this_element.find("input").removeClass("datepicker");
            }
            makeHTML().run();
        }).attr("checked",params.isCalendar === true);

        dom.unbind("click");

        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    var inputSelect = function($this_element){
        //$this_element.attr("disabled","disabled");
        var params = JSON.parse($this_element.attr("params"));
        var _html = "";

        _html += elementForm().button('drop','Borrar','all');
        _html += elementForm().inputText('inputSelectName','Nombre','inputSelectText',true);
        _html += elementForm().inputText('buttonName','#Nombre del Boton','inputSelectText',true);
        _html += elementForm().inputText('inputSelectCaption','Etiqueta','inputSelectText',true);
        _html += elementForm().inputTextIn('inputOptionValue','Valores: [{"option":"a","caption":"a"}]','inputSelectText',true);

        $this_element.empty();
        $this_element.append("<div class='input-field col s12'><select disabled></select><label>Materialize Select</label></div>");

        var dom = init().append(_html);

        // identificador unico del elemento del formulario
        dom.find("#inputSelectName").keyup(function(){
            params.inputName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("id",params.inputName);
            $this_element.find("input").attr("name",params.inputName);
            makeHTML().run();
        }).val(params.inputName);

        // input caption select label
        if (params.inputSelectCaption !== undefined) $this_element.parent().find("label").text(params.inputSelectCaption);
        dom.find("#inputSelectCaption").keyup(function(){
            params.inputSelectCaption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("label").text(params.inputSelectCaption);
            makeHTML().run();
        }).val(params.inputSelectCaption);

        var formatSelect = function(){
            var json_object = [];
            var select =  $this_element.find("select");
            try{
                $this_element.attr("params",JSON.stringify(params));
                json_object = JSON.parse((params.inputOptionValue));
                select.empty();
                $.each(json_object,function(i,value){
                    select.append("<option value='"+value.option+"'>"+value.caption+"</option>")
                });
            } catch (e) {
                select.empty();
            }
            $('select').material_select();
            makeHTML().run();
        };
        if (params.inputOptionValue !== undefined) formatSelect();
        dom.find("#inputOptionValue").keyup(function(){
            params.inputOptionValue = $(this).val();
            formatSelect();
        }).val(params.inputOptionValue);

        var group = dom.find("#inputOptionValue").parents("[group]:eq(0)");
        var selectOptions = [];
        var option = {};
        var inputOption = dom.find("#inputOptionValue");

        group.find(".btn1").click(function(){
            var name = group.find("input[name='name']").val();
            var value = group.find("input[name='value']").val();
            selectOptions.push({option:name,caption:value});
            inputOption.val(JSON.stringify(selectOptions));
            inputOption.trigger("keyup");
        });

        group.find(".btn2").click(function(){
            selectOptions = [];
            inputOption.val("");
            inputOption.trigger("keyup");
        });

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#buttonName").keyup(function(){
            params.buttonName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.buttonName);

        dom.unbind("click");
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });

        $('select').material_select();

    };

    var checkbox = function ($this_element) {
        var params = JSON.parse($this_element.attr("params"));
        var _html = "";

        _html += elementForm().button('drop','Borrar','all');
        _html += elementForm().inputText('inputName','Name','checkbox',true);
        _html += elementForm().inputText('buttonName','#Nombre del Boton','checkbox',true);
        _html += elementForm().inputText('caption','Caption','checkbox',true);
        _html += elementForm().inputText('value','Valor','checkbox',true);
        _html += elementForm().checkbox('isPoll','Es Encuesta?','checkbox',true);

        // lista de encuestas ajax1
        var options = [];
        $.ajax({
            url: host+"encuestas",
            method: "GET",
            dataType: "JSON",
            contentType: "application/json"
        }).done(function(poll) {
            //var poll = '[{"id":4,"nombre":"Alma Guia Demo"},{"id":1,"nombre":"Encuesta De Prueba"}]';
            $.each(/*JSON.parse*/(poll), function(i,object){
                var option = {value : object.id, text : object.nombre};
                options.push(option);
            });
            dom.find("#poll").empty();
            var html_options = "";
            $(options).each(function(i,obj){
                html_options += '<option value="'+obj.value+'">'+obj.text+'</option>';
            });
            dom.find("#poll").append(html_options);
            dom.find("#poll").trigger("change");
        });

        _html += elementForm().select('poll','Encuesta','checkbox',options);
        _html += elementForm().divSection('listCheckBox','checkbox','Preguntas');
        _html += elementForm().divSection('optionsQuestions','checkbox','Opciones');

        var dom = init().append(_html);

        // eventos del numero de bloques
        dom.find("#poll").change(function(){
            params.pollSelected = $(this).val();

            $.ajax({
                url: host+"preguntas/"+params.pollSelected,
                method: "GET",
                dataType: "JSON",
                contentType: "application/json"
            }).done(function(option) {

                //var option = JSON.parse('[{"id":7,"planteamiento":"como?","encuestas":1},{"id":2,"planteamiento":"Cual es su Color Favorito?..","encuestas":1},{"id":6,"planteamiento":"que?","encuestas":1},{"id":1,"planteamiento":"Que dia de la Semana Prefiere?","encuestas":1},{"id":3,"planteamiento":"Tu Edad Esta Entre:","encuestas":1}]');
                var polls = [];
                $.each(option,function(i,object){
                    polls.push({value:object.id,text:object.planteamiento});
                });

                $("#listCheckBox")
                    .empty()
                    .append(elementForm().divRadioBox("pollListRadio","Lista de Preguntas","ListPollQuestion",polls))
                    .find("input").click(function(e){
                        parameters_checkbox = {/*text : $(this).parent().find("label").text(),*/ value:$(this).attr("value")};

                        $.ajax({
                            url: host+"opciones/"+parameters_checkbox.value,
                            method: "GET",
                            dataType: "JSON",
                            contentType: "application/json"
                        }).done(function(option) {

                            var questions = [];
                            $.each(option, function (i, object) {
                                questions.push({value: object.id, text: object.opcion});
                            });

                            $("#optionsQuestions")
                                .empty()
                                .append(elementForm().divRadioBox("optionsQuestions","Lista de Opciones","ListPollQuestion2",questions))
                                .find("input").click(function(){
                                    if (dom.find("#isPoll").is(":checked")){
                                        $this_element.find("label:eq(0)").text($(this).parent().find("label[for='"+$(this).attr("id")+"']").text());
                                        $this_element.find("input:eq(0)").val($(this).val());
                                    }
                                });
                        });
                    });
                ;
                $this_element.attr("params",JSON.stringify(params));
                makeHTML().run();
            });
        }).val(params.pollSelected);

        // si es poll encuesta se le agrega la clase que posteriormente sera visible al generar el html
        var parameters_checkbox = {};
        dom.find("#isPoll").click(function(){
            params.isPoll = $(this).is(":checked");

            if (params.isPoll === true){
                $this_element.find("label:eq(0)").text(parameters_checkbox.text);
                $this_element.find("input:eq(0)").val(parameters_checkbox.value);
            }

            $this_element.attr("params",JSON.stringify(params));
            /*if (params.isPoll === true){
                $this_element.find("input").addClass("datepicker");
            } else {
                $this_element.find("input").removeClass("datepicker");
            }*/

            makeHTML().run();
        }).attr("checked",params.isPoll === true);

        // valor
        dom.find("#value").keyup(function(){
            params.value = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("value",params.value);
            makeHTML().run();
        }).val(params.value);

        // name target, es el nombre del componente a relacionar con el influenciador
        dom.find("#buttonName").keyup(function(){
            params.buttonName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            makeHTML().run();
        }).val(params.buttonName);

        // input name, cambiando nombre y id
        dom.find("#inputName").keyup(function(){
            params.inputName = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("input").attr("id",params.inputName);
            $this_element.find("input").attr("name",params.inputName);
            $this_element.find("label").attr("for",params.inputName);
            makeHTML().run();
        }).val(params.inputName);

        // input name, cambiando nombre y id
        dom.find("#caption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("label").text(params.caption);
            makeHTML().run();
        }).val(params.caption);

        dom.unbind("click");
        dom.find("#drop").click(function(){
            $this_element.remove();
            makeHTML().run();
        });
    };

    return {
        Block       : block,
        None        : none,
        Imagen      : imagen,
        Button      : button,
        Text        : text,
        Video       : video,
        Rrss        : rrss,
        Radios      : radioOption,
        InputText   : inputText,
        InputSelect : inputSelect,
        Checkboxs   : checkbox,
        Body        : body
    }
};
