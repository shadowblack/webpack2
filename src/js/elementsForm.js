
module.exports = function () {

    var inputRange = function(id, title, group){
        var html = '<div class="row white card" group="'+group+'">'+
            '<label>'+title+'</label>'+
            '<p class="range-field">'+
            '<input type="range" id="'+id+'" min="0" max="100" value="100" />'+
            '</p>'+
            '</div>';
        return html;
    };

    var inputFile =function(id, title, group){
        var html = '<div class="row white card" group="'+group+'">' +
                        '<label>'+title+'</label>' +
                        '<div class="file-field white input-field">'+
                            '<div class="btn">'+
                                '<input type="file" id="'+id+'" accept=".jpg, .jpeg, .png">'+
                            '</div>'+
                            '<div class="file-path-wrapper">'+
                                '<input  class="file-path validate" type="text">'+
                             '</div>'+
                        '</div>'+
                    '</div>';
        return html;
    };

    var inputText =function(id, title, group){
        var html = '<div class="row white card" group="'+group+'">'+
                        '<div class="input-field col s12">'+
                            '<input placeholder="'+title+'" id="'+id+'" type="text" class="validate">'+
                        '</div>'+
                    '</div>';
        return html;
    };

    var inputColor =function(id, title, group){
        var html = '<div class="row white card" group="'+group+'">'+
                        '<label>'+title+'</label>'+
                        '<div class="input-field col s12">'+
                            '<input placeholder="'+title+'" id="'+id+'" type="color" class="validate">'+
                        '</div>'+
                    '</div>';
        return html;
    };

    var button = function(id, title, group){
        var html =  '<div class="row teal lighten-3 center" group="'+group+'">'+
                        '<a class="waves-effect waves-light btn-large teal darken-4" id="'+ id +'" drop>'+title+'</a>'+
                    '</div>';
        return html;
    };

    var checkbox = function(id, title, group){
        var html =  '<div class="row white card" group="'+group+'">' +
                        '<p>'+
                            '<input  type="checkbox"  id="'+ id +'"  />'+
                            '<label for="'+ id +'">'+title+'</label>'+
                        '</p>'+
                    '</div>'
                     ;
        return html;
    };

    var select = function(id, title, group, options){

        var html_options = "";

        $(options).each(function(i,obj){
            html_options += '<option value="'+obj.value+'" '+obj.attributes+'>'+obj.text+'</option>';
        });

        var html =  '<div class="row white card" group="'+group+'">' +
                            '<label>'+title+'</label>'+
                            '<select class="browser-default" id="'+id+'" name="'+id+'">'+
                                html_options+
                            '</select>'+
                    '</div>';
        return html;
    };

    return {
        checkbox    : checkbox,
        select      : select,
        button      : button,
        inputText   : inputText,
        inputColor   : inputColor,
        inputRange  : inputRange,
        inputFile   : inputFile,
    }
};
