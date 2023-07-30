const { execSync } = require("child_process");

const executePython = (filepath, inputTestCase) => {
  try {
    const output = execSync(`python ${filepath}`, {
      input: inputTestCase.toString(),
    });

    return output.toString();
  } catch (err) {
    console.log(err);
    return "Code compilation (or) execution failed. Please check the code and try again";
  }
};

module.exports = {
    executePython,
};
