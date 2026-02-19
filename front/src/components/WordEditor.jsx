import { useState, useEffect } from 'react';
import { updateWord } from '../services/api';

function WordEditor({ currentWord, onWordUpdated }) {
    const [wordEn, setWordEn] = useState('');
    const [wordFr, setWordFr] = useState('');
    const [exampleEn, setExampleEn] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (currentWord) {
            setWordEn(currentWord.word_en || '');
            setWordFr(currentWord.word_fr || '');
            setExampleEn(currentWord.example_en || '');
        }
    }, [currentWord]);

    const handleSave = async (e) => {
        e.preventDefault();
        if (!currentWord) return;
        setIsSaving(true);
        try {
            const updated = await updateWord(currentWord.id, {
                word_en: wordEn,
                word_fr: wordFr,
                example_en: exampleEn
            });
            onWordUpdated(updated); // Update parent state with new word
            alert('Mot mis à jour !');
        } catch (error) {
            console.error('Erreur lors de la mise à jour', error);
            alert('Erreur lors de la mise à jour');
        } finally {
            setIsSaving(false);
        }
    };

    if (!currentWord) return null;

    return (
        <div className="mt-12 p-8 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300">
            <h3 className="text-lg font-bold mb-6 text-gray-500 uppercase tracking-widest text-center">
                🛠️ Admin: Modifier la carte
            </h3>
            
            <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot anglais</label>
                        <input
                            type="text"
                            value={wordEn}
                            onChange={(e) => setWordEn(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Mot français</label>
                        <input
                            type="text"
                            value={wordFr}
                            onChange={(e) => setWordFr(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Exemple (phrase)</label>
                    <textarea
                        value={exampleEn}
                        onChange={(e) => setExampleEn(e.target.value)}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                
                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className={`px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSaving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default WordEditor;
