const hexlist = "0123456789abcdef";
const b64list =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
/**
 * uuid 轉 base 64
 *
 * @param {string} input - uuid編碼
 * @returns {string} - base64 編碼
 */
export function uuidToBase64(input) {
  let target = input
    .replace(/[^0-9a-f]/gi, "")
    .toLowerCase()
    .split("")
    .reverse();
  if (target.length != 32) return "";

  let buffer = "";
  let output = "";
  let base64 = "";
  let uuid = "";

  while (target.length > 0) {
    uuid = hexlist.indexOf(target.pop()).toString(2);
    buffer += `0000${uuid}`.slice(-4);
  }

  for (let i = 0; i < buffer.length; i += 6) {
    base64 = `${buffer.slice(i, i + 6)}000000`.slice(0, 6);
    output += b64list[parseInt(base64, 2)];
  }

  return output;
}

/**
 * base 64 轉 uuid
 *
 * @param {string} input - base64 編碼
 * @returns {string}  - uuid編碼
 */
export function base64ToUuid(input) {
  if (input.length != 22) return "";

  let target = input.split("").reverse();
  let buffer = "";
  let output = "";
  let base64 = "";
  let uuid = "";

  while (target.length > 0) {
    base64 = b64list.indexOf(target.pop()).toString(2);
    buffer += `000000${base64}`.slice(-6);
  }

  for (let i = 0; i < buffer.length; i += 4) {
    uuid = `${buffer.slice(i, i + 4)}0000`.slice(0, 4);
    output += hexlist[parseInt(uuid, 2)];
    if ([8, 13, 18, 23].includes(output.length)) output += "-";
  }

  return output.slice(0, 36);
}
