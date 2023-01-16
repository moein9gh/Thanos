export function messageToClient(
  success: Boolean,
  errorMessage: string | null,
  message: string,
  body: any = {}
) {
  return { success, errorMessage, message, body };
}

export function a2p(s) {
  return s.replace(/[٠-٩]/g, (d) => "۰۱۲۳۴۵۶۷۸۹"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
}

export function p2e(s) {
  return s.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}

export function num2en(str) {
  const persianNum = [/۰/gi, /۱/gi, /۲/gi, /۳/gi, /۴/gi, /۵/gi, /۶/gi, /۷/gi, /۸/gi, /۹/gi];

  for (let i = 0; i < 10; i++) {
    str = str.replace(persianNum[i], i);
  }
  return str;
}

export function getMobiles(str) {
  if (
    (str.length != 10 || !(str.length == 10 && str.indexOf("9") == 0)) &&
    (str.length != 11 || !(str.length == 11 && str.indexOf("0") == 0)) &&
    (str.length != 12 || !(str.length == 12 && str.indexOf("98") == 0)) &&
    (str.length != 13 || !(str.length == 13 && str.indexOf("+98") == 0))
  ) {
    throw new Error("invalid phone number");
  }

  const mobileReg =
      /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/gi,
    junkReg = /[^\d]/gi;

  const mobiles = num2en(str + "").match(mobileReg) || [];
  mobiles.forEach(function (value, index, arr) {
    arr[index] = value.replace(junkReg, "");
    arr[index][0] === "0" || (arr[index] = "0" + arr[index]);
  });

  if (mobiles.length < 0 || mobiles.length > 1) {
    throw TypeError("invalid phone number");
  }
  return mobiles[0];
}
