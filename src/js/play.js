// entry
/*import 'jquery';*/
import 'materialize-css';
import '../css/base.css';
import './lib.js';
import 'dragula/dist/dragula.css';
/*import('webpack-jquery-ui');*/
import 'webpack-jquery-ui';


var rightEventOptions = require ('./rightEventOptions');




//import 'html-webpack-plugin'
//var x = require('html-webpack-plugin!../../templates/hola.html');
//import 'dragula';
import * as dragula from 'dragula';

var AppPlay;

AppPlay = (function($,window){

    var left = {};

    var init = function(){
        startDragula();

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

    var configDarcula = function(){
        return {
            isContainer: function (el) {
                //console.log($(el).hasClass("insertable")/*.parents("#content-center").hasClass("container")*/);

                console.log($(el));

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
                return (/*html.parents("ul:eq(0)").is("[leftSection]") ||*/ !$(target).parents("ul:eq(0)").is("[leftSection]"));
                //return true; // elements can be dropped in any of the `containers` by default
            },
            invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
            },
            direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
            copy: true,                       // elements are moved by default, not copied
            copySortSource: true,             // elements in copy-source containers can be reordered
            revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
            removeOnSpill: false,              // spilling will `.remove` the element, if this is true
            mirrorContainer: document.body,    // set the element that gets mirror elements appended
            ignoreInputTextSelection: true     // allows users to select input text, see details below

        }
    };

    var startDragula = function(){
        var dark = dragula([document.getElementById('block'), document.getElementById('content-center')], configDarcula());
        var block_column = dragula([document.getElementById('block-column'), document.getElementById('content-center')], configDarcula());

        dark.on('drop',function(el){
            elementClick($(el));
        });
        block_column.on('drop',function(el){
            elementClick($(el));
        });

        /*$( "#content-center" ).sortable({
            revert: true
        }).disableSelection();

        $( "#block" ).draggable({
            connectToSortable: "#content-center,#content-center [insertable]",
            helper: "clone",
            revert: "invalid",
            addClasses: false,
            stop: function(event, ui){
                var content = $("#content-center [style]");
                setTimeout(function(){
                    console.log(content);
                    elementClick(content);
                    content.removeAttr("style");
                },600);
            }
        });*/

    };

    var refreshDOM = function(){
        var content_dom = $(document);
    };

    var elementClick = function($obj){

        var event = rightEventOptions();
        var type = $obj.attr("type");
        var _function = eval("event."+type);

        // estableciendo criterios para el contenido centrado
        _function("content-center");

        refreshDOM();
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
