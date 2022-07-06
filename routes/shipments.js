"use strict";

const express = require("express");
const router = new express.Router();
const jsonschema = require("jsonschema");
const shipSchema = require("../schemas/shipSchema.json");
const { shipProduct } = require("../shipItApi");
const { BadRequestError } = require("../expressError");

/** POST /ship
 *
 * Validates and ships an order coming from json body:
 *   { productId, name, addr, zip }
 *
 * Returns { shipped: shipId }
 */

router.post("/", async function (req, res, next) {
  const validator = jsonschema.validate(
    req.body, shipSchema, { required: true });

  if (!validator.valid) {
    const errs = validator.errors.map(err => err.stack);
    throw new BadRequestError(errs);
  }

  const { productId, name, addr, zip } = req.body;
  const shipId = await shipProduct({ productId, name, addr, zip });

  return res.json({ shipped: shipId });
});


module.exports = router;