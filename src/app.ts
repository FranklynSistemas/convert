import chance from 'chance'
import {
  STRING,
  NUMBER,
  MAP,
  OBJECT,
  ARRAY 
} from './constants'

export interface Config {
  path: string[]
  unit?: number
  language?: string
}

export type Json = {}


export const mapToJson = (map: Map<any, any>):object => {
  const result = {}
  for (var [key, value] of map) {
    result[key] = value
  }
  return result
}

export const handleProperty = (property: any):{final: boolean, type: string} => {
  const propertyType = typeof property
  const isAnArray = property instanceof Array
  const isAMap = property instanceof Map
  if (propertyType === STRING || propertyType === NUMBER) {
    return { final: true, type: propertyType }
  }
  if (propertyType === OBJECT) {
    let complexType:any = propertyType
    if (isAnArray) {
      complexType = ARRAY
    } else if (isAMap) {
      complexType = MAP
    }
    return { final: false, type: complexType }
  }
  throw new Error("Property type not supported")
}

export const processFinalProperty = (type: string|number, property:any, unit:number, language: string):string|number => {
  if (type === STRING) {
    return `${language} ${property} ${chance().string({ length: 5, alpha: true})}`
  }
  if (type === NUMBER) {
    return unit * property
  }
}

export const evaluateElement = (
  final:boolean,
  type:string,
  element:any,
  steps:string[],
  unit:number,
  language:string,
  level:number):any => {
  if (final) {
    return processFinalProperty(type, element, unit, language)
  } else if (type === OBJECT) {
    return walksObject(steps, unit, language, element, level + 1)
  } else if (type === MAP) {
    return walksObject(steps, unit, language, mapToJson(element), level + 1)
  } else {
    throw new Error('Data structure not supported')
  }
}

export const walksObject = (steps:string[], unit:number, language:string, json: Json, level:number):any => {
  if (level + 1 <= steps.length) {
    for (const key in json) {
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const element = json[key];
        if (key === steps[level]) {
          const {final, type} = handleProperty(element)
          return evaluateElement(final, type, element, steps, unit, language, level)
        }
      } else {
        throw new Error('Property not found')
      }
    }
    throw new Error('Path not found')
  }
}

const main = (json: Json, config: Config = { path: [], unit: 0, language: 'es'}) => {
  const { path, unit, language } = config
  if (path.length === 0) throw new Error("Path can't be an empty array")
  if (Object.keys(json).length === 0) throw new Error("Json can't be empty")
  return walksObject(path, unit, language, json, 0)
}

export default main