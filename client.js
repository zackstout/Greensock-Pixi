
let app, all_imgs;

window.onload = function () {
    all_imgs = ['styles/jmoney.jpg', 'styles/kirsten-wonder.png', 'styles/osprey.jpg'];

    // NOTE: Better method would use a SPRITE SHEET

    // NOTE: Instead of using a loop, we could use a recursive (call yourself when you're done) function to handle the cycling. 

    // NOTE: A better solution than jQuery may be the PIXI DOM Plug-in


    // Nice, so we can still use async/await to good effect:
    $.get('https://files-mihchsciio.now.sh/demo-project.json')
    .then(data => {
        console.log(data);
    })
    .catch(err => {
        console.log(err)
    })

    app = new PIXI.Application();
    // creates a CANVAS element:
    document.body.appendChild(app.view);

    // from pixi docs tutorial:
    app.renderer.backgroundColor = 0x061639;
    app.renderer.view.style.position = "absolute";
    app.renderer.view.style.display = "block";
    app.renderer.autoResize = true;
    app.renderer.resize(window.innerWidth, window.innerHeight);

    // Can pass in an array:
    PIXI.loader
        .add(all_imgs[0])
        .add(all_imgs[1])
        .add(all_imgs[2])
        .load(setup);
}



function setup() {

    // NOTE: Don't forget to make a Sprite for the weather icon:

    // Ok, Sprite gets passed a Texture:
    sp1 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[0]].texture
    );

    sp2 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[1]].texture
    );

    sp3 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[2]].texture
    );


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
    const $weather = $('#weather');
    const $news = $('#news');


    console.log(app.view);
    console.log(app.view.getContext('webgl')) // Oooh maybe just had to use webgl instead of 2d

    $weather.text('Weather hi there')
    $news.text('This is very important news!!!!')
    $grt.text('hi there');

    tl.set($news, { x: 100, y: 100 })
    tl.set($weather, { x: window.innerWidth - 150, y: 100 })
    tl.set($grt, { x: window.innerWidth / 2, y: window.innerHeight / 2 - 100 })
        .to($grt, 1, { opacity: 0 })
        .to($grt, 1, { opacity: 1 });



    // NOTE: I am finding it really difficult to add background color of black to this rectangle ......


    // Two changes/cycles:
    tl.to(sp2, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp3, 0.6, { alpha: 1 }, "-=0.5");

    tl.to(sp3, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp1, 0.6, { alpha: 1 }, "-=0.5");

}
