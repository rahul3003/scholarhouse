// check if a url is a meetify url
let regex = /meetify\.in/;

export const matchMeetifyURL = (url) => {
  let result = regex.test(url);
  return result;
};
export const fetchMeetifyCode = (url) => {
  let result = url.split("&")[1];
  return result;
};
