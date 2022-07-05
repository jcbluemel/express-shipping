"use strict";

const request = require("supertest");
const app = require("../app");

/** Tests adding a shipment
 * productId must be >= 1000, name, addr, zipcode are strings 
 * All are required
 * Returns {shipped: shipId} on success
 * Returns {error:{(info about error)}} on failure
*/

describe("POST /", function () {
  test("valid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: expect.any(Number) });
  });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body.error.status).toEqual(400);
  });
});
