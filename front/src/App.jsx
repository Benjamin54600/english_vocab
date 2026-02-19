import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Quizz from './pages/Quizz';
import Learn from './pages/Learn';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
        <header className="bg-white shadow-md sticky top-0 z-50">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between h-16 items-center">
               <div className="flex-shrink-0 flex items-center">
                 <h1 className="text-xl font-bold text-indigo-600">English Vocab</h1>
               </div>
               <nav className="flex space-x-8">
                   <Link to="/" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Accueil</Link>
                   <Link to="/quizz" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Quizz</Link>
                   <Link to="/apprendre" className="text-gray-500 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Apprendre</Link>
               </nav>
             </div>
           </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/quizz" element={<Quizz />} />
            <Route path="/apprendre" element={<Learn />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
