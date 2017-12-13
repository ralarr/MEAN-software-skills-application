angular.module("javaFacts", [])

.controller("listJavaCtrl", ListController);

function ListController(){
	var vm = this;

	vm.data = javaData;
	vm.quizQuestions = quizQuestions;
	vm.error = false;
	vm.finalise = false;
	vm.activeJava = {};
  vm.changeActiveJava = changeActiveJava;
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

	function changeActiveJava(index){
		vm.activeJava = index;
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

var javaData = [
				{
								name: "History",
								image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
								fact: "Java was initiated as a project in 1991 by James Gosling, Mike Sheridan, and Patrick Naughton",
								description: "Java was originally designed for interactive television, but it was too advanced for the digital cable television industry at the time.[25] The language was initially called Oak after an oak tree that stood outside Gosling's office. Later the project went by the name Green and was finally renamed Java, from Java coffee.[26] Gosling designed Java with a C/C++-style syntax that system and application programmers would find familiar."
				},
        {
                name: "Object Oriented",
                image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
                fact: "A programming paradigm based on the concept of 'objects'",
                description: "Object-oriented programming uses objects, but not all of the associated techniques and structures are supported directly in languages that claim to support OOP. In Java riting object-oriented programs involves creating classes, creating objects from those classes, and creating applications, which are stand-alone executable programs that use those objects."
        },
        {
                name: "Memory Management",
                image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
                fact: "The Java runtime is responsible for recovering the memory once objects are no longer in use.",
                description: "The programmer determines when objects are created. Java uses an automatic garbage collector to manage memory in the object lifecycle. One of the ideas behind Java's automatic memory management model is that programmers can be spared the burden of having to perform manual memory management. Garbage collection may happen at any time. Ideally, it will occur when a program is idle."
        },
        {
                name: "Java Syntax",
                image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
                fact: "The syntax of Java was largely influenced by C++.",
                description: "Java was built almost exclusively as an object-oriented language. All code is written inside classes, and every data item is an object, with the exception of the primitive data types, (i.e. integers, floating-point numbers, boolean values, and characters), which are not objects for performance reasons. Java reuses some popular aspects of C++ (such as printf() method)."
        },
        {
                name: "Standard Library",
                image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
                fact: "Was developed to support application development in Java.",
                description: "It is controlled by Sun Microsystems in cooperation with others through the Java Community Process program. Companies or individuals participating in this process can influence the design and development of the APIs. This process has been a subject of controversy."
        },
        {
                name: "Java Versions",
                image_url: "https://pbs_dotph_twimg_dotph_com.proxy.live/profile_images/426420605945004032/K85ZWV2F_400x400.png",
                fact: "Java has undergone several changes and additions of classes and packages.",
                description: "In addition to the language changes, much more dramatic changes have been made to the Java Class Library over the years, which has grown from a few hundred classes in JDK 1.0 to over three thousand in J2SE 5. Entire new APIs, such as Swing and Java2D, have been introduced, and many of the original JDK 1.0 classes and methods have been deprecated."
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
