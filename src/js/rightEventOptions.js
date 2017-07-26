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

        var _html = elementForm().inputText('blockCaption','Etiqueta','block',true);

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

        // width
        dom.find("#blockCaption").keyup(function(){
            params.width = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"width":params.width});
        }).val(params.width);
    };

    var button = function($this_element){
       $this_element.empty();
        var params = JSON.parse($this_element.attr("params"));

        var _html = elementForm().inputText('buttonCaption','Etiqueta','button',true);
        _html += elementForm().inputColor('buttonColor','Color de Fondo','button');
        _html += elementForm().inputColor('buttonTextColor','Color de Texto','button');
        _html += elementForm().inputRange('opacityRangeButton','Opacidad','button');
        _html += elementForm().inputText('buttonBorder','Borde, ej. 10px, 2%, 1em','button');
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
        _html += elementForm().inputText('buttonTextSize','Text Size, ej. 10px, 2%, 1em','button');
        _html += elementForm().inputText('buttonHeight','Height, ej. 10px, 2%, 1em','button');
        _html += elementForm().inputText('buttonWidth','Width, ej. 10px, 2%, 1em','button');

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
        _html += elementForm().select('buttonFontFamily','Estilo','button',options);

        _html += elementForm().button('drop','Borrar','button');
        var dom = init().append(_html);

        // caption
        $this_element.text(params.caption);
        dom.find("#buttonCaption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.empty();
            $this_element.append(params.caption);
        }).val(params.caption);

        // opacity
        dom.find("#opacityRangeButton").change(function(){
            var value = ($(this).val()==="0" ? 0 : $(this).val() / 100);
            $this_element.css({"opacity":value});
            params.opacity = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.opacity);

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

        // borde
        dom.find("#buttonBorder").keyup(function(){
            params.border = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"border-width":params.border});
        }).val(params.border);

        // borde color
        dom.find("#buttonBorderColor").change(function(){
            $this_element.css({
                "border-color":$(this).val()
            });
            params.borderColor = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.borderColor);

        // border style
        dom.find("#buttonBorderStyle").change(function(){
            $this_element.css({"border-style":$(this).val()});
            params.borderStyle = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.borderStyle);

        // text size
        dom.find("#buttonTextSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
        }).val(params.textSize);

        // height
        dom.find("#buttonHeight").keyup(function(){
            params.height = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"height":params.height});
        }).val(params.height);

        // width
        dom.find("#buttonWidth").keyup(function(){
            params.width = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"width":params.width});
        }).val(params.width);

        // text transformacion
        dom.find("#buttonTextTransform").change(function(){
            $this_element.css({"text-transform":$(this).val()});
            params.textTransform = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.textTransform);

        // text type
        dom.find("#buttonFontFamily").change(function(){
            $this_element.css({"font-family":$(this).val()});
            params.fontFamily = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.fontFamily);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
    };

    var text = function($this_element){
        var params = JSON.parse($this_element.attr("params"));

        var _html = elementForm().inputText('buttonCaption','Etiqueta','text',true);
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
        _html += elementForm().select('buttonFontFamily','Estilo','button',options);
        _html += elementForm().inputText('marginLeft','Margin Left, ej. 10px, 2%, 1em','text');
        _html += elementForm().inputText('marginRight','Margin Right, ej. 10px, 2%, 1em','text');
        _html += elementForm().checkbox('link','Hipervinculo','text');
        _html += elementForm().button('drop','Borrar','button');
        var dom = init().append(_html);

        // caption
        $this_element.text(params.caption);
        dom.find("#buttonCaption").keyup(function(){
            params.caption = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.empty();
            $this_element.append(params.caption);
        }).val(params.caption);

        // color de texto
        dom.find("#buttonTextColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.color);

        // text transformacion
        dom.find("#buttonTextTransform").change(function(){
            $this_element.css({"text-transform":$(this).val()});
            params.textTransform = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.textTransform);

        // text type
        dom.find("#buttonFontFamily").change(function(){
            $this_element.css({"font-family":$(this).val()});
            params.fontFamily = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.fontFamily);

        // margin left
        dom.find("#marginLeft").keyup(function(){
            params.marginLeft = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-left",params.marginLeft);
        }).val(params.marginLeft);

        // margin right
        dom.find("#marginRight").keyup(function(){
            params.marginRight = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-right",params.marginRight);
        }).val(params.marginRight);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-right",params.link);
            if (params.link === true){
                $this_element.wrap("<a></a>");
            } else {
                $this_element.unwrap();
            }
        }).val(params.link);

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
        Text    : text,
    }
};
