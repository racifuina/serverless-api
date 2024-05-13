const { defaultResponse } = require("../utils");
const repository = require("../repository");

exports.handler = async (event) => {
  try {
    const notes = await repository.getAll();

    return defaultResponse(200, notes);
  } catch (error) {
    return defaultResponse(500, {
      message: "Error fetching notes",
      error: error.message,
    });
  }
};
