import React, { useState } from 'react';

const createQuiz = () => {
  const [quizData, setQuizData] = useState({ title: '', questions: [{ questionText: '', options: [''], correctOptionIndex: 0 }] });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newQuizData = { ...quizData };
    newQuizData.questions[index][name] = value;
    setQuizData(newQuizData);
  };

  const handleOptionChange = (e, questionIndex, optionIndex) => {
    const { value } = e.target;
    const newQuizData = { ...quizData };
    newQuizData.questions[questionIndex].options[optionIndex] = value;
    setQuizData(newQuizData);
  };

  const addQuestion = () => {
    const newQuizData = { ...quizData };
    newQuizData.questions.push({ questionText: '', options: [''], correctOptionIndex: 0 });
    setQuizData(newQuizData);
  };

  const handleSubmit = () => {
    // Send quizData to backend to create the quiz
    console.log('Quiz data:', quizData);
  };

  return (
    <div>
      <h1>Create Quiz</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" name="title" value={quizData.title} onChange={(e) => handleInputChange(e)} />
        {quizData.questions.map((question, index) => (
          <div key={index}>
            <label>Question {index + 1}:</label>
            <input type="text" name="questionText" value={question.questionText} onChange={(e) => handleInputChange(e, index)} />
            {question.options.map((option, optionIndex) => (
              <div key={optionIndex}>
                <label>Option {optionIndex + 1}:</label>
                <input type="text" value={option} onChange={(e) => handleOptionChange(e, index, optionIndex)} />
              </div>
            ))}
            <label>Correct Option:</label>
            <select value={question.correctOptionIndex} onChange={(e) => handleInputChange(e, index)} name="correctOptionIndex">
              {question.options.map((option, optionIndex) => (
                <option key={optionIndex} value={optionIndex}>{Option ${optionIndex + 1}}</option>
              ))}
            </select>
          </div>
        ))}
        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Submit Quiz</button>
      </form>
    </div>
  );
};

export default createQuiz;