/**
 * Created by lyc on 2016/8/17.
 */
class Listener{
    constructor(key,callback){
        this.key = key ;
        this.callback = callback ;
    }

    run(){
        this.callback() ;
    }

    getKey(){
        return this.key ;
    }
}

export {Listener}

import {Listener} from './listener'

class Sprite{

    constructor(context,x,y,imgUrl,speed){
        this.x = x ;
        this.y = y ;
        this.imgUrl = imgUrl ;
        this.speed = speed||10 ;
        this.listeners = [] ;
        this.context = context ;
        this.drawImage() ;
        this.initListener() ;
    }

    drawImage(){
        this.context.fillStyle = 'black' ;
        this.context.beginPath();
        this.context.arc(this.x,this.y,5,0,2*Math.PI,true);//radius = 5
        this.context.closePath();
        this.context.fill();
    }

    update(x,y){
        this.context.clearRect(this.x-5,this.y-5,10,10);
        this.context.beginPath();
        this.context.arc(x,y,5,0,2*Math.PI,true);
        this.context.closePath();
        this.context.fill();
        this.x = x ;
        this.y = y ;
    }

    addListener(keyListener){
        this.keyListenerList.push(keyListener) ;
    }

    findKeyListener(key){
        for(let i in this.listeners){
            if(this.listeners[i].getKey()===key){
                return this.listeners[i] ;
            }
        }
        return null ;
    }
    //default listener
    initListener(){
        this.listeners['up'] = new Listener('up',()=>{
                this.update(this.x,this.y-this.speed) ;
    });
        this.listeners['down'] = new Listener('down',()=>{
                this.update(this.x,this.y+this.speed) ;
    });
        this.listeners['left'] = new Listener('left',()=>{
                this.update(this.x-this.speed,this.y) ;
    });
        this.listeners['right'] = new Listener('right',()=>{
                this.update(this.x+this.speed,this.y) ;
    });
    }

}

export {Sprite}

import {Sprite} from './sprite'

class Engine{

    constructor(canvasId){
        this.canvas = document.getElementById(canvasId) ;
        this.context = this.canvas.getContext('2d') ;
        this.spriteList = [] ;
        this.keyListenerList = [] ;
        //time
        this.startTime = 0 ;
        this.lastTime = 0 ;
        this.currentTime = 0 ;
        this.FPS = 30 ;
        //height and width
        this.bgHeight = this.canvas.height ;
        this.bgWidth = this.canvas.width ;
    }

    //sprite
    addSprite(x,y,imgUrl,speed){
        var sprite = new Sprite(this.context,x,y,imgUrl,speed)
        this.spriteList.push(sprite) ;
    }

    //keylistener
    keyPressed(e){
        let listener = undefined ;
        let key = "" ;

        switch (e.keyCode){
            case 32: key = "space" ; break ;
            case 37: key = "left" ; break ;
            case 38: key = "up" ; break ;
            case 39: key = "right" ; break ;
            case 40: key = "down" ; break ;
            case 13: key = "enter" ; break ;
        }

        for(let sprite of this.spriteList){
            listener = sprite.findKeyListener(key) ;
            if(listener){
                listener.run() ;
            }
        }
    }
}

export {Engine}