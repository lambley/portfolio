const isProduction = process.env.NODE_ENV === 'production';
const apiUrl = isProduction ? process.env.NEXT_PUBLIC_API_URL : 'http://localhost:4000';

export default apiUrl;
