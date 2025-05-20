import { React } from "react";
import { Api } from "./Api";


const get = async (url) => {
  var data;
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  await fetch(Api + url, {
    method: 'GET',
    headers: header,
    next: {
      revalidate: 86400
    },
    // cache: 'no-store',
    //cache: 'force-cache'
    // cache: 'no-store'
    //Request Type
  })
    .then((response) => response.json())
    .then((responseJson) => {
      //console.log(responseJson)
      data = responseJson;
    })
    .catch((error) => console.error(error));
  return data
}

const getStatic = async (url) => {
  var data;
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  await fetch(Api + url, {
    method: 'GET',
    headers: header,
    next: {
      revalidate: 86400
    },
    cache: 'no-store',
    //cache: 'force-cache'
    //Request Type
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
    })
    .catch((error) => console.error(error));
  return data
}

const post = async (url, formdata) => {
  var data;
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  await fetch(Api + url, {
    method: 'POST',
    headers: header,
    cache: 'no-store',
    body: JSON.stringify(formdata)
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson
    })
    .catch((error) => console.error(error));
  return data
}

const fetchData = async (url, formdata) => {
  var data;
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  await fetch(Api + url, {
    method: 'POST',
    headers: header,
    cache: 'no-store',
    body: JSON.stringify(formdata)
  })
    .then((response) => response.blob())
    .then((responseJson) => {
      data = responseJson
    })
    .catch((error) => console.error(error));
  return data
}


const postimage = async (url, formdata) => {
  var data;
  let header = {
    // Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  };
  await fetch(Api + url, {
    method: 'POST',
    headers: header,
    cache: 'no-store',
    body: formdata,
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson
    })
    .catch((error) => console.error(error));
  return data
}
export { get, getStatic, post, postimage, fetchData }