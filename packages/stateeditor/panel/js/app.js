/**
 * Created by wuliang on 2017/4/20.
 */



var TO_CREARTOR = null; // 内部 true null
var nodes,edges, network,silde_data;
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

function getobjfromindex(obj,index) {
	var ii=0;
	for(var i in obj){


		ii+=1;
		if(ii == index){
			var item = obj[i];
			return item;
		}

	}
	return undefined;
}

function node_add() {
	var id = nodes.length+1;
	if(nodes.length != 0){
		id = parseInt(getobjfromindex(nodes._data,nodes.length).id)+1;
	}
	var obj = {id: id+"", label: 'Node '+id,x:0,y:0,des:"节点"+id};
	v_data.nodesArray.push(obj);
	nodes.add(obj);
	$app_control.add_node_select(obj);
}
function edge_testadd() {
  if(nodes.length>0){

	  var id = edges.length+1;
	  if(edges.length != 0){
		  id = parseInt(getobjfromindex(edges._data,edges.length).id)+1;
	  }
    var from = getobjfromindex(nodes._data,1).id;
	  edge_add(from,from,id);
  }else{
  	tolog("无状态节点",-1)
  }

}
function edge_add(from,to,id) {
	var result = checkEdge(from,to,id);
	if(result === true){
		tolog("已存在...",-1);
	}else{

		var obj = {id: id+"",from: from, to: to, arrows:'to',label: 'event',font: {align: 'top'},des:"事件"+id};
		v_data.edgesArray.push(obj);
		// edges.add(obj);
		edges.add(v_data.edgesArray);
		//nodes.add(v_data.nodesArray);
		tolog('添加 事件',1);
		$app_control.add_edge_select(obj);
	}
}
function checkEdge(from,to,id) {

	for(var index in v_data.edgesArray){
		// toJSON($scope.data.edgesArray[index]);
		var item = v_data.edgesArray[index];
		if(item.id === id+""){
			return true;
		}
		if(item.from+""=== from+"" && item.to+"" === to+""){
			return true;
		}



	}

	return false;
}
function load_callback(obj) {
	v_data.nodesArray = obj.nodesArray;
	v_data.edgesArray = obj.edgesArray;
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
	var i=0;
	for(var index in network.body.nodes){
		v_data.nodesArray[i].x=network.body.nodes[index].x;
		v_data.nodesArray[i].y=network.body.nodes[index].y;
		i+=1;
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
function tolog(msg,type,enter) {
	if(TO_CREARTOR){
		Editor.log(msg);
	}else{
		console.log(msg);
	}
	if(type == -1 || type<=0 || type == undefined){
		$app_control.addErrorTips(msg);
	}else if(type == 1){
		$app_control.addInfoTips(msg);
	}

	if(!enter){
		$app_control.$apply();
	}

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








//侧边栏
function slide_getitem() {
	var item ={ name : "测试", datastr: 'ww', children : [] };
	return item;
}

function slide_get() {
	var obj=slide_getitem();
	obj.children.push(slide_getitem());
	obj.children.push(slide_getitem());
	obj.children[0].children.push(slide_getitem());
	obj.children[0].children.push(slide_getitem());
	return obj;
}
silde_data=slide_get();

var $app_control =undefined;
var app = angular.module("app", []);
app.controller('app_control', ['$scope',
	function FishAngular($scope) {
		$app_control = $scope;
		$scope.name = 'anglarjs';
		$scope.data = v_data;
		$scope.selectnode = undefined;
		$scope.selectEdge = undefined;
		$scope.selectEdge_from = undefined;
		$scope.selectEdge_to = undefined;
		$scope.selectAll = undefined;
		$scope.silde_data =silde_data;

		$scope.toJson =function (obj) {
			if(TO_CREARTOR){
				Editor.log(JSON.stringify(obj));
			}else{
				// console.log(JSON.stringify(obj));
				console.log(toJSON(obj));
			}

		};
		$scope.onNode =function (node) {
			for(var index in $scope.data.nodesArray){
				// toJSON($scope.data.nodesArray[index]);
				var item = $scope.data.nodesArray[index];
				if(item.id === node){
					$scope.selectnode  = item;
				}

			}
		};
		$scope.onEdge =function (edge) {
			for(var index in $scope.data.edgesArray){
				// toJSON($scope.data.edgesArray[index]);
				var item = $scope.data.edgesArray[index];
				if(item.id === edge){
					$scope.selectEdge  = item;
					$scope.selectEdge_from  = $scope.node_get(item.from);
					$scope.selectEdge_to  = $scope.node_get(item.to);
				}


			}
		};
		$scope.node_get=function (id) {
			for(var index in $scope.data.nodesArray){
				// toJSON($scope.data.nodesArray[index]);
				var item = $scope.data.nodesArray[index];
				if(item.id === id+""){
					return item;
				}

			}
		}
		$scope.edge_get=function (id) {
			for(var index in $scope.data.edgesArray){
				// toJSON($scope.data.nodesArray[index]);
				var item = $scope.data.edgesArray[index];
				if(item.id === id+""){
					return item;
				}

			}
		}
		$scope.onSelectNode = function () {
			$scope.ondeSelectEdge();
		}
		$scope.ondeSelectNode = function () {
			$scope.selectnode = undefined;
		}
		$scope.onSelectEdge = function () {
			$scope.ondeSelectNode();
		}
		$scope.ondeSelectEdge = function () {
			$scope.selectEdge = undefined;
			$scope.selectEdge_from = undefined;
			$scope.selectEdge_to = undefined;
		}
		$scope.node_update= function () {

			nodes.clear();
			edges.clear();
			nodes.add(v_data.nodesArray);
			edges.add(v_data.edgesArray);
		}
		$scope.edge_name_change = function () {
			tolog($scope.selectEdge.label,1,true);
		}

		$scope.selectChange =function (node,type) {
			var old ={};
			var isExist = false;
			angular.copy($scope.selectEdge,old);
			if(type === 0){
				isExist= checkEdge(node.id,$scope.selectEdge.to);
				if(isExist === true){
					tolog("已有对应的事件...",-1,true);
					$scope.selectEdge_from = $scope.node_get($scope.selectEdge.from);
				}else{
					$scope.selectEdge.from=node.id;
					tolog("事件-修改成功。",1,true);
				}


			}else if(type === 1){
				isExist= checkEdge($scope.selectEdge.from,node.id);
				if(isExist === true){
					tolog("已有对应的事件...",-1,true);
					$scope.selectEdge_to = $scope.node_get($scope.selectEdge.to);
				}else{
					$scope.selectEdge.to=node.id;
					tolog("事件-修改成功。",1,true);

				}

			}
			$scope.node_update();
			// tolog(node);
			// tolog(label);
		}

		$scope.key_delete = function () {
			if($scope.selectAll){
				node_save();

				for(var index in $scope.selectAll.nodes){
					var item = $scope.selectAll.nodes[index];
          var obj = $scope.node_get(item)
					// tolog(item)
					// tolog(obj)
					v_data.nodesArray.remove(obj);
				}
				for(var index in $scope.selectAll.edges){
					var item = $scope.selectAll.edges[index];
					var obj = $scope.edge_get(item)
					// tolog(item)
					// tolog(obj)
					v_data.edgesArray.remove(obj);
				}
				$scope.node_update();
				node_save();


			}
		}
		$scope.add_node_select=function (node) {
			$scope.selectnode = node;
			$scope.ondeSelectEdge();
			$scope.$apply();
		}
		$scope.add_edge_select=function (edge) {
			$scope.selectEdge = edge;
			$scope.selectEdge_from  = $scope.node_get(edge.from);
			$scope.selectEdge_to  = $scope.node_get(edge.to);
			$scope.ondeSelectNode();
			$scope.$apply();
		}



		//提示
		$scope.tipcount = 3;
		$scope.tips ="操作提示";
		$scope.toTips = function (tip) {
			$scope.tips += tip+"&nbsp;&nbsp;&nbsp;&nbsp;";

			$scope.tipcount-=1;
			if($scope.tipcount <= 0){
				var count = fmath.GetRandomNum(1,6);
				$scope.tipcount = count;
				$scope.tips +="<br><br>";
			}
		};

		$scope.addErrorTips = function (msg) {
			var tip ="<labe class='label label-danger'>"+msg+"</labe>";
			$scope.toTips(tip);
		};

		$scope.addInfoTips = function (msg) {
			var tip ="<labe class='label label-warning'>"+msg+"</labe>";
			$scope.toTips(tip);
		};





	}
]);

app.directive("folderTree", function() {
	return {
		restrict: "E",
		scope: {
			currentItem: '='
		},
		controller:'tree_control',
		templateUrl: 'template/tree.html'
	};
});

//支持网页插入解析
app.filter('trustHtml', function ($sce) {
	return function (input) {
		return $sce.trustAsHtml(input);
	}
});

