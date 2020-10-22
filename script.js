
(function(){
    function createQuiz(){
      // variable to store output
      const output = [];
  
      // for each question in the array
      quizQuestions.forEach(
        (currentQuestion, questionNumber) => {
  
          // answers variable to store array of possible answers
          const answers = [];
  
          //for every available answer...
          for(answerLetter in currentQuestion.answers){
  
            // Add an HTML radio button element 
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${answerLetter}">
                ${answerLetter} :
                ${currentQuestion.answers[answerLetter]}
              </label>`
            );
          }
  
          // add this question and its answers to the output
          output.push(
            `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
          );
        }
      );
  
      // We then  combine our output list into one string of HTML and put it on the page
      quizContainer.innerHTML = output.join('');
    }
  
    function showResults(){
  
      // COLLECT answer containers from our quiz
      const answerContainers = quizContainer.querySelectorAll('.answers');
  
      // keep track of  answers
      let numCorrect = 0;
  
      // for EVERY question in quizQuestions
      quizQuestions.forEach( (currentQuestion, questionNumber) => {
  
        // find selected user answer
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
        // if answer is correct
        if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;
  
          // color the answers green
          answerContainers[questionNumber].style.color = 'green';
        }
        // if answer is wrong or blank
        else{
          // color the answers red
          answerContainers[questionNumber].style.color = 'red';
        }
      });
  
      // show number of correct answers out of total
      resultsContainer.innerHTML = `You had ${numCorrect} correct answers out of ${quizQuestions.length}    questions`;
    }
  
    const quizContainer = document.getElementById('quizQuestion');
    const resultsContainer = document.getElementById('quizDisplay');
    const submitButton = document.getElementById('submitBtn');
    const quizQuestions = [
      {
        question: "Define JavaScript?",
        answers: {
          a: "server side scripting language",
          b: "client side scripting language",
          c: "object oriented language"
        },
        correctAnswer: "b"
      },
      {
        question: "When JavaScript become an ECMA script standard?",
        answers: {
          a: "1995",
          b: "1997",
          c: "2005"
        },
        correctAnswer: "b"
      },
      {
        question: "Which of these is a javascript framework?",
        answers: {
          a: "Angular",
          b: "jQuery",
          c: "Typescript",
          d: "java"
        },
        correctAnswer: "a"
      },
      {
        question: "When was React developed by Facebook?",
        answers: {
          a: "1997",
          b: "2005",
          c: "1995",
          d: "2015"
        },
        correctAnswer: "d"
      }
    ];
  
    // Kick things off
    createQuiz();
  
    // Event listeners
    submitButton.addEventListener('click', showResults);
  })();