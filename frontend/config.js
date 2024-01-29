const isProduction = process.env.NODE_ENV === "production";

const config = {
    API_BASE_URL: isProduction ? 
                                'https://harmoniqxproduction.com' 
                                :'http://localhost:3000'
  };
  
  module.exports = config;
  