cc.Class({
    extends: cc.Component,

    properties: {
       _numLabel: null,
       _num: 0,
    },

    onLoad() {
        this._numLabel = this.getComponent(cc.Label);
        this._numLabel.string = this._num;
        this.node.on('touchstart',this.onTouchStart,this)
    },

    onTouchStart(){
        this._num = (this._num + 1) % 10;
        this._numLabel.string = this._num;
    }


});
