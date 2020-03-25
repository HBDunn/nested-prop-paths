
https://img.shields.io/npm/v/nested-prop-paths
https://img.shields.io/npm/v/nested-prop-paths?color=blue

![Actively Maintained](https://img.shields.io/badge/Maintenance%20Level-Actively%20Maintained-green.svg)
![Travis (.com)](https://img.shields.io/travis/com/HBDunn/nested-prop-paths)


[![DeepScan grade](https://deepscan.io/api/teams/8228/projects/10381/branches/143198/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=8228&pid=10381&bid=143198)

# nested-prop-paths

  - find all nested paths in an object for a given key/prop 
  - find all paths to a given value in an object

## Install

```bash
npm install nested-prop-paths -P
```

## Use

Require nested-property:

```js
var propPaths = require("nested-prop-paths").propPaths;
var = propPaths(data, "prop");
```

### examples

see an example output run :

```js
const runExample = require("nested-prop-paths").runExample;
console.log(runExample()); 
```

**Try with mocked data = obj1**

```json	
 {
  "id": "100",
  "type": {
    "services": "nice",
    "id": "200"
  },
  "validations": [
    {
      "id": "300",
      "name": "John",
      "selection": {
        "id": "400",
        "values": {
          "name": "Blob"
        }
      }
    },
    {
      "id": "500",
      "name": "Bill",
      "selection": {
        "values": {
          "id": "600",
          "name": "Bob"
        }
      }
    }
  ]
}
```

```js
const results = propPaths(obj1,'id');
```
**<pre>		 results</pre>**

```
generated keys for prop 'id':
 [ [ 'id' ],
  [ 'type', 'id' ],
  [ 'validations', '0', 'id' ],
  [ 'validations', '0', 'selection', 'id' ],
  [ 'validations', '1', 'id' ],
  [ 'validations', '1', 'selection', 'values', 'id' ] ] 
```

```
getVals yields :
 [ '100', '200', '300', '400', '500', '600' ]
```

**<pre>       Try a sub node in mock: obj2</pre>**

```
obj2 nested obj2.id.id: { id:
   [ { name: 'John', selection: [Object] },
     { name: 'Bill', selection: [Object] } ] }
```

The nested obj propkey 'selection' exists, but we expect hasOwnProperty == false which returns **false**

'propPaths' returns the path(s) to prop/key **'selection'** as

```
 [ [ 'id', '0', 'selection' ], [ 'id', '1', 'selection' ] ]
```
**<pre>       also find</pre>**

We also can **'find'** a value

```js
import {propPaths, getVals, find} from "nested-prop-paths"; 
console.log(find(obj1,'400'));
```
```
to get paths(s) for all values of '400' in **obj1**

 [ 'validations', '0', 'selection', 'id' ]
```

## LICENSE

MIT