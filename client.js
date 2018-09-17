
let app;

window.onload = function () {

    // NOTE: Better method would use a SPRITE SHEET

    // NOTE: Instead of using a loop, we could use a recursive (call yourself when you're done) function to handle the cycling. 

    app = new PIXI.Application();
    // creates a CANVAS element:
    document.body.appendChild(app.view);

    // Doesn't work:
    // var ctx = app.view.getContext("2d");
    // console.log(ctx);

    // from pixi docs tutorial:
    app.renderer.backgroundColor = 0x061639;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Can pass in an array:
    PIXI.loader
        .add("styles/jmoney.jpg")
        .add("styles/jesus.jpg")
        .add("styles/leda_hot.jpg")
        .load(setup);
}




function setup() {
    // let texture = PIXI.utils.TextureCache["styles/jmoney.jpg"];
    // sp1 = new PIXI.Sprite(texture);

    // Ok, Sprite gets passed a Texture:
    sp1 = new PIXI.Sprite(
        PIXI.loader.resources["styles/jmoney.jpg"].texture
    );

    sp2 = new PIXI.Sprite(
        PIXI.loader.resources["styles/jesus.jpg"].texture
    );

    sp3 = new PIXI.Sprite(
        PIXI.loader.resources["styles/leda_hot.jpg"].texture
    );

    // greeting = new PIXI.Sprite();
    // console.log(greeting)

    // Thanks W3 Skoolz:
    // var greeting = document.createElement("P");                       // Create a <p> element
    // var t = document.createTextNode("This is a greetinggraph");       // Create a text node
    // greeting.appendChild(t);                                          // Append the text to <p>
    // document.body.appendChild(greeting);

    // sp1 = PIXI.Sprite.fromImage('styles/jmoney.jpg')

    // sp1.visible = false;
    // sp3.visible = false;
    sp1.alpha = 0;
    sp3.alpha = 0;

    // Ok, there will be issues about resizing, like whether image is fatter or taller:
    sp1.height = window.innerHeight;
    sp2.height = window.innerHeight;
    sp3.height = window.innerHeight;

    app.stage.addChild(sp1);
    app.stage.addChild(sp2);
    app.stage.addChild(sp3);


    var tl = new TimelineLite();

    const $grt = $('#greeting');

    console.log($grt);

    // TweenLite.to($grt, 1, {x: 200, y: 200})


    console.log(app.view);
    console.log(app.view.getContext('webgl')) // Oooh maybe just had to use webgl instead of 2d
    // $grt.offsetTop = 100;
    // let ctx = app.view.getContext('webgl');
    // ctx.fillStyle = 'red'
    // ctx.drawRect(100, 100, 200, 200);


    // app.stage.addChild($grt);
    // Centers the greeting because 100 is half the width of the box:
    tl.set($grt, { x: window.innerWidth / 2, y: window.innerHeight / 2 - 100 })
    .to($grt, 1, { opacity: 0 })
    .to($grt, 1, { opacity: 1 });

    $grt.text('hi there');


    // Needn't even add it to TL to get it to work:
    // let text1 = new PIXI.Text('hi there');
    // app.stage.addChild(text1);
    // text1.x = 200;
    // text1.y = 500;
    // console.log(text1)
    // text1.style.fill = 'red';

    // None of this worked:
    // text1.tintRGB = 10110111;
    // text1.style._backgroundColor = 'black';
    // text1.text('cyan');

    // NOTE: I am finding it really difficult to add background color of black to this rectangle ......

    // console.log(app.renderer)


    // Two changes/cycles:
    tl.to(sp2, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp3, 0.6, { alpha: 1 }, "-=0.5");

    tl.to(sp3, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp1, 0.6, { alpha: 1 }, "-=0.5");

    // TweenMax.to(pixiObject, 1, {pixi:{scaleX:2, scaleY:1.5, skewX:30, rotation:60}});



}

// let sp1;


// // anySprite.visible = false; // best way to make sprites disappear


// const im = PIXI.Sprite.fromImage('styles/leda_hot.jpg')
// const im2 = PIXI.Sprite.fromImage('styles/jmoney.jpg');
// const im3 = PIXI.Sprite.fromImage('styles/jesus.jpg')

// app.stage.addChild(sp1);