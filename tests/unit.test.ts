import {
  mapToJson,
  handleProperty,
  processFinalProperty
} from "../src/app";
import {STRING, NUMBER, OBJECT, ARRAY, MAP} from '../src/constants'

describe("Unit test", function () {
  it("mapToJson should transform a Map into a Json", function () {
    let result = mapToJson(new Map([['a', 1]]));
    expect(result).toEqual({'a': 1});
  });
  it("handleProperty should return if a string is a final property and their type", function () {
    let result = handleProperty('a');
    expect(result).toEqual({final: true, type: STRING});
  });
  it("handleProperty should return if a number is a final property and their type", function () {
    let result = handleProperty(1);
    expect(result).toEqual({final: true, type: NUMBER});
  });
  it("handleProperty should return if a object is a final property and their type", function () {
    let result = handleProperty({});
    expect(result).toEqual({final: false, type: OBJECT});
  });
  it("handleProperty should return if a array is a final property and their type", function () {
    let result = handleProperty([]);
    expect(result).toEqual({final: false, type: ARRAY});
  });
  it("handleProperty should return if a map is a final property and their type", function () {
    let result = handleProperty(new Map());
    expect(result).toEqual({final: false, type: MAP});
  });
  it("processFinalProperty should return if a string a mixed string with the language and the property", function () {
    let result = processFinalProperty(STRING, 'some',0,'es');
    expect(result).toContain("es some");
  });
  it("processFinalProperty should return if a number the result to multiplicate unit with the property", function () {
    let result = processFinalProperty(NUMBER, 1, 0.7, 'es');
    expect(result).toBe(0.7);
  });
});