/**
 * Created by Administrator on 2017/4/23.
 */


app.controller('tree_control', ['$scope',
	function FishAngular($scope) {

		//侧边栏
		$scope.slide_on = function (item) {
			tolog(item);
			tolog(silde_data);
			silde_data.children.push(slide_getitem());
			$scope.$apply();
		}

	}]);