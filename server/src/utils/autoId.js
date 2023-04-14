const autoId = (value) => {
  let code =
    value
      .replace("-", "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      ?.replaceAll(" ", "") + "934998485447";
  let newCode = "";
  let index = code?.length;
  for (let i = 0; i < 10; i++) {
    newCode += code[Math.floor(index / 2)];
    index /= 2;
  }
  return newCode.toUpperCase();
};

module.exports = autoId;
