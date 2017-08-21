// entry
import 'materialize-css';
import '../css/base.css';
import './lib.js';
import 'dragula/dist/dragula.css';

//import('webpack-jquery-ui');
//import 'webpack-jquery-ui';
/*import 'jquery';*/

var rightEventOptions = require ('./rightEventOptions');
var makeHTML = require('./makeHTML');


//import 'html-webpack-plugin'
//var x = require('html-webpack-plugin!../../templates/hola.html');
//import 'dragula';
import * as dragula from 'dragula';

var AppPlay;

AppPlay = (function($,window){

    var left = {};

    var saveHtml = function(){
        $("#save_html").click(function(){
            makeHTML().run()
        });
    };

    var init = function(){
        startDragula();
        category();
        initialize();
        edit();
        saveHtml();

        $("#content-center").click(function(){
           rightEventOptions().Body($(this));
           return false;
        });

        var block_left = $("#block-left");
        left.block = block_left.html();

        var reset = function(){

            block_left = $("#block-left");
            block_left.empty();
            block_left.html(left.block);
            startDragula();
            block_left.find("[reset]").click(function(){reset()});

        };
        block_left.find("[reset]").click(function(){reset()});
    };

    var edit = function(){
        $("#publish").click(function(){
            makeHTML().make();
        });

        $("#close_modal").click(function(){
            makeHTML().destroy();
        });
    };

    var initialize = function(){
        $("#content-center").find("type").each(function(e){
            elementClick( $(this) );
        });
    };

    var category = function(){

        $("#type_block").trigger("change");
        $("#type_block").change(function(){
              var value = $( this ).val();
              $("#block > div").attr("category",value);
              categoryFormat(value);
              if (value === "0"){
                  $(".display").hide();
              } else {
                  $(".display").show();
              }
        });
    };
    var categoryFormat = function(type){
        $("#type_block").val(type);
        $("#type_block").material_select();
        $("[to='type_block']").find("span").text($("#content-center div[category='"+type+"']").length);
        $("[to='type_block']").find("strong").text($("#type_block").find("option:selected").text());
    };

    var configDarcula = function(){
        return {
            isContainer: function (el) {
              //  console.log($(el));

                if (!$(el).hasClass("insertable")){
                    return false;
                }
               //return false; // only elements in drake.containers will be taken into account
            },
            moves: function (el, source, handle, sibling) {
                return true; // elements are always draggable by default
            },
            accepts: function (el, target, source, sibling) {
                var html = $(el);
                console.log(!$(el).parents("[leftSection]").length > 0);
                return (($(el).parents("[leftSection]").length > 0) && !($(target).parents("[leftSection]").length > 0));
                //return false; // elements can be dropped in any of the `containers` by default
            },
            invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
            },
            direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
            copy: true,                       // elements are moved by default, not copied
            copySortSource: false,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false,              // spilling will `.remove` the element, if this is true
            mirrorContainer: document.body,    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below

        }
    };

    var startDragula = function(){
        var dark = dragula([
            document.getElementById('block'),
            document.getElementById('video'),
            document.getElementById('text'),
            document.getElementById('button'),
            document.getElementById('block-column'),
            document.getElementById('imagen'),
            document.getElementById('content-center'),
            document.getElementById('rrss'),
            document.getElementById('inputText'),
            document.getElementById('inputSelect'),
            document.getElementById('radio'),
            document.getElementById('checkbox')
        ], configDarcula());

        dark.on('drop',function(el){
            elementClick($(el));
        });
    };

    var refreshDOM = function(){
        var content_dom = $(document);
    };

    var elementClick = function($this_element){

        var click = function() {
            categoryFormat($("#type_block").val());

            console.log($this_element.html());

            var event = rightEventOptions();
            var type = $this_element.attr("type");

            try {

                var _function = eval("event." + type);
                // estableciendo criterios para el contenido centrado
                _function($this_element);

                $this_element.unbind("click");
                $this_element.click(function(e){
                    type = $(this).attr("type");
                    if (type === "None")
                        categoryFormat($this_element.attr("category"));
                    _function = eval("event." + type);
                    _function($this_element);
                   return false;
                });

                refreshDOM();
            } catch (e){
                console.log("no function");
            }

        };

        $this_element.unbind("click");
        $this_element.click(function(){
            click();
        });

        click();

    };

    return {
        init: init
    }

})($,window);

$(function(){
    AppPlay.init();
});
/*
var yell = require('./lib.js');
yell('world');*/
