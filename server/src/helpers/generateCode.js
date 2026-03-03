const generateCode = (length) => {
  let code = "";
  let characteristicsContain =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    code += characteristicsContain.charAt(
      Math.floor(Math.random() * characteristicsContain.length)
    );
  }
  return code;
};
module.exports = generateCode;
