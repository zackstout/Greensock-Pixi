# Pixi and GreenSock
Learning how to make sprites with Pixi.js, and control their motions/visibility with GreenSock.

## Design decisions:
- We are splicing the images array as we walk through it, which is bad if we want to cycle through again. I guess it wouldn't be hard to re-save the array in memory when you get back to the first image.
- Finally figured out how to change text *synchronously*, in the timeline, so we don't need to keep all the titles on the DOM at once (like we do the images).
- Not sure I understand the purpose of Pixi yet -- it adds a canvas, but then we have to overlay DOM elements -- otherwise it's hard to target and animate them with GreenSock.
- Good to get back into CSS: `z-index` and `position: relative` were the real all-stars.
