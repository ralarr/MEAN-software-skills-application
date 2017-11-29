angular.module("bigOFacts", [])

.controller("listCtrl", ListController);

//ListController.$inject = ['quizMetrics'];

function ListController(){
	var vm = this;

	//vm.quizMetrics = quizMetrics;
	vm.data = bigOData;
	vm.quizQuestions = quizQuestions;
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

var correctAnswers = [0, 1, 3, 0];

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

	 var quizQuestions = [
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
	 		}
	 	];
