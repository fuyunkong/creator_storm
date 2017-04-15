let roomViewChangeEnum = require('room-view-change-enum');
cc.Class({
    extends: cc.Component,

    properties: {
        roomViewChangeEvent: {
            default: roomViewChangeEnum.left,
            type: roomViewChangeEnum
        }
    },

    onLoad() {
        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart(){
        cc.find('Canvas').emit('room-view-control',roomViewChangeEnum[this.roomViewChangeEvent]);
    }

});
