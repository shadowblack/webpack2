module.exports = function () {
    var elementForm = require('./elementsForm'),
    makeHTML = require('./makeHTML');

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

        /*var _html = elementForm().inputText('blockCaption','Etiqueta','block',true);*/

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
            makeHTML().run();
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

        /*// width
        dom.find("#blockCaption").keyup(function(){
            params.width = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"width":params.width});
        }).val(params.width);*/
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
        _html += elementForm().checkbox('bold','Bold','text');
        _html += elementForm().checkbox('italic','Italic','text');
        _html += elementForm().checkbox('subra','Subrayate','text');
        _html += elementForm().inputText('marginLeft','Margin Left, ej. 10px, 2%, 1em','text');
        _html += elementForm().inputText('marginRight','Margin Right, ej. 10px, 2%, 1em','text');
        _html += elementForm().inputText('marginTop','Margin Top, ej. 10px, 2%, 1em','text');
        _html += elementForm().inputText('marginBottom','Margin Buttom, ej. 10px, 2%, 1em','text');
        _html += elementForm().inputText('textSize','Text Size, ej. 10px, 2%, 1em','text');
        _html += elementForm().checkbox('link','Hipervinculo','text');
        _html += elementForm().inputColor('buttonTextColorLink','Color de Link','text');
        _html += elementForm().inputText('linkHiper','Hipervinculo','text',true);
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

        // margin top
        dom.find("#marginTop").keyup(function(){
            params.marginTop = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-top",params.marginTop);
        }).val(params.marginTop);

        // margin buttom
        dom.find("#marginBottom").keyup(function(){
            params.marginBottom = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-bottom",params.marginBottom);
        }).val(params.marginBottom);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-right",params.link);
            if (params.link === true){
                $this_element.wrap("<a href='"+params.url+"'></a>")
                    .css({"color":params.colorLink});
            } else {
                $this_element.unwrap();
            }
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
        }).attr("checked",params.subra);

        // text size
        dom.find("#textSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
        }).val(params.textSize);

        // color de link
        dom.find("#buttonTextColorLink").change(function(){
            $this_element.parent().css({"color":$(this).val()});
            params.colorLink = $(this).val();
            $this_element.parent().attr("params",JSON.stringify(params))
        }).val(params.colorLink);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.parent().attr("src",params.url);
        }).val(params.url);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
    };

    var video = function($this_element){
        var params = JSON.parse($this_element.attr("params"));

        var _html = "";
        _html += elementForm().inputText('linkHiper','Hipervinculo','video',true);
        _html += elementForm().checkbox('autoplay','Autoplay','video');
        _html += elementForm().checkbox('loop','Loop','video');
        _html += elementForm().button('drop','Borrar','video');

        var dom = init().append(_html);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.find("source").attr("src",params.url);
            $this_element[0].load();
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
        }).attr("checked",params.loop);

        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove()
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

        _html += elementForm().select('icon','Iconos','rrss',icons);
        _html += elementForm().inputText('textSize','Text Size, ej. 10px, 2%, 1em','rrss');
        _html += elementForm().inputColor('textColor','Color de Texto','rrss');
        _html += elementForm().checkbox('link','Hipervinculo','rrss');
        _html += elementForm().inputText('linkHiper','Link','rrss',true);
        _html += elementForm().inputColor('buttonTextColorLink','Color de Link','text');
        _html += elementForm().button('drop','Borrar','rrss');

        var dom = init().append(_html);

        // color de texto
        dom.find("#textColor").change(function(){
            $this_element.css({"color":$(this).val()});
            params.color = $(this).val();
            $this_element.attr("params",JSON.stringify(params))
        }).val(params.color);

        // text size
        dom.find("#textSize").keyup(function(){
            params.textSize = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css({"font-size":params.textSize});
        }).val(params.textSize);

        // text transformacion
        dom.find("#icon").change(function(){
            $.each(icons,function(i,icon){
                $this_element.removeClass(icon.value);
            });
            params.icon = $(this).val();
            $this_element.addClass(params.icon);
            $this_element.attr("params",JSON.stringify(params));
        }).val(params.icon);

        // link
        dom.find("#link").click(function(){
            params.link = $(this).is(":checked");
            $this_element.attr("params",JSON.stringify(params));
            $this_element.css("margin-right",params.link);
            if (params.link === true){
                $this_element.wrap("<a href='"+params.url+"'></a>")
                    .css({"color":params.colorLink});
            } else {
                $this_element.unwrap();
            }
        }).attr("checked",params.link);

        // hipervinculo
        dom.find("#linkHiper").keyup(function(){
            params.url = $(this).val();
            $this_element.attr("params",JSON.stringify(params));
            $this_element.parent().attr("href",params.url);
        }).val(params.url);

        // color de link
        dom.find("#buttonTextColorLink").change(function(){
            $this_element.parent().css({"color":$(this).val()});
            params.colorLink = $(this).val();
            $this_element.parent().attr("params",JSON.stringify(params))
        }).val(params.colorLink);

        dom.find("#drop").click(function(){
            $this_element.remove()
        });
    };

    return {
        Block   : block,
        None    : none,
        Imagen  : imagen,
        Button  : button,
        Text    : text,
        Video   : video,
        Rrss    : rrss
    }
};
