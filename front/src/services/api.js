const API_URL = 'http://localhost:8080/api/words';

export const getRandomWord = async () => {
  const response = await fetch(`${API_URL}/random`);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const getWords = async (noteFilter = null) => {
  let url = API_URL;
  if (noteFilter) {
    url += `?note=${noteFilter}`;
  }
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const updateWordNote = async (id, newNote) => {
  const response = await fetch(`${API_URL}/${id}/note`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newNote),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

export const updateWord = async (id, wordDetails) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(wordDetails),
  });
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};
