const { defaultResponse, getId } = require("../utils");
const repository = require("../repository");

exports.handler = async (event) => {
  try {
    const { title, content } = JSON.parse(event.body);

    const note = await repository.create({
      title,
      content,
    });

    return defaultResponse(201, note);
  } catch (error) {
    return defaultResponse(500, {
      message: "Error creating note",
      error: error.message,
    });
  }
};
