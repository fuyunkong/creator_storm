/**
 * Created by wuliang on 2017/1/3.
 */


var MathUtil_instance = undefined;
var MathUtil = {

    getInstance : function () {

        if(MathUtil_instance === undefined){
            var target = {};
            target.name = "mathUtill";
            target.GetRandomNum = function (min,max) {
                var Range = max - min;
                var Rand = Math.random();
                return(min + Math.round(Rand * Range));
            }

            MathUtil_instance = target;
        }

        return MathUtil_instance;
    }


};

var fmath = MathUtil.getInstance();
