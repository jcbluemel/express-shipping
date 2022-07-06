"use strict";

const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

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
    shipItApi.shipProduct.mockReturnValue(5555);

    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });

    expect(resp.body).toEqual({ shipped: 5555 });
  });

  test("invalid productId", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      zipcode: "12345-6789",
    });
    //TODO: strengthen expectations for invalid test.
    expect(resp.statusCode).toEqual(400);
    expect(resp.body.error.message).toEqual([
      "instance.productId must be greater than or equal to 1000",
      "instance requires property \"addr\"",
    ]);
  });
});
