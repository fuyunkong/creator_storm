cc.Class({
    extends: cc.Component,

    properties: {
        numLabelOne:require('lock-num-script'),
        numLabelTwo:require('lock-num-script'),
        numLabelThree:require('lock-num-script'),
        _unlockNum: 741,
    },

    onLoad() {
        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart(){
        let lockNum = this.numLabelOne._num * 100 +
                      this.numLabelTwo._num * 10 + 
                      this.numLabelThree._num;
        if(this._unlockNum == lockNum){
            cc.find('Canvas').emit('room-view-control','out');
        }

    }

});
