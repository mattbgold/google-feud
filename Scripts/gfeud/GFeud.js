var GFeud;
(function ($, GFeud) {
    'use strict';
    
    var Answer = function (text) {
        var self = this;
        self.text = ko.observable(text);
        self.flipped = ko.observable(false);
    };
	
	var questions = [
		'Power Rangers are', 
		'I was touched by', 
		'Gremlins are', 
		'What is the biggest', 
		'When did women', 
		'Does Chewbacca',
		'Kim Kardashian is',
		'Do midgets'
	];
    

    GFeud.Answer = Answer;
	GFeud.questions = questions;
	GFeud.getRandomQuestion = function() {
		return questions[Math.floor(Math.random()*(GFeud.questions.length))];
	};
})(jQuery, GFeud || (GFeud = {}));