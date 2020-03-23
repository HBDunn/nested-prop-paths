/**
 * nullValid helper: obj is not undefined, can be null
 * @param  {Any} obj 
 * @return {Boolean}     
 */
function nullValid(obj){
	return  obj!== undefined;
}

/**
 * valid: helper obj is not null or undefined
 * @param  {Any} obj 
 * @return {Boolean}
 */
function valid(obj){
	return obj!== null && obj!== undefined;
}

/**
 * flattten nested array to lesser level (d)
 * @param  {Array[]} arr array of arrays to flatten
 * @param  {Number} d   level of flattening
 * @return {Array.<any>}     
 * @ref: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
 */
function flatDeep(arr, d=1) {
	return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val)
		? flatDeep(val, d - 1) : val), [])
		: arr.slice();
}

/**
 * find find the path(s) to nested value in object
 * @note value must be a known value in obj,
 * so won't generate values for all nodes with possible values;
 * @param  {Object} obj   
 * @param  {string} value a value in the target obj
 * @return {Array[Array.<string>]} path(s) to all values in obj as array of key/prop strings
 * 
 * @ref: https://stackoverflow.com/questions/53543303/find-a-full-object-path-to-a-given-value-with-javascript   
 */
function find(obj, value) {
	for(var key in obj) {
		if(obj[key] && typeof obj[key] === "object") {
			var result = find(obj[key], value);
			if(result) {
				result.unshift(key);
				return result;
			}
		} else if(obj[key] === value) {
			return [key];
		}
	}
}

/**
 * objHasVal regex has prop we are searching in nested subObj 
 * @param  {Array|Object} arr_obj  
 * @param  {Array.<string>} chainArr array of strings to a nested path in arr_obj
 * @param  {[type]} prop    input from propPaths - key/prop searching for
 * @return {{has:Boolean,val:Object}} 
 */
function objHasVal(arr_obj,chainArr,prop){
	const regProp = RegExp(`(${prop}(":)|(':))`,"g");
	const val = chainArr.reduce((a,c)=>{
		return a && a[c];
	},arr_obj);
  
	const has = nullValid(val) && !!JSON.stringify(val).match(regProp);
	return {has:has, val:val};
}

/**
 * prevSlice walk object tree upwards to find next node
 * @param  {Array|Object} objOrArr  
 * @param  {Array.<string>} tempSlice currect path in obj traverse
 * @param  {Array.<string>} arrSlice  current place in obj traverse
 * @param  {string} prop  input from propPaths - key/prop searching for
 * @return {Array.<string>| undefined} best path to previous node that has next key 
 */
function prevSlice(objOrArr,tempSlice,arrSlice,prop){

	let tSlice = [...tempSlice,...arrSlice];
	let HVnt = objHasVal(objOrArr,[...tempSlice,...arrSlice],prop);
  
	// true means no good HV
	let testt = !((HVnt.has || !nullValid(arrSlice[1])) && nullValid(HVnt.val));

	while (arrSlice.length >1 && testt){
		arrSlice.pop();
		tSlice = [...tempSlice,...arrSlice];
		HVnt = objHasVal(objOrArr,tSlice,prop);
		testt = !((HVnt.has || !nullValid(arrSlice[1])) && nullValid(HVnt.val));
	}

	// remove next as it will be added in while loop as next prp
	tSlice.pop();  
	return tSlice;
}

/**
 * nextSlice walk object tree downwards to find next node
 * @param  {Array|Object} objOrArr  
 * @param  {Array.<string>} tempSlice currect path in obj traverse
 * @param  {Array.<string>} arrSlice  current place in obj traverse
 * @param  {string} prop  input from propPaths - key/prop searching for
 * @return {Array.<string>| undefined} best path to next node that has next key 
 */
function nextSlice(objOrArr,currSlice,arrSlice,prop){
	let nk = arrSlice[0];
	let cSlice = [...currSlice,nk];
	let HVnc = objHasVal(objOrArr,cSlice,prop);

	// true means no good HV
	let testc = !((HVnc.has || !nullValid(arrSlice[1])) && nullValid(HVnc.val));
	
	while (currSlice.length >1 && testc){
		currSlice.pop();
		cSlice = [...currSlice,nk];
		HVnc = objHasVal(objOrArr,cSlice,prop);
		testc = !((HVnc.has || !nullValid(arrSlice[1])) && nullValid(HVnc.val));
	}

	// remove next as it will be added in while loop as next prp
	cSlice.pop();
	return cSlice;
}
/**
 * @param  {Array.<string>} res array of obj keys, comma separated
 * @param  {Object} object from which keys were  generated.
 * @return {Array.<any>} values in order return from each key in res 
 */
function getVals(keys,o){
	return keys.map(p=>{
		let v = p.reduce((a,c)=>{
			return a && a[c];
		},o);
		return v;
	});
}

