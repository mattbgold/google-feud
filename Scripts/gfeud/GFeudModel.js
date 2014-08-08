var GFeud;
(function ($, GFeud) {
    'use strict';

    var GFeudModel = function () {
        var self = this;
		
		//------------------------------------------------------------------------------------
		//------------- Observables ------------------------------------------------------------
		//------------------------------------------------------------------------------------
		
        self.question = ko.observable();
		self.question.subscribe(function(newQuestion) {
			self.assignGoogleSuggestionsToAnswers(newQuestion);
			self.questionInput(newQuestion);
		});
		self.showInput = ko.observable(false);
		self.questionInput = ko.observable(GFeud.getRandomQuestion());
		self.answers = ko.observableArray([]);
		self.guessInput = ko.observable('');
		//------------------------------------------------------------------------------------
		//------------- Functions ------------------------------------------------------------
		//------------------------------------------------------------------------------------
		self.loadInput = function() {
			self.question(self.questionInput());
			self.showInput(false);
		}
		self.tryGuess = function(element) {
			$.each(self.answers(), function(i, val) {
				if(val.text().toLowerCase().trim() === self.guessInput().toLowerCase().trim()) {
					val.flipped(true);
					return false;
				}
				if(i === self.answers().length-1) {
					$(element).effect('shake');
				}
			});
			self.guessInput('');
		}
		self.loadRandom = function(){
			self.showInput(false);
			self.question(GFeud.getRandomQuestion());
		}

        self.assignGoogleSuggestionsToAnswers = function(searchTerm) {
			$.getJSON("https://suggestqueries.google.com/complete/search?callback=?",
				{ 
				  "hl":"en", // Language                  
				  "jsonp":"suggestCallBack", // jsonp callback function name
				  "q":searchTerm.trim() + ' ', // query term
				  "client":"youtube" // force youtube style response, i.e. jsonp
				}
			);
			//calls suggestCallBack on main page
		};

	};
    GFeud.GFeudModel = GFeudModel;
})(jQuery, GFeud || (GFeud = {}));