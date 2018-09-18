
// =======================================================================================

let data, app, imgs, titles, tl, sprites, $grt, $weather_cont, $news, $news_text;
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
  // creates a CANVAS element:
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
  try {
    articles = await $.get('https://files-mihchsciio.now.sh/demo-project.json');
    weather = await $.get('http://kitchen.screenfeed.com/weather/v2/data/p060kk4gfpvsphh415mnj7547c.json?current=true');

    data = {
      articles: [],
      weather: {}
    };

    data.weather.temp = weather.Locations[0].WeatherItems[0].CurrentTempF;
    data.weather.icon = weather.Locations[0].WeatherItems[0].IconURL;
    data.articles = articles.Items.map(a => ({title: a.Title, img: a.Media[0].Url}));
    imgs = data.articles.map(a => a.img);
    titles = data.articles.map(a => a.title);

    PIXI.loader
    .add(imgs)
    // Kick off next step:
    .load(setup);

  } catch {
    console.log('Failed to grab JSON.');
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

  // First image:
  tl.to(sprites[0], 1, {alpha: 1}, "+=0.5");

  // Bring in weather:
  tl.to($weather_cont, 1, {alpha: 1}, "+=0.5");

  // Bring in news:
  tl.fromTo("#news_child", 0.8, {height: "0px"}, {height: "100px"});
  tl.to($news_text, 0.5, {alpha: 1});


  all_titles.push($news_text) // necessary to get first one in the array
  for (let i=0; i < 10; i++) {
    addTitleToDom(i);
  }

  // Huh.... Why isn't this creating a loop of all the images?
  // Oh duh because we're not splicing the array yet.
  for (let i=1; i < 10; i++) {
    addToTimeline(i);
  }

  console.log('news txt is...', $news_text[0].childNodes[1]);
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

// =======================================================================================

function addTitleToDom(i) {
  // console.log(titles);
  const $new_title = $('<p>').text(titles[i]);
  // tl.set($new_title, {alpha: 0});
  $news_text.append($new_title);
  all_titles.push($new_title);
}

// =======================================================================================

function addToTimeline(i) {
  // This won't work, because loop runs every time, and we just end up with last title:
  // $news_text.text(title);

  // const allTitles = $news_text[0].childNodes;

  // console.log(all_titles);

  // Fade out title:
  tl.to(all_titles[0], 0.6, {alpha: 0}, "+=3");

  // Cross-fade background:
  tl.to(sprites[0], 0.6, {alpha: 0}, "+=0.3");
  tl.to(sprites[1], 0.6, {alpha: 1}, "-=0.5");

  // Could loop through and set all alpha to 0 if not the current title.
  // for (let j=0; j < all_titles.length; j++) {
  //   if (j!==i) {
  //     tl.set(all_titles[j], {alpha: 0})
  //   }
  // }

  // Fade in new title:
  const offset = 30 * i;
  // tl.set(all_titles[0], {y: `-=${offset}`})
  // console.log(all_titles[2][0].innerHTML);

  tl.to(all_titles[0], 0.2, {text: all_titles[2][0].innerHTML})

  tl.to(all_titles[0], 0.6, {alpha: 1})

  sprites.splice(0, 1);



  // if (i == 1) all_titles.splice(0, 1);
  // all_titles.splice(0, 2);
  // all_titles.splice(0, 1);



}

// =======================================================================================

function initializeGreeting() {
  $grt.text('News & Weather');
  tl.set($grt, { x: w / 2 - 100, y: h / 2 - 50 }); // Because [100, 50] are roughly dimensions of the greetings Div
  tl.set($grt, {alpha: 0});
}


function initializeWeather() {
  $im = $('<img>')
  .attr('src', 'http://fridge.knife.screenfeed.com/content/weather-icons/basic/128/30.png')
  .attr('height', '100px')
  .attr('width', '100px');

  const $temp = $("<span>").html(`${data.weather.temp} &deg;`);
  $weather_cont.append($temp);

  tl.set($temp, {css: {"position": "absolute", "padding-top": "20px"}});
  tl.set($temp, {left: 100, width: 100})
  tl.set($im, {css: { "padding-top": "10px", "position": "absolute"}});
  $weather_cont.prepend($im);

  tl.set($weather_cont, {left: w - 220, alpha: 0})
}


function initializeNews() {
  var title = "U.S. union urges states to look into T-Mobile purchase of Sprint";
  $news_text = $('<p>').text(title);
  $('#news_child').append($news_text);
  tl.set($news_text, {alpha: 0});

  // Set initial positions:
  tl.set($news, { x: 130, y: h - 100 });
  tl.set('#news_child', {width: w - 150});
}

// =======================================================================================






//
