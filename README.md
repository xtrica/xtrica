# Xtrica: A javascript class for building a frictionless UX flow / transition page container.

A new instance is constructed with a single parameter: `(HTMLElement: elementContainer)`.

The `elementContainer` should have one or more descendent elements with the CSS class `xscene`.

Instance has three methods:
- `exit()`, which returns a promise, after fading out and cleaning up instance listeners.
- `toScene(HTMLElement: sceneContainerElement)`, which returns a promise after transitioning to the given element of `class=".xscene"`.
- `cleanup()` which removes event listeners added to the window, and elements created by this class in the DOM.

Instance `.xscene`s can contain any HTML, however, there are 5 special element class decorators:
- `.xel`: The decorator for all `.xscene` elements you want to add Xtrica functionality to (like inputs, selects, buttons, anchors, etc.). `Tab`, and `Shift-Tab`, key presses will cycle through "focusing" on these elements (in the currently shown / active `.xscene`).
- `.xev`: An `Enter` key press will trigger the `onclick` / `.click(event)` method of this element, if it is the "focused" element.
- `.xnext`: An `Enter` key press will trigger the `onclick` / `.click(event)` method of this element, whether or not it is the "focused" element, **unless another `.xev` is currently in focus**. This is useful for a form submit button, for instance, that you would want to trigger if the user hit the enter key while typing their email address in an `.xel` input within the scene.
- `.xback`: An `ESC` key press will trigger the `onclick` / `.click(event)` method of this element, whether or not it is the "focused" element. This is useful for going back a scene, or leaving the page (like cancelling out of a registration), etc.
- `.xautofocus`: Upon scene transition, this element will become the initial focus. Without an `.xautofocus` within an `.xscene`, the URL bar will be the initial focus. Only the first `.xautofocus` will be honored.

**Notes:**
- Instance will fade in once created.
- Instance will fill the full page width and height, fixed positioning.
- `.xscene`s should be hard coded into the HTML within the `elementContainer` -- dynamic content should be created / destroyed within the `.xscene` (not to the `.xscene` itself).
- It is expected that all `.xscene` descendents of the `elementContainer` will take up the full `elementContainer` (and hence, page as well) width and height, as they are essentially slides in a slideshow (so even if they are nested, only one will be displayed at a time).
- After calling `instance.exit().then(() => {...})`, within the returned promise, you should destroy your instance first, then, if desired, create a brand new instance on the same, or any other, `elementContainer` on the page (or reroute to a different page, etc.).
- *There cannot be multiple instances active on the same page at the same time.*
- *If you are NOT able to call `.exit()` before abandoning an instance, (like before a route change), you must at least call `.cleanup()` to avoid memory leaks.* Example in VueJS: `beforeDestroy () { this.xtrica.cleanup() }`

## Example usage within Node.JS

**Javascript:**
```javascript
var Xtrica = require('xtrica').default
var x = new Xtrica(document.getElementById('x'))
var goToSceneA = function () {
  x.toScene(document.getElementById('sceneA'))
}
var goToSceneB = function () {
  x.toScene(document.getElementById('sceneB')).then(() => {
    alert('now on scene b')
  })
}
var goToSceneC = function () {
  x.toScene(document.getElementById('sceneC'))
}
var exit = function () {
  x.exit().then(() => {
    window.href.location = ''
  })
}
```

**HTML:**
```html
<body>
  <div id="x" class="xtrica">
    <div id="sceneA" class="xscene">
      <p>A</p>
      <button class="xel xev xnext xautofocus" onclick="goToSceneB()">go to scene b</button>
      <button class="xel" onclick="goToSceneC()">skip to scene c</button>
    </div>
    <div id="sceneB" class="xscene">
      <p>B</p>
      <a class="xel xev" onclick="goToSceneC()" href></a>
      <button class="xel xev" onclick="goToSceneC()">go to scene c</button>
    </div>
    <div id="sceneC" class="xscene">
      <p>C</p>
      <button class="xel xev xback" onclick="goToSceneA()">go back to the beginning (scene a)</button>
      <button class="xel xev xnext" onclick="goToSceneB()">go back to scene b</button>
      <button class="xel xev" onclick="exit()">exit</button>
    </div>
  </div>
</body>
```

**Custom CSS:**
```css
<style>
.xtrica {
  opacity: 0; /* this removes an initial flicker between xtrica container / page changes */
}
#x {
  background-color: #000000;
}
.xscene {
  background-color: #ffffff;
  padding: 10%;
}
#sceneB {
  background-color: #e5e5e5;
}
</style>
```