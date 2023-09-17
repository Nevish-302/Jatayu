import { baseUrl, postRequest,getRequest } from '../services.js';

export async function login() {
  const loginInfo = {
    Id: "ashdfsbghfnjkh",
    password: "test1234"
  };

  const response = await postRequest(
    `${baseUrl}/organisation/login`,
    JSON.stringify(loginInfo)
  );

  if (response.error) {
    return console.log("error", response.error);
  }
  else{
    return console.log("response",response);
  }
}


