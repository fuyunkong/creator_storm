'use strict';

module.exports = {
  load () {
    // execute when package loaded
  },

  unload () {
    // execute when package unloaded
  },

  // register your ipc messages here
  messages: {
    'open' () {
      // open entry panel registered in package.json
      Editor.Panel.open('stateeditor');
    },
    'say-hello' () {
      Editor.log('Hello World!');
      // send ipc message to panel
     // Editor.Ipc.sendToPanel('stateeditor', 'stateeditor:hello');
    },
    'clicked' () {
	    var gold =cc.sys.localStorage.getItem("gold",0);
	    Editor.log(gold);

      Editor.log('Button clicked!');
    }
  },
};