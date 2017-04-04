'use strict';

module.exports = {
    load: function () {
        // 当 package 被正确加载的时候执行
    },

    unload: function () {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        'test': function(event, args){
            Editor.log(args);
        },
        'showPanel': function(){
            Editor.Panel.open('hot-update-tools');
        }
    },
};