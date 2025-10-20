import axios from "axios";

// Получаем CSRF токен из cookie (Laravel SPA обычно ставит XSRF-TOKEN)
const getCsrfToken = () => {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : null;
};

// Базовый URL — напрямую из глобальной переменной или пустой
const baseURL = window?.API_URL || "/"; // window.API_URL можно задать в <script>

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        "Content-Type": "application/json",
        "X-CSRF-TOKEN": getCsrfToken() || "",
        "X-Requested-With": "XMLHttpRequest",
    },
    withCredentials: true, // чтобы cookie уходили вместе с запросом
    timeout: 100000,
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("Axios Error:", error.response || error.message);
        return Promise.reject(error);
    }
);

export default axiosInstance;
