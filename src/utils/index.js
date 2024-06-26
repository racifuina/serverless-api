const { v4: uuidv4 } = require("uuid");
const lodash = require("lodash");

const getId = () => uuidv4();

const defaultResponse = (statusCode, body) => {
  return {
    statusCode,
    body: lodash.isNil(body) ? undefined : JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

const isNilOrEmpty = (value) => {
  return lodash.isNil(value) || lodash.isEmpty(value);
};

module.exports = { defaultResponse, getId, isNilOrEmpty };
