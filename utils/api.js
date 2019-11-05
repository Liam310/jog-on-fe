import * as axios from 'axios';
import { Auth } from 'aws-amplify';

const request = axios.create({
  // baseURL: 'https://judsfg9bq1.execute-api.eu-west-2.amazonaws.com/latest/api'
  baseURL: 'http://172.26.44.25:3000/api'
});

// FLAGS
export const postFlags = flags => {
  return request.post('/flags', flags).catch(error => {
    console.log(error);
  });
};

export const getFlags = async regionQueryObj => {
  const { data } = await request.get('/flags', { params: regionQueryObj });
  return data;
};

// ROUTES

export const getRoutes = ({ user_lat, user_long, p }) => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } } }) => {
      return request.get('/routes', {
        params: { user_lat, user_long, p },
        headers: { usertoken: jwtToken }
      });
    })
    .then(({ data: { routes } }) => {
      return routes;
    });

};

export const postRoute = route => {
  return request.post('/routes', route).catch(error => {
    console.log(error);
  });
};
