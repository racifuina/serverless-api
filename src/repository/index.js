const AWS = require("aws-sdk");
const { getId } = require("../utils");

const dynamoDB = new AWS.DynamoDB.DocumentClient();

const tableName = process.env.DYNAMODB_TABLE;

const create = async (noteParams) => {
  const { title, content } = noteParams;
  const note = {
    id: getId(),
    title,
    content,
    createdAt: new Date().toISOString(),
  };

  const params = {
    TableName: tableName,
    Item: note,
  };
  await dynamoDB.put(params).promise();
  return note;
};

module.exports = {
  create,
};
