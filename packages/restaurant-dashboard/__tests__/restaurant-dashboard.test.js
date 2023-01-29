"use strict";

const restaurantDashboard = require("..");
const assert = require("assert").strict;

assert.strictEqual(restaurantDashboard(), "Hello from restaurantDashboard");
console.info("restaurantDashboard tests passed");
