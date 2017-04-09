var jsonlint = Editor.require('packages://json-lint/panel/jsonlint.js')
var jsonformatter = Editor.require('packages://json-lint/panel/formatter.js')

Editor.Panel.extend({
	// 2017年2月24日17:13:26 引入两个就会报错
	// 这里从上面 Editor.require 引入
	// dependencies: [
		// 'packages://Fly-Box/panel/jsonlint.js',
		// 'packages://Fly-Box/panel/formatter.js'
	// ],
	style: `
		:host {
			display: flex;
			flex-direction: column;
		}
		.top {
			height: 50px;
			line-height: 50px;
			padding-left: 5px;
		}
		.middle {
			flex: 1;
		}
		
		.ta {
			background: #252525;
			border-radius: 3px;
			color: #fd942b;
			border-color: #fd942b;
			margin: 5px;
			width: 100%;
			height: 88%;
		}
	`,
	template: `
		<div class="top">
			左侧粘贴JSON字符串，右侧显示校验结果并格式化
		</div>
		<div class="middle layout horizontal">
			<textarea class="flex-1 ta" id="from" placeholder="请输入JSON字符串"></textarea>
			<textarea class="flex-1 ta" id="result" placeholder="结果..."></textarea>
		</div>
	`,
	$: {
		fromTa: '#from',
		resultTa: '#result'
	},
	
	ready () {
		this.$fromTa.addEventListener('keyup', () => {
			var val = this.$fromTa.value, current_json, result = "";
			if(val) {
				try{
					current_json = jsonlint.parse(val);
					result = jsonformatter.formatter.formatJson(JSON.stringify(current_json));
					// 绿色
					this.$resultTa.style.color = "#00ff00";
					this.$resultTa.style.borderColor = "#00ff00";
				} catch(e) {
					result = e;
					// 红色
					this.$resultTa.style.color = "#ff0000";
					this.$resultTa.style.borderColor = "#ff0000";
				}
			}
			
			this.$resultTa.innerHTML = result;
		});
	}
});