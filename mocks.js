// Testing:

/* eslint-disable quotes */
var arr1 = [{
	"id":{"info":{"id":"100"}},
	"type": {"services":"nice","id":"200"},
	value:{id:null},
	noop:"id",
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
		}]
}];

var key = "id";
var arr3 = (function (key){return [{
	'id':{"info":{"id":"100"}},
	type: {"services":"nice","id":"200"},
	value:{id:null},
	noop:'id',
	key:{[key]:["A","B","C"]},
	"arr":{id:["1A","1B","1C"]},
	"a":['id'],
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
		["id","ie"]
	]
}];
}(key));



/* eslint-enable quotes */
var arr2 = [{
	"id":{"info":{"id":"100"}},
	"type": {"services":"nice","id":"200"},
	"validations": [
		{
			"id": "300",
			"name": "John",
			"selection": {
				"id": "400",
				"values": {
					id:500,
					"name": "Blob"
				}
			}
		}]
},
{
	"name":"steve"
},
{ 
	id:500,
	"name":"elizabeth"
},
{
	"type": {"services":"nice","id":"600"},
	"validations": [
		{
			"id": "700",
			"name": "John",
			"selection": {
				"id": "800",
				"values": {
					"name": "Blob"
				}
			}
		}]
},
{
	"name":"steve"
},
{ 
	id:900,
	"name":"elizabeth"
}
];

var obj1 = {
	"id":"100",
	"type": {"services":"nice","id":"200"},
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
		}]
};

var obj2 = {
	"id":{
		"id":{
			"id": [
				{
					"name": "John",
					"selection": {
						"id":{
							"values": {
								"name": "Blob"
							}
						}
					}
				},			
				{
					"name": "Bill",
					"selection": {
						"id": {
							"id": "600",
							"name": "Bob"
						}
					}
				}	
				
			]
		}
	}		
};
 
module.exports =  {
	arr1:arr1,
	arr2:arr2,
	arr3:arr3,
	obj1:obj1,
	obj2:obj2
};