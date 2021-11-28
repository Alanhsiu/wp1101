import axios from 'axios';

const instance = axios.create({
  baseURL: `http://localhost:4000/api/scoreCard`,
});

export default instance;

// instance.get('/hi').then((data) => console.log(data));
