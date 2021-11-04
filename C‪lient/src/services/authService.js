import http from "./httpService";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import * as CryptoJS from "crypto-js";

import { apiUrl, tokenHashKey } from "../config.json";

const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";


toast.configure({ bodyClassName: "rtl" });

export async function login(user) {
  const { data } = await http.post(apiEndpoint, user);
  //console.log("from authserv", data)
  if (data.result) {
    const jwt = data.data[0].token;
    localStorage.setItem(tokenKey, jwt);
    return { result: true, message: null };
  }
  return { result: false, message: data.data[0] };
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = CryptoJS.AES.decrypt(
      localStorage.getItem("token"),
      tokenHashKey
    ).toString(CryptoJS.enc.Utf8);
    const decToken = jwtDecode(jwt);
    // console.log('decode toke', decToken);
    if (decToken.exp < Date.now() / 1000) {
      toast.error("Your credential is expired, Please login again");
      logout();
      return null;
    }
    return decToken;

  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export async function SendVerificationCode(user) {
  console.log("from authserv", user)
  const { data } = await http.post(apiEndpoint + '/SendVerificationCode', user);
  console.log("from authserv", data)
  if (data.result) {
      //     const jwt = data.result.accessToken;
      //     localStorage.setItem(tokenKey, jwt);
      return { result: true, message: null };
  }
  return { result: false, message: data.data[0] };
}

export async function VerifyCode(code) {
  console.log("user verify code", code)
  const { data } = await http.post(apiEndpoint + '/VerifyCode', code);
  console.log("then verify code", data)
  if (data.result) {
    const jwt = data.data[0].token;
    localStorage.setItem(tokenKey, jwt);
      return { result: true, message: null };
  }
  return { result: false, message: data.data[0] };
}

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  SendVerificationCode,
  VerifyCode
};
