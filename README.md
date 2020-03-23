![Actively Maintained](https://img.shields.io/badge/Maintenance%20Level-Actively%20Maintained-green.svg)
![Travis (.com)](https://img.shields.io/travis/com/HBDunn/nested-prop-paths)

# nested-prop-paths
find all nested paths in an object for a given key/prop 

## Install

```bash
npm install nested-prop-paths
```

## Use

Require nested-property:

```js
var propPaths = require("nested-prop-paths").propPaths;
var = propPaths(data, "prop")
```

### examples
	*Try with data = obj1*
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

# LICENSE

MIT