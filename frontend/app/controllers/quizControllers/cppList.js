angular.module("cppFacts", [])

.controller("listCppCtrl", ListController);

//ListController.$inject = ['quizMetrics'];

function ListController(){
	var vm = this;

	vm.data = cppData;
	vm.quizQuestions = quizQuestions;
	vm.error = false;
	vm.finalise = false;
	vm.activeCpp = {};
  vm.changeActiveCpp = changeActiveCpp;
	vm.activateQuiz = activateQuiz;
	vm.questionAnswered = questionAnswered;
	vm.setActiveQuestion = setActiveQuestion;
	vm.selectAnswer = selectAnswer;
	vm.finaliseAnswers = finaliseAnswers;
	vm.getAnswerClass = getAnswerClass;
	vm.calculatePerc = calculatePerc;
	vm.reset = reset;
	vm.search = "";
	vm.activeQuestion = 0;
	vm.quizActivate = false;

	var numQuestionsAnswered = 0;

	function changeActiveCpp(index){
		vm.activeCpp = index;
	};

	function activateQuiz(){
		//quizMetrics.changeState(true);
		vm.quizActivate = true;
	};

	function setActiveQuestion(index){
		if (index === undefined){
			var breakOut = false;
			var quizLength = vm.quizQuestions.length - 1;

			while (!breakOut){
				vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;

				if (vm.activeQuestion === 0){
					vm.error = true;
				}
				if (vm.quizQuestions[vm.activeQuestion].selected === null){
					breakOut = true;
				}
			}
		} else {
			vm.activeQuestion = index;
		}
	};

	function questionAnswered(){
		if (vm.quizQuestions[vm.activeQuestion].selected !== null){
			numQuestionsAnswered++;

			var quizLength = vm.quizQuestions.length;

			if (numQuestionsAnswered >= quizLength){
				for (var i = 0; i < quizLength; i++){
					if (vm.quizQuestions[i].selected === null){
						setActiveQuestion(i);
						return;
					}
				}
				vm.error = false;
				vm.finalise = true;
				return;
			}
		}
		vm.setActiveQuestion();
	};

	function selectAnswer(index){
		vm.quizQuestions[vm.activeQuestion].selected = index;
	};

	vm.quizObj = {
		quizActive: true,
		resultsActive: false,
		changeState: changeState,
		correctAnswers: [],
		markQuiz: markQuiz,
		numCorrect: 0
	};

	function changeState(metric, state){
		if (metric === "quiz"){
			vm.quizObj.quizActive = state;
		} else if (metric === 'results'){
			vm.quizObj.resultsActive = state;
		} else {
			return false;
		}
	};

	function markQuiz(){
		vm.quizObj.correctAnswers = correctAnswers;

		for (var i = 0; i < vm.quizQuestions.length; ++i){
			if (vm.quizQuestions[i].selected === correctAnswers[i]){
				vm.quizQuestions[i].correct = true;
				vm.quizObj.numCorrect++;
			} else {
				vm.quizQuestions[i].correct = false;
			}
		}
	};

	function finaliseAnswers(){
		vm.finalise = false;
		numQuestionsAnswered = 0;
		vm.activeQuestion = 0;
		markQuiz();
		changeState("quiz", false);
		changeState("results", true);
	};

	function calculatePerc(){
		return vm.quizObj.numCorrect / vm.quizQuestions.length * 100;
	};

	function getAnswerClass(index){
		if (index === correctAnswers[vm.activeQuestion]){
			return "bg-success";
		} else if (index === vm.quizQuestions[vm.activeQuestion].selected){
			return "bg-danger";
		}
	};

	function reset(){
		changeState("results", false);
		vm.quizObj.numCorrect = 0;

		for (var i = 0; i < vm.quizQuestions.length; i++){
			vm.quizQuestions[i].selected = null;
			vm.quizQuestions[i].correct = null;
		}
	};

};

var correctAnswers = [1, 2, 2, 2, 3, 0, 3, 1];

var cppData = [
				{
								name: "History",
								image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
								fact: "Designed in 1979 by Bjarne Stroustrup, a Danish computer scientist.",
								description: "The motivation for creating a new language originated from Stroustrup's experience in programming for his Ph.D. thesis. Stroustrup found that Simula had features that were very helpful for large software development, but the language was too slow for practical use, while BCPL was fast but too low-level to be suitable for large software development."
				},
        {
                name: "Object Oriented",
                image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
                fact: "A programming paradigm based on the concept of 'objects'",
                description: "Object-oriented programming uses objects, but not all of the associated techniques and structures are supported directly in languages that claim to support OOP. C++ offers classes, which provide the four features commonly present in OOP (and some non-OOP) languages: abstraction, encapsulation, inheritance, and polymorphism. One distinguishing feature of C++ classes compared to classes in other programming languages is support for deterministic destructors."
        },
        {
                name: "C++ Pointers",
                image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
                fact: "Pointers are used in C++ program to access the memory and manipulate the address.",
                description: "C++ gives you the power to manipulate the data in the computer's memory directly. You can assign and de-assign any space in the memory as you wish. This is done using Pointer variables. Pointers variables are variables that points to a specific address in the memory pointed by another variable."
        },
        {
                name: "C++ References",
                image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
                fact: "A reference variable is an alias, that is, another name for an already existing variable. ",
                description: "Think of a variable name as a label attached to the variable's location in memory. You can then think of a reference as a second label attached to that memory location. Therefore, you can access the contents of the variable through either the original variable name or the reference."
        },
        {
                name: "Templates",
                image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
                fact: "Templates enable generic programming. C++ supports function, class, alias and variable templates.",
                description: "Templates are implemented by instantiation at compile-time. To instantiate a template, compilers substitute specific arguments for a template's parameters to generate a concrete function or class instance. templates are a compile time mechanism in C++ that is Turing-complete, meaning that any computation expressible by a computer program can be computed, in some form, by a template metaprogram prior to runtime."
        },
        {
                name: "Polymorphism",
                image_url: "https://pluralsight.imgix.net/paths/path-icons/c-plus-plus-93c7ddd5cc.png",
                fact: "In C++, Polymorphism enables one common interface for many implementations.",
                description: "C++ supports several kinds of static (resolved at compile-time) and dynamic (resolved at run-time) polymorphisms, supported by the language features described above. Compile-time polymorphism does not allow for certain run-time decisions, while runtime polymorphism typically incurs a performance penalty."
        }
   ];

	 var quizQuestions = [
	 		{
	 			type: "text",
	 			text: "Who designed C++?",
	 			possibilities: [
	 				{
	 					answer: "James Gosling"
	 				},
	 				{
	 					answer: "Bjarne Stroustrup"
	 				},
	 				{
	 					answer: "Dennis Ritchie"
	 				},
	 				{
	 					answer: "Edsger Dijkstra"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "What are pointers used for?",
	 			possibilities: [
	 				{
	 					answer: "For assigning aliases"
	 				},
	 				{
	 					answer: "For polymorphism"
	 				},
	 				{
	 					answer: "To access memory and manipulate addresses"
	 				},
	 				{
	 					answer: "To allocate memory dynamically"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "Objects created using new operator are stored in __ memory.",
	 			possibilities: [
	 				{
	 					answer: "Register"
	 				},
	 				{
	 					answer: "Cache"
	 				},
	 				{
	 					answer: "Heap"
	 				},
	 				{
	 					answer: "Stack"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "What is the built in library function to compare two strings?",
	 			possibilities: [
	 				{
	 					answer: "equals()"
	 				},
	 				{
	 					answer: "str_compare()"
	 				},
	 				{
	 					answer: "strcmp()"
	 				},
	 				{
	 					answer: "compare()"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
			{
	 			type: "text",
	 			text: "Which of the following gives the value stored at the address pointed to by the pointer a?",
	 			possibilities: [
	 				{
	 					answer: "a"
	 				},
	 				{
	 					answer: "val(a)"
	 				},
	 				{
	 					answer: "*a"
	 				},
	 				{
	 					answer: "&a"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "Which of the following is the proper keyword to deallocate memory?",
	 			possibilities: [
	 				{
	 					answer: "delete"
	 				},
	 				{
	 					answer: "clear"
	 				},
	 				{
	 					answer: "free"
	 				},
	 				{
	 					answer: "remove"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "What value must a destructor return?",
	 			possibilities: [
	 				{
	 					answer: "An object to the class"
	 				},
	 				{
	 					answer: "A pointer to the class"
	 				},
	 				{
	 					answer: "A status"
	 				},
	 				{
	 					answer: "Destructors do not return a value"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "Which is a valid typecast?",
	 			possibilities: [
	 				{
	 					answer: "a(char)"
	 				},
	 				{
	 					answer: "char(a)"
	 				},
	 				{
	 					answer: "char:a"
	 				},
	 				{
	 					answer: "to(char, a)"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		}
	 	];
