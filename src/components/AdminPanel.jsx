import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      const storedSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      setSubmissions(storedSubmissions.reverse());
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'reclaimismydad') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleDelete = (id) => {
    const updatedSubmissions = submissions.filter(sub => sub.id !== id);
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions.reverse()));
    setSubmissions(updatedSubmissions);
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-8">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-[#000ee]/20 rounded focus:outline-none focus:border-[#000ee]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#000ee] text-white rounded hover:bg-[#000ee]/90 transition-colors"
          >
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-[#000ee] text-white rounded hover:bg-[#000ee]/90 transition-colors"
          >
            Home
          </button>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="px-4 py-2 bg-[#000ee] text-white rounded hover:bg-[#000ee]/90 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {submissions.length === 0 ? (
          <p>No submissions yet.</p>
        ) : (
          submissions.map((submission) => (
            <div
              key={submission.id}
              className="p-4 border border-[#000ee]/20 rounded"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="inline-block px-2 py-1 text-sm bg-[#000ee]/10 rounded">
                  {submission.type}
                </span>
                <button
                  onClick={() => handleDelete(submission.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
              <p className="mb-2">{submission.content}</p>
              <p className="text-sm text-[#000ee]/60">{submission.timestamp}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AdminPanel;