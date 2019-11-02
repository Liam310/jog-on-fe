import * as axios from 'axios';

const request = axios.create({
  baseURL: 'https://judsfg9bq1.execute-api.eu-west-2.amazonaws.com/latest/api'
  // baseURL: 'http://172.26.44.25:3000/api'
});

export const postFlags = flags => {
  return request
    .post('/flags', flags)
    .then(({ data }) => {
      console.log(data);
    })
    .catch(error => {
      console.log(error);
    });
};

export const getFlags = async () => {
  const { data } = await request.get('/flags');
  return data;
};
