"use strict";
const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();
shipItApi.shipProduct.mockReturnValue(5555);

const request = require("supertest");
const app = require("../app");
const AxiosMockAdapter = require("axios-mock-adapter");
const axios = require("axios");
const axiosMock = new AxiosMockAdapter(axios);

// const { shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY } = require("./shipItApi");



// axiosMock.onPost(`${SHIPIT_SHIP_URL}`, {
//   itemId: 2000,
//   name: "test",
//   addr: "11 test address",
//   zip: "55555",
//   key: SHIPIT_API_KEY
// }).reply(201, 5000);



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

    expect(resp.body).toEqual({ shipped: 5555 });
  });

  test("invalid", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 1,
      name: "Test Tester",
      addr: "100 Test St",
      zipcode: "12345-6789",
    });
    //TODO: strengthen expectations for invalid test.
    expect(resp.body.error.status).toEqual(400);
  });
});
