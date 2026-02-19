import { useState, useEffect } from 'react';
import { getWords } from '../services/api';

function Learn() {
  const [words, setWords] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const noteFilter = filter === 'all' ? null : filter;
        const data = await getWords(noteFilter);
        setWords(data);
      } catch (error) {
        console.error("Error fetching words", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [filter]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Apprendre le vocabulaire</h2>
      
      <div className="flex flex-wrap items-center gap-4 mb-8 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <span className="text-gray-700 font-medium mr-2">Filtrer par note :</span>
        <div className="flex space-x-2">
            <button 
                onClick={() => setFilter('all')} 
                disabled={filter === 'all'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${filter === 'all' ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
                Tous
            </button>
            <button 
                onClick={() => setFilter('1')} 
                disabled={filter === '1'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${filter === '1' ? 'bg-red-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
                Note 1
            </button>
            <button 
                onClick={() => setFilter('2')} 
                disabled={filter === '2'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${filter === '2' ? 'bg-yellow-500 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
                Note 2
            </button>
            <button 
                onClick={() => setFilter('3')} 
                disabled={filter === '3'}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${filter === '3' ? 'bg-green-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'}`}
            >
                Note 3
            </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
           <span className="ml-3 text-lg text-gray-500">Chargement...</span>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anglais</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Français</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Exemple</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Note</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {words.map((word) => (
                    <tr key={word.id} className="hover:bg-gray-50 transition-colors duration-150">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-indigo-700">{word.word_en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{word.word_fr}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 italic hidden md:table-cell ">{word.example_en}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                ${word.note >= 3 ? 'bg-green-100 text-green-800' : 
                                  word.note === 2 ? 'bg-yellow-100 text-yellow-800' : 
                                  word.note === 1 ? 'bg-red-100 text-red-800' : 
                                  'bg-gray-100 text-gray-800'}`}>
                                {word.note !== null ? word.note : '-'}
                            </span>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
        </div>
      )}
    </div>
  );
}

export default Learn;
