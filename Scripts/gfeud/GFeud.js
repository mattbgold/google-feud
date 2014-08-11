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
		'Gremlins are', 
		'Is it OK to eat',
		'What is the highest',
		'Why are white people',
		'Is Africa',
		'How long until',
		'Why is Batman so',
		'Why do people like', 
		'What is the biggest', 
		'When did women start', 
		'Can I eat my',
		'Kim Kardashian is',
		'Do midgets',
		'I would never vote for',
		'Why don\'t people ',
		'What is the best',
		'Why do farts',
		'Why are video games so',
		'What is wrong with',
		'Why does my mom',
		'Pikachu is',
		'When is the best time to',
		'Is it bad to like',
		'How do you pronounce',
		'How do you get rid of',
		'How to get',
		'What happens if',
		'Is it safe to',
		'Is it healthy to',
		'What does it mean when',
		'Americans are',
		'Can I have sex with',
		'Is it legal to marry',
		'Is it cool to wear',
		'Why is Mel Gibson so',
		'I am terrified of',
		'Chuck Norris is a',
		'How to fix a stupid',
		'I wish I had a bigger',
		'I wish I had some goddamn',
		'My dog peed on my',
		'I pooped on the',
		'Pirates are the'
	];
    
	var usedQuestions = [];

    GFeud.Answer = Answer;
	GFeud.questions = questions;
	GFeud.usedQuestions = usedQuestions;
	GFeud.getRandomQuestion = function() {
		//this ensures the entire list is used up before any repeats appear
		if (questions.length == 0) {
			questions = usedQuestions.splice(0, usedQuestions.length);
		}
		var q = questions.splice(Math.floor(Math.random()*(GFeud.questions.length)), 1)[0];
		usedQuestions.push(q);
		return q;
	};
})(jQuery, GFeud || (GFeud = {}));