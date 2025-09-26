import { Api } from "./apiLinks";

// GET request
const get = async (url: string): Promise<any> => {
  let data: any;
  const header: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  await fetch(Api + url, {
    method: "GET",
    headers: header,
    next: { revalidate: 86400 },
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
    })
    .catch((error) => console.error(error));

  return data;
};

// GET with no-store cache
const getStatic = async (url: string): Promise<any> => {
  let data: any;
  const header: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  await fetch(Api + url, {
    method: "GET",
    headers: header,
    next: { revalidate: 86400 },
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
    })
    .catch((error) => console.error(error));

  return data;
};

// POST with JSON body
const post = async (url: string, formdata: Record<string, any>): Promise<any> => {
  let data: any;
  const header: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  await fetch(Api + url, {
    method: "POST",
    headers: header,
    cache: "no-store",
    body: JSON.stringify(formdata),
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
    })
    .catch((error) => console.error(error));

  return data;
};

// POST expecting blob response
const fetchData = async (url: string, formdata: Record<string, any>): Promise<Blob | undefined> => {
  let data: Blob | undefined;
  const header: HeadersInit = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  await fetch(Api + url, {
    method: "POST",
    headers: header,
    cache: "no-store",
    body: JSON.stringify(formdata),
  })
    .then((response) => response.blob())
    .then((blob) => {
      data = blob;
    })
    .catch((error) => console.error(error));

  return data;
};

// POST with multipart/form-data
const postimage = async (url: string, formdata: FormData): Promise<any> => {
  let data: any;
  await fetch(Api + url, {
    method: "POST",
    body: formdata, // don't set Content-Type manually for FormData
    cache: "no-store",
  })
    .then((response) => response.json())
    .then((responseJson) => {
      data = responseJson;
    })
    .catch((error) => console.error(error));

  return data;
};

export { get, getStatic, post, postimage, fetchData };
