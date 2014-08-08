(function ($) {
    'use strict';

    ko.bindingHandlers.peek = {
    	update: function(element, valueAccessor) {
    		//valueAccessor is the answer flipped
    		var flipped = valueAccessor()();
    		if (flipped) {
    			$(element).unbind();
    			$(element).find('.card').unbind();
    		}
    		else {
	    		$(element).click(function() {
	    			if(valueAccessor()() === false) {
		    			$(this).find('.card').addClass('flipped').mouseleave(function(){
							$(this).removeClass('flipped');
						});
	    			}
	    		});
    		}
    	}
    }

	ko.bindingHandlers.fadeToggle = {
		update: function(element, valueAccessor, allBindings) {
			var fixed = allBindings.get('retainSpace');
			if(ko.utils.unwrapObservable(valueAccessor())) {
				if (fixed) 
					$(element).transition({opacity: 1});
				else 
					$(element).fadeIn();
			}
			else {
				if (fixed)
					$(element).transition({opacity: 0});
				else
					$(element).fadeOut();
			}
		}
	}

	ko.bindingHandlers.enterPress = {
		init: function(element, valueAccessor, allBindings) {
			$(element).keypress(function(e) {
				if(e.which == 13) {
					ko.utils.unwrapObservable(valueAccessor())();
				}
			});
		}
	};

})(jQuery);