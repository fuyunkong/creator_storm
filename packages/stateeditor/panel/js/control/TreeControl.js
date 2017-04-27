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

			}
			tolog(silde_data);


		}

	}]);