import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SubmitForm from './components/SubmitForm';
import AdminPanel from './components/AdminPanel';
import Subtract from './assets/Subtract.png';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white text-[#000ee]">
        <nav className="p-4 border-b border-[#000ee]/20">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80">
              <img src={Subtract} alt="Company Logo" className="w-8 h-8" />
              <span className="text-2xl font-bold">Confessions & Roasts</span>
            </Link>
            <Link to="/admin" className="hover:opacity-80">
              Admin
            </Link>
          </div>
        </nav>

        <main className="max-w-4xl mx-auto p-4">
          <Routes>
            <Route path="/" element={<SubmitForm />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;