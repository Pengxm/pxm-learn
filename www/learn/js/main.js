
import {Engine} from './gameEngine'

$(function(){
    init() ;
});

function init(){
    initGame() ;
}

function initGame(){
    var engine = new Engine('canvas') ;
    engine.addSprite(10,10,null,10) ;
    $(document).keydown(function (e) {
        engine.keyPressed(e) ;
    });
}