import Calculator from './Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center space-y-6 border border-white/30">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-700 flex items-center justify-center gap-2">
          🧮 RPN Vibe Calculator ✨
        </h1>
        <p className="text-gray-600 text-base">
          Type your Reverse Polish Notation expression below 👇
        </p>
        <Calculator />
        <p className="text-sm text-gray-400">Built with 💻 + 🚀 by a human + 🤖 AI </p>
      </div>
    </div>
  );
}

export default App;
