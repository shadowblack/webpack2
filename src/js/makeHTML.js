module.exports = function () {

    var run = function(){

        var centerContent = $("#content-center");

        var htmlString = centerContent.html();

        var dataJson = [];

        centerContent.find("[category]").each(function(i,object){
            var category = $( this ).attr("category");

            params = [];
            $( this ).find("param").each(function(e,objectChild){
                var param = JSON.parse( $(this).attr("param") );
                params.push(param);
            });

            var data = {
                category    : category,
                params      : params
            };
            console.log(data);
            alert(data);
            //data.params
            //dataJson.push();
        });
       // console.log(htmlString);
    };
    return {
        run : run
    }
}