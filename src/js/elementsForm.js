module.exports = function () {

    var checkbox = function(){
        var html =  '<div class="row">' +
                        '<p>'+
                            '<input type="checkbox"  id="filled-in-box"  />'+
                            '<label for="filled-in-box">Filled in</label>'+
                        '</p>'+
                    '</div>'
                     ;
        return html;
    };

    return {
        checkbox : checkbox
    }
};
