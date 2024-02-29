const JWT_SECRET = require('crypto').randomBytes(32).toString('hex');

const config = { 
  apiUrl: process.env.NODE_ENV === 'production' ?
    'http://37922aa8e78cde16.app.tourdeapp.cz/api' : 
    'http://localhost:3000/api',
  JWT_SECRET: JWT_SECRET
};

export default config;