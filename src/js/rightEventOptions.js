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

        _html += elementForm().select('columns_aligns','Aliniacion','block',options);

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

        var params = JSON.parse($this_element.attr("params"));

        _html += elementForm().inputColor('block-color','Color','block');

        _html += elementForm().inputRange('block-range','Rango','block');

        _html += elementForm().button('drop','Borrar','all');

        var dom = init().append(_html);
        dom.unbind("click");
        dom.unbind("change");

        // slider
        dom.find("#block-range").change(function(){
            var value = $(this).val();
            $this_element.css({"opacity":(value === "0" ? 0 : value / 100)});
        });
        // color
        dom.find("#block-color").change(function(){
            $this_element.css({"background-color":$(this).val()});
        });
        // borrar
        dom.find("#drop").click(function(){
            $this_element.remove();
        });
        // align
        dom.find("#columns_aligns").change(function(){
            $this_element.removeClass("left");
            $this_element.removeClass("right");

            $this_element.addClass($(this).val());
        });

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

            console.log($(this).val());

            params.c = $(this).val();
            block.addClass("s"+$(this).val());
            block.attr("params",JSON.stringify(params));
        }).val(params.c);
    };

    return {
        Block   : block,
        None    : none,
        Imagen  : imagen
    }
};
