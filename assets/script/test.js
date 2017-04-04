
const versiondata={};
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
	        lab_version:cc.Label,
	        lab_versionname:cc.Label
    },

    // use this for initialization
    onLoad: function () {

			//var target = this;
	    var url = "hotUpdateConfig";
	    var self = this;
	    cc.loader.loadRes(url, cc.RawAsset, function (err, data) {
		    if (err) {
			    cc.error("err: " + err);
		    }
		    else {
			    //cc.log("data"+data);
			    cc.log("version"+data.version);
			    cc.log("versionname"+data.versionname);
			    self.lab_version.string = data.version;
			    self.lab_versionname.string = data.versionname;
			    // version = data.version;
			    // versionname = data.versionname;
		    }

	    });


    },



    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});