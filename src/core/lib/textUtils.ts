export const trimText = (text: string, length: number) => {
  if (text.length > length) {
    return text.substring(0, length) + "...";
  }
  return text;
};

export const cleanText = (text: string) => {
  const escapeCodes = [
    { exp: /&#10;/g, val: "\n" },
    { exp: /&#13;/g, val: "\r" },
    { exp: /&amp;/g, val: "&" },
    { exp: /&nbsp;/g, val: " " },
    { exp: /&ndash;/g, val: "–" },
    { exp: /&quot;/g, val: '"' },
    { exp: /&uuml;/g, val: "ü" },
    {exp: /\x1b\[[0-9;]*[mGK]/g, val: ""},
  ];
  let newText = text;
  escapeCodes.forEach((exp: any) => {
    newText = newText.replace(exp.exp, exp.val);
  });
  return newText
};


export const trimAndClean = (text: string, length: number) => {
  return trimText(cleanText(text), length);
}

export const capitalize = (str: string) =>
    `${str.charAt(0).toUpperCase()}${str.slice(1)}`;