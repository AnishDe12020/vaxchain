import cryptoJS from "crypto-js";

export const encryptWithAES = (text: string, key: string) => {
  let enc = cryptoJS.AES.encrypt(text, key).toString();
  return cryptoJS.enc.Base64.stringify(cryptoJS.enc.Utf8.parse(enc));
};

export const decryptWithAES = (ciphertext: string, key: string) => {
  try {
    // Parse base64-encoded ciphertext
    let decData = cryptoJS.enc.Base64.parse(ciphertext).toString(
      cryptoJS.enc.Utf8,
    );

    // Decrypt the data using the key
    let bytes = cryptoJS.AES.decrypt(decData, key).toString(cryptoJS.enc.Utf8);

    return bytes;
  } catch (error) {
    console.error("Error:", error);
    return null; // Handle the error gracefully
  }
};
