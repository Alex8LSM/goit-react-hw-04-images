import axios from 'axios';
const searchParams = {
  key: `25143671-fc0bcb21b6131bd14acaabd04`,
  image_type: `photo`,
  orientation: `horizontal`,
  per_page: 12,
};

const apiService = async (query, page) => {
  const { key, per_page, orientation, image_type } = searchParams;
  const { data } = await axios.get(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${key}&image_type=${image_type}&orientation=${orientation}&per_page=${per_page}`
  );
  return data;
};
export { searchParams, apiService };
