const { defaultResponse } = require("../utils");
const repository = require("../repository");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;

    const note = await repository.getById(id);

    if (!note) {
      return defaultResponse(404, { message: "Note not found" });
    }

    return defaultResponse(200, note);
  } catch (error) {
    return defaultResponse(500, {
      message: "Error fetching note",
      error: error.message,
    });
  }
};
