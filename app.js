import React, { useState, useEffect } from 'react';

// 生成加法問題
const generateAdditionProblem = () => {
  const firstNumber = Math.floor(Math.random() * 90) + 10; // 10-99的雙位數
  const secondNumber = Math.floor(Math.random() * 9) + 1; // 1-9的單位數
  return {
    firstNumber,
    secondNumber,
    operator: '+',
    correctAnswer: firstNumber + secondNumber
  };
};

// 生成減法問題
const generateSubtractionProblem = () => {
  const firstNumber = Math.floor(Math.random() * 10) + 1; // 1-10
  const secondNumber = Math.floor(Math.random() * firstNumber) + 1; // 小於等於firstNumber的數
  return {
    firstNumber,
    secondNumber,
    operator: '-',
    correctAnswer: firstNumber - secondNumber
  };
};

// 生成乘法問題（9的乘法表）
const generateMultiplicationProblem = () => {
  const secondNumber = Math.floor(Math.random() * 10) + 1; // 1-10
  return {
    firstNumber: 9,
    secondNumber,
    operator: '×',
    correctAnswer: 9 * secondNumber
  };
};

const MathLearningApp = () => {
  const [problem, setProblem] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [problemType, setProblemType] = useState('addition');

  // 生成新問題
  const generateNewProblem = () => {
    let newProblem;
    switch(problemType) {
      case 'addition':
        newProblem = generateAdditionProblem();
        break;
      case 'subtraction':
        newProblem = generateSubtractionProblem();
        break;
      case 'multiplication':
        newProblem = generateMultiplicationProblem();
        break;
      default:
        newProblem = generateAdditionProblem();
    }
    setProblem(newProblem);
    setUserAnswer('');
    setFeedback('');
  };

  // 檢查答案
  const checkAnswer = () => {
    const numAnswer = parseInt(userAnswer);
    if (numAnswer === problem.correctAnswer) {
      setFeedback('太棒了！答對了！🌟');
      setScore(prevScore => prevScore + 1);
      setTimeout(generateNewProblem, 1500);
    } else {
      setFeedback('再試一次喔！');
    }
  };

  // 初始化和切換問題類型
  useEffect(() => {
    generateNewProblem();
  }, [problemType]);

  return (
    <div className="max-w-md mx-auto p-6 bg-yellow-100 rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4 text-blue-700">數學小遊戲</h1>
      
      {/* 問題類型選擇 */}
      <div className="mb-4">
        <button 
          onClick={() => setProblemType('addition')} 
          className={`mr-2 px-4 py-2 rounded ${problemType === 'addition' ? 'bg-green-500 text-white' : 'bg-green-200'}`}
        >
          加法
        </button>
        <button 
          onClick={() => setProblemType('subtraction')} 
          className={`mr-2 px-4 py-2 rounded ${problemType === 'subtraction' ? 'bg-blue-500 text-white' : 'bg-blue-200'}`}
        >
          減法
        </button>
        <button 
          onClick={() => setProblemType('multiplication')} 
          className={`px-4 py-2 rounded ${problemType === 'multiplication' ? 'bg-purple-500 text-white' : 'bg-purple-200'}`}
        >
          乘法
        </button>
      </div>

      {/* 問題顯示 */}
      {problem && (
        <div className="mb-4">
          <div className="text-4xl font-bold mb-4">
            {problem.firstNumber} {problem.operator} {problem.secondNumber} = 
          </div>
          
          {/* 答案輸入 */}
          <input 
            type="number" 
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="w-full p-2 text-center text-2xl border-2 border-gray-300 rounded mb-4"
            placeholder="輸入你的答案"
          />
          
          {/* 檢查按鈕 */}
          <button 
            onClick={checkAnswer}
            className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            檢查答案
          </button>
          
          {/* 反饋訊息 */}
          {feedback && (
            <div className={`mt-4 text-2xl font-bold ${feedback.includes('太棒了') ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </div>
          )}
        </div>
      )}

      {/* 分數顯示 */}
      <div className="text-xl">
        目前分數：{score}
      </div>
    </div>
  );
};

export default MathLearningApp;
