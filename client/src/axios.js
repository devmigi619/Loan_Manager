import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5000/api', // 서버의 기본 URL
});

export default instance;
