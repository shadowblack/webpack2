module.exports = function () {

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
        select      : select
    }
};