/**
 * Iterate subkeys "subArr need a new branch when prop == value 
 * subArr will hold all nodes at each level so only pick ones that
 * lead to a "prop" node. "prop" is filtered from subArr as it is always
 * searched.
 * @param  {Array.<any>| Object}  arrobj Nested Array of Objects or Object
 * @param  {string}  prop   key in arrobj
 * @return {Array[Array.<string>]} path(s) to prop as array of keys from top level 
 */
function propPaths(arrobj,prop){
	var result = {};

	function findProp(tk,obj,prop) {
    
		obj && Object.keys(obj).forEach(k=>{

			if(tk === null && !Array.isArray(result[k])){
				result[k] = [...[result[k]]];
			}
        
			// add the next key: if not tk filter first undefined val;
			if(valid(tk) && objHasVal(obj,[k],prop).has || k === prop){
				result[(tk || k)].push(k);
				result[(tk || k)] = result[(tk || k)].filter(v=>v);  
			}
      
			// need (tk||k) so that the first call with k is caught
			// "next" catches undefined and passes nulls "nullValid"
			if(typeof obj[k] === "object"){
				const next = findProp((tk || k),obj[k],prop);
				nullValid(next)?result[(tk || k)].push(next):null;
        
				// have match are done with this branch
			}else if (tk === prop || k === prop){
				const next = obj[prop]? findProp(obj,[prop],prop): prop;
				nullValid(next)?result[(tk || k)].push(next):null;
			}

			return;

		});

		return;
	}
	/**
	 * formatPaths walks the found paths to generate full valid key sets
	 * @param  {Object} pathObjArrProp output from findProps
	 * @param  {string} prop  input from propPaths - key to find
	 * @return {Array[Array.string>]} path(s) to prop as array of keys from top level  
	 */
	function formatPaths(pathObjArrProp,prop){
		// find num props in an stringified obj
		const regProp = RegExp(`([["']+${prop}["']]+)|(${prop}(",|',))`,"g");

		//topkeys extract and filter [undefined] dead paths from (result is pathObjArrProp) 
		const objArrProps = Object.keys(pathObjArrProp).filter(pth=> {
			return valid(pathObjArrProp[pth][0]) || pathObjArrProp[pth].length >1;
		});
    
		//make the arr tree to hold each chain of keys to prop
		var pathsArr = objArrProps.map(p=>{
			const objOrArr = {...arrobj};

			// filter nulls/undefs  *0 is false so use nullValid
			const subArr = pathObjArrProp[p].filter(s=>nullValid(s));
    
			// number of sub branches holding a key == prop
			const maxMatch = JSON.stringify(subArr).match(regProp);

			// make the sub tree and fill with topkey "p" 
			let subArrs = maxMatch && maxMatch.length>0
				?Array.from({length:maxMatch.length},_=>[p])
				:null;
			
			// index through all prop paths
			if(subArrs && subArrs.length>0 ){
				// number if props found in tree obj[p]
				let cnt = 0;

				// holds all key below curr index i in traversing subArr
				// add the root node for this branch [cnt]
				let topSlice = [subArrs[cnt][0]];
				let currSlice = [...topSlice];
				
				subArr.forEach((prp,i,arr)=>{
					
					currSlice = topSlice;  
          
					//return has: - if contains prop and val: - the sub obj
					const {has,val} = objHasVal(objOrArr,[...currSlice,prp],prop);
          
					// skip dead end objs and undefined 
					let _fSkipPrp = (prp !== prop && !has) || !nullValid(val);		
					if(!_fSkipPrp ){

						// add to curr branch
						subArrs[cnt].push(prp);
						currSlice.push(prp);
						
						// end of branch
						if(prp === prop){
 
							if(nullValid(subArrs[cnt])){
								subArrs[cnt]=[...currSlice];
							}

							// next branch
							cnt++;

							if(valid(subArrs[cnt])){
                
								let tempSlice = [subArrs[cnt][0]];
								let arrSlice = arr.slice(i+1);
                
								if(typeof val !== "object"){
									currSlice.pop();
								}

								// move up chain 
								const cSlice = nextSlice(objOrArr,currSlice,arrSlice,prop);
								// move down chain
								const tSlice = prevSlice(objOrArr,tempSlice,arrSlice,prop);

								topSlice = cSlice.length > 0 && (cSlice.length > tSlice.length)?[...cSlice]:[...tSlice];
								subArrs[cnt]=[...topSlice]; 
							}
						}
					}
				});

				// only return good subArrs
				const filtered = [];
				// console.log("subArrs END",subArrs);
				subArrs.forEach(sb=>{
					valid(sb) && !filtered.some(fa =>JSON.stringify(sb) === JSON.stringify(fa))?filtered.push(sb):null;
				});
				return filtered;
			}  
		});
    
		return pathsArr.filter(pa => nullValid(pa));
    
	}

	findProp(null,arrobj,prop);
	return flatDeep(formatPaths({...result},prop),1);
}

module.exports ={
	propPaths:propPaths,
	getVals:getVals,
	find:find
};