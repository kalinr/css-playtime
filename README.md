css-playtime
============

I wanted to get some practice with CSS and Sass and learn CSS animations, so I started fiddling around in a gihub repo. I didn't set out to create anything specific but wound up making a simple JavaScript animation engine that cycles through a list of objects representing a series of animations, initializing each one on a timer. I made a jQuery and a vanilla JavaScript version. This plunker uses the vanilla version: http://plnkr.co/edit/pza20X

Please forgive the ugly nature of this animation. I am not a designer so I decided not to spend time making it look good. I have a lot of experience matching the designs that other people come up with, but designing myself is not my strong-suit.

This engine would work for an animated banner, allowing you to pull in all the important data for the animation in a simple JavaScript object or JSON string. All you would need are your CSS animations.

I made a couple of my own CSS animations, but many of them came from animate.css, though I did change the 'tada' animation so that it utilizes Sass preprocessing to handle vendor prefixes a little better. I didn't bother making this change to all the animations, since I already learned the things I was shooting for.

Frustratingly, Sass does not support interpolation on @import directives. Otherwise I would have set it up to iterate through a list of only the animations we wanted so we I could set up all the vendor prefixes for them in one loop. We could have a big Sass file with tons of animations but the final CSS file would only contain the ones we actually want. Instead, I will need to use a preprocessor mixin like Bourbon or Compass if I ever use this in the real world.
