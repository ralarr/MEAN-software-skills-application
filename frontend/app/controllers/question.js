angular.module("questions", [])

.controller("questionsCtrl", QsController);

function QsController(){
  var vm = this;
  vm.questions = questions;
  vm.setActiveQuestion = setActiveQuestion;
  vm.activeQuestion = 0;

  function setActiveQuestion(){
			var quizLength = vm.questions.length - 1;

			vm.activeQuestion = vm.activeQuestion < quizLength ? ++vm.activeQuestion : 0;
	};
};

var questions = [
   {
     type: "text",
     text: "Implement an algorithm to determine if a string has all unique characters. What if you can not use additional data structures?"
   },
   {
     type: "text",
     text: "Write a function to replace all spaces in a string with ‘$#@*’."
   },
   {
     type: "text",
     text: "Write a function to decide if two strings are anagrams or not."
   },
   {
     type: "text",
     text: "Write a function to generate the nth Fibonacci number."
   },
   {
     type: "text",
     text: "Write a function to compute all permutations of a string."
   },
   {
     type: "text",
     text: "Given an infinite number of quarters (25 cents), dimes (10 cents), nickels (5 cents) and pennies (1 cent), write code to calculate the number of ways of representing n cents."
   },
   {
     type: "text",
     text: "Write a function to implement *, - , / operations. You should use only the + operator."
   },
   {
     type: "text",
     text: "Write a function to print the last K lines of an input file using C++."
   },
   {
     type: "text",
     text: "Write a function to swap a number in place without temporary variables."
   },
   {
     type: "text",
     text: "Write an algorithm which computes the number of trailing zeros in n factorial."
   }
];
