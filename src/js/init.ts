// import 'jquery';
//import 'jquery';
import * as $ from "jquery";

// importando estilos
import 'dragula/dist/dragula.css';
class SweetSweetClasss {
    constructor() {
        console.log("Even sweeter");

        $(document).ready(function() {
            $('select').material_select();
        });
    }
}
let basils = new SweetSweetClasss()