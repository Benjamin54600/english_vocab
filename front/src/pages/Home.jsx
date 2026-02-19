import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            English Vocabulary Learning
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Améliorez votre anglais en pratiquant régulièrement.
          </p>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
             <Link to="/quizz" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                Commencer le Quizz
             </Link>
             <Link to="/apprendre" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition duration-150 ease-in-out">
                Apprendre
             </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
