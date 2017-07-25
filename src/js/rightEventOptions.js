module.exports = function () {
    var elementForm = require('./elementsForm');

    var init = function(){
        return $("#content-right")
            .find("div.container:eq(0)").empty();
    };

    var imagen = function($this_element){


        var _html = elementForm().inputFile('file-image','Imagen','image');
        _html += elementForm().button('drop','Borrar','all');
        var dom = init().append(_html);

        function readURL(input) {

            if (input.files && input.files[0]) {
                var reader = new FileReader();

                reader.onload = function (e) {
                    $this_element.find("img").attr("src",e.target.result);
                };

                reader.readAsDataURL(input.files[0]);
            }
        }
        // file
        dom.find("#file-image").change(function(){
            readURL(this);
        });
        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });

    };

    var none = function($this_element){
        var _html = elementForm().button('drop','Borrar','all');
        var dom = init().append(_html);
        dom.unbind("click");
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
    };

    var block = function($this_element){
        //var _html = elementForm().checkbox('color_block','color','block');
        var _html = "";

        var params = JSON.parse($this_element.attr("params"));

        var options = [];
        if (params.align === undefined){

        }

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

        // creacion de los bordes
        /*var options = [
            {
                value   : "0",
                text    : "Sin bordes",
                attributes : "selected"
            }
        ];

        for (var i= 1 ; i <= 4; i++){
            options.push({value : i, text : i, attributes:""})
        }

        _html += elementForm().select('border_block','Borde','block',options);*/


        _html += elementForm().inputColor('block-color','Color de Fondo','block');

        _html += elementForm().inputRange('block-range','Opacidad','block');

        _html += elementForm().inputText('block-height','Altura, ej. 10px, 2%, 1em','block');

        _html += elementForm().button('drop','Borrar','all');

        var dom = init().append(_html);
        dom.unbind("click");
        dom.unbind("change");

        // slider
        dom.find("#block-range").change(function(){
            var value = ($(this).val()==="0" ? 0 : $(this).val() / 100);
            $this_element.css({"opacity":value});
            params.opacity = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.opacity);
        // color
        dom.find("#block-color").change(function(){
            $this_element.css({"background-color":$(this).val()});
            params.backgroundColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.backgroundColor);
        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
        // align
        dom.find("#columns_aligns").change(function(){
            $this_element.removeClass("left");
            $this_element.removeClass("right");
            $this_element.addClass($(this).val());
            params.align = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.align);
        // align text
        dom.find("#text_aligns").change(function(){
            $this_element.removeClass("left-align");
            $this_element.removeClass("right-align");
            $this_element.removeClass("center-align");
            $this_element.addClass($(this).val());
            params.textAlign = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.textAlign);

        // altura
        dom.find("#block-height").keyup(function(){
            params.height = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("height",params.height);
        }).val(params.height);

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
        }).val(params.c);
    };

    var button = function($this_element){
        console.log($this_element.html());
        var params = JSON.parse($this_element.attr("params"));

        // background color
        var _html = elementForm().inputColor('buttonColor','Color de Fondo','button');
        _html += elementForm().inputColor('buttonTextColor','Color de Texto','button');
        _html += elementForm().button('drop','Borrar','button');
        var dom = init().append(_html);

        // background color
        dom.find("#buttonColor").change(function(){
            $this_element.css({"background-color":$(this).val()});
            params.backgroundColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.backgroundColor);

        // color de texto
        dom.find("#buttonTextColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.color);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
    };

    return {
        Block   : block,
        None    : none,
        Imagen  : imagen,
        Button  : button,
    }
};
