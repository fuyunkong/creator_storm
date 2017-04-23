/**
 * Created by Administrator on 2017/4/23.
 */

// $scope.dataForTheTree =
// 	[
// 		{ "name" : "Joe", "age" : "21", "children" : [
// 			{ "name" : "Smith", "age" : "42", "children" : [] },
// 			{ "name" : "Gary", "age" : "21", "children" : [
// 				{ "name" : "Jenifer", "age" : "23", "children" : [
// 					{ "name" : "Dani", "age" : "32", "children" : [] },
// 					{ "name" : "Max", "age" : "34", "children" : [] }
// 				]}
// 			]}
// 		]},
// 		{ "name" : "Albert", "age" : "33", "children" : [] },
// 		{ "name" : "Ron", "age" : "29", "children" : [] }
// 	];
function getitem() {
	var item ={ name : "测试", datastr: 'ww', children : [] };
	return item;
}

var obj=[];
obj.push(getitem());
obj[0].children.push(getitem());
obj.push(getitem());
// console.log(obj);
console.log(JSON.stringify(obj));