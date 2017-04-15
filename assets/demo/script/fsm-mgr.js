cc.Class({
    extends: cc.Component,

    properties: {
        _fsm: null,
        roomView:cc.Node,
        _roomViewChanging: false,
        _out:false,
    },

    onLoad() {
        
        this._fsm = require('fsm').create();
        this._fsm.onout = this.onOut.bind(this);
        this._fsm.startup();

        this.initRoomView();

        this.node.on('room-view-control',this.onRoomViewControl,this)
    },

    onOut(){
        if(!this._out){
            this._out = true;
            cc.director.loadScene('out-scene');
        }
    },

    initRoomView(){
        let initRoomViewName = this._fsm.current;
        let roomViewList = this.roomView.children;
        for(let roomViewItem of roomViewList){
            if(roomViewItem.name !== initRoomViewName){
                roomViewItem.active = false;
            }
        }
    },

    onRoomViewControl(e){
        let roomViewChangeEvent = e.detail;
        if(this._fsm.can(roomViewChangeEvent) && !this._roomViewChanging){
            let oldRoomViewName = this._fsm.current;
            this._fsm[roomViewChangeEvent]();
            let newRoomViewName = this._fsm.current;
            this.updateRoomView(oldRoomViewName,newRoomViewName);
        }
    },

    updateRoomView(oldRoomViewName,newRoomViewName){
        this._roomViewChanging = true;
        let oldRoomView = this.roomView.getChildByName(oldRoomViewName);
        let newRoomView = this.roomView.getChildByName(newRoomViewName);

        oldRoomView.runAction(new cc.Sequence(cc.fadeOut(1),cc.callFunc(
           ()=>{oldRoomView.active = false;
                newRoomView.opacity = 0;
                newRoomView.active = true;
                newRoomView.runAction(new cc.Sequence(cc.fadeIn(1),cc.callFunc(
                    ()=>{this._roomViewChanging = false;}
           )))} 
        )));
    },

    update(){
        console.log(this._fsm.current);
    }
});
