const config = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'https://formula1-backend-latest.onrender.com'
};

console.log('API URL:', config.apiUrl); // Debug log

export default config;
