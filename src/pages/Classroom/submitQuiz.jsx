import React, { useState } from 'react';

const QuizSubmitPage = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e, index) => {
    const newAnswers = { ...answers };
    newAnswers[index] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send answers to backend to submit the quiz
      console.log('Quiz answers:', answers);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  };

  // Example questions data
  const questions = [
    { question: 'What is 2 + 2?', options: ['4', '5', '6'], correctIndex: 0 },
    { question: 'What is the capital of France?', options: ['London', 'Paris', 'Berlin'], correctIndex: 1 }
    // Add more questions here...
  ];

  return (
    <div>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={index}>
            <p>{question.question}</p>
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <input
                  type="radio"
                  id={option-${index}-${optionIndex}}
                  name={question-${index}}
                  value={optionIndex}
                  onChange={(e) => handleInputChange(e, index)}
                  disabled={submitted}
                />
                <label htmlFor={option-${index}-${optionIndex}}>{option}</label>
              </div>
            ))}
          </div>
        ))}
        <button type="submit" disabled={submitted}>Submit</button>
      </form>
      {submitted && <p>Quiz submitted!</p>}
    </div>
  );
}

export default QuizSubmitPage;