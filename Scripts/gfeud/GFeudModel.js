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
			var matched = false;
			$.each(self.answers(), function(i, val) {
				if(self.guessMatchesAnswer(self.guessInput(), val.text())) {
					val.flipped(true);
					matched = true;
					//return false; add back in if we take out "similar" answerss
				}
				if(i === self.answers().length-1 && !matched) {
					//$(element).effect('shake');
					$(element).transition({ x: -18 }, 40, 'linear')
							  .transition({ x: 18 }, 80, 'linear')
							  .transition({ x: -18 }, 80, 'linear')
							  .transition({ x: 18 }, 80, 'linear')
							  .transition({ x: 0 }, 40, 'linear');
				}
			});
			self.guessInput('');
		}
		self.loadRandom = function(){
			self.showInput(false);
			self.question(GFeud.getRandomQuestion());
		}
		
		self.guessMatchesAnswer = function(fullGuess, fullAnswer) {

			if (fullGuess.toLowerCase().trim() === fullAnswer.toLowerCase().trim() || fullGuess.toLowerCase().trim().indexOf(fullAnswer.toLowerCase().trim()) > -1) {
				//we do not check if fullAnswer contains fullGuess because of stop words. We dont want guess "a" to successfully match answer "a large monkey"
				return true;
			}

			var reg = /[^\s]+/g;
			var awords = GFeud.removePunctuation(fullAnswer.toLowerCase().trim()).match(reg);
			var gwords = GFeud.removePunctuation(fullGuess.toLowerCase().trim()).match(reg);
			$.each(GFeud.stopWords, function(i, word) {
				//remove word from awords and gwords
				if(awords.indexOf(word) > -1) {
					awords.splice(awords.indexOf(word), 1);
				}

				if(gwords.indexOf(word) > -1) {
					gwords.splice(gwords.indexOf(word), 1);
				}

			});
			return (self.intersectSafe(awords, gwords).length > 0);
		};
		
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

		self.intersectSafe = function intersect(a, b) {
		    var t;
		    if (b.length > a.length) t = b, b = a, a = t; // indexOf to loop over shorter
		    return a.filter(function (e) {
		        if (b.indexOf(e) !== -1) return true;
		    });
		}
		
		self.searchGoogle = function(card) {
			if(card.flipped()) {
				window.open('https://www.google.com/#q=' + escape(self.question().trim() + ' ' + card.text().trim()), '_blank');
			}
		};
		
	};
    GFeud.GFeudModel = GFeudModel;
})(jQuery, GFeud || (GFeud = {}));