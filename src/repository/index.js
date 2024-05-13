const AWS = require("aws-sdk");
const { getId } = require("../utils");
const { isNilOrEmpty } = require("../utils");

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

const getAll = async () => {
  const params = {
    TableName: tableName,
  };
  const result = await dynamoDB.scan(params).promise();
  return result.Items;
};

const getById = async (id) => {
  const params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };
  const result = await dynamoDB.get(params).promise();
  return result.Item;
};

const deleteById = async (id) => {
  const params = {
    TableName: tableName,
    Key: {
      id: id,
    },
  };
  await dynamoDB.delete(params).promise();
  return;
};

const updateById = async (id, updatedAttributes) => {
  const { title, content } = updatedAttributes;

  const params = {
    TableName: tableName,
    Key: {
      id: id,
    },
    UpdateExpression: "SET",
    ExpressionAttributeValues: {},
    ReturnValues: "ALL_NEW",
  };

  if (!isNilOrEmpty(title)) {
    params.UpdateExpression += " #t = :t,";
    params.ExpressionAttributeValues[":t"] = title;
    params.ExpressionAttributeNames = { "#t": "title" };
  }

  if (!isNilOrEmpty(content)) {
    params.UpdateExpression += " #c = :c,";
    params.ExpressionAttributeValues[":c"] = content;
    params.ExpressionAttributeNames = {
      ...params.ExpressionAttributeNames,
      "#c": "content",
    };
  }

  // Remove the trailing comma and space
  params.UpdateExpression = params.UpdateExpression.slice(0, -1);

  const result = await dynamoDB.update(params).promise();
  return result.Attributes;
};

module.exports = {
  create,
  getAll,
  getById,
  deleteById,
  updateById,
};
