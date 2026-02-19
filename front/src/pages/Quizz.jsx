import { useState, useEffect } from 'react';
import { getRandomWord, updateWordNote } from '../services/api';
import WordEditor from '../components/WordEditor';

function Quizz() {
  const [currentWord, setCurrentWord] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchNewWord = async () => {
    setLoading(true);
    setShowResult(false);
    setUserAnswer('');
    setIsCorrect(false);
    try {
      const word = await getRandomWord();
      setCurrentWord(word);
    } catch (error) {
      console.error("Error fetching word", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewWord();
  }, []);

  // Gestion des raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e) => {
        // Ignorer si on n'est pas en mode résultat (donc on tape dans l'input)
        if (!showResult) return;

        // Enter : Si juste => Continuer. Si faux => Note 1 et continuer
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isCorrect) {
                fetchNewWord();
            } else {
                handleManualNoteUpdate(1);
            }
        }
        // Touches 1 et 2 uniquement si réponse fausse
        else if (!isCorrect) {
            if (e.key === '1' || e.key === '&') { // '&' est souvent la touche 1 sur clavier AZERTY
                handleManualNoteUpdate(1);
            } else if (e.key === '2' || e.key === 'é') { // 'é' est souvent la touche 2 sur clavier AZERTY
                 handleManualNoteUpdate(2);
            }
        }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showResult, isCorrect, currentWord]); 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentWord) return;

    const correct = userAnswer.trim().toLowerCase() === currentWord.word_en.toLowerCase();
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
        updateWordNote(currentWord.id, 3);
    }
  };

  const handleManualNoteUpdate = async (note) => {
      if (currentWord) {
          await updateWordNote(currentWord.id, note);
          fetchNewWord();
      }
  };

  const handleWordUpdated = (updatedWord) => {
    setCurrentWord(updatedWord);
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-xl">Chargement...</div>;
  if (!currentWord) return <div className="flex justify-center items-center h-screen text-xl text-red-500">Erreur de chargement.</div>;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="py-8 px-4">
        {/* Titre */}
        <h1 className="text-6xl font-extrabold text-center mb-16 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          🎯 Quizz
        </h1>
        
        {!showResult ? (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            {/* Mot à deviner avec drapeau sur la même ligne */}
            <div className="text-center mb-8">
              <span className="text-5xl block mb-4">🇫🇷</span>
              <h2 className="text-5xl font-bold tracking-tight text-gray-900">
                {currentWord.word_fr}
              </h2>
            </div>
            
            {/* Formulaire de réponse avec plus d'espace */}
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input 
                  type="text" 
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="Entrez la traduction en anglais..."
                  autoFocus
                  className="w-full px-6 py-4 text-xl border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
              >
                Valider ✓
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-xl p-10 border border-gray-100">
            {/* Résultat compact */}
            <div className={`text-center py-4 px-6 rounded-2xl mb-8 ${isCorrect ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200' : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200'}`}>
              <h2 className={`text-2xl font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? "✓ Correct !" : "✗ Incorrect"}
              </h2>
            </div>
            
            {/* Informations en grille compacte */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="col-span-1 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">🇫🇷 Français</p>
                <p className="text-2xl font-bold text-indigo-700">{currentWord.word_fr}</p>
              </div>
              
              <div className="col-span-1 p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">🇬🇧 Anglais</p>
                <p className="text-2xl font-bold text-purple-700">{currentWord.word_en}</p>
              </div>
              
              <div className="col-span-2 p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-2 font-semibold">📝 Exemple</p>
                <p className="text-lg italic text-gray-700 leading-relaxed">{currentWord.example_en}</p>
              </div>
            </div>
            
            {/* Boutons de notation - uniquement si incorrect */}
            {!isCorrect && (
              <div className="grid grid-cols-2 gap-4 mb-6">
                <button 
                  onClick={() => handleManualNoteUpdate(1)}
                  className="bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  1
                </button>
                <button 
                  onClick={() => handleManualNoteUpdate(2)}
                  className="bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-md"
                >
                  2
                </button>
              </div>
            )}

            {/* Bouton suivant */}
            {isCorrect && <button 
              onClick={fetchNewWord}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Continuer
            </button>}
          </div>
        )}
        
        {/* Composant d'édition (temporaire) */}
        {showResult && <WordEditor 
            currentWord={currentWord} 
            onWordUpdated={handleWordUpdated} 
        />}
      </div>
    </div>
  );
}

export default Quizz;
