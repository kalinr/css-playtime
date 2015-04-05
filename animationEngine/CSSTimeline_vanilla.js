/**
 * CSSTimeline class
 * @class
 * @classdesc Use CSSTimeline to cycle through a series of CSS classes on elements. usually used for animations.
 * @param {array} aAnimParams an array of objects, each containing properties representing our animations
 *   each object can have these properties:
 *     str: a string that will be used as the content of the element 
 *     inClass: space-separated list of classes to apply to the element
 *     div: the name of the element to use 
 *     inDelay: delay in milliseconds before the inClass should be applied after the previous item's classes are applied 
 *     outDelay (optional): delay in milliseconds before the outClass is applied after the item's classes are applied
 *     outClass (optional): space-delimited list of classes to apply to the element on its way out
 * @param {number} nRepeatCount the number of times to play the timeline through
 */
function CSSTimeline(aAnimParams, nRepeatCount){
  "use strict";
  this.aAnimParams = aAnimParams;
  this.nRepeatCount = nRepeatCount;
  
  this.nCurIndex = 0;
  this.nIteration = 0;
  
  this.bPaused = false;

  this.showNext = function(){
    var oCurItem = this.aAnimParams[this.nCurIndex],
    oCurDiv = document.getElementById(oCurItem.div), //$("#" + oCurItem.div),
    self = this;
    
    if(this.bPaused){
      return;
    }
    
    //TODO: change the setting of the text so that we use shortcodes in the HTML that refer to properties of our oCurItem
    //that way we can add any string to any part of any HTML element instead of being stuck with just one string per element
    //insert string into div and remove all classes
    oCurDiv.innerHTML = oCurItem.str;
    oCurDiv.className = oCurItem.inClass;
    
    if(oCurItem.outDelay){
      setTimeout(function(){self.showOutClass.call(self, oCurItem.div, oCurItem.outClass)}, oCurItem.outDelay);
    }

    this.nCurIndex++;
    if(this.nCurIndex === this.aAnimParams.length){//if we're at the end of the timeline
      
      //and if repeatCount isn't -1 (infinite) AND we've fulfilled every iteration to match our repeat count, then we are done. Get out before calling showNext() 
      if(this.nRepeatCount > -1 && (this.nRepeatCount - 1) === this.nIteration){
        return;
      }
        
      this.nCurIndex = 0;
      this.nIteration++;
    }
    
    //grab the inDelay from the next item to see how long to wait before showing it
    setTimeout(function(){self.showNext.call(self)}, aAnimParams[this.nCurIndex].inDelay);     
  }
  
  /**
   * used internally to show the classes that animate an element out
   * @param {element} div the element that we are animating out
   * @param {string} outClass the class or space-separated list of classes to apply to the element
   */
  this.showOutClass = function(div, outClass){
	document.getElementById(div).className = outClass;
  }
  
  /**
   * pauses the animation
   */
  this.pause = function(){
    this.bPaused = true;
  }
  
  /**
   * restarts the animation
   */
  this.play = function(){
    this.bPaused = false;
    this.showNext();
  }
  
}