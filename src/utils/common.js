import Cookies from "js-cookie";
var CryptoJs = require("crypto-js");

export const encrypt = (key, data) => {
  return CryptoJs.AES.encrypt(JSON.stringify(data), key).toString();
};

export const decrypt = (key, data) => {
  var decryptData = CryptoJs.AES.decrypt(data, key);
  return JSON.parse(decryptData.toString(CryptoJs.enc.Utf8));
};

export const setCookie = (key, data) => {
  const encryptData = encrypt(key + "ADMIN@123!", data); 
  Cookies.set(key, encryptData, { secure: true, expires: 1 });
};

export const getCookie = (key) => {
  const cookieData = Cookies.get(key);
  return cookieData ? decrypt(key + "ADMIN@123!", cookieData) : null;
};

export const deleteCookie = (key) => {
  Cookies.remove(key, { path: "", domain: "localhost" });
};

export const getAuthToken =()=>{
    const user = getCookie('_USER_AUTH_');
    try {
        return user ? JSON.parse(user) : null
    }catch(err){
        return null
    }
}

