const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, code) => {
  try {
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes, fileName);
    await fs.writeFileSync(filePath, code);
    return filePath;
  } catch (err) {
    return err;
  }
  // const fileName = `Main.${format.toLowerCase()}`;
  // const filepath = path.join(dirCodes, fileName);

  // await fs.writeFileSync(filepath, code);
  // return filepath;
};

module.exports = {
  generateFile,
};
