const { defaultResponse } = require("../utils");
const repository = require("../repository");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    await repository.deleteById(id);

    return defaultResponse(204);
  } catch (error) {
    return defaultResponse(500, {
      message: "Error deleting note",
      error: error.message,
    });
  }
};
