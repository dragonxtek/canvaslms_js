// ==UserScript==
// @name         Decrypt AES Content
// @icon         https://lapsowork.com/wp-content/uploads/2020/03/candado.png
// @version      1.0
// @description  Decrypt exams in Canvas
// @author       Nicolás Boettcher
// @updateURL    https://raw.githubusercontent.com/dragonxtek/canvaslms_js/master/decryptAES.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/aes-js/3.1.2/index.min.js#sha512=LOqfKFwH2W3jeb0NzXcImFlSyoL7hjsWbZvIeKNOaZw1gFw+yKTE/QUDGLit2KWdd57qd6IgMDkppK2tkwIEhA==
// @match        https://udp.instructure.com/courses/*
// ==/UserScript==

var questions=3
var key ='12345678901234567890123456789034';
var key_bytes = aesjs.utils.hex.toBytes(key);
var iv, iv_bytes, text, encryptedBytes, aes, decryptedBytes, decryptedText

var ivid = "iv-P";
var AESid= "AES-P";

for (var id = 1; id <= questions; id++) {
    iv = document.getElementsByClassName(ivid.concat(id))[0].id;
    iv_bytes = aesjs.utils.hex.toBytes(iv);
    text = document.getElementsByClassName(AESid.concat(id))[0].id;
    encryptedBytes = aesjs.utils.hex.toBytes(text);
    aes = new aesjs.ModeOfOperation.ofb(key_bytes, iv_bytes);
    decryptedBytes = aes.decrypt(encryptedBytes);
    decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    document.getElementById(text).innerHTML=decryptedText;
}
