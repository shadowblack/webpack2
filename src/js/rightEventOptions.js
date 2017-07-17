module.exports = function () {
    var elementForm = require('./elementsForm');

    var init = function(){
        return $("#content-right")
            .find("div.container:eq(0)");
    };

    var block = function(){
        var _html = elementForm().checkbox();

        init().append(_html);
    };

    return {
        Block : block
    }
};
