// Before: using ajv
const Ajv = require("ajv");
const addFormats = require("ajv-formats");

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

// Schema with cross-references
const addressSchema = {
  $id: "https://example.com/address",
  type: "object",
  properties: {
    street: { type: "string" },
    city: { type: "string", minLength: 1 },
    zip: { type: "string", pattern: "^\\d{5}$" },
  },
  required: ["street", "city"],
};

const userSchema = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 1 },
    email: { type: "string", format: "email" },
    age: { type: "integer", minimum: 0 },
    address: { $ref: "https://example.com/address" },
  },
  required: ["name", "email"],
  additionalProperties: false,
};

// Register schemas
ajv.addSchema(addressSchema);
const validate = ajv.compile(userSchema);

// Validate
const valid = validate({
  name: "Mert",
  email: "mert@example.com",
  age: 26,
  address: { street: "Main St", city: "Istanbul", zip: "34000" },
});

console.log("valid:", valid); // true
console.log("errors:", validate.errors); // null

const invalid = validate({ name: "", email: "bad" });
console.log("valid:", invalid); // false
console.log("errors:", validate.errors);
