angular.module("bigOFacts", [])

.controller("listBOCtrl", ListController);

function ListController(){
	var vm = this;

	vm.data = bigOData;
	vm.boquizQuestions = boquizQuestions;
	vm.error = false;
	vm.finalise = false;
	vm.activeBigO = {};
  vm.changeActiveBigO = changeActiveBigO;
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

	function changeActiveBigO(index){
		vm.activeBigO = index;
	};

	function activateQuiz(){
		vm.quizActivate = true;
	};

	function setActiveQuestion(index){
		if (index === undefined){
			var breakOut = false;
			var quizLength = vm.boquizQuestions.length - 1;

			while (!breakOut){
				vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;

				if (vm.activeQuestion === 0){
					vm.error = true;
				}
				if (vm.boquizQuestions[vm.activeQuestion].selected === null){
					breakOut = true;
				}
			}
		} else {
			vm.activeQuestion = index;
		}
	};

	function questionAnswered(){
		if (vm.boquizQuestions[vm.activeQuestion].selected !== null){
			numQuestionsAnswered++;

			var quizLength = vm.boquizQuestions.length;

			if (numQuestionsAnswered >= quizLength){
				for (var i = 0; i < quizLength; i++){
					if (vm.boquizQuestions[i].selected === null){
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
		vm.boquizQuestions[vm.activeQuestion].selected = index;
	};

	vm.quizObj = {
		quizActive: true,
		resultsActive: false,
		changeState: changeState,
		bocorrectAnswers: [],
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
		vm.quizObj.bocorrectAnswers = bocorrectAnswers;

		for (var i = 0; i < vm.boquizQuestions.length; ++i){
			if (vm.boquizQuestions[i].selected === bocorrectAnswers[i]){
				vm.boquizQuestions[i].correct = true;
				vm.quizObj.numCorrect++;
			} else {
				vm.boquizQuestions[i].correct = false;
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
		return vm.quizObj.numCorrect / vm.boquizQuestions.length * 100;
	};

	function getAnswerClass(index){
		if (index === bocorrectAnswers[vm.activeQuestion]){
			return "bg-success";
		} else if (index === vm.boquizQuestions[vm.activeQuestion].selected){
			return "bg-danger";
		}
	};

	function reset(){
		changeState("results", false);
		vm.quizObj.numCorrect = 0;

		for (var i = 0; i < vm.boquizQuestions.length; i++){
			vm.boquizQuestions[i].selected = null;
			vm.boquizQuestions[i].correct = null;
		}
	};

};

var bocorrectAnswers = [0, 1, 3, 0, 3, 1];

var bigOData = [
        {
                name: "Constant",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "Determining if a binary number is even or odd; calculating(-1)^n",
                description: "An algorithm is said to be constant time (O(1)) if the value of T(n) is bounded by a value that does not depend on the size of the input. Like accessing any element in an array because there is only one operation required. The running time does not have to be independent of the size of the problem, but an upper bound for the running time has to be bounded independently of the problem size."
        },
        {
                name: "Logarithmic",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "The use of binary search for finding an item in a sorted array or a balanced tree.",
                description: "An algorithm is said to take logarithmic time if T(n) = O(log n). Logarithmic algorithms are commonly found in binary tree operations and in binary search. These algorithms are considered highly efficient because the operations per instance required to complete decrease with each instance."
        },
        {
                name: "Linear",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "Finding an item in an unsorted array or list.",
                description: "An algorithm is said to take linear time if the time complexity is O(n). This means that the running time of the algorithm increases linearly with the size of the output. It is the best possible time complexity in situations where the algorithm has to read its entire input."
        },
        {
                name: "Linearithmic",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "Fastest possible heapsort, merge sort. Performing a fast Fourier transform.",
                description: "Linearithmic algorithms are capable of good performance with very large data sets. A linearithmic algorithm will grow faster than a linear one, but slower than any polynomial one."
        },
        {
                name: "Quadratic",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "When multiplying two numbers by a simple algorithm. The worst cases of bubble, selection, and insertion sorts.",
                description: ""
        },
        {
                name: "Exponential",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "",
                description: ""
        },
        {
                name: "Factorial",
                image_url: "https://pbs.twimg.com/profile_images/561297441186525184/e4oYqWgy.jpeg",
                example: "",
                description: ""
        }
   ];

	 var boquizQuestions = [
	 		{
	 			type: "text",
	 			text: "Where is O(log n) used?",
	 			possibilities: [
	 				{
	 					answer: "Binary Search"
	 				},
	 				{
	 					answer: "Merge Sort"
	 				},
	 				{
	 					answer: "Bubble sort"
	 				},
	 				{
	 					answer: "Dijkstra Algorithm"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "Where is a linearithmic algorithm used?",
	 			possibilities: [
	 				{
	 					answer: "The worst case of selection sort"
	 				},
	 				{
	 					answer: "The fastest possible heap sort"
	 				},
	 				{
	 					answer: "When the algorithm has to read its entire output"
	 				},
	 				{
	 					answer: "To find an item in an unsorted array or list"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "The running time of the algorithm increases linearly with the size of the output...",
	 			possibilities: [
	 				{
	 					answer: "Quadratic"
	 				},
	 				{
	 					answer: "Factorial"
	 				},
	 				{
	 					answer: "Exponential"
	 				},
	 				{
	 					answer: "Linear"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "Where is O(log n) used?",
	 			possibilities: [
	 				{
	 					answer: "Binary Search"
	 				},
	 				{
	 					answer: "Merge Sort"
	 				},
	 				{
	 					answer: "Bubble sort"
	 				},
	 				{
	 					answer: "Dijkstra Algorithm"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
			{
	 			type: "text",
	 			text: "The algorithm takes twice as long for every new element added.",
	 			possibilities: [
	 				{
	 					answer: "Factorial"
	 				},
	 				{
	 					answer: "Linear"
	 				},
	 				{
	 					answer: "Quadratic"
	 				},
	 				{
	 					answer: "Exponential"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		},
	 		{
	 			type: "text",
	 			text: "What is the worst space complexity of a linked list? ",
	 			possibilities: [
	 				{
	 					answer: "Quadratic"
	 				},
	 				{
	 					answer: "Linear"
	 				},
	 				{
	 					answer: "Exponential"
	 				},
	 				{
	 					answer: "Factorial"
	 				}
	 			],
	 			selected: null,
	 			correct: null
	 		}
	 	];
