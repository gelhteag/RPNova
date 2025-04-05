import { useState } from 'react';
import axios from 'axios';

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const calculate = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await axios.post('http://localhost:8000/calculate', { expression });
      setResult(response.data.result);
    } catch (e) {
      setError('⚠️ Something went wrong! Try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <input
        type="text"
        placeholder="e.g. 3 4 + 5 *"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        className="w-72 px-4 py-2 text-lg text-center border border-indigo-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
      />
      <button
        onClick={calculate}
        className="w-72 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105 shadow"
      >
        🎨 Calculate
      </button>

      {result !== null && (
        <div className="text-green-600 text-xl font-bold animate-fade-in mt-2">
          ✅ Result: {result}
        </div>
      )}

      {error && (
        <div className="text-red-500 text-sm font-medium animate-pulse mt-2">
          {error}
        </div>
      )}
    </div>
  );
}

export default Calculator;
