import React, { useState } from 'react';
import { Rocket, Zap, Award, ChevronRight, Check, X, Star, Trophy, Target } from 'lucide-react';

const SpaceQuizChallenges = () => {
  const [activeTab, setActiveTab] = useState('quizzes');
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedQuizzes, setCompletedQuizzes] = useState([]);

  const quizzes = [
    {
      id: 1,
      title: "Solar Panel Placement",
      difficulty: "Beginner",
      questions: 5,
      icon: "☀️",
      color: "from-blue-400 to-cyan-500",
      description: "Learn optimal energy generation in space",
      quiz: [
        {
          question: "Where should solar panels be placed for maximum energy generation?",
          options: [
            "Inside the habitat",
            "Facing the sun with clear exposure",
            "Near the sleeping quarters",
            "Underground"
          ],
          correct: 1,
          explanation: "Solar panels need direct sunlight exposure without obstructions to generate maximum energy for the habitat."
        },
        {
          question: "How much power does an average space habitat need per day?",
          options: ["5 kW", "15 kW", "50 kW", "100 kW"],
          correct: 2,
          explanation: "A typical space habitat requires around 50 kW per day to power life support, equipment, and research facilities."
        }
      ]
    },
    {
      id: 2,
      title: "Oxygen Circulation",
      difficulty: "Intermediate",
      questions: 6,
      icon: "💨",
      color: "from-blue-500 to-indigo-500",
      description: "Master life support systems",
      quiz: [
        {
          question: "What's the minimum oxygen level required for crew safety?",
          options: ["15%", "19.5%", "25%", "30%"],
          correct: 1,
          explanation: "NASA standards require maintaining at least 19.5% oxygen concentration for safe crew operations."
        }
      ]
    },
    {
      id: 3,
      title: "Waste Management",
      difficulty: "Advanced",
      questions: 7,
      icon: "♻️",
      color: "from-cyan-500 to-blue-600",
      description: "Understand closed-loop systems",
      quiz: [
        {
          question: "Which module is critical for processing crew waste?",
          options: ["Kitchen", "Laboratory", "Life Support Module", "Gym"],
          correct: 2,
          explanation: "The Life Support Module handles waste processing, water recycling, and air purification - essential for long-term missions."
        }
      ]
    }
  ];

  const challenges = [
    {
      id: 1,
      title: "Efficient Habitat Layout",
      difficulty: "Medium",
      time: "10 min",
      icon: "🏗️",
      color: "from-blue-600 to-indigo-600",
      description: "Design a habitat with optimal module placement",
      objectives: ["Place 5 modules", "Minimize travel distance", "Maximize efficiency"]
    },
    {
      id: 2,
      title: "Energy Crisis",
      difficulty: "Hard",
      time: "15 min",
      icon: "⚡",
      color: "from-sky-500 to-blue-700",
      description: "Solve power shortage with limited resources",
      objectives: ["Balance power consumption", "Prioritize critical systems", "Maintain life support"]
    },
    {
      id: 3,
      title: "Emergency Response",
      difficulty: "Expert",
      time: "20 min",
      icon: "🚨",
      color: "from-indigo-600 to-blue-800",
      description: "Handle oxygen leak and module failure",
      objectives: ["Identify leak source", "Redirect resources", "Save the crew"]
    }
  ];

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    const currentQuizData = quizzes.find(q => q.id === selectedQuiz);
    const isCorrect = selectedAnswer === currentQuizData.quiz[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 1);
    }
    
    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < currentQuizData.quiz.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        if (!completedQuizzes.includes(selectedQuiz)) {
          setCompletedQuizzes([...completedQuizzes, selectedQuiz]);
        }
      }
    }, 2500);
  };

  const resetQuiz = () => {
    setSelectedQuiz(null);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'text-green-400';
      case 'Intermediate': return 'text-yellow-400';
      case 'Advanced': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Hard': return 'text-orange-400';
      case 'Expert': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (selectedQuiz && activeTab === 'quizzes') {
    const currentQuizData = quizzes.find(q => q.id === selectedQuiz);
    const isQuizComplete = currentQuestion >= currentQuizData.quiz.length;

    if (isQuizComplete) {
      const percentage = (score / currentQuizData.quiz.length) * 100;
      return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 text-center">
              <div className="mb-6">
                <Trophy className="w-24 h-24 mx-auto text-yellow-400 animate-bounce" />
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
              <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500 mb-4">
                {score}/{currentQuizData.quiz.length}
              </div>
              <p className="text-xl text-gray-300 mb-8">
                {percentage >= 80 ? "🌟 Outstanding! You're ready for space!" :
                 percentage >= 60 ? "👍 Great job! Keep learning!" :
                 "💪 Keep practicing! You'll get there!"}
              </p>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold hover:scale-105 transition-transform"
                >
                  Back to Quizzes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const question = currentQuizData.quiz[currentQuestion];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
        <div className="max-w-3xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <button
              onClick={resetQuiz}
              className="text-white/70 hover:text-white transition-colors"
            >
              ← Back to Quizzes
            </button>
            <div className="text-white font-semibold">
              Question {currentQuestion + 1}/{currentQuizData.quiz.length}
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl">{currentQuizData.icon}</div>
              <div>
                <h3 className="text-2xl font-bold text-white">{currentQuizData.title}</h3>
                <p className="text-gray-400">Score: {score}/{currentQuestion}</p>
              </div>
            </div>

            <div className="h-2 bg-white/20 rounded-full mb-8">
              <div 
                className={`h-full bg-gradient-to-r ${currentQuizData.color} rounded-full transition-all duration-500`}
                style={{ width: `${((currentQuestion + 1) / currentQuizData.quiz.length) * 100}%` }}
              />
            </div>

            <h4 className="text-xl text-white mb-6 font-medium leading-relaxed">
              {question.question}
            </h4>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    showResult
                      ? index === question.correct
                        ? 'bg-green-500/30 border-2 border-green-400'
                        : index === selectedAnswer
                        ? 'bg-red-500/30 border-2 border-red-400'
                        : 'bg-white/5 border-2 border-transparent'
                      : selectedAnswer === index
                      ? 'bg-blue-500/30 border-2 border-blue-400 scale-105'
                      : 'bg-white/10 border-2 border-transparent hover:bg-white/20 hover:scale-102'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{option}</span>
                    {showResult && index === question.correct && (
                      <Check className="w-6 h-6 text-green-400" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <X className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/50 rounded-xl">
                <p className="text-white"><strong>Explanation:</strong> {question.explanation}</p>
              </div>
            )}

            {!showResult && selectedAnswer !== null && (
              <button
                onClick={handleSubmitAnswer}
                className="mt-6 w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-bold hover:scale-105 transition-transform"
              >
                Submit Answer
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Rocket className="w-12 h-12 text-blue-400 animate-pulse" />
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-sky-400">
              Space Habitat Challenges
            </h1>
            <Star className="w-12 h-12 text-yellow-400 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <p className="text-xl text-gray-300">Test your knowledge and master habitat design</p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <Target className="w-10 h-10 text-blue-400" />
              <div>
                <div className="text-3xl font-bold text-white">{completedQuizzes.length}</div>
                <div className="text-gray-400">Quizzes Completed</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <Award className="w-10 h-10 text-purple-400" />
              <div>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-gray-400">Challenges Won</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-cyan-500/20 to-sky-500/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-4">
              <Zap className="w-10 h-10 text-cyan-400" />
              <div>
                <div className="text-3xl font-bold text-white">0</div>
                <div className="text-gray-400">Total XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('quizzes')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'quizzes'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            📚 Quizzes
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg scale-105'
                : 'bg-white/10 text-gray-400 hover:bg-white/20'
            }`}
          >
            🎯 Challenges
          </button>
        </div>

        {/* Content */}
        {activeTab === 'quizzes' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer group"
                onClick={() => setSelectedQuiz(quiz.id)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`text-5xl group-hover:scale-110 transition-transform`}>
                    {quiz.icon}
                  </div>
                  {completedQuizzes.includes(quiz.id) && (
                    <Check className="w-6 h-6 text-green-400" />
                  )}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{quiz.title}</h3>
                <p className="text-gray-400 mb-4">{quiz.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                    {quiz.difficulty}
                  </span>
                  <span className="text-gray-400">{quiz.questions} Questions</span>
                </div>
                <div className={`h-1 bg-gradient-to-r ${quiz.color} rounded-full`} />
                <button className="mt-4 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-white font-semibold flex items-center justify-center gap-2 transition-colors">
                  Start Quiz <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:scale-105 transition-transform cursor-pointer group"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {challenge.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{challenge.title}</h3>
                <p className="text-gray-400 mb-4">{challenge.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-semibold ${getDifficultyColor(challenge.difficulty)}`}>
                    {challenge.difficulty}
                  </span>
                  <span className="text-gray-400">⏱️ {challenge.time}</span>
                </div>
                <div className="space-y-2 mb-4">
                  {challenge.objectives.map((obj, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      {obj}
                    </div>
                  ))}
                </div>
                <div className={`h-1 bg-gradient-to-r ${challenge.color} rounded-full mb-4`} />
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform">
                  Start Challenge <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Did You Know Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-sky-500/10 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="text-4xl">💡</div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">Did You Know?</h3>
              <p className="text-gray-300 text-lg">
                The International Space Station orbits Earth at approximately 28,000 km/h and completes one orbit every 90 minutes. Astronauts aboard experience 16 sunrises and sunsets every day!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpaceQuizChallenges;