const Items = require("../data/Items");
const {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem,
} = require("../controller/itemController");

// Item Schema
const Item = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
};

// It is Used for get the formatted response from the api
const getItemsOpts = {
  schema: {
    response: {
      200: {
        type: "array",
        items: Item,
      },
    },
  },
  handler: getItems,
};

const postItemsOpts = {
  schema: {
    // This is used when we require to a validation
    body: {
      type: "object",
      required: ["name"],
      properties: {
        name: { type: "string" },
      },
    },
    response: {
      201: Item,
    },
  },
  handler: addItem,
};

const getSingleItemOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: getItem,
};

const deleteItemsOpts = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          message: { type: "string" },
        },
      },
    },
  },
  handler: deleteItem,
};

const updateItemsOpts = {
  schema: {
    response: {
      200: Item,
    },
  },
  handler: updateItem,
};

const itemRoute = (fastify, options, done) => {
  // Get All Items
  fastify.get("/items", getItemsOpts);

  // Get Single Items
  fastify.get("/items/:id", getSingleItemOpts);

  // Add Item
  fastify.post("/addItems", postItemsOpts);

  // Delete Item
  fastify.delete("/deleteItem/:id", deleteItemsOpts);

  // Update Item
  fastify.put("/updateItem/:id", updateItemsOpts);

  done();
};

module.exports = itemRoute;
