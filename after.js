// After: using ata-validator
const { Validator } = require("ata-validator");

// Same schemas — no changes needed
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

// One step: schema + references together
const v = new Validator(userSchema, {
  schemas: [addressSchema],
});

// Validate
const result = v.validate({
  name: "Mert",
  email: "mert@example.com",
  age: 26,
  address: { street: "Main St", city: "Istanbul", zip: "34000" },
});

console.log("valid:", result.valid); // true
console.log("errors:", result.errors); // []

const invalid = v.validate({ name: "", email: "bad" });
console.log("valid:", invalid.valid); // false
console.log("errors:", invalid.errors);
