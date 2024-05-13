const lodash = require("lodash");
const { defaultResponse, isNilOrEmpty } = require("../utils");
const repository = require("../repository");

exports.handler = async (event) => {
  try {
    const { id } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);

    if (isNilOrEmpty(title) && isNilOrEmpty(content)) {
      return defaultResponse(400, {
        message: "Missing title or content",
      });
    }

    const note = await repository.getById(id);

    if (lodash.isNil(note)) {
      return defaultResponse(404, {
        message: "Note not found",
      });
    }

    const updatedNote = await repository.updateById(id, { title, content });

    return defaultResponse(200, updatedNote);
  } catch (error) {
    return defaultResponse(500, {
      message: "Error updating note",
      error: error.message,
    });
  }
};
