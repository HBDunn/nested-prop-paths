const propPaths = require("../dist/nested-prop-paths").propPaths;
const getVals = require("../dist/nested-prop-paths").getVals;
const find = require("../dist/nested-prop-paths").find;
const obj1  = require("../test/mocks").obj1;
const obj2  = require("../test/mocks").obj2;
// output

console.log("\t\t* Try mock obj1 *\n",JSON.stringify(obj1,null,2));
console.log("\nrun propPaths(obj1,'id')","\n\t\t * results *\n");
const keys = propPaths(obj1,"id");

console.log("generated keys for prop 'id':\n",keys,"\n");
console.log("getVals yields :\n",getVals(keys,obj1));

console.log("\n\t\t* Try a sub node in mock: obj2 *\n");
const subObj = obj2.id.id;
const subObjHas = Object.prototype.hasOwnProperty.call(subObj,"selection");

console.log("obj2 nested obj2.id.id:",subObj);
console.log("\nThe nested obj propkey 'selection' exists,\nbut we expect hasOwnProperty == false which returns ",subObjHas);

console.log( "\n'propPaths' returns the path(s) to prop/key 'selection' as\n",propPaths(subObj,"selection"));
console.log("\n\t\t * also find *\n");
console.log("We also can 'find' (find(obj1,'400'))\nto get paths(s) for all values of '400' in obj1\n",find(obj1,"400"));