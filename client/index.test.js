const { default: test } = require("node:test");
const {getCategoryId} = require("./assets/index");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe("getCategoryId function", () => {

    test("exists", () => {
        expect(getCategoryId).toBeDefined();
    })

    test("is a function", () => {
        expect(getCategoryId() instanceof Function).toEqual(true);
    })

    test("returns a number", () => {
        expect(typeof getCategoryId() == "number").toEqual(true);
    })

    test("returns correct category id for geography", () => {
        expect(getCategoryId("geography")).toBe(22);
      });
})