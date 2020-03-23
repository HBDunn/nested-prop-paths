/*eslint-disable quotes*/
import { propPaths }  from "../src/nested-prop-paths";
import { getVals } from "../src/nested-prop-paths";

import { arr1,arr2,arr3,obj1,obj2 } from "./mocks";

describe("prop or node paths",()=>{
	
	test("resolves all path/values for arr1 and prop 'id' ",()=>{
		// arrange
		const expected = [
			{
				"info": {
					"id": "100"
				}
			},
			"100",
			"200",
			null,
			"300",
			"400"
		];
		// act
		const res = propPaths(arr1, "id");
		const vals = getVals(res,arr1);
		// assert
		expect(arr1).toBeDefined();
		expect(vals).toStrictEqual(expected);
	});

	test("resolves all path/values for arr2 and prop 'id' ",()=>{
		// arrange
		const expected =[
			{
				"info": {
					"id": "100"
				}
			},
			"100",
			"200",
			"300",
			"400",
			500,
			500,
			"600",
			"700",
			"800",
			900
		];
		
		// act
		const res = propPaths(arr2, "id");
		const vals = getVals(res,arr2); 

		// assert
		expect(arr2).toBeDefined();
		expect(vals).toStrictEqual(expected);
		
	});

	test("resolves all path/values for arr3 and prop 'id' ",()=>{
		// arrange
		const expected = [
			{
				"info": {
					"id": "100"
				}
			},
			"100",
			"200",
			null,
			[	"A","B","C"],
			[	"1A","1B","1C"],
			"300",
			"400"
		];

		// act
		const res = propPaths(arr3, "id");
		const vals = getVals(res,arr3);
		// assert
		expect(arr3).toBeDefined();
		expect(vals).toStrictEqual(expected);

	});

	test("resolves all path/values for obj1 and prop 'id' ",()=>{
		// arrange
		const expected = [
			"100",
			"200",
			"300",
			"400",
			"500",
			"600"
		];
		// act
		const res = propPaths(obj1, "id");
		const vals = getVals(res,obj1);
		// assert
		expect(obj1).toBeDefined();
		expect(vals).toStrictEqual(expected);
	});
	test("resolves all path/values for obj2 and prop 'id' ",()=>{
		// arrange
		const expected =  [
			{
				"id": [
					{
						"name": "John",
						"selection": {
							"id": {
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
			},
			{
				"values": {
					"name": "Blob"
				}
			},
			[
				{
					"name": "John",
					"selection": {
						"id": {
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
			],
			{
				"id": "600",
				"name": "Bob"
			},
			"600",
			{
				"id": {
					"id": [
						{
							"name": "John",
							"selection": {
								"id": {
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
		];
		// act
		const res = propPaths(obj2, "id");
		const vals = getVals(res,obj2);	
		// assert
		expect(obj2).toBeDefined();
		expect(vals).toStrictEqual(expected);
	});
});
