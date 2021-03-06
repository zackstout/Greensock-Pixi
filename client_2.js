
// =======================================================================================

let weather_data, app, imgs, titles, tl, sprites, $grt, $weather_cont, $news, $news_text, $blue_span;
let all_titles = [];
let w, h;

$(document).ready(function() {
  $grt = $('#greeting');
  $weather_cont = $('#weather');
  $news = $('#news');

  w = window.innerWidth;
  h = window.innerHeight;

  // Kick things off:
  prepareData();

  tl = new TimelineLite();
  app = new PIXI.Application();

  // Creates a CANVAS element:
  document.body.appendChild(app.view);

  // From Pixi docs tutorial:
  app.renderer.backgroundColor = 0x061639;
  app.renderer.view.style.position = "absolute";
  app.renderer.view.style.display = "block";
  app.renderer.autoResize = true;
  app.renderer.resize(w, h);
});

// =======================================================================================

async function prepareData() {
  let articles, weather;
  const news_url = 'https://files-mihchsciio.now.sh/demo-project.json';
  const weather_url = 'http://kitchen.screenfeed.com/weather/v2/data/p060kk4gfpvsphh415mnj7547c.json?current=true';

  try {
    articles = await $.get(news_url);
    weather = await $.get(weather_url);

    weather_data = {}; // Def need this
    weather_data.temp = weather.Locations[0].WeatherItems[0].CurrentTempF;
    weather_data.icon = weather.Locations[0].WeatherItems[0].IconURL;
    imgs = articles.Items.map(a => a.Media[0].Url);
    titles = articles.Items.map(a => a.Title);

    PIXI.loader
    .add(imgs)
    // Kick off next step:
    .load(setup);

  } catch {
    throw new Error('Failed to grab JSON.'); // would this work?
  }
}

// =======================================================================================
// Could this ever run before data is loaded? No, because we're awaiting.
function setup() {
  console.log('setting up');
  sprites = imgs.map(i => new PIXI.Sprite(PIXI.loader.resources[i].texture));

  sprites.forEach(s => {
    app.stage.addChild(s);
    resize(s);
    tl.set(s, {alpha: 0});
  });

  beginAnimation();
}

// =======================================================================================

function beginAnimation() {

  initializeGreeting();
  initializeWeather();
  initializeNews();

  // Animate greeting:
  tl.to($grt, 0.2, {alpha: 1}, "+=1");
  tl.to($grt, 1, {alpha: 0}, "+=1");

  // Bring in first image:
  tl.to(sprites[0], 1, {alpha: 1}, "+=0.5");

  // Bring in weather:
  tl.to($weather_cont, 1, {alpha: 0.85}, "+=0.5"); // only bring alpha up to 0.9

  // Bring in news:
  tl.set('#news_child', {css: {opacity: 0.8}}) // Have to set opacity to 0 in CSS to make border invisible at first.
  tl.fromTo("#news_child", 0.8, {height: "0px"}, {height: "100px"});
  tl.to($news_text, 0.5, {alpha: 1});

  // Build the animation timeline:
  for (let i=1; i < 14; i++) {
    addToTimeline(i);
  }
}

// =======================================================================================

function addToTimeline(i) {
  // Fade out title:
  tl.to($news_text, 0.6, {alpha: 0}, "+=3");

  // Cross-fade background:
  tl.to(sprites[0], 0.6, {alpha: 0}, "-=0.2"); // "-=0.2" syncs up fading of title well with changing background.
  tl.to(sprites[1], 0.6, {alpha: 1}, "-=1.0"); // Difference between this time-offset and previous time-offset should be about 0.8 to properly align with .

  // Replace and fade in new title:
  tl.to($news_text, 0.1, {text: titles[i % titles.length]}, "-=0.3"); // Make them spawn a bit faster with "-=0.3". Get title for any i with % titles.length.
  tl.to($news_text, 0.6, {alpha: 1})

  // Move head of sprites array to tail:
  let first_sprite = sprites.splice(0, 1);
  sprites.push(first_sprite);
}

// =======================================================================================

function initializeGreeting() {
  $grt.text('News & Weather');
  tl.set($grt, { x: w / 2 - 100, y: h / 2 - 50, width: 300 }); // Because [100, 50] are roughly the dimensions of the greetings Div
  tl.set($grt, {alpha: 0});
}


function initializeWeather() {
  // Create image:
  $im = $('<img>')
  .attr('src', weather_data.icon)
  .attr('height', '100px')
  .attr('width', '100px');
  tl.set($im, {css: { "padding-top": "20px", "padding-left": "20px"}}); // This one *doesn't* need absolute position..

  // Create text:
  const $deg = $("<span>").html('&deg;'); // Create as own element so we can shift it left.
  tl.set($deg, {css: {"padding-right": "-5px"}})
  const $temp = $("<span>").html(weather_data.temp);
  $temp.append($deg);

  tl.set($temp, {css: {"position": "absolute", "padding-top": "25px", "padding-left": "30px"}});
  tl.set($temp, {left: 100, width: 100})

  // Add both to DOM:
  $weather_cont.append($temp);
  $weather_cont.prepend($im);

  tl.set($weather_cont, {left: w - 250, alpha: 0, top: 50, width: 230})
}


function initializeNews() {
  var title = titles[0];
  $news_text = $('<p>').text(title);

  $('#news_child').append($news_text);
  tl.set($news_text, {alpha: 0, height: 0});

  // Set initial positions:
  tl.set($news, { x: 50, y: h - 50 });
  tl.set('#news_child', { width: w - 110 }); // needed

  tl.set($news_text, { css: {"position": "relative"}})
  tl.set($news_text, {left: 50, top: -15}) // Change top value to account for blue stripe
}

// =======================================================================================

function resize(sprite) {
  // Duh, use width and height, not vertexData....strange it behaves differently though, vis a vis asynchronicity.
  const hor_dist = sprite.width;
  const vert_dist = sprite.height;

  // Whichever is bigger is the direction we need to stretch:
  const hor_diff = w - hor_dist;
  const vert_diff = h - vert_dist;

  const ratio = (hor_diff > vert_diff) ? w / hor_dist : h / vert_dist;
  sprite.scale.x = ratio;
  sprite.scale.y = ratio;
}




//
