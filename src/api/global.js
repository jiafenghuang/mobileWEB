import Axios from "../initAxios/initAxios";

export function fetchData(name, params) {
  return new Promise((resolve, reject) => {
    Axios.get(name, params)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}
export function postData(name, params) {
  return new Promise((resolve, reject) => {
    Axios.post(name, params)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}
export function patchData(name, params) {
  return new Promise((resolve, reject) => {
    Axios.patch(name, {
      params
    })
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}
export function putData(name, params) {
  return new Promise((resolve, reject) => {
    Axios.put(name, {
      params
    })
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}
export function deleteData(name, data) {
  return new Promise((resolve, reject) => {
    Axios.post(name, data)
      .then(function(response) {
        resolve(response);
      })
      .catch(function(err) {
        return reject(err);
      });
  });
}
