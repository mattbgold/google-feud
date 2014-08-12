var GFeud;
(function ($, GFeud) {
    'use strict';
    
    var Answer = function (text) {
        var self = this;
        self.text = ko.observable(text);
        self.flipped = ko.observable(false);
    };
	
	var stopWords = [
	'a','about','above','across','after','afterwards','again','against','all','almost','alone','along','already','also','although','always','am','among','amongst','amoungst','amount','an','and','another','any','anyhow','anyone','anything','anyway','anywhere','are','around','as','at','back','be','became','because','become','becomes','becoming','been','before','beforehand','behind','being','below','beside','besides','between','beyond','bill','both','bottom','but','by','call','can','cannot','cant','co','computer','con','could','couldnt','cry','de','describe','detail','do','done','down','due','during','each','eg','eight','either','eleven','else','elsewhere','empty','enough','etc','even','ever','every','everyone','everything','everywhere','except','few','fifteen','fify','fill','find','fire','first','five','for','former','formerly','forty','found','four','from','front','full','further','get','give','go','had','has','hasnt','have','he','hence','her','here','hereafter','hereby','herein','hereupon','hers','herself','him','himself','his','how','however','hundred','i','ie','if','in','inc','indeed','interest','into','is','it','its','itself','keep','last','latter','latterly','least','less','ltd','made','many','may','me','meanwhile','might','mill','mine','more','moreover','most','mostly','move','much','must','my','myself','name','namely','neither','never','nevertheless','next','nine','no','nobody','none','noone','nor','not','nothing','now','nowhere','of','off','often','on','once','one','only','onto','or','other','others','otherwise','our','ours','ourselves','out','over','own','part','per','perhaps','please','put','rather','re','same','see','seem','seemed','seeming','seems','serious','several','she','should','show','side','since','sincere','six','sixty','so','some','somehow','someone','something','sometime','sometimes','somewhere','still','such','system','take','ten','than','that','the','their','them','themselves','then','thence','there','thereafter','thereby','therefore','therein','thereupon','these','they','thick','thin','third','this','those','though','three','through','throughout','thru','thus','to','together','too','top','toward','towards','twelve','twenty','two','un','under','until','up','upon','us','very','via','was','we','well','were','what','whatever','when','whence','whenever','where','whereafter','whereas','whereby','wherein','whereupon','wherever','whether','which','while','whither','who','whoever','whole','whom','whose','why','will','with','within','without','would','yet','you','your','yours','yourself','yourselves'
	];
	var questions = [
		'Power Rangers are', 
		'Gremlins are', 
		'Is it OK to eat',
		'What is the highest',
		'Why are white people',
		'Is Africa in',
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
		'What is wrong with',
		'Why does my mom',
		'Pikachu is',
		'When is the best time to',
		'Is it bad to like',
		'How do you pronounce',
		'How do you get rid of',
		'How to get an awesome',
		'What happens if you eat too much',
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
		'Pirates are the',
		'Why is the world so',
		'Why does it smell when I'
	];
    
	var usedQuestions = [];


    GFeud.Answer = Answer;
	GFeud.questions = questions;
	GFeud.usedQuestions = usedQuestions;
	GFeud.stopWords = stopWords;
	GFeud.getRandomQuestion = function() {
		//this ensures the entire list is used up before any repeats appear
		if (questions.length == 0) {
			questions = usedQuestions.splice(0, usedQuestions.length);
		}
		var q = questions.splice(Math.floor(Math.random()*(GFeud.questions.length)), 1)[0];
		usedQuestions.push(q);
		return q;
	};
	GFeud.removePunctuation = function(str) {
		return str.replace(/[^\w\s]/g, "");
	}
})(jQuery, GFeud || (GFeud = {}));