import { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:8000'; // 👈 local dev API

function Calculator() {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imapResults, setImapResults] = useState(null);

  const calculate = async () => {
    setError(null);
    setResult(null);
    try {
      const response = await axios.post(`${API_BASE}/calculate`, { expression });
      setResult(response.data.result);
    } catch (e) {
      setError('⚠️ Something went wrong! Try again.');
    }
  };

  const exportCsv = async () => {
    try {
      const response = await axios.get(`${API_BASE}/export-csv`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'operations.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      setError('⚠️ Failed to export CSV.');
    }
  };

  const checkEmail = async () => {
    try {
      const res = await axios.get(`${API_BASE}/check-email`);
      setImapResults(res.data);
    } catch (err) {
      setError('⚠️ Email check failed.');
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

      <button
        onClick={exportCsv}
        className="w-72 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105 shadow"
      >
        📤 Export CSV
      </button>

      <button
        onClick={checkEmail}
        className="w-72 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 rounded-lg transition transform hover:scale-105 shadow"
      >
        📬 Check Email
      </button>

      {result !== null && (
        <div className="text-green-600 text-xl font-bold animate-fade-in mt-2">
          ✅ Result: {result}
        </div>
      )}

      {imapResults && (
        <div className="w-full max-w-xl mt-6 p-4 bg-white/70 backdrop-blur-md rounded-xl shadow-lg border border-gray-200">
          <h2 className="text-lg font-semibold text-indigo-700 mb-3">
            {imapResults.status}
          </h2>
          {Array.isArray(imapResults.data) && imapResults.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-gray-700">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-800 text-left">
                    <th className="p-2">📨 From</th>
                    <th className="p-2">📐 Expression</th>
                    <th className="p-2">✅ Result</th>
                  </tr>
                </thead>
                <tbody>
                  {imapResults.data.map((entry, idx) => (
                    <tr key={idx} className="border-t border-gray-200 hover:bg-indigo-50 transition">
                      <td className="p-2">{entry.from}</td>
                      <td className="p-2 font-mono">{entry.expression}</td>
                      <td className="p-2 font-semibold text-green-600">{entry.result}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500">No expressions found in emails.</p>
          )}
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
