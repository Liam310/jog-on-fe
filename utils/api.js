import * as axios from 'axios';
import { Auth } from 'aws-amplify';

const request = axios.create({
  baseURL: 'https://judsfg9bq1.execute-api.eu-west-2.amazonaws.com/latest/api'
  // baseURL: 'http://172.26.44.25:3000/api'
  // baseURL: 'http://172.20.10.4:3000/api'
});

// FLAGS
export const postFlags = flags => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } }, username }) => {
      flags.flags.forEach(flag => {
        flag.user_id = username;
      });
      return request.post('/flags', flags, {
        headers: { usertoken: jwtToken }
      });
    })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};

export const getFlags = regionQueryObj => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } } }) => {
      return request.get('/flags', {
        params: regionQueryObj,
        headers: { usertoken: jwtToken }
      });
    })
    .then(({ data }) => {
      return data;
    })
    .catch(err => {
      console.log(err);
    });
};

// ROUTES

export const getRoutes = ({ user_lat, user_long, p }, bool) => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } }, username }) => {
      const user_id = bool ? username : undefined;
      return request.get('/routes', {
        params: { user_lat, user_long, p, user_id },
        headers: { usertoken: jwtToken }
      });
    })
    .then(({ data: { routes } }) => {
      return routes;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postRoute = route => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } }, username }) => {
      route.user_id = username;
      return request.post('/routes', route, {
        headers: { usertoken: jwtToken }
      });
    })
    .then(routes => {
      return routes;
    })
    .catch(err => {
      console.log(err);
    });
};

export const postUser = () => {
  return Auth.currentAuthenticatedUser()
    .then(({ signInUserSession: { accessToken: { jwtToken } }, username }) => {
      const user = { user_id: username };
      return request.post('/users', user, {
        headers: { usertoken: jwtToken }
      });
    })
    .catch(err => console.log(err));
};
