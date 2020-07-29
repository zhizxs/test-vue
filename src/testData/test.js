
// 数据转换 行数据和列数据

const object = {
  "name": "Chaoyang Gan",
  "title": "Engineer",
  "subject": "Maths"
}


const pairs = _.toPairs(object)
console.log(pairs)
const object0 = _.fromPairs(pairs)
console.log(object0)


const empsRows = [
  { RowId: '001', EmpId: '10', Lastname: 'Smith', Firstname: 'Joe', Salary: 40000 },
  { RowId: '002', EmpId: '12', Lastname: 'Jones', Firstname: 'Mary', Salary: 50000 },
  { RowId: '003', EmpId: '11', Lastname: 'Johnson', Firstname: 'Cathy', Salary: 44000 },
  { RowId: '004', EmpId: '22', Lastname: 'Jones', Firstname: 'Bob', Salary: 55000 },
  { RowId: '005', EmpId: '24', Lastname: 'Steve', Firstname: 'Mike', Salary: 62000 }
]


const empsColumns = {
  RowId: [ '001', '002', '003', '004', '005' ],
  EmpId: [ '10', '12', '11', '22', '24' ],
  Lastname: [ 'Smith', 'Jones', 'Johnson', 'Jones', 'Steve' ],
  Firstname: [ 'Joe', 'Mary', 'Cathy', 'Bob', 'Mike' ],
  Salary: [ 40000, 50000, 44000, 55000, 62000 ]
}


function selfRow2Col(dataRow){
	let dataCol={}
	dataRow.forEach(row=>{
		for(let key in row){
			if(dataCol[key]){
				dataCol[key].push(row[key])
			}else{
				dataCol[key] = [row[key]]
			}
		}
	})
	return dataCol;
}

function selfCol2Row(dataCol){

	let keys = Object.keys(dataCol)

	let n = Math.max(...(keys.map(key=>dataCol[key].length)))
	let dataRow=[]
	for(let i=0;i<n;i++){
		let obj = {}
		keys.forEach(key=>{
			obj[key] = dataCol[key][i]
		})
		dataRow.push(obj)
	}

	return dataRow;
}

let r2c = selfRow2Col(empsRows)
let c2r = selfCol2Row(empsColumns)

console.log(r2c)
console.log(c2r)

