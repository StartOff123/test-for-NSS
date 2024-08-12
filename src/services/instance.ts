import axios from 'axios';

// Настройки для axios
export const instance = axios.create({
	baseURL: 'https://api.github.com'
});

// Добавление токена в каждый запрос
instance.interceptors.request.use((config) => {
	config.headers.Authorization = `token ${process.env.REACT_APP_GITHUB_TOKEN}`;
	return config;
});
