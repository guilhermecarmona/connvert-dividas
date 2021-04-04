import axios from 'axios';

const jsonplaceholderApi = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/users',
});

export default jsonplaceholderApi;
