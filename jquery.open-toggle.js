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
    var wasClicked = false;
    var clickedBlockId = null;
    that = this;
    $(that).each(function(index, curEle){
      if($(curEle).attr('href') != undefined) $($(curEle).attr('href')).show().toggle();
    });

    that.click(function(e) {
      e.preventDefault();
      wasClicked = true;
      var ele = $(this);
      clickedBlockId = ele.attr('href');

      if(that.not(ele).length > 0){
         $(that.not(ele)).each(function(index, otherThanCurrent){
            $(otherThanCurrent).removeClass(className);
            if($(otherThanCurrent).attr('href') != undefined) $($(otherThanCurrent).attr('href')).hide();
         }); 
      }

      if (ele.is("." + className + ".no-self-toggle")) {
        return;
      }

      ele.toggleClass(className);
      if($(ele).attr('href') != undefined) $($(ele).attr('href')).toggle();

    });

    $count = 0 ;

    $(document).click(function(e) {
      e.stopPropagation();
      isntClickedBlockId = (e.target.hasAttribute("id"))? ((('#'+e.target.attributes.id.value) !== clickedBlockId)): true;
      if (!wasClicked && isntClickedBlockId) {
        that.removeClass(className);
        if(clickedBlockId != null) $(clickedBlockId).hide();
      }
      wasClicked = clickedBlockId = false;
    });
  };
})(window.jQuery || window.Zepto);
