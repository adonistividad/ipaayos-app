import { format, parseISO } from "date-fns";

export const pathFix = (path: string) => {
  return path + (path.endsWith("/") ? "" : "/");
};

export const titleCase = (str: any) => {
  str = str.toLowerCase().split(" ");
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
  }
  return str.join(" ");
};

export const formatDate = (value: string) => {
  const date = new Date(value);
  if (date instanceof Date && !isNaN(date.valueOf())) {
    return format(parseISO(value), "MMMM dd, yyyy");
  } else {
    return "";
  }
};
/***
 var date = moment()
      .utcOffset('+05:30')
      .format('YYYY-MM-DD hh:mm:ss a');
 */
export const formatDateTime = (
  value: any,
  formatString: string = "MMMM dd, yyyy hh:mm aaaaa'm'"
) => {
  const date = new Date(value);
  if (date instanceof Date && !isNaN(date.valueOf())) {
    // return format(date, "dd MMM, hh:mm aaaaa'm'")
    return format(date, formatString);
  } else {
    return "";
  }
};

export const numberOnlyValidation = (event: any) => {
  const pattern = /[0-9.,]/;
  let inputChar = String.fromCharCode(event.charCode);

  if (!pattern.test(inputChar)) {
    // invalid character, prevent input
    event.preventDefault();
  }
};

export const currencyFormat = (
  num: any,
  currency: string = "$",
  decimals: number = 2
) => {
  if (!num) {
    num = 0;
  }
  return (
    currency + num.toFixed(decimals).replace(/(\d)(?=(\d{3})+(?!\d))/g, `1,`)
  );
};

export const emailValidate = (email: any) => {
  // const expression =
  //   /(?!.*\.{2})^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([\t]*\r\n)?[\t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([\t]*\r\n)?[\t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;

  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  return expression.test(String(email).toLowerCase());
};

export function formatBytes(bytes: any, decimals: number = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function getFilename(str: string) {
  return str.split("?")[0]?.replace(/^.*[\\\/]/, "");
}
export function getFileExtension(str: string) {
  const re: any = /(?:\.([^.]+))?$/;
  return re.exec(str)[1]?.substr(0, 3);
}


export const downloadFile = (url: any, fileName: any) => {
  const link: any = document.createElement("a");
  link.href = url;
  link.setAttribute("target", "_blank");
  link.setAttribute("download", fileName);

  // Append to html link element page
  document.body.appendChild(link);

  // Start download
  link.click();

  // Clean up and remove the link
  link.parentNode.removeChild(link);
};