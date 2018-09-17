
let app, all_imgs;

window.onload = function () {
    all_imgs = ['styles/jmoney.jpg', 'styles/pics_hugh.jpg', 'styles/osprey.jpg', 'http://fridge.knife.screenfeed.com/content/weather-icons/basic/128/30.png'];

    // NOTE: Instead of using a loop, we could use a recursive (call yourself when you're done) function to handle the cycling. 

    // NOTE: Maybe we need a CONTAINER???

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

    PIXI.loader
        .add(all_imgs)
        .load(setup);
}

// First step: Zip up all sprites and titles into an array of objects.

function setup() {

    sp1 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[0]].texture
    );

    sp2 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[1]].texture
    );

    sp3 = new PIXI.Sprite(
        PIXI.loader.resources[all_imgs[2]].texture
    );

    console.log(sp1.scale)

    // Ok this will work:
    // We can get height and width of each photo and then figure out how much it needs to be scaled.
    sp1.scale.x = 1.5;
    sp1.scale.y = 1.5;

    sp1.alpha = 0;
    sp3.alpha = 0;


    app.stage.addChild(sp1);
    app.stage.addChild(sp2);
    app.stage.addChild(sp3);


    var tl = new TimelineLite();


    const $grt = $('#greeting');
    const $weather_cont = $('#weather')
    const $news = $('#news');

    const $temp = $("<span>").html('77 &deg;')
    $weather_cont.append($temp)

    tl.set($temp, {css: {"position": "absolute", "padding-top": "25px"}})

    $grt.text('News & Weather');

    tl.set($weather_cont, {width: 190, height: 100})

    $im = $('<img>')
        .attr('src', 'http://fridge.knife.screenfeed.com/content/weather-icons/basic/128/30.png')
        .attr('height', '100px')
        .attr('width', '100px')
        // .attr('opacity', '0.8')
    
    tl.set($im, {css: { "padding-top": "10px"}})

    // console.log($im)
    $weather_cont.prepend($im);

    // Remember, need angle brackets here:
    const $p = $('<p>').text('some news news news!')
    .css('background-color', 'blue')
    // .css('padding', '0px')
    $('#news_child').append($p);

    // tl.set('#news_child', {left: "100px"})
    
    tl.set($weather_cont, {alpha: 0})



    const $p2 = $('<p>').text('ahoy hoy!')
    tl.set($p2, {alpha: 0})
    const $p3 = $('<p>').text('well well well!')
    tl.set($p3, {alpha: 0})
    const $p4 = $('<p>').text('you know me!')
    tl.set($p4, {alpha: 0})
    const $p5 = $('<p>').text('i\'m just tryna...!')
    tl.set($p5, {alpha: 0})


    tl.set($p, {alpha: 0})

    // Set initial positions:
    tl.set($news, { x: 130, y: window.innerHeight - 100 })
    tl.set($news, {width: "500px"})

    tl.set($weather_cont, {x: window.innerWidth - 200, y: 100})
    // tl.set($weather, { x: spWeather.x + 40 , y: spWeather.y + 50, width: 150})
    tl.set($grt, { x: window.innerWidth / 2 - 50, y: window.innerHeight / 2 - 50 })
        // .to($grt, 1, { opacity: 0 })
        // .to($grt, 1, { opacity: 1 });

    tl.to($grt, 0.2, {opacity: 1})
    tl.to($grt, 0.8, {opacity: 0}, "+=1")
    tl.to($news, 0.8, {opacity: 1}, "+=0.2")
    tl.set('#news_child', {width: 400})
    // tl.set('#news', {height: 0})

    tl.to($weather_cont, 0.6, {opacity: 1}, "+=0.4")


    // This is why we wanted to put it in a parent, to get this to work:
    tl.fromTo("#news_child", 0.8, {height: "0px"}, {height: "100px"})

    tl.to($p, 0.5, {alpha: 1})
    // tl.fromTo($news, 1.3, {scaleY: 0}, {scaleY: 1})

 


    // Two changes/cycles:
    tl.to($p, 0.6, {alpha: 0}, "+=2")

    tl.to(sp2, 0.6, { alpha: 0 }, "+=0.3"); // Wait 2 seconds before starting.
    tl.to(sp3, 0.6, { alpha: 1 }, "-=0.5");


    // we need to NOT REMOVE IT until we get here!!!
    // If we don't remove it, next one gets pushed too far down....
    // $p.remove();
    $('#news_child').append($p2);
    tl.set($p2, {y: "-30px"}) // Feels bad to have to hard code this 30
    tl.set($p, {height: "0px"}) // This whole bit is so ugly
    tl.to($p2, 0.6, {alpha: 1});

    

    tl.to(sp3, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp1, 0.6, { alpha: 1 }, "-=0.5");

    // Maybe the idea is to load all text onto page, similar with starting images...

    $('#news_child').append($p3);
    tl.set($p3, {y: "-60px"}) // Feels bad to have to hard code this 30 
    // -- The real problem is going to be accounting for possible multi-line titles....
    tl.set($p2, {height: 0, alpha: 0})
    tl.to($p3, 0.6, {alpha: 1});




    tl.to(sp1, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp2, 0.6, { alpha: 1 }, "-=0.5");

    $('#news_child').append($p4);
    tl.set($p4, {y: "-90px"}) // Feels bad to have to hard code this 30 
    // -- The real problem is going to be accounting for possible multi-line titles....
    tl.set($p3, {height: 0, alpha: 0})
    tl.to($p4, 0.6, {alpha: 1});



    tl.to(sp2, 0.6, { alpha: 0 }, "+=2"); // Wait 2 seconds before starting.
    tl.to(sp3, 0.6, { alpha: 1 }, "-=0.5");

}
