const {getCategoryId} = require("./assets/index");

describe("getCategoryId", () => {

    it("exists", () => {
        expect(getCategoryId).toBeDefined();
    })

    it("is a function", () => {
        expect(getCategoryId instanceof Function).toEqual(true);
    })

    it("returns a number", () => {
        expect(typeof getCategoryId() == "number").toEqual(true);
    })

    it("returns correst ID", () => {
        expect(getCategoryId("geography")).toEqual(22);
    })
})