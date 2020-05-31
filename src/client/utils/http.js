import axios from 'axios';

axios.defaults.baseURL = 'http://mock-api.com/PKepY9n0.mock';

export default {
  get: (api) => {
    return new Promise((resolve, reject) => {
      axios.get(api)
      .then(res => {
        const { status, data } = res || {};
        if (status === 200) {
          resolve(data);
        } else {
          reject('');
        }
      })
      .catch(err => reject(err));
    });
  }
};