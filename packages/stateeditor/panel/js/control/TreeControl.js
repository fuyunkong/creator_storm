/**
 * Created by Administrator on 2017/4/23.
 */


app.controller('tree_control', ['$scope',
	function FishAngular($scope) {

		//侧边栏
		$scope.slide_add = function (item) {
			tolog(item);
			tolog(silde_data);
			item.children.push(slide_getitem());

		}
		$scope.slide_delete = function (item) {
			// item.children.push(slide_getitem());
			console.log(item.$$hashKey);
			var obj_msg = item.$$hashKey;
			if(obj_msg === undefined){
				silde_data.children= [];
			}else{
				ang_delete_obj(silde_data.children,obj_msg,"children");
			}



		}

	}]);

function ang_delete_obj(obj_arr,obj_msg) {
	// tolog(obj+item+children);
	for(var i=0;i<obj_arr.length;i++){
		var item = obj_arr[i];

		if(item.$$hashKey == obj_msg){
			obj_arr.remove(item);
			return;
		}else{
			ang_delete_obj(item.children,obj_msg);
		}

	}
}