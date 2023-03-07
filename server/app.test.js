const each = require("jest-each").default;
const app = require('./app')

describe("app", () => {

    it("Exists", () => {
        expect(app).toBeDefined();
    })
    it("It a function", ()=> {
        expect(app instanceof Function).toEqual(true);
    })
  
})