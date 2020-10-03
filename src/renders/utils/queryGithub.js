const net = require('electron').remote.net;
const axios = require('axios').default;

module.exports = class queryGithub {
  static authToken = '';
  static lastError;
  static lastRateLimit = null;

  static setToken(value = '') {
    queryGithub.authToken = value; 
  }

  static getHeader() {
    const token = queryGithub.authToken;
    let response = {
      //'user-agent': 'ttmm-client' // Managed header, throws unsafe exception
    };
    if (token && token !== '' && !token.includes(' ')) {
      response.Authorization = 'Token ' + token;
    }
    return response;
  }

  static async getRateLimit() {
    if (!queryGithub.lastRateLimit)
      queryGithub.lastRateLimit = await queryGithub.get("https://api.github.com/rate_limit")
    return queryGithub.lastRateLimit; 
  }

  static async getRelease(cloudName = 'user/repo') {
    return await queryGithub.get("https://api.github.com/repos/" + cloudName + "/releases/latest")
  }
  
  static async getRepo(cloudName = 'user/repo') {
    return queryGithub.get("https://api.github.com/repos/" + cloudName);
  }

  static async get(url = 'https://api.github.com/') {
    queryGithub.lastRateLimit = null;
    try {
      const response = await axios.get(url, {
        headers: queryGithub.getHeader()
      });
      console.log(response);
      if (response.status > 199 && response.status < 300)
        return response.data;
      queryGithub.lastError = "Bad status response: " + response.status;
      return false;
    }
    catch (E) {
      console.log(E);
      queryGithub.lastError = E.message;
      return false;
    }
  }

  static async getPage() {
    return await queryGithub.get('https://api.github.com/search/repositories?q=topic:ttqmm');
  }
}