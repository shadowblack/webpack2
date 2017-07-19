module.exports = function () {
    var elementForm = require('./elementsForm');

    var init = function(){
        return $("#content-right")
            .find("div.container:eq(0)").empty();
    };

    var block = function(element_column){
        var _html = elementForm().checkbox('color_block','color','block');
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

        // creacion de las columnas
        _html += elementForm().select('columns_block','Columnas','block',options);

        // creacion de los bordes
        var options = [
            {
                value   : "0",
                text    : "Sin bordes",
                attributes : "selected"
            }
        ];

        for (var i= 1 ; i <= 4; i++){
            options.push({value : i, text : i, attributes:""})
        }

        _html += elementForm().select('border_block','Borde','block',options);

        var dom = init().append(_html);
        // eventos del numero de bloques
        dom.find("#columns_block").change(function(){
            console.log("#"+element_column);
            var block = $("#"+element_column).find("div[type = 'Block'] > div");

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

            block.addClass("s"+$(this).val());
        });
    };

    return {
        Block : block
    }
};
