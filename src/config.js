
const config = { 
  apiUrl: process.env.NODE_ENV === 'production' ?
    'http://37922aa8e78cde16.app.tourdeapp.cz/api' : 
    'http://localhost:3000/api',
  JWT_SECRET: "79f98831909031df3393b2a4a5f89400d32c677a4e1b8f17b93031879f9e4d45"
};

export default config;