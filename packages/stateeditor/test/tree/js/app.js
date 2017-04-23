/**
 * Created by Administrator on 2017/4/23.
 */

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
console.log(slide_get());

angular.module('treeDemo', [])
	.controller("TreeController", function($scope) {
		$scope.data =slide_get();
	})
	.directive("folderTree", function() {
		return {
			restrict: "E",
			scope: {
				currentItem: '='
			},
			templateUrl: 'template/tree.html'
		};
	});