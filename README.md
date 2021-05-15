# Convert
Convert library

This a library that converts the values of the properties of an arbitrary
object to another language/unit. The conversion rules are configurable.

**Example**
```javascript
const Convert = require('../dist/app')
const json = {
  "name": "Some Company",
  "performance": {
  "revenue": 10.00
 },
}
const path = ["performance", "revenue"]
let result = Convert.default(json, { path, unit: 0.7 })
// result would be 7
```

How to use it

1. `npm install`
2. `npm start`

### Use
```typescript
const Convert = require('../dist/app')

let result = Convert.default(
    {
      a: { b: 1 },
      b: { c: { d: { e: { f: { g: { h: { i: { j: { k: 1 } } } } } } } } },
    },
    { path: ["b", "c", "d", "e", "f", "g", "h", "i", "j", "k"], unit: 0.7 }
  );
```

### Run tests
`npm test`

### Run performance profiler
`node .\benchmark\index.js`

### Last cpu profiler
![image](https://user-images.githubusercontent.com/11137311/118381236-7b26a800-b5ae-11eb-9d7a-78ee13f73c8f.png)
