/**
 * jQuery open-toggle
 * A very lightweight jQuery plugin to toggle open state
 * via toggling '.open' or other user-defined class
 *
 * Licensed under the MIT license.
 * Copyright 2019 Het Shah
 * https://github.com/htshah
 */
(function($) {
  $.fn.openToggle = function(className = "open") {
    var wasClicked = false,
      that = this,
      docToggle = false;
      toggleEle = $(null);
      closeEle = false;

    function getEle(dataId, defaultVal){
      return dataId? $('#' + dataId): defaultVal;
    }

    that.click(function(e) {
      wasClicked = true;
      var self = $(this);

      docToggle = self.hasClass('no-doc-toggle')? true: false;
      toggleEle = getEle(self.attr('data-open-toggle-id'), self);
      closeEle = getEle(self.attr('data-close-toggle-id'), false);

      that.not(toggleEle).map(function(){
        rmClassOf = getEle($(this).attr('data-open-toggle-id'), $(this));
        rmClassOf.removeClass(className);
      });

      if (toggleEle.is("." + className + ".no-self-toggle")) {
        return;
      }      

      // console.log('Before: ' + toggleEle.toggleClass(className) + toggleEle.attr('class'));
      toggleEle.toggleClass(className);    
      // console.log('After: ' + toggleEle.toggleClass(className) + toggleEle.attr('class'));
    });

    $(document).click(function(e) {
      e.stopPropagation();
      // var isCloseEle = closeEle && ($(e.target).attr('id') === closeEle || false);
      if (!wasClicked) {      
        toggleEle.removeClass(className);
      }
      wasClicked = false;
      closeEle = false;
    });
  };
})(window.jQuery || window.Zepto);
