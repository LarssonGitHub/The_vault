import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";
import { arrayOfWebsites } from "../../../@types/@type-module"

console.log("You shouldn't see this in frontend");

export const generateId = () => uuidv4();

export const getData = (): arrayOfWebsites => {
  // Placeholder for db
  return [
    {
      id: "ID number 1",
      websiteInput: "name",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
    {
      id: "ID number 2",
      websiteInput: "name",
      emailInput: "email",
      usernameInput: "username",
      passwordInput: "passwordInput",
      additionalDataInput: "data input ",
    },
  ];
}

export const encryptData = (data: string, secretKey: string): string => {
  const encrypt: CryptoJS.lib.CipherParams = CryptoJS.AES.encrypt(
   data,
    secretKey,
    {
      iv: CryptoJS.enc.Hex.parse("be410fea41df7162a679875ec131cf2c"),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  // TODO, throw Error when implementing error handling
  if (encrypt === undefined) return "ERROR";
  return encrypt.toString();
};

export const decryptData = (
  encryptedData: string,
  secretKey: string
): [] | string => {
  let decrypt = CryptoJS.AES.decrypt(encryptedData, secretKey);
  const sanitize = decrypt.toString(CryptoJS.enc.Utf8);
    // TODO, throw Error, wrong key when implementing error handling
  if (sanitize === "" || sanitize === undefined) return "Wrong passkey";
  return JSON.parse(sanitize);
};