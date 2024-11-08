export const parseLinks = (data: string) => {
  const lines = data.split("\n");
  const flattenedArray = lines.flatMap((line) => line.split(" "));
  const filteredArray = flattenedArray.filter((item) => item.trim() !== "");
  return filteredArray;
};

export const isValidLink = (link: string) => {
  return /^https:\/\/zakupki\.mos\.ru(\/.*)?$/gm.test(link);
};
