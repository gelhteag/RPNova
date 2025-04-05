import Calculator from './Calculator';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-300 via-pink-200 to-yellow-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl rounded-3xl shadow-xl p-8 text-center space-y-6 border border-white/20 ring-1 ring-white/10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 flex items-center justify-center gap-2 drop-shadow-md">
          🔮 RPNova <span className="animate-pulse text-yellow-500">✨</span>
        </h1>

        <p className="text-gray-700 text-base">
          Type your Reverse Polish Notation expression below <span className="animate-bounce">👇</span>
        </p>

        <Calculator />

        <p className="text-sm text-gray-500 pt-4 border-t border-white/20">
          Built with 💻 + 🚀 by a human + 🤖 AI
        </p>
      </div>
    </div>
  );
}

export default App;
