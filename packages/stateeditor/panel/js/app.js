/**
 * Created by wuliang on 2017/4/20.
 */



var TO_CREARTOR = null; // 内部 true null
var nodes,edges, network;
// create an array with nodes
var v_data={
	nodesArray:[],
	edgesArray:[]
}

// v_data.nodesArray = [
// 	{id: 1, label: 'Node 1',x:0,y:0},
// 	{id: 2, label: 'Node 2',x:0,y:0},
// 	{id: 3, label: 'Node 3',x:0,y:0},
// 	{id: 4, label: 'Node 4',x:0,y:0},
// 	{id: 5, label: 'Node 5',x:0,y:0}
// ];
// v_data.edgesArray = [
// 	{from: 1, to: 3},
// 	{from: 1, to: 2},
// 	{from: 2, to: 4},
// 	{from: 2, to: 5}
// ];

nodes = new vis.DataSet(v_data.nodesArray);
edges = new vis.DataSet(v_data.edgesArray);


// create a network
var container = document.getElementById('mynetwork');
var data = {
	nodes: nodes,
	edges: edges
};
var options = {
	edges: {
		smooth: {
			type: "vertical",
			roundness: 0.45
		}
	},
	nodes: {
		shape: 'circle',
		size: 200
	},
	physics: {
		enabled: false
	},
	interaction: {
		navigationButtons: true,
		keyboard: true
	}
}


function node_add() {
	var id = nodes.length+1;
	var obj = {id: id+"", label: 'Node '+id,x:0,y:0,des:"节点"+id};
	v_data.nodesArray.push(obj);
	nodes.add(obj);
}
function load_callback(obj) {
	angular.copy(v_data, obj); //深拷贝
	// v_data = angular.copy(obj);
	nodes.clear();
	edges.clear();
	nodes.add(v_data.nodesArray);
	edges.add(v_data.edgesArray);
}
function node_load() {
	db_get("ww",load_callback);
}
function node_save() {
	for(var index in network.body.nodes){
		v_data.nodesArray[index-1].x=network.body.nodes[index].x;
		v_data.nodesArray[index-1].y=network.body.nodes[index].y;
	}
	console.log(v_data);
	db_set("ww",v_data);

}
function draw() {
	if (network !== null) {
		network.destroy();
		network = new vis.Network(container, data, options);
	}
}

function toJSON(obj) {
	return JSON.stringify(obj, null, 4);
}

function db_set(key,obj) {
	if(TO_CREARTOR){
		Editor.log("db_set");
		Editor.Ipc.sendToMain("stateeditor:db_set",key,obj,function(e,result){
			Editor.log(result);
		})
	}else{
		var json = toJSON(obj);
		store.set(key,json);
	}


}

function db_get(key,callback) {
	if(TO_CREARTOR){
		Editor.log("db_get");
		Editor.Ipc.sendToMain("stateeditor:db_get",key,function(e,obj){
			Editor.log(obj);
			callback(obj);
		})
	}else{
		var json = store.get(key);
		var obj = JSON.parse(json);
		callback(obj);
	}


}
var $app_control =undefined;
var app = angular.module("app", []);
app.controller('app_control', ['$scope',
	function FishAngular($scope) {
		$app_control = $scope;
		$scope.name = 'anglarjs';
		$scope.data = v_data;
		$scope.toJson =function (obj) {
			if(TO_CREARTOR){
				Editor.log(JSON.stringify(obj));
			}else{
				// console.log(JSON.stringify(obj));
				console.log(toJSON(obj));
			}

		}
	}
]);
