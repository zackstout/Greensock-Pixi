
let app, all_imgs;

window.onload = function () {
    all_imgs = ['styles/jmoney.jpg', 'styles/kirsten-wonder.png', 'styles/osprey.jpg', 'http://fridge.knife.screenfeed.com/content/weather-icons/basic/128/30.png'];

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
        .add(all_imgs[3])
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
    const $weather_cont = $('#weather')
    const $weather = $('#weather_txt');
    const $news = $('#news');


    // Need to be more thoughtful about how this relates to ICON:
    $weather.text('77')
    $grt.text('hi there');

    tl.set($weather_cont, {width: 300})

    $im = $('<img>')
        .attr('src', 'http://fridge.knife.screenfeed.com/content/weather-icons/basic/128/30.png')
        .attr('height', '100px')
        .attr('width', '100px')
        // .attr('opacity', '0.8')
    
    // console.log($im)
    $weather.prepend($im);

    // Remember, need angle brackets here:
    const $p = $('<p>').text('some news news news!')
    $('#news_child').append($p);

    const $p2 = $('<p>').text('ahoy hoy!')
    tl.set($p2, {alpha: 0})



    tl.set($p, {alpha: 0})

    // Set initial positions:
    tl.set($news, { x: 130, y: window.innerHeight - 100 })
    tl.set($news, {width: "500px"})

    tl.set($weather_cont, {x: 500, y: 100})
    // tl.set($weather, { x: spWeather.x + 40 , y: spWeather.y + 50, width: 150})
    tl.set($grt, { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50 })
        // .to($grt, 1, { opacity: 0 })
        // .to($grt, 1, { opacity: 1 });

    tl.to($grt, 0.2, {opacity: 1})
    tl.to($grt, 0.8, {opacity: 0}, "+=1")
    tl.to($news, 0.8, {opacity: 1}, "+=0.2")
    tl.set('#news_child', {width: 400})

    // tl.set($weather)
    tl.to($weather, 0.6, {opacity: 1}, "+=0.4")

    // tl.to($news, 1.3, {css: {height: "100px"}})
    // tl.to($news, 1.3, {y: "+=100px"}, '-=1')
    tl.fromTo("#news_child", 0.8, {height: "0px"}, {height: "100px"})

    tl.to($p, 0.5, {alpha: 1})
    // tl.fromTo($news, 1.3, {scaleY: 0}, {scaleY: 1})

    // We need this text to NOT show up until the time is right:
    // $("#news_child").text('text')
    



    // NOTE: I am finding it really difficult to add background color of black to this rectangle ......


    // Two changes/cycles:
    tl.to($p, 0.6, {alpha: 0}, "+=2")

    tl.to(sp2, 0.6, { alpha: 0 }, "+=0.3"); // Wait 2 seconds before starting.
    tl.to(sp3, 0.6, { alpha: 1 }, "-=0.5");


    // we need to NOT REMOVE IT until we get here!!!
    // If we don't remove it, next one gets pushed too far down....
    // $p.remove();
    $('#news_child').append($p2);
    tl.set($p2, {y: "-30px"})
    tl.set($p, {height: "0px"})

    // console.log(tl.getChildren())
    tl.to($p2, 0.6, {alpha: 1});

    

    tl.to(sp3, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp1, 0.6, { alpha: 1 }, "-=0.5");

}
