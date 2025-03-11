import axios from 'axios';

const API_KEY = 'a651cb49';
const BASE_URL = 'https://www.omdbapi.com/';

export const searchMovies = async (query, page = 1, type = '') => {
  if (!query) {
    throw new Error('Search query is required');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        s: query,
        page: page,
        type: type || undefined
      }
    });
    
    // Check if the response is successful
    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'No results found');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movies');
  }
};

export const getMovieDetails = async (id) => {
  if (!id) {
    throw new Error('Movie ID is required');
  }

  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: id,
        plot: 'full'
      }
    });
    
    // Check if the response is successful
    if (response.data.Response === 'True') {
      return response.data;
    } else {
      throw new Error(response.data.Error || 'Movie details not found');
    }
  } catch (error) {
    throw new Error(error.message || 'Failed to fetch movie details');
  }
}; 