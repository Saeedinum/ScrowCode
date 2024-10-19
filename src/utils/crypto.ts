import CryptoJS from "crypto-js"

const secretKey = import.meta.env.VITE_SECRET_KEY

export const encrypt = (string: string) => {
  return CryptoJS.AES.encrypt(string, secretKey).toString()
}

export const decrypt = (string: string) => {
  const bytes = CryptoJS.AES.decrypt(string, secretKey)
  return bytes.toString(CryptoJS.enc.Utf8)
}
