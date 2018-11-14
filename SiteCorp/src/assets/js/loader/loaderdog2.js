import Snap from 'snapsvg-cjs';
import mina from 'snapsvg-cjs';

var svg ,path,head,leftEar,rightEar, eyelid = ""

export function getValues(){
    svg = document.getElementById("scottie");
    Snap(svg);
    console.log(Snap.select(".tail"));
    path = Snap.select('.tail');
    console.log(Snap.select(".tail"));
    head = Snap.select('.head');
    leftEar = Snap.select('.left-ear');
    rightEar = Snap.select('.right-ear');
    eyelid = Snap.select('.eyelid');
}
    
 export function blink(){
      setTimeout(function () {
    	  eyelid.animate({ d: "M120.11 49.173l17.65-11.56 12.075 18.438-17.652 11.56z" }, 150, mina.easeinout, endBlink);
      }, 3000);
    }
export function endBlink(){
    	eyelid.animate({ d: "M120.1 49.182l17.65-11.56 1.393 2.125-17.652 11.56z" }, 150, mina.easeinout, blink);
    }
    
export function animatePath(){
    	path.animate({ d: "M45.5 199.38l.22 15s-39.72-.8-23.6-40.3c3.5-1.28-7 32.75 18.13 26.63a32 32 0 0 1 5.25-1.33z" }, 150,  resetPath);
    }

export function resetPath(){
    	path.animate({ d: "M45.5 199.31l.22 15S10.5 217.71 0 182.42c3.5-1.28 10.5 24.59 40.25 18.22a32 32 0 0 1 5.25-1.33z" }, 150,  animatePath);
    }

export function rotateHead(){
      setTimeout(function () {
    	  head.animate({ transform: 'r2,110,100' }, 400, mina.easeinout,  resetHead );
      }, 4000);
    }
export function resetHead(){
      setTimeout(function () {
    	  head.animate({ transform: 'r0,110,100' }, 850, mina.easeinout,  rotateHead );
      }, 5650);
    }
    export    function rotateRightEar(){
      setTimeout(function () {
    	  rightEar.animate({ transform: 'r20,108,67' }, 300, mina.elastic,  twitchStart );
      }, 4000);
      
    }
    export    function twitchStart(){
      setTimeout(function () {
    	  rightEar.animate({ transform: 'r0,108,67' }, 200, mina.easein,  twitchEnd );
      }, 1500);
      
    }
    export    function twitchEnd(){
      setTimeout(function () {
    	  rightEar.animate({ transform: 'r25,108,67' }, 100, mina.elastic,  resetRightEar );
      }, 50);
      
    }
    export   function resetRightEar(){
      setTimeout(function () {
    	  rightEar.animate({ transform: 'r-15,108,67' }, 800, mina.easeout,  rotateRightEar );
        }, 4000);
    }

export    function rotateLeftEar(){
      setTimeout(function () {
    	  leftEar.animate({ transform: 'r0,114,54' }, 150, mina.easein,  resetLeftEar );
        }, 4000);
    }
    export    function resetLeftEar(){
      setTimeout(function () {
    	  leftEar.animate({ transform: 'r-25,114,54' }, 850, mina.easeout,  rotateLeftEar );
       }, 6000);
    }
