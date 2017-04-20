/**
 * Created by wuliang on 2017/4/20.
 * 单例模版
 */


var Instance_instance = undefined;

var Instance = {

	getInstance : function () {
		if(Instance_instance === undefined){

			var target = {};
			target.name = "instance";

			Instance_instance = target;

		}
		return Instance_instance;
	}
}