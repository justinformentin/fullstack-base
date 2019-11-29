import axios from "axios";

const apiEndpoint = process.env.REACT_APP_DEV_API_ENDPOINT;

console.log('apiEndpoint', apiEndpoint)
const instance = axios.create({
  baseURL: apiEndpoint,
  responseType: "json"
  // withCredentials: true,
});

const getEndpoint = path =>
  path.indexOf(apiEndpoint) > -1 ? path : apiEndpoint + path;

export const getPromise = path => {
  const endpoint = getEndpoint(path)
  const requestOptions = {
    url: endpoint,
    method: "GET"
  };
  return instance(requestOptions);
};

export const deletePromise = path => {
  const endpoint = getEndpoint(path)
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const request = new Request(endpoint, {
    method: "DELETE",
    // credentials: "include",
    headers: headers
  });
  return instance(request);
};

export const putPromise = (path, data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = getEndpoint(path)
  let postOptions = {
    url,
    data,
    headers,
    method: "PUT",
  };
  return instance(postOptions);
};

export const postPromise = (path, data) => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  const url = getEndpoint(path)
  const requestOptions = {
    url,
    data,
    headers,
    method: "POST",
  };
  return instance(requestOptions);
};
