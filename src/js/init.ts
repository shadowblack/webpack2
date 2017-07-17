// import 'jquery';
//import 'jquery';
import * as $ from "jquery";
import * as dragula from 'dragula';
// importando estilos
import 'dragula/dist/dragula.css';
class SweetSweetClasss {
    constructor() {
        console.log("Even sweeter");

        $(document).ready(function() {
            $('select').material_select();
            //dragula([document.getElementById('content-center'), document.getElementById('content-right')]);
            dragula([document.getElementById('block'), document.getElementById('content-center')]);
        });
    }
}
let basils = new SweetSweetClasss()