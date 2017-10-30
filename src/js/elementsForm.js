
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

    var inputText =function(id, title, group,active){
        var html = '<div class="row white card" group="'+group+'">'+
                        '<div class="input-field col s12">'+
                            '<label for="'+id+'" class="'+(active === true ? 'active' : '')+'">'+title+'</label>' +
                            '<input id="'+id+'" type="text" class="validate valid">'+
                        '</div>'+
                    '</div>';
        return html;
    };

    var inputTextIn =function(id, title, group,active){
        var html = '<div class="row white card" group="'+group+'">'+
                        '<div class="input-field col s6"><input name="name" placeholder="nombre" type="text" class="validate"></div>'+
                        '<div class="input-field col s6"><input name="value" placeholder="valor" type="text" class="validate"></div>'+
                        '<div class="input-field col s12 center"><button class="btn1">Agregar</button>&nbsp;<button class="btn2">Borrar</button></div>'+
                        '<div class="input-field col s12"></div>'+
                        '<div class="input-field col s12">'+
                            '<label for="'+id+'" class="'+(active === true ? 'active' : '')+'">'+title+'</label>' +
                            '<input id="'+id+'" type="text" class="validate valid">'+
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

    var checkbox = function(id, title, group, checked){
        var html =  '<div class="row white card" group="'+group+'">' +
                        '<p>'+
                            '<input  type="checkbox"  id="'+ id +'" '+(checked === true ? 'checked="checked"' : "")+' />'+
                            '<label for="'+ id +'">'+title+'</label>'+
                        '</p>'+
                    '</div>'
                     ;
        return html;
    };

    var validator = function( name, group ){
        var html =  '<div class="row white card" group="'+group+'">' +
                        '<p>'+
                            'Validator'+
                        '</p>'+
                        '<p>'+
                            '<input name="'+name+'" type="radio" id="validator1" values="1" checked="checked" >'+
                            '<label for="validator1">Sin validación</label>'+
                        '</p>'+
                        '<p>'+
                            '<input name="'+name+'" type="radio" id="validator2" values="2" >'+
                            '<label for="validator2">Solo Numeros</label>'+
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

    var beginGroupElement = function(){
       var html = '';
       html += '<div class="row grey lighten-3 cards"><div class="col s12 m12">';
       return html;
    };

    var endGroupElement = function(){
      return "</div></div>";
    };

    var listCheckBox = function(id, title, group, options){
        var html_options = "";

        $(options).each(function(i,obj){
            html_options += '<p><input type="checkbox" id="list_check'+i+'"  value="'+obj.value+'"/><label for="list_check'+i+'"">'+obj.text+'</label></p>';
        });

        var html =  '<div group="'+group+'">' +
                        '<label>'+title+'</label>'+
                        html_options+
                    '</div>';
        return html;
    };

    var divRadioBox = function(id, title, group, options){
        var html_options = "";

        $(options).each(function(i,obj){
            html_options += '<p><input name="'+id+'" type="radio" id="list_check'+i+group+'"  value="'+obj.value+'"/><label for="list_check'+i+group+'"">'+obj.text+'</label></p>';
        });

        var html =  '<div group="'+group+'">' +
            '<label>'+title+'</label>'+
            html_options+
            '</div>';
        return html;
    };

    var divSection = function(id, group, text){
        return '<div id="'+id+'" class="row white card" group="'+group+'">'+text+'</div>';
    };

    return {
        checkbox    : checkbox,
        validator    : validator,
        select      : select,
        button      : button,
        inputText   : inputText,
        inputColor   : inputColor,
        inputRange  : inputRange,
        inputFile   : inputFile,
        beginGroupElement: beginGroupElement,
        endGroupElement : endGroupElement,
        inputTextIn : inputTextIn,
        listCheckBox : listCheckBox,
        divSection  :   divSection,
        divRadioBox  :   divRadioBox

    }
};
