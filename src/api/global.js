export function fetchData(Vue, name, params) {
  return new Promise((resolve, reject) => {
    Vue.$axios.get(name, {
        params
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        return reject(err)
      });
  })
}
export function postData(Vue, name, params) {
  return new Promise((resolve, reject) => {
    Vue.$axios.post(name, {
        params
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        return reject(err)
      });
  })
}
export function patchData(Vue, name, params) {
  return new Promise((resolve, reject) => {
    Vue.$axios.patch(name, {
        params
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        return reject(err)
      });
  })
}
export function putData(Vue, name, params) {
  return new Promise((resolve, reject) => {
    Vue.$axios.put(name, {
        params
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        return reject(err)
      });
  })
}
export function deleteData(Vue, name, data) {
  return new Promise((resolve, reject) => {
    Vue.$axios.post(name, {
        data
      })
      .then(function (response) {
        resolve(response)
      })
      .catch(function (err) {
        return reject(err)
      });
  })
}
