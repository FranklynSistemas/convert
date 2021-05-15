import Convert from "../src/app";

describe("convert unit/language library errors", function () {
  it("Should return error 'Path can't be an empty array' when send an empty array like path", function () {
    try {
      Convert({ a: 1 }, { path: [], unit: 0.7 });
    } catch (error) {
      expect(error).toEqual(new Error("Path can't be an empty array"));
    }
  });
  it("Should return error 'Json can't be empty' when send an empty json", function () {
    try {
      Convert({}, { path: ["a"], unit: 0.7 });
    } catch (error) {
      expect(error).toEqual(new Error("Json can't be empty"));
    }
  });
  it("Should return error 'Property type not supported' when send a array like property", function () {
    try {
      Convert({ a: [1, 2, 3] }, { path: ["a"], unit: 0.7 });
    } catch (error) {
      expect(error).toEqual(new Error('Data structure not supported'));
    }
  });
  it("Should return error 'Path not found' when send a property that not exists in the json", function () {
    try {
      Convert({ a: 1 }, { path: ["b"], unit: 0.7 });
    } catch (error) {
      expect(error).toEqual(new Error('Path not found'));
    }
  });
  it("Should return error 'Property type not supported' when send a property that is not supported", function () {
    try {
      Convert({ a: new Set() }, { path: ["a"], unit: 0.7 });
    } catch (error) {
      expect(error).toEqual(new Error('Property type not supported'));
    }
  });
});



describe("convert unit/language library", function () {
  it("Should convert to unit 0.7 given a simple path of one level element like a:1", function () {
    let result = Convert({ a: 1 }, { path: ["a"], unit: 0.7 });
    expect(result).toBe(0.7);
  });
  it("Should convert to language es given a simple path of one level element like a:some", function () {
    let result = Convert({ a: "some" }, { path: ["a"], language: "es" });
    expect(result).toContain("es some");
  });
  it("Should convert to unit 0.7 given a complex path of ten level elements", function () {
    let result = Convert(
      {
        a: { b: 1 },
        b: { c: { d: { e: { f: { g: { h: { i: { j: { k: 1 } } } } } } } } },
      },
      { path: ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"], unit: 0.7 }
    );
    expect(result).toBe(0.7);
  });
  it("Should convert to language es given a simple path of one element but with a Map data structure like a:new Map([['b', 'some']])", function () {
    let result = Convert({ a: new Map([["b", "some"]]) }, { path: ["a", "b"], language: "es" });
    expect(result).toContain("es some");
  });
});

