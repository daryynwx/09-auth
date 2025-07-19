// lib/api.ts

import axios from 'axios';

// Видаляємо стару логіку baseURL
// axios.defaults.baseURL = 'http://localhost:3000/api'

// Створюємо інстанс axios
export const nextServer = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // дозволяє axios працювати з cookie
});
