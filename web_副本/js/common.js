var callNativeDoFuncAsyn = {
	showDate: "showDate",
	getFirstImg: "getFirstImg",
	doFunction: "doFunction",
	setScreenRotation: "setScreenRotation",
	refreshMyApp: "refreshMyApp",
	jumpNativeGetData: "jumpNativeGetData"
}

var callNativeDoFuncSyn = {
	getAllInfo: "getAllInfo",
	getBaseInfo: "getBaseInfo",
	getAccountInfo: "getAccountInfo",
	getDeviceInfo: "getDeviceInfo",
	getChannelInfo: "getChannelInfo",
	updatePWD: "updatePWD",
	setScreenRotation: "setScreenRotation",
	backTo: "backTo",
	pageTo: "pageTo",
	deviceOffLine: "deviceOffLine",
	printH5Log: "printH5Log",
	alreadySetTimeCfg: "alreadySetTimeCfg",
	showAudioImportVC: "showAudioImportVC",
	setAccountLogoutResult: "setAccountLogoutResult",
	goToFunctionPage: "goToFunctionPage",
	showLoading: "showLoading",
	dismiss: "dismiss",
	updateChannelInfo: "updateChannelInfo",
	getWebParam: "getWebParam",
	sendDataToReport: "sendDataToReport",
	webToast: "webToast",
	getChannelsName: "getChannelsName",
	webAppClose: "webAppClose",
	showDeviceWakeUpView: "showDeviceWakeUpView"
}

var dsBridgeFuncAsyn = {
	getFirstImg: function(callback) {
		dsBridge.call("callNativeDoFuncAsyn", {
			type: callNativeDoFuncAsyn.getFirstImg,
			devID: localStorage.devID,
			channelId: localStorage.channelId
		}, function(path) {
			callback(path);
		});
	},
	showDate: function(ConfigType, TimeCustom, callback) {
		dsBridge.call("callNativeDoFuncAsyn", {
			type: callNativeDoFuncAsyn.showDate,
			configType: ConfigType,
			timeCustom: TimeCustom
		}, function(result) {
			callback(result);
		});
	},
	doFunction: function(FuncNum, SendData, callback) {
		dsBridge.call("callNativeDoFuncAsyn", {
			type: callNativeDoFuncAsyn.doFunction,
			devID: localStorage.devID,
			channelId: localStorage.channelId,
			funcNum: FuncNum,
			sendData: SendData
		}, function(result) {
			if(callback) {
				callback(result);
			}
		});
	},
	setScreenRotation: function(val, callback) {
		dsBridge.call("callNativeDoFuncAsyn", {
			type: callNativeDoFuncAsyn.setScreenRotation,
			param: val
		}, function() {
			callback();
		});
	},
	refreshMyApp: function(callback) {
		dsBridge.call("callNativeDoFuncAsyn", {
			type: callNativeDoFuncAsyn.refreshMyApp
		}, function() {
			callback();
		});
	},
		/**
	 * web侧跳转到原生页面，原生操作完后返回数据给web侧
	 * 0：扫描二维码
	 */
	jumpNativeGetData: function(configType,param,callback) {
	dsBridge.call("callNativeDoFuncAsyn", {
		type: callNativeDoFuncAsyn.jumpNativeGetData,
		configType:configType,
		param:param
	}, function(result) {
		callback(result);
	});
}
}

var dsBridgeFuncSyn = {
	/**
	 * 获取设备或通道所有信息（启动参数）
	 */
	getAllInfo: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getAllInfo
		});
		return argsObj;
	},
	/**
	 * 获取设备或通道基础信息
	 */
	getBaseInfo: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getBaseInfo
		});
		return argsObj;
	},
	/**
	 * 获取云账号信息
	 */
	getAccountInfo: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getAccountInfo
		});
		return argsObj;
	},
	/**
	 * 获取设备信息
	 */
	getDeviceInfo: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getDeviceInfo
		});
		return argsObj;
	},
	/**
	 * 获取通道信息
	 */
	getChannelInfo: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getChannelInfo
		});
		return argsObj;
	},
	/**
	 * 更新设备或通道鉴权的动态密码
	 */
	updatePWD: function() {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.updatePWD,
			devID: localStorage.devID,
			channelId: localStorage.channelId
		});
		return argsObj;
	},
	/**
	 * 返回上一页面
	 */
	backTo: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.backTo
		});
	},
	/**
	 * 跳转至目标页面+传参
	 * @param {Object} url
	 * @param {Object} extras 
	 */
	pageTo: function(Url, Extras,rotation) {
		if(!(rotation==1)){
			rotation = 0;
		}
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.pageTo,
			url: Url,
			rotation:String(rotation),
			extras: Extras
		});
	},
	/**
	 * 通知Native设备离线
	 * @param {Object} devID
	 */
	deviceOffLine: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.deviceOffLine,
			devID: localStorage.devID
		});
	},
	/**
	 * 打印Web日志
	 * @param {Object} msg
	 */
	printH5Log: function(msg) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.printH5Log,
			param: msg
		});
	},
	/**
	 * 配置成功 知会原生侧
	 */
	alreadySetTimeCfg: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.alreadySetTimeCfg,
			devID: localStorage.devID
		});
	},
	/**
	 * 注销成功通知Native跳转至登录/注销失败通知Native跳转至设备列表页面 0：成功，-1：失败
	 * @param {Object} result
	 */
	setAccountLogoutResult: function(result) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.setAccountLogoutResult,
			param: result
		});
	},
	/**
	 * 通知Native跳转至对用功能页面
	 * @param {Object} FuncNum
	 */
	goToFunctionPage: function(FuncNum) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.goToFunctionPage,
			devID: localStorage.devID,
			channelId: localStorage.channelId,
			funcNum: FuncNum
		})
	},
	/**
	 * 开启loading
	 */
	showLoading: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.showLoading
		})
	},
	/**
	 * 关闭loading
	 */
	dismiss: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.dismiss
		})
	},
	/**
	 * 通知Native侧更新通道名称
	 * @param {Object} NewName
	 */
	updateChannelInfo: function(NewName) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.updateChannelInfo,
			devID: localStorage.devID,
			newName: NewName
		});
	},
	/**
	 * 获取前一页面跳转传参内容
	 * @param {Object} url
	 */
	getWebParam: function(Url) {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getWebParam,
			url: Url
		})
		return argsObj;
	},
	/**
	 * 不跳转页面向目标页面发送消息+Native上报
	 * @param {Object} ReportName
	 * @param {Object} Param
	 */
	sendDataToReport: function(ReportName, Param) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.sendDataToReport,
			reportName: ReportName,
			param: Param
		});
	},
	/**
	 * 原生toast组件提示
	 * @param {Object} Param
	 */
	webToast: function(Param) {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.webToast,
			param: Param
		});
	},
	/**
	 * 向原生获取设备名称
	 * @param {Object} Param
	 */
	getChannelsName: function(Param) {
		var argsObj = dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.getChannelsName,
			devID: localStorage.devID,
			param: Param
		});
		return argsObj;
	},
	webAppClose: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.webAppClose
		});
	},
	showDeviceWakeUpView: function() {
		dsBridge.call("callNativeDoFuncSyn", {
			type: callNativeDoFuncSyn.showDeviceWakeUpView
		});
	},

}
//返回按钮全局监听处理
console.log(document.getElementById("back"));
if(document.getElementById("back") != null) {
	document.getElementById("back").addEventListener("tap", function() {
		dsBridgeFuncSyn.backTo();
	})
}