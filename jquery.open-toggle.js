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
  $.fn.openToggle = function(className) {
    className = className || "open";
    var wasClicked = false,
      that = this,
      toggleEle = null;

    that.click(function(e) {
      wasClicked = true;
      toggleEle = this.attributes["data-open-toggle-id"]? $("#" + this.attributes["data-open-toggle-id"].value): $(this);
      that.not(toggleEle).map(function(){
        rmClassOf = $(this).attr('data-open-toggle-id')? $('#' + $(this).attr('data-open-toggle-id')): $(this);
        rmClassOf.removeClass(className);
      });

      if (toggleEle.is("." + className + ".no-self-toggle")) {
        return;
      }

      toggleEle.toggleClass(className);
    });

    $(document).click(function(e) {
      e.stopPropagation();
      if (!wasClicked) {
        toggleEle.removeClass(className);
      }
      wasClicked = false;
    });
  };
})(window.jQuery || window.Zepto);
