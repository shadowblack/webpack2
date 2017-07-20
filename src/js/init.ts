// import 'jquery';
//import 'jquery';
import * as $ from "jquery";
/*import 'jquery-ui';*/
// importando estilos
import 'dragula/dist/dragula.css';
class SweetSweetClasss {
    constructor() {
        console.log("Even sweeter");

        $(document).ready(function() {
            $('select').material_select();
            /*$('input[type=checkbox]').each(function() {
                if(this.nextSibling.nodeName != 'label') {
                    $(this).after('<label for="'+this.id+'"></label>')
                }
            })*/
        });
    }
}
let basils = new SweetSweetClasss()