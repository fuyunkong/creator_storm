let StateMachine = require('state-machine');
let fsmData = {
initial: 'nope',
//please select the enter-state here ↓
events: [
{"name":"startup","from":"nope","to":"room-front"},
{"name":"right","from":"room-front","to":"room-right"},
{"name":"left","from":"room-front","to":"room-left"},
{"name":"left","from":"room-right","to":"room-front"},
{"name":"right","from":"room-right","to":"room-back"},
{"name":"left","from":"room-back","to":"room-right"},
{"name":"right","from":"room-back","to":"room-left"},
{"name":"left","from":"room-left","to":"room-back"},
{"name":"right","from":"room-left","to":"room-front"},
{"name":"touch-picture-finger","from":"room-right","to":"picture-finger"},
{"name":"touch-picture-gun","from":"room-back","to":"picture-gun"},
{"name":"touch-picture-rose","from":"room-left","to":"picture-rose"},
{"name":"touch-door-lock","from":"room-front","to":"door-lock"},
{"name":"out","from":"door-lock","to":"outer"},
{"name":"down","from":"picture-finger","to":"room-right"},
{"name":"down","from":"picture-gun","to":"room-back"},
{"name":"down","from":"picture-rose","to":"room-left"},
{"name":"down","from":"door-lock","to":"room-front"}
]
};
let create = function(){
let fsm = StateMachine.create(fsmData);
fsm.ASYNC = StateMachine.ASYNC;
return fsm;
}
module.exports = {create}