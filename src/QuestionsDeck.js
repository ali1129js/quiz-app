/**
 * @Author: Ali
 * @Date:   2019-02-22T11:46:34+01:00
 * @Last modified by:   Ali
 * @Last modified time: 2019-02-23T08:13:16+01:00
 */
export const QuestionsDeck = [
  {
    questionNumber: 0,
    question: "What is the most appropriate use of an object?",
    options: [
      "to have numeric properties (keys)",
      "to only store strings",
      "to hold pairs of named properties and values",
      "to find out the count of properties"
    ],
    answer: "to hold pairs of named properties and values",
    explain:
      "You theoretically could use an array as a normal object with your own named properties, or you could use an object but only give it numeric properties (0, 1, etc.) similar to an array. However, this would generally be considered improper usage of the respective types. The best and most natural approach is to use arrays for numerically positioned values and use objects for named properties."
  },
  {
    questionNumber: 1,
    question: "What is the return value of: typeof null?",
    options: ["boolean", "object", "undefined", "number"],
    answer: "object",
    explain:
      "typeof null is an interesting case, because it errantly returns 'object', when you'd expect it to return 'null' (just like typeof undefined returns undefined)"
  },
  {
    questionNumber: 2,
    question: "Which of the following is an array property?",
    options: ["values", "count", "limit", "length"],
    answer: "length",
    explain:
      "Because arrays are special objects (as typeof implies), they can also have properties, including the automatically updated length property."
  },
  {
    questionNumber: 3,
    question: "Which is a valid JavaScript type for numerical data?",
    options: ["float", "int", "number", "long"],
    answer: "number",
    explain:
      "Unlike many coding languages, JavaScript has only one primitve numerical type: number. This is used for both integers and floating point values."
  },
  {
    questionNumber: 4,
    question: "What is the output of console.log(typeof [])?",
    options: ["undefined", "object", "array", "null"],
    answer: "object",
    explain:
      "In JavaScript, arrays are a type of object. There is no array type."
  },
  {
    questionNumber: 5,
    question: "What is the main difference between an array and an object?",
    options: [
      "the maximum length of values they can hold",
      "positions in arrays begin from 0 and in objects from 1",
      "arrays hold values with indexed positions instead of key/value pairs",
      "anything can be stored in objects but only strings and numbers in an array"
    ],
    answer:
      "arrays hold values with indexed positions instead of key/value pairs",

    explain:
      "An array is an object that holds values (of any type) not particularly in named properties/keys, but rather in numerically indexed positions. Languages that start counting at zero, like JS does, use 0 as the index of the first element in the array."
  }
];
export const Scope = [
  {
    questionNumber: 1,
    question: "What gives a program state?",
    options: [
      "The ability for a program to execute",
      "The abiliy for a program to be compiled",
      "The ability to store values and pull values out of variables",
      "The process of creating an Abstract Syntax Tree"
    ],
    answer: "The ability to store values and pull values out of variables",
    explain:
      "A program is described as stateful if it is designed to remember preceding events or user interactions. The remembered information is called the state. Without state, a program could perform some tasks, but they would be extremely limited in functionality."
  },
  {
    questionNumber: 2,
    question:
      "In a traditional compiled-language process, what is the correct order of the three main steps a program will undergo before executing?",
    options: [
      "Tokenizing/Lexing, Parsing, Code-Generation",
      "Tokenizing/Lexing, Code-Generation, Parsing",
      "Parsing, Code-Generation, Tokenzing/Lexing",
      "Code-Generation, Tokenzing/Lexing, Parsing"
    ],
    answer: "Tokenizing/Lexing, Parsing, Code-Generation",
    explain:
      "Tokenizing/Lexing is the process of breaking up a string of characters into meaningful chunks called tokens. Parsing is the act of taking a stream of tokens and turning it into a tree of nested elements which represent the structure of the program. Code-Generation is the process of taking the tree and turning it into executable code."
  },
  {
    questionNumber: 3,
    question:
      "In a traditional compiled-language process, during which phase is a string of characters broken into meaningful chunks?",
    options: [
      "Code-generation phase",
      "Parsing phase",
      "Execution phase",
      "Tokenizing/Lexing phase"
    ],
    answer: "Tokenizing/Lexing phase",
    explain:
      "E. A string of characters is broken into meaningful chuncks during the tokenization/lexing phase. A token is a string with an assigned meaning. It is structured as a pair consisting of a token name and optional token value. Some common token names include: Identifiers, Keywords, Separators, operators, and literals."
  },
  {
    questionNumber: 4,
    question: "Which of the following is the responsibility of Scope?",
    options: [
      "Parsing and code-generation",
      "Collecting and maintaining a look-up list of all declared variables",
      "Start-to-Finish compilation and execution of the javaScript prgoram",
      "Taking a stream of tokens and turning it into a tree of nested elements"
    ],
    answer:
      "Collecting and maintaining a look-up list of all declared variables",
    explain:
      "The Scope is responsible for maintaing a look-up list of all declared identifiers and enforcing a strict set of rules as to how these are accessible to currently executing code."
  },
  {
    questionNumber: 5,
    question:
      "Two distinct actions are taken for a variable assignment such as  var a = 2;",
    options: [
      "Compiler declares a variable (if not previously declared) while simultaneously Engine looks up the variable in Scope and assigns to it, if found.",
      "Compiler declares a variable regardless of whether or not it was previously declared, while simultaneously Engine looks up the variable in Scope and assigns to it",
      "First, Compiler declares a variable (if not previously declared in the current scope), and second, when executing, Engine looks up the variable in Scope and assigns to it, if found.",
      "First, Engine declares a variable (if not previously declared in the current scope), and second, when executing, Compiler looks up the variable in Scope and assigns to it, if found."
    ],
    answer:
      "First, Compiler declares a variable (if not previously declared in the current scope), and second, when executing, Engine looks up the variable in Scope and assigns to it, if found.",
    explain:
      "Two distinct actions are taken for a variable assignment: First, Compiler declares a variable (if not previously declared in the current scope), and second, when executing, Engine looks up the variable in Scope and assigns to it, if found."
  },
  {
    questionNumber: 6,
    question:
      "Which of these next statements is true for traversing nested Scope?",
    options: [
      "Engine starts looking for a variable at the outermost global scope.",
      "Engine starts looking for a variable at the innermost global scope",
      "If the variable was not found at the currently executing Scope, Engine keeps going down one level, and so on.",
      "Engine starts looking for the variable at the currently executing Scope."
    ],
    answer:
      "Engine starts looking for the variable at the currently executing Scope.",
    explain:
      "Engine starts at the currently executing Scope, looks for the variable there, then if not found, keeps going up one level, and so on. If the outermost global scope is reached, the search stops, whether it finds the variable or not."
  },
  {
    questionNumber: 7,
    question: "Why does it matter whether we call it LHS or RHS?",
    options: [
      "Because these two types of look-ups behave differently when the variable has been declared and assigned the value  undefined.",
      "Because these two types of look-ups behave differently when the variable has been declared on global Scope vs. the currently executing Scope.",
      "Because these two types of look-ups behave differently when the variable has not yet been declared (is not found in any consulted Scope).",
      "If an LHS look-up fails to ever find a variable, anywhere in the nested Scopes, this results in a ReferenceError being thrown by the Engine."
    ],
    answer:
      "Because these two types of look-ups behave differently when the variable has not yet been declared (is not found in any consulted Scope).",
    explain:
      "The names matter because these two types of look-ups behave differently in the circumstance where the variable has not yet been declared (is not found in any consulted Scope). If an RHS look-up fails to ever find a variable, this results in a ReferenceError being thrown by the Engine. By contrast, if the Engine is performing an LHS look-up and arrives at the top floor (global Scope) without finding it, and if the program is not running in 'Strict Mode', then the global Scope will create a new variable of that name in the global scope."
  },
  {
    questionNumber: 8,
    question: "What is Parsing?",
    options: [
      "Taking a string and converting it into tokens",
      "Taking a stream of tokens and converting them into an abstract syntax tree",
      "Taking a string and converting it into assembly",
      "Taking an abstract syntax tree and converting it into zeroes and ones"
    ],
    answer:
      "Taking a stream of tokens and converting them into an abstract syntax tree",
    explain:
      "Parsing is typically thought of as taking a string of text and making sense of it. However, the string of text is actually converted into tokens first. Parsing is actually taking the tokens and making them useful by converting them into an abstract syntax tree"
  },
  {
    questionNumber: 9,
    question: "What is the responsibility of a JavaScript engine?",
    options: [
      "Find all unused code and remove it before code generation",
      "Writing JavaScript code that is missing from the file",
      "Handling all the dirty work of parsing and code-generation",
      "Start-to-finish compilation and execution of our JavaScript program"
    ],
    answer:
      "Start-to-finish compilation and execution of our JavaScript program",
    explain:
      "The engine is the entirety of what reads and executes your code. Each browser has their own engine as does Node (built on Chrome's V8 JavaScript engine)."
  },
  {
    questionNumber: 10,
    question: "What is the difference between an LHS lookup and an RHS lookup?",
    options: [
      "LHS looks for the existence of a variable whereas RHS looks for the history of that variable",
      "LHS lookups search for variables whereas RHS search for values",
      "LHS looks for assignment operator whereas RHS looks for the value to be assigned",
      "LHS looks for the variable container whereas RHS looks for the value of the variable"
    ],
    answer:
      "LHS looks for the variable container whereas RHS looks for the value of the variable",
    explain:
      "LHS stands for 'left hand side', and RHS stands for 'right hand side'. For a = b, the RHS looks for the value of b, and the LHS looks for the location of a in memory, so that it can update its value."
  },
  {
    questionNumber: 11,
    question:
      "If an RHS look-up fails to find a variable, what kind of error is thrown?",
    options: ["ReferenceError", "SyntaxError", "EvalError", "TypeError"],
    answer: "ReferenceError",
    explain:
      "A ReferenceError is thrown when trying to dereference a variable that has not been declared. The only way for an RHS look-up to fail is if the variable has not been declared."
  }
];
export const LexicalScope = [
  {
    questionNumber: 1,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 2,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 3,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 4,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 5,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 6,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 7,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 8,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  },
  {
    questionNumber: 9,
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explain: ""
  }
];

/*
{
  questionNumber: 1,
  question: "",
  options: [
    "",
    "",
    "",
    ""
  ],
  answer: "",
  explain:
    ""
},
*/
