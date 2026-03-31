# ata-migration-guide

Side-by-side examples for switching to [ata-validator](https://github.com/ata-core/ata-validator) from other JSON Schema validators.

## Quick Reference

| Before | After |
|--------|-------|
| `new Ajv()` | `new Validator(schema)` |
| `ajv.addSchema(s)` | `{ schemas: [s] }` option |
| `ajv.compile(schema)` | Not needed — lazy compilation |
| `validate(data)` → `true/false` | `v.validate(data)` → `{ valid, errors }` |
| `validate.errors` | `result.errors` |
| `new Ajv()` vs `new Ajv2020()` | Auto-detected from `$schema` |

## Examples

| File | What it shows |
|------|--------------|
| [`before.js`](before.js) | Typical ajv setup with `$ref` and formats |
| [`after.js`](after.js) | Same thing with ata — same schemas, less boilerplate |
| [`draft7.js`](draft7.js) | Draft 7 auto-detection — `dependencies`, `definitions` just work |
| [`fastify-before.js`](fastify-before.js) | Fastify with default validator |
| [`fastify-after.js`](fastify-after.js) | Fastify with `fastify-ata` plugin — same route schemas |

## Install

```bash
# Replace ajv
npm uninstall ajv ajv-formats
npm install ata-validator

# For Fastify
npm install fastify-ata
```

## Key Differences

**Schemas stay the same.** ata uses the same JSON Schema format — Draft 7 and Draft 2020-12 both work. Your existing schemas don't need changes.

**No separate compile step.** ata compiles lazily on first validation. No `ajv.compile()` needed.

**Results are objects.** `v.validate(data)` returns `{ valid: boolean, errors: [] }` instead of a bare boolean.

**Cross-schema `$ref` via options.** Instead of `ajv.addSchema()` then `ajv.compile()`, pass all schemas at once:

```js
// ajv
const ajv = new Ajv();
ajv.addSchema(addressSchema);
const validate = ajv.compile(mainSchema);

// ata
const v = new Validator(mainSchema, { schemas: [addressSchema] });
```

**Draft 7 is automatic.** No need to import a different class. ata reads `$schema` and handles keyword conversion transparently.

## Links

- [ata-validator](https://github.com/ata-core/ata-validator)
- [ata-validator.com](https://ata-validator.com)
- [fastify-ata](https://github.com/mertcanaltin/fastify-ata)
- [API docs](https://github.com/ata-core/ata-validator/blob/master/docs/API.md)
