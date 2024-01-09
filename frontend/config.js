const isProduction = process.env.NODE_ENV === "production";

const config = {
    API_BASE_URL: isProduction ? 
                                'http://192.168.0.213:3000' 
                                :'http://localhost:3000'
  };
  
  module.exports = config;
  