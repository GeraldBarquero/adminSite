svg = document.getElementById("spinner");
    s = Snap(svg);
    var dur = 2000;
    var offset = 622;
    var spin = s.g().attr({class:"spin"});
    var innerCircle = spin.circle(103, 103, 100).attr({
        fill: "none",
        stroke: '#FCB316',
        strokeWidth: 6,
        strokeDasharray: offset,
        strokeDashoffset: 0,
        strokeLinecap: "round"
    });
    var eyelid = Snap.select('.eyelid');
    var leftEar = Snap.select('.left-ear');
    var rightEar = Snap.select('.right-ear');

    blink();
    twitchRightStart();
    animatePath1();
    rotater( spin );

    function animatePath1(){
      innerCircle.transform('r0,103,103');
      innerCircle.animate({ transform: "r45,103,103" }, dur/2, mina.linear );
      Snap.animate(offset, offset/4, function( value ){
         innerCircle.attr({ 'strokeDashoffset': value })
      }, dur/2, mina.easeinout, animatePath2 );
    }
    
    function animatePath2(){
      innerCircle.animate({ transform: "r360,103,103" }, dur/2, mina.easeinout );
      Snap.animate(offset/4, offset, function( value ){
             innerCircle.attr({ 'strokeDashoffset': value })
      }, dur/2, mina.easeinout, animatePath1 );
    }

    function blink(){
      setTimeout(function () {
        eyelid.animate({ d: "M85.89 68.876l24.72-16.19 17.96 27.423-24.72 16.188z" }, 150, mina.easeinout, endBlink);
      }, 3000);
    }
    function endBlink(){
      eyelid.animate({ d: "M85.88 68.878l24.722-16.19 1.802 2.754-24.72 16.19z" }, 150, mina.easeinout, blink);
    }

    function twitchRightStart(){
      setTimeout(function () {
        rightEar.animate({ transform: 'r15,66,93' }, 300, mina.easein,  twitchRightEnd );
      }, 2500);
    }

    function twitchRightEnd(){
      setTimeout(function () {
        rightEar.animate({ transform: 'r0,66,93' }, 100, mina.elastic,  twitchRightStart );
      }, 50);
    }

    function rotater(el){
      el.transform('r0,103,103');
      el.animate({ transform: 'r360,103,103' }, dur, mina.linear,  rotater.bind( null, el) );
    }