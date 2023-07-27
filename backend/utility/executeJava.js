const { exec, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const outputPath = path.join(__dirname, "outputs");

if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

const executeJava = (filepath, inputTestCase) => {
  // [Main, java]
  const jobId = path.basename(filepath).split(".")[0];
  const outPath = path.join(outputPath, `${jobId}.out`);

  try {
    const output = execSync(`java ${filepath} -jar ./${jobId}.jar`, {
      input: inputTestCase.toString(),
    });

    return output.toString();
  } catch (err) {
    console.log(err);
    return "Code compilation (or) execution failed. Please check the code and try again";
  }
};

module.exports = {
  executeJava,
};
