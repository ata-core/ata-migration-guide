// Draft 7 schemas work automatically — no configuration needed
const { Validator } = require("ata-validator");

// Draft 7 schema with dependencies and additionalItems
const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string", format: "email" },
    role: { type: "string", enum: ["admin", "user"] },
  },
  required: ["name", "email"],
  // Draft 7: dependencies (auto-converted to dependentRequired/dependentSchemas)
  dependencies: {
    role: ["name", "email"],
  },
  // Draft 7: definitions (auto-converted to $defs)
  definitions: {
    tag: { type: "string", minLength: 1 },
  },
};

// ata auto-detects Draft 7 from $schema field
const v = new Validator(schema);

console.log(v.validate({ name: "Mert", email: "mert@test.com" }).valid); // true
console.log(v.validate({ name: "Mert", email: "mert@test.com", role: "admin" }).valid); // true
console.log(v.validate({ role: "admin" }).valid); // false — dependencies require name + email
