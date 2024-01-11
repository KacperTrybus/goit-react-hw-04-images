export const fetchImages = async (query, page) => {
  const API_KEY = '39539383-c957f911c4d26df2837324ce8';
  const BASE_URL = 'https://pixabay.com/api/';

  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return data.hits;
  } catch (error) {
    throw new Error('Error fetching images:', error);
  }
};
