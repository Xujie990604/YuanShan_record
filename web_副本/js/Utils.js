var Debug = true;
var hasSendApp = false;
var invokeAPI = {
	lapiInvoke: "/openapi/device/lapi/invoke"
};
/*
 * 判断产品类型
 * 0:EZView,1:EZLive,2:Uniarch,3:Guard Live
 * */
function checkType(n) {
	n = Number(n);
	switch(n) {
		case 0:
			loadStyle('../css/style/style_EZView.css')
			break;
		case 1:
			loadStyle('../css/style/style_EZlive.css')
			break;
		case 2:
			loadStyle('../css/style/style_Uniarch.css')
			break;
		case 3:
			loadStyle('../css/style/style_EZlive.css')
			break;
		default:
			break;
	}
}
/*
 * 加载定制样式
 * 入参url为定制样式路径
 * */
function loadStyle(url) {
	var link = document.createElement('link');
	link.type = 'text/css';
	link.rel = 'stylesheet';
	link.href = url;
	var head = document.getElementsByTagName('head')[0];
	head.appendChild(link);
	//  LoadCSS.load(url);
}

/*
 * 日期转换为时间戳
 * 入参dateTime为字符串
 * 返回值毫秒为单位
 * */
function timeToStamp(dateTime) {
	var dateTime = dateTime;
	var d = new Date(dateTime.replace(/-/g, "/"));
	return d.valueOf();
}
/*
 * 时间戳转换为日期
 * 入参timestamp单位毫秒
 * */
function stampToTime(timestamp) {
	function add0(m) {
		return m < 10 ? '0' + m : m
	}
	if(timestamp == null || timestamp == '' || timestamp == undefined) {
		return '';
	}
	var time = new Date(timestamp);
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
}
/* 
 *判断某个元素是否在数组中 
 * */
function isInArr(arr, item) {
	var flag = false;
	for(var i = 0; i < arr.length; i++) {
		if(arr[i] == item) {
			flag = true;
			break;
		}
	}
	return flag;
}
/*
 * 对象、数组深拷贝
 * */
function deepCopy(obj) {
	// 只拷贝对象
	if(typeof obj !== 'object') return;
	// 根据obj的类型判断是新建一个数组还是一个对象
	var newObj = obj instanceof Array ? [] : {};
	for(var key in obj) {
		// 遍历obj,并且判断是obj的属性才拷贝
		if(obj.hasOwnProperty(key)) {
			// 判断属性值的类型，如果是对象递归调用深拷贝
			newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
		}
	}
	return newObj;
}
/*
 * 多语言资源文件加载
 * */
function initLang() {
  var langPath; // 语言文件路径
  var type;     // 语言类型
  var langName; // 语言文件对象名称
	switch(localStorage.currentLan) {
		case "1":
			type = "zh";
      langPath = "../lang/zh_strings.js";
      langName = "langZh"
			break;
		case "2":
			type = "en";
      langPath = "../lang/en_strings.js";
      langName = "langEn"
			break;
		case "3":
			type = "cht";
      langPath = "../lang/cht_strings.js";
      langName = "langCht"
			break;
		case "4":
			type = "ita";
      langPath = "../lang/ita_strings.js";
      langName = "langIta"
			break;
		case "5":
			type = "thai";
      langPath = "../lang/thai_strings.js";
      langName = "langThai"
			break;
		case "6":
			type = "spaE"; // 西班牙欧洲语系
      langPath = "../lang/spaE_strings.js";
      langName = "langSpaE"
			break;
		case "7":
			type = "spa"; // 西班牙拉美语系
      langPath = "../lang/spa_strings.js";
      langName = "langSpa"
			break;
		case "8":
			type = "kor";
      langPath = "../lang/kor_strings.js";
      langName = "langKor"
			break;
		case "9":
			type = "fra";
      langPath = "../lang/fra_strings.js";
      langName = "langFra"
			break;
		case "10":
			type = "jap";
      langPath = "../lang/jap_strings.js";
      langName = "langJap"
			break;
		case "11":
			type = "arab";
      langPath = "../lang/arab_strings.js";
      langName = "langArab"
			break;
		case "12":
			type = "viet";
      langPath = "../lang/viet_strings.js";
      langName = "langViet"
			break;
		case "17":
			type = "greek";
      langPath = "../lang/greek_strings.js";
      langName = "langGreek"
			break;
		default:
			switch(localStorage.defaultLan) {
				case "1":
					type = "zh";
          langPath = "../lang/zh_strings.js";
          langName = "langZh"
					break;
				case "2":
					type = "en";
          langPath = "../lang/en_strings.js";
          langName = "langEn"
					break;
				case "3":
					type = "cht";
          langPath = "../lang/cht_strings.js";
          langName = "langCht"
					break;
				case "4":
					type = "ita";
          langPath = "../lang/ita_strings.js";
          langName = "langIta"
					break;
				case "5":
					type = "thai";
          langPath = "../lang/thai_strings.js";
          langName = "langThai"
					break;
				case "6":
					type = "spaE";
          langPath = "../lang/spaE_strings.js";
          langName = "langSpaE"
					break;
				case "7":
					type = "spa";
          langPath = "../lang/spa_strings.js";
          langName = "langSpa"
					break;
				case "8":
					type = "kor";
          langPath = "../lang/kor_strings.js";
          langName = "langKor"
					break;
				case "9":
					type = "fra";
          langPath = "../lang/fra_strings.js";
          langName = "langFra"
					break;
				case "10":
					type = "jap";
          langPath = "../lang/jap_strings.js";
          langName = "langJap"
					break;
				case "11":
					type = "arab";
          langPath = "../lang/arab_strings.js";
          langName = "langArab"
					break;
				case "12":
					type = "viet";
          langPath = "../lang/viet_strings.js";
          langName = "langViet"
					break;
				case "17":
					type = "greek";
					langPath = "../lang/greek_strings.js";
					langName = "langGreek"
					break;			
				default:
					type = "en";
          langPath = "../lang/en_strings.js";
          langName = "langEn"
					break;
			}
	}

  // 按需加载 JS 语言文件(同步加载)
  $("#langScript").replaceWith('<script src=' + langPath + '><\/script>')
  // 拿到语言文件对象
  var langData = window[langName]
  
	$("[data-text]").each(function() {
		var $this = $(this);
		var name = $this.attr("data-text");
		$this.html(langData[name]);
	})
	$("[data-placeholder]").each(function() {
		var $this = $(this);
		var name = $this.attr("data-placeholder");
		$this.attr("placeholder", langData[name]);
	})
	var langMap = {};
	langMap.type = type;
	langMap.lang = langData;
	return langMap;
}

/**
 * Ajax请求
 * @param {Object} url
 * @param {Object} type
 * @param {Object} callback
 * @param {Object} map
 */
function SendAjax(url, type, callback, map) {
	var Type = type.toUpperCase();
	var callback = callback;
	var headers = {};
	headers["Content-Type"] = 'application/json';
	var channelId = localStorage.channelId || "0";
	var ajaxURL = "";
	if(localStorage.isNetConnect == "1") {
		if(localStorage.deviceOs == 'true') { // 判断云端在线
			if(localStorage.workingStatus == "0") {
				dsBridgeFuncSyn.showDeviceWakeUpView();
				return;
			}
		if(localStorage.deviceStatus == "0") {
				if(localStorage.isSupportMediaTrans == "1") {
					var sendUrl = url;
					if(sendUrl.indexOf('<ID>') > -1) {
						sendUrl = sendUrl.replace(/<ID>/, channelId);
					}
					var data = {
						deviceSerial: localStorage.devSn.substr(0, 20),
						request: {
							RequestURL: sendUrl,
							Method: type.toUpperCase(),
							Data: map
						}
					}
					CloudSendAjax("https://" + localStorage.serverAddress + invokeAPI.lapiInvoke, 'post', callback, data, true)
			         return;
				} else if (localStorage.workingStatus != -1) {
					dsBridgeFuncSyn.showDeviceWakeUpView();
					return;
				} else {
					callback(errorCode.err_deviceOffline, map);
					//showToast(langTip["WEB_toast_devicenotonline"]);
					return;
				}

		} else {
				if((localStorage.deviceType == "1" && localStorage.channelId != "0") || (localStorage.deviceType == "0" &&
				localStorage.channelId != "0" && localStorage.isMultiChannelIPC == "1")) {
					channelId = localStorage.channelId;
					if(localStorage.channelStatus == "0") {
						callback(errorCode.err_deviceOffline, map);
						// showToast(langTip["WEB_toast_devicenotonline"]);
						return;
					}
				}
			}
		} else {
			callback(errorCode.err_deviceOffline, map);
			// showToast(langTip["WEB_toast_devicenotonline"]);
			return;
		}
	} else {
		callback(errorCode.err_noNetwork, map);
		return;
	}
	localStorage.devPwd = dsBridgeFuncSyn.updatePWD();
	//区分本地设备和云端设备 “0”：本地，“1”：云端
	if(localStorage.LocalOrCloud == "0") {
		localStorage.Pwd = localStorage.LocalDevicePwd;
		ajaxURL = 'http://' + localStorage.LocalDeviceUname + ":" + localStorage.LocalDevicePwd + "@" + localStorage.Ip + ':' + localStorage.Port + url;
	} else {
		ajaxURL = 'http://' + localStorage.uName + ":" + hex_md5(localStorage.devPwd) + "@" + localStorage.Ip + ':' + localStorage.Port + url;
	}

	if(ajaxURL.indexOf('<ID>') > -1) {
		ajaxURL = ajaxURL.replace(/<ID>/, channelId);
	}

	appLog("Web --- ajaxURL: " + ajaxURL);
	mui.ajax(ajaxURL, {
		data: map,
		dataType: "json",
		type: Type,
		timeout: 10000,
		headers: headers,
		success: function(data, textStatus, xhr) {
			appLog("Web --- ajaxURL: " + JSON.stringify(data.Response));
			if(xhr.status == 200) {
				if(401 == data.Response.StatusCode) {
					setTimeout(function() {
						showToast(langTip["WEB_AuthenticateFailed"] + "(" + data.Response.StatusCode + ")");
					}, 200);
				} else {
					callback(data.Response.StatusCode, data.Response.Data, data.Response.ResponseCode);
				}
			}
		},
		error: function(xhr, type, err) {
			dsBridgeFuncSyn.dismiss();
			//          if(type == "timeout") {
			//              showToast(langTip["WEB_api_server_is_timeout"]);
			//          } else if(type == "abort") {
			//              showToast(langTip["WEB_AuthenticateFailed"]);
			//          } else {
			//              var errCode = JSON.parse(xhr.responseText).Response.StatusCode;
			//              if(errCode == "" || errCode == undefined) {
			//                  showToast(langTip["WEB_AuthenticateFailed"]);
			//              } else {
			//                  showToast(langTip["WEB_AuthenticateFailed"] + "(" + errCode + ")");
			//              }
			//          }

			if(type == "timeout") {
				callback(errorCode.err_request_timeout, map);
			} else if(type == "abort") {
				callback(errorCode.err_authenticationFailed, map);
			} else {
				var errCode = xhr.status;
				if(errCode == 599) {
					var StatusCode = JSON.parse(xhr.responseText).Response.StatusCode;
					//					if(StatusCode == 60031) {
					//						localStorage.responseAuthInfo = "";
					//						SendAjax(url, Type, callback, map);
					//									} else {
					callback(StatusCode, map);
				}
				//				} else if(errCode == 401) {
				//					localStorage.responseAuthInfo = xhr.getResponseHeader("WWW-Authenticate");
				//					SendAjax(url, Type, callback, map);
				else {
					callback(errCode, map);
				}
			}
		}
	})
}

/**
 * Digest鉴权
 * @param {Object} responseAuthInfo
 * @param {Object} url
 * @param {Object} type
 */
function web_Digest(responseAuthInfo, url, type) {
	if(null !== responseAuthInfo) {
		var responseResult = responseAuthInfo.replace("Digest", "").replace(/\s/g, "").replace(/\"/g, "");
		var resultArray = responseResult.split(","),
			len = resultArray.length;
		for(var i = 0; i < len; i++) {
			var content = resultArray[i].split("=");
			if("realm" === content[0]) {
				localStorage.realm = content[1];
			}
			if("nonce" === content[0]) {
				if(localStorage.deviceType == 'nvr1' || localStorage.deviceType == 'nvrgallery1') {
					localStorage.nonce = localStorage.logInfo;
				} else {
					localStorage.nonce = content[1];
				}
			}
			if("qop" === content[0]) {
				localStorage.qop = content[1];
			}
			if("algorithm" === content[0]) {
				localStorage.algorithm = content[1];
			}
			if("opaque" === content[0]) {
				localStorage.opaque = content[1];
			}
		}
		var authorization = getAuthorization(type, url);
		return authorization
	} else {
		return false;
	}
}
/**
 * 重组鉴权头信息
 * @param {Object} type
 * @param {Object} url
 */
function getAuthorization(type, url) {
	var userName = localStorage.uName;
	var password = hex_md5(localStorage.devPwd);
	if(localStorage.LocalOrCloud == "0") {
		userName = localStorage.LocalDeviceUname;
		password = localStorage.LocalDevicePwd;
	}
	var result;
	if(localStorage.algorithm == "MD5") {
		result = AuthResponseMD5(type, url, userName, password);
	} else {
		result = AuthResponseSHA256(type, url, userName, password);
	}
	var response = result[0];
	localStorage.nc = result[1];
	localStorage.cnonce = result[2];
	var authorization = '';
	if(localStorage.deviceType == 'nvr1' || localStorage.deviceType == 'nvrgallery1') {
		authorization = 'Digest username="' + userName + '",realm="' + localStorage.realm +
			'",nonce="' + localStorage.nonce + '",uri="' + url + '",response="' + response + '"';
	} else {
		authorization = 'Digest username="' + userName + '",realm="' + localStorage.realm +
			'",qop="' + localStorage.qop + '",nonce="' + localStorage.nonce +
			'",algorithm=' + localStorage.algorithm + ',cnonce="' + localStorage.cnonce +
			'",nc="' + localStorage.nc + '",uri="' + url +
			'",response="' + response + '"';
	}
	if(localStorage.opaque) {
		authorization = authorization + ',opaque="' + localStorage.opaque + '"';
	}
	//alert("authorization --- " + authorization);
	return authorization;
}

/**
 * 摘要鉴权加密方法
 * @param {Object} method
 * @param {Object} url
 * @param {Object} userName
 * @param {Object} password
 */
function AuthResponseMD5(method, url, userName, password) {
	localStorage.nc++;
	var num = localStorage.nc;
	var HA1 = hex_md5(userName + ":" + localStorage.realm + ":" + password);
	var HA2 = hex_md5(method + ":" + url);
	var nc = GetAuth_nc(num);
	var time = new Date().getTime();
	var cnonce = hex_md5(parseInt(Math.random() * time));
	var HD = localStorage.nonce + ":" + nc + ":" + cnonce + ":" + localStorage.qop;
	var response;
	if(localStorage.deviceType == 'nvr11' || localStorage.deviceType == 'nvrgallery1') {
		response = '';
	} else {
		response = hex_md5(HA1 + ":" + HD + ":" + HA2);
	}
	var result = [];
	result.push(response);
	result.push(nc);
	result.push(cnonce);
	return result;
}

function AuthResponseSHA256(method, url, userName, password) {
	localStorage.nc++;
	var num = localStorage.nc;
	var HA1 = sha256_digest(userName + ":" + localStorage.realm + ":" + password);
	var HA2 = sha256_digest(method + ":" + url);
	var nc = GetAuth_nc(num);
	var time = new Date().getTime();
	var cnonce = sha256_digest(parseInt(Math.random() * time));
	var HD = localStorage.nonce + ":" + nc + ":" + cnonce + ":" + localStorage.qop;
	var response;
	if(localStorage.deviceType == 'nvr11' || localStorage.deviceType == 'nvrgallery1') {
		response = '';
	} else {
		response = sha256_digest(HA1 + ":" + HD + ":" + HA2);
	}
	var result = [];
	result.push(response);
	result.push(nc);
	result.push(cnonce);
	return result;
}

/**
 *鉴权计数 nc
 * @param {Object} num
 */
function GetAuth_nc(num) {
	var s = num.toString();
	var b = s.split("");
	var c = 8 - b.length;
	var e = new Array;
	for(var i = 0; i < c; i++) {
		e[i] = 0;
	}
	var nc = e.join("");
	nc = nc + num;
	return nc;
}

/*
 * 显示气泡提示
 * @msg 需要显示的文本
 * @code，在接口中调用时的状态码
 * */
function showToast(msg, code) {
	var code = code;
	var showMsg = msg;
	switch(code) {
		case -1: //无网络提示
			showMsg = langTip["WEB_networkerror_text"];
			break;
		case -2: //设备离线提示
			showMsg = langTip["WEB_toast_devicenotonline"];
			break;
		case -3: //鉴权失败
			showMsg = langTip["WEB_AuthenticateFailed"];
			break;
		case 4: // 功能不支持（适配流媒体设备错误码）
			showMsg = langTip["WEB_unSupported"] + "(" + code + ")";
			break;	
		case 8:
			showMsg = langTip["WEB_unSupported"] + "(" + code + ")";
			break;
		case 11:
			showMsg = langTip["WEB_err_11"] + "(" + code + ")";
			break;
		case 13:
			showMsg = langTip["WEB_err_13"] + "(" + code + ")";
			break;
		case 17:
			showMsg = langTip["WEB_err_17"] + "(" + code + ")";
			break;
		case 19:
			showMsg = langTip["WEB_err_19"] + "(" + code + ")";
			break;
		case 26:
			showMsg = langTip["WEB_err_26"] + "(" + code + ")";
			break;
		// case 7:
		// 	showMsg = langTip["WEB_limited"] + "(" + code + ")";
		// 	break;
		case 86:
			showMsg = langTip["WEB_err_86"] + "(" + code + ")";
			break;
		case 102:
			showMsg = langTip["WEB_err_102"] + "(" + code + ")";
			break;
		case 123:
			showMsg = langTip["WEB_err_123"] + "(" + code + ")";
			break;
		case 137:
			showMsg = langTip["WEB_err_137"] + "(" + code + ")";
			break;
		case 138:
			showMsg = langTip["WEB_err_138"] + "(" + code + ")";
			break;
    case 1000:
      showMsg = "服务器内部错误" + "(" + code + ")";
      break;
    case 1001:
      showMsg = "Token认证失效" + "(" + code + ")";
      break;
    case 1003: 
      showMsg = langTip["WEB_errCode_1003"] + "(" + code + ")";
      break;
    case 1009:
      // TODO：错误码对应的翻译需要提供
      showMsg = "资源不存在" + "(" + code + ")";
      break;
    case 1010:
      showMsg = "结束时间不能早于当前时间" + "(" + code + ")";
      break;
    case 1011:
      showMsg = "结束时间不能早于开始时间" + "(" + code + ")";
      break;
    case 2014:
      showMsg = "组织不存在" + "(" + code + ")";
      break;
    case 2016:
      showMsg = "不能分享给自己" + "(" + code + ")";
      break;
    case 2023:
      showMsg = "用户不存在" + "(" + code + ")";
      break;
    case 2042:
      showMsg = "不能分享给其他地区用户" + "(" + code + ")";
      break;
    case 2048:
      showMsg = "管理员/子用户不能给其他用户分享组织/设备" + "(" + code + ")";
      break;
		case 99999:
			showMsg = "";
			break;
		case 63800:
			showMsg = langTip["WEB_api_server_is_timeout"] + "(" + code + ")";
			break;
		case 50808:
			showMsg = langTip["WEB_user_lock_nvr"] + "(" + code + ")";
			break;
		case 364:
			showMsg = langTip["WEB_user_lock_ipc"] + "(" + code + ")";
			break;
		case 51320:
			showMsg = langTip["WEB_snapshot_limit"] + "(" + code + ")";
			break;
		case 60065:
			showMsg = langTip["WEB_snapshot_limit"] + "(" + code + ")";
			break;
		case 50801: //NVR设备密码错误返回50801
			showMsg = langTip["WEB_AuthenticateFailed"] + "(" + code + ")";
			break;
		case 1006:
			showMsg = langTip["WEB_unSupported"] + "(" + code + ")";
			break;
		default:

	}
	if(showMsg == "") return;
	dsBridgeFuncSyn.webToast(showMsg);
}

/*
 * 保活
 * */
function keepAlive() {
	var url = LAPI.SystemTime;
	AjaxKeepAlive(url, 'get', function(code, map) {
		if(code == 0) {
			keepAliveR();
		}
	});
}

/*
 * 打印日志到原生
 * */
function appLog(msg) {
	var logContent = msg;
	//TODO
	dsBridge.call("callNativeDoFuncSyn", {
		type: callNativeDoFuncSyn.printH5Log,
		param: logContent

	});
};

/*
 * 设置开关状态
 * @domId 开关的DOM id
 * @status 开关即将要设置的状态，1开启，0关闭
 * */
function setSwitchStatus(domId, status) {
	var swith = document.getElementById(domId);
	var isActive = swith.classList.contains("mui-active"); //开关当前状态  
	if(isActive) {
		if(status == 0) {
			swith.classList.remove("mui-active");
			//          mui("#" + domId).switch().toggle();
		}
	} else {
		if(status == 1) {
			swith.classList.add("mui-active");
			//          mui("#" + domId).switch().toggle();
		}
	}
}

/*
 *接口调用失败设置列表中提示
 * @DOMid  需要设置提示的DOM ID
 * @tapEvent 点击提示需要执行的函数
 * */
function setTip(DOMid, tapEvent) {
	var btn = document.createElement('button');
	btn.id = DOMid + "Tip";
	btn.type = "button";
	btn.setAttribute("data-loading-icon-position", "right");
	btn.setAttribute("data-loading-text", " ");
	btn.className = "mui-btn ui-tip";
	btn.innerText = langTip["WEB_tap_refresh"];
	mui(btn).button('loading');
	var parentDom = document.getElementById(DOMid);
	parentDom.appendChild(btn);
	if(parentDom.hasAttribute("clickNum")) {
		var num = Number(parentDom.getAttribute("clickNum"));
		num = num + 1;
		parentDom.setAttribute("clickNum", num.toString());
	} else {
		parentDom.setAttribute("clickNum", "0");
	}
	if(Number(parentDom.getAttribute("clickNum")) > 3) {
		showToast(langTip["WEB_lapi_usuport"]);
	}
	var rBtn = document.getElementById(DOMid + "Tip");
	rBtn.addEventListener('tap', function() {
		var btnTxt = rBtn.innerText.trim();
		if(btnTxt == "" || btnTxt == " ") return;
		parentDom.removeChild(rBtn);
		tapEvent();
	});
	return rBtn;
}

function getTimeType(data, num) {
	var num = num == undefined ? 0 : num;
	var timeArr = []; //每天第一个时段存储
	var isF = true; //是否每天的第一个时段都相等
	var isEq = true; //是否每天除第一个时段之外,ipc都为“24:00:00”,nvr是否都为“00:00:00”
	var isAll = true; //是否每天都配置时段  
	var allday = true; //是否每天第一个时段是全天  
	var allEmpty = true; //是否每天都未配置检测时间 ,NVR设备ServiceData.Days[i].Num为0说明未配置，IPC设备ServiceData.Days[i].Num不为0且所有时间段都为“24:00:00”-“24:00:00”说明未配置  
	var isAll0 = true; //ipc是否每天第一个时段都是00:00:00-00:00:00
	var isAcrossDay = true; //是否跨天
	var ServiceData = data;
	//返回数据，timeType取值，0:每天都未配置时间，1:每天都只配置了一个相同时间段，2:每天都是全天，3配置了不同时间段
	var result = {
		"timeType": 1,
		"timeCustom": {
			"startHour": 8,
			"startMin": 0,
			"startSec": 0,
			"endHour": 20,
			"endMin": 0,
			"endSec": 0
		},
		"isAcrossDay": false
	};
	for(var i = 0; i < ServiceData.Days.length; i++) {
		if(ServiceData.Days[i].TimeSectionInfos.length > 1) {
			var acrossEnd = ServiceData.Days[i].TimeSectionInfos[0].End;
			var acrossBegin = ServiceData.Days[i].TimeSectionInfos[1].Begin;
			if(acrossBegin != "00:00:00" || (acrossEnd != "23:59:59" && acrossEnd != "24:00:00")) {
				isAcrossDay = false;
			}
		} else {
			isAcrossDay = false;
		}
		//判断是否每天第一个时段是全天
		var Begin0 = ServiceData.Days[i].TimeSectionInfos[0].Begin;
		var End0 = ServiceData.Days[i].TimeSectionInfos[0].End;
		if(Begin0 != "00:00:00" || (End0 != "23:59:59" && End0 != "24:00:00")) {
			allday = false;
		}
	}
	if(allday) {
		isAcrossDay = false;
	}

	for(var i = 0; i < ServiceData.Days.length; i++) {
		if(ServiceData.Days[i].Num != 0) {
			//是否每天都未配置检测时间,针对NVR
			if(localStorage.deviceType == "1" && localStorage.channelId != "0") {
				allEmpty = false;
			}
			//每天第一个时段存储
			timeArr.push({
				"Begin": ServiceData.Days[i].TimeSectionInfos[num].Begin,
				"End": ServiceData.Days[i].TimeSectionInfos[num].End
			});
			//判断ServiceData的每天除第一个时段之外,ipc是否都为“24:00:00”,nvr是否都为“00:00:00”
			var len = ServiceData.Days[i].TimeSectionInfos.length;
			var j = isAcrossDay ? 2 : 1;
			for(j; j < len; j++) {
				var timestep = ServiceData.Days[i].TimeSectionInfos[j];
				if(localStorage.deviceType == "0" && (timestep.Begin != "24:00:00" || timestep.End != "24:00:00")) {
					isEq = false;
				} else if((localStorage.deviceType == "1" && localStorage.channelId != "0") && (timestep.Begin != "00:00:00" || timestep.End != "00:00:00")) {
					isEq = false;
				}
			}
		} else {
			if(localStorage.deviceType == "1" && localStorage.channelId != "0") {
				//nvr通道是否每天都配置时段
				isAll = false;
				//nvr通道是否每天都配置时段
				allday = false;
			}
		}
	};
	//判断ServiceData有配置时间的每天第一个时段是否都相等  
	if(timeArr.length != 0) {
		var Begin = timeArr[0].Begin;
		var End = timeArr[0].End;
		for(var k = 0; k < timeArr.length; k++) {
			//判断是否每天第一个时段都相等
			if(timeArr[k].Begin != Begin || timeArr[k].End != End) {
				isF = false;
			}
			//ipc判断是否每天都未配置时间
			if(localStorage.deviceType == "0" && timeArr[k].Begin != "24:00:00") {
				allEmpty = false;
			}
			//ipc是否每天都配置时段
			if(localStorage.deviceType == "0" && (timeArr[k].Begin == "24:00:00" && timeArr[k].End == "24:00:00")) {
				isAll = false;
			}
			//ipc判断每天第一个时段是否都是00:00:00-00:00:00
			if(localStorage.deviceType == "0" && (timeArr[k].Begin != "00:00:00" || timeArr[k].End != "00:00:00")) {
				isAll0 = false;
			}
		}
	}
	if(localStorage.deviceType == "0" && isAll0) {
		allEmpty = true;
	}
	if(isAcrossDay) {
		allEmpty = false;
	}
	//如未配置时间段
	if(allEmpty) {
		result.timeType = 0;
		return result;
	};
	if(allday) {
		result.timeType = 2;
		return result;
	};
	//如果每天都配置了1个相同时间段且非全天
	if(isF && isEq && isAll && !allday) {
		result.timeType = 1;
		result.timeCustom = {
			"startHour": Number(Begin.substr(0, 2)),
			"startMin": Number(Begin.substr(3, 2)),
			"startSec": Number(Begin.substr(6, 2)),
			"endHour": Number(End.substr(0, 2)),
			"endMin": Number(End.substr(3, 2)),
			"endSec": Number(End.substr(6, 2)),
		};
	} else {
		result.timeType = 3;
	}
	result.isAcrossDay = isAcrossDay;
	return result;
}
//更新密码新（弃用）
function updatePwdNew() {
	var headers = {};
	headers["Content-Type"] = 'application/json';
	headers["Authorization"] = "Basic " + Base64.encode(localStorage.cloudUserName + ":" + localStorage.cloudPassword);
	var url = "http://" + localStorage.serverAddress + "/v2/m/" + localStorage.EZDeviceName;
	mui.ajax(url, {
		dataType: "json",
		type: "get",
		timeout: 5000,
		headers: headers,
		success: function(data, textStatus, xhr) {
			var UTC = parseInt(data.data[0].et / 30) * 30;
			localStorage.UTC = UTC;
			localStorage.devPwd = UTC + ":" + data.data[0].ek + ":" + data.data[0].sn;
			localStorage.IpPort = 'http://' + localStorage.uName + ":" + hex_md5(localStorage.devPwd) + "@" + localStorage.Ip + ':' + localStorage.Port;
			if(!hasSendApp) {
				updatePwdNewSucceed(); //告知原生侧，云端设备密码已更新
				hasSendApp = true;
			}
			setTimeout(updatePwdNew(), 10000);
		},
		error: function(xhr, type, err) {
			setTimeout(function() {
				updatePwdNew();
			}, 300);
		}
	})
}
/* 
 *获取日期是几月第几周周几点 
 * @str 日期字符串,如"2019-02-27 12:12:12"
 * 返回对象中：Month：几月；"WeekNum"第几周，"WeekDay"周几（周日为0）；"HourInDay"几点
 * */
function getTimeObj(dstr) {
	// 将字符串转为标准时间格式
	var stap = new Date(dstr.replace(/-/g, "/"));
	var str = new Date(stap);
	// 先计算出该日期为第几周
	var week = Math.ceil(str.getDate() / 7);
	var month = str.getMonth() + 1;
	var WeekDay = str.getDay();
	var Hour = str.getHours();
	// 判断这个月前7天是周几，如果不是周一，则计入上个月
	if(str.getDate() < 7) {
		if(str.getDay() != 1) {
			week = 5;
			month = str.getMonth();
		}
	}
	var obj = {
		"Month": month,
		"WeekNum": week,
		"WeekDay": WeekDay,
		"HourInDay": Hour
	}
	return obj;
}
/**
 * 获取PC夏令时的UTC时间，单位毫秒
 * @param y 年
 * @param m 月,一月为0，二月为1...
 * @param w 第几个星期
 * @param d 星期几，周日为0，周一为1...
 * @param h 小时
 */
function getDstDateToUTC(y, m, w, d, h) {
	var fir = new Date(y, m, 1);
	var day = fir.getDay(); // 返回0表示星期日，1表示星期一，...
	var week = 0; // 第几周
	var date = 0; // 几号
	var ms; // UTC时间，单位毫秒
	var monthMap = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	if(y % 400 === 0 || (y % 100 !== 0 && y % 4 === 0)) { // 平年闰年2月的天数
		monthMap[1] = 29;
	}

	for(var i = 1; i <= monthMap[m]; i++) { // 计算第w星期的星期d是date号
		if(day === d) {
			date = i;
			week++;
			if(week === w) {
				break;
			}
		}
		day = (day + 1) % 7;
	}

	ms = new Date(y, m, date, h).getTime();
	return ms;
}
/*
 * 判断当前一个时间是否在夏令时区间
 * @d 时间戳毫秒
 * DSTMap 夏令时数据
 * */
function isInSunmmer(T, DSTMap) {
	var d = new Date(T);
	var y = d.getFullYear();
	var t = d.getTime();
	var bInDst = false; // 是否在夏令时时间内
	if(DSTMap["BeginTime"]["WeekDay"] == 7) {
		DSTMap["EndTime"]["WeekDay"] = 0;
	}
	if(DSTMap["EndTime"]["WeekDay"] == 7) {
		DSTMap["EndTime"]["WeekDay"] = 0;
	}
	var start = getDstDateToUTC(y, DSTMap["BeginTime"]["Month"] - 1, DSTMap["BeginTime"]["WeekNum"],
		DSTMap["BeginTime"]["WeekDay"], DSTMap["BeginTime"]["Hour"]);

	var end = getDstDateToUTC(y, DSTMap["EndTime"]["Month"] - 1, DSTMap["EndTime"]["WeekNum"],
		DSTMap["EndTime"]["WeekDay"], DSTMap["EndTime"]["Hour"]);

	if(start > end) {
		bInDst = t < end || t > start;
	} else {
		bInDst = t > start && t < end;
	}
	return bInDst;
}

/*
 * NVR下通道录像计划数据解析
 * @data 通道录像计划数据
 */
function channelVideoPlanType(data) {
	var timeArr = []; //所有时段存储
	var Data = deepCopy(data);
	//返回数据，timeType取值，0:每天都未配置时间，1:每天都只配置了一个相同时间段且非全天，2:每天都是全天，3配置了不同时间段
	var result = {
		"Days": [], //配置有时间段的ServiceData.Days[i].ID
		"DaysArmingType": -1, //录像类型，0:所有时段都是定时(全部),1:所有时段都是运动检测,-1:存在多种类型
	};
	for(var i = 0; i < Data.Days.length; i++) {
		if(Data.Days[i].Num != 0 && Data.Days[i].ID != 8) {
			//存储配有时段的id
			result.Days.push(Data.Days[i].ID);
			for(var j = 0; j < Data.Days[i].Num; j++) {
				timeArr.push(Data.Days[i].TimeSectionInfos[j]);
			}
		}
	};
	//遍历  timeArr
	if(timeArr.length != 0) {
		var DaysArmingType0 = true,
			DaysArmingType1 = true;
		for(var k = 0; k < timeArr.length; k++) {
			//每个时间段的ArmingType是否都为0
			if(timeArr[k].ArmingType != 0) {
				DaysArmingType0 = false;
			}
			//每个配置有时间段的ArmingType是否都为1
			if(timeArr[k].ArmingType != 1) {
				DaysArmingType1 = false;
			}
		}
		if(DaysArmingType0) {
			result.DaysArmingType = 0
		} else if(DaysArmingType1) {
			result.DaysArmingType = 1
		} else {
			result.DaysArmingType = -1
		}
	}
	return result;
}

/*
 * cloud请求接口
 *@param url 请求url 如'/car/query'
 *@param SuccCallback成功回调
 * @param ErrCallback 失败回调
 */
function CloudSendAjax(url, type, callback, map, isLapiInvoke) {
	var callback = callback;
	var url = url;
	var headers = {};
	headers["Content-Type"] = 'application/json';
	headers["Authorization"] = localStorage.ucsToken;
	mui.ajax(url, {
		data: map,
		dataType: "json",
		type: type,
		timeout: 10000,
		headers: headers,
		success: function(data) {
			if(isLapiInvoke) {
				if(data.code != '200') {
					dsBridgeFuncSyn.dismiss();
					callback(data.code, data.message);
				} else {
					if(401 == data.data.response.ResponseCode) {
						setTimeout(function() {
							showToast(langTip["WEB_AuthenticateFailed"] + "(" + data.data.response.ResponseCode + ")");
						}, 200);
					} else {
						callback(data.data.response.ResponseCode, data.data.response.Data,data.data.response.ResponseCode);
					}
				}
			} else {
			callback(data.code, data.message, data.data);
			}
		},
		error: function(xhr, type, err) {
			dsBridgeFuncSyn.dismiss();
			if((type == "timeout") || (type == "abort") || (type == "error")) {
				callback(errorCode.err_request_timeout, map);
			} else {
				var errCode = JSON.parse(xhr.responseText).Response.StatusCode;
				if(xhr.status == 599 && errCode == 60031) {
					CloudSendAjax(url, Type, callback, map);
				} else {
					callback(errCode, map);
				}
			}
		}
	})
}

/*
 * cloud鉴权失败，重新获取token
 *@param url 请求url 如'/car/query'
 *@param SuccCallback成功回调
 * @param ErrCallback 失败回调
 */
function Cloud_Digest(url, type, callback, map) {
	var url1 = localStorage.serverAddress + '/API/v1/Login';
	var headers = {};
	headers["Content-Type"] = 'application/json';
	var map1 = {
		UserName: localStorage.cloudUserName,
		Password: localStorage.cloudPassword,
		NetInfo: '',
	};
	mui.ajax(url1, {
		data: map1,
		dataType: "json",
		type: 'post',
		timeout: 10000,
		headers: headers,
		success: function(data) {
			if(0 == data.Result) {
				localStorage.ucsToken = data.Data.UcsToken;
				CloudSendAjax(url, type, callback, map);
			} else {
				showToast(langTip["WEB_failure"]);
			}
		},
		error: function(xhr, type, err) {
			if((type == "timeout") || (type == "abort")) {
				showToast(langTip["WEB_api_server_is_timeout"]);
			} else {
				CloudSendAjax(url, type, callback, map);
			}
		}
	})
}

/**
 * 初始化检测时间数据
 * @param {Object} data
 */
function initCheckTime(data) {
	var timeObj = getTimeType(data);
	if(!timeObj.isAcrossDay) {
		timeCustom = timeObj.timeCustom;
		if(timeObj.timeType == 0 || timeObj.timeType == 3) {
			CheckTimeStepChecked = "";
		} else if(timeObj.timeType == 2) {
			CheckTimeStepChecked = langTip["WEB_all_day"];
		} else if(timeObj.timeType == 1) {
			CheckTimeStepChecked = langTip["WEB_custom_title"];
		}
		return CheckTimeStepChecked;
	} else {
		var isAcrossDay = judgeIsAcrossDay(data);
		if(isAcrossDay) {
			CheckTimeStepChecked = langTip["WEB_custom_title"];
		} else {
			CheckTimeStepChecked = "";
		}
		return CheckTimeStepChecked;
	}

}

function judgeIsAcrossDay(data) {
	var timeObj = getTimeType(data);
	if(timeObj.isAcrossDay) {
		var timeObj2 = getTimeType(data, 1);
		if(timeObj2.isAcrossDay) {
			if(timeObj.timeType == 1 && timeObj2.timeType == 1) {
				return true;
			}
		}
	}
	return false;
}

/**
 * 显示灵敏度配置
 * @param {Object} vals
 */
function SensitivityText(vals) {
	var textValue;
	if(vals <= 25) {
		textValue = langTip["WEB_Low"];
	} else if(vals >= 75) {
		textValue = langTip["WEB_High"];
	} else {
		textValue = langTip["WEB_Middle"];
	}
	return textValue
}

/**
 * 将灵敏度转化成所在档位的代表数值 低-25 中-50 高-75
 * @param {number} vals 
 * @returns {number} value 
 */
function SensitivityValue(vals) {
  var value;
  if(vals <= 25) {
    value = 25;
  } else if(vals >= 75) {
    value = 75;
  } else {
    value = 50;
  }
  return value
}


/**
 * 隐藏上滑弹框
 * @param {Object} list 弹框ID
 * @param {Object} checked 选中的数值
 */
function hiddenPopover(list, checked) {
	mui('#' + list + ' a').each(function(index, El) {
		if(El.getAttribute('data-value') == checked) {
			El.parentNode.classList.add('mui-selected');
		} else {
			El.parentNode.classList.remove('mui-selected');
		}
	});
}

/**
 * 隐藏上滑弹框
 * @param {Object} list 弹框ID
 * @param {Object} checked 选中的灵敏度
 */
function hiddenPopoverSensitivity(list, checked) {
	var checkedText = SensitivityText(checked);
	mui('#' + list + ' a').each(function(index, El) {
		if(El.innerText.trim() == checkedText) {
			El.parentNode.classList.add('mui-selected');
		} else {
			El.parentNode.classList.remove('mui-selected');
		}
	});
}

/**
 * 时间戳转年月日 时分 显示
 * @param {Object} date
 */
function formDate(dateVal) {
	var dt = new Date(dateVal * 1000);
	var y = dt.getFullYear();
	var m = dt.getMonth();
	m = m + 1;
	var d = dt.getDate();
	var hh = dt.getHours();
	var mm = dt.getMinutes();
	var ss = dt.getSeconds();
	var time = y + "/" + add0(m) + "/" + add0(d) + " " + add0(hh) + ":" + add0(mm);
	return time;
}

/**
 *  月 日 补0：01、02...
 * @param {Object} num
 */
function add0(num) {
	var str = "";
	if(num < 10) {
		str = str + "0" + num;
	} else {
		str = str + num;
	}
	return str;
}
/**
 * Native跳转进入web页面后先获取设备+云账号所有信息（原启动参数）
 * @param {Object} argsObj
 */
function getNativeInfo(argsObj) {
	/****************************************Web相关功能********************************************/
	// EZView：0，智U：1 ,Uniarch：2， Guard Live：3， UYC：4， UYC Pro：5
	localStorage.AppType = argsObj.AppType;
	// 云数据n字段
	localStorage.EZDeviceName = argsObj.EZDeviceName;
	// 通道ID
	localStorage.channelId = argsObj.channelId;
	// 通道在线状态
	localStorage.channelStatus = argsObj.channelStatus;
	// 云账号密码
	localStorage.cloudPassword = argsObj.cloudPassword;
	// 云账号用户名			
	localStorage.cloudUserName = argsObj.cloudUserName;
	//云账号绑定手机号	
	localStorage.cloudPhoneNumber = argsObj.cloudPhoneNumber;

	//云账号绑定邮箱	
	localStorage.cloudEmailAddress = argsObj.cloudEmailAddress;
	// system language
	localStorage.currentLan = argsObj.curLan;
	// default language
	localStorage.defaultLan = argsObj.defaultLan;
	// 


	localStorage.devEk = argsObj.devEk;
	// 时间戳（弃用）
	localStorage.devEt = argsObj.devEt;
	// 设备id
	localStorage.devID = argsObj.devID;
	// 云端设备 动态密码
	localStorage.devPwd = argsObj.devPWD;
	// 30位，设备20位序列号+10位mac（弃用）
	localStorage.devSn = argsObj.devSn;
	//20位设备序列号
	localStorage.devSn20 = localStorage.devSn.substr(0, 20);
	// 设备/通道名称
	localStorage.deviceName = argsObj.deviceName;
	// 设备是否在线
	localStorage.deviceStatus = argsObj.deviceStatus;
	// 区分设备类型（0：IPC、1：NVR 、2：VMS）
	localStorage.deviceType = argsObj.deviceType;
	//设备类型（dvt同deviceType不同点：dvt算是小类区分,如门铃是100，deviceType算是大类区分，如门铃也是IPC）
	localStorage.dvt = argsObj.dvt;
	localStorage.Ip = argsObj.ip;
	localStorage.Port = argsObj.port;
	// Bar Color
	localStorage.BarBgColor = argsObj.navigationBarColor;
	// is support Alarm Input or not 。1：√，0：×
	localStorage.isSupportAlarmAudio = argsObj.isSupportVoiceInput;
	//登录信息（SDK2鉴权信息）
	localStorage.logInfo = argsObj.logInfo;
	//设备SDK版本号
	localStorage.sv = argsObj.sdkVer;
	//SDKst
	localStorage.st = argsObj.st;
	//获取SDK版本号
	getSDK3Ver();
	//服务器地址
	localStorage.serverAddress = argsObj.serverAddress;
	//云端设备登录用户名
	localStorage.uName = argsObj.username;
	//UCS鉴权 token
	localStorage.ucsToken = argsObj.ucsToken;
	//账号类型，手机号为0，邮箱为1
	localStorage.accountType = argsObj.accountType;
	//手机区号
	localStorage.areaCode = argsObj.areaCode;
	// 本地设备用户名
	localStorage.LocalDeviceUname = argsObj.LocalDeviceUname;
	// 本地设备密码
	localStorage.LocalDevicePwd = argsObj.LocalDevicePwd;
	//区分本地设备和云端设备 “0”：本地，“1”：云端
	localStorage.LocalOrCloud = argsObj.LocalOrCloud;
	// 手机电池栏高度（新增）
	localStorage.statusBarHeight = argsObj.statusBarHeight;

	/*****************************************原生App功能模块*****************************************/
	// 消息告警告警开关（2无功能不显示；0状态关闭；1状态开启）
	localStorage.deviceAlarmSwitch = argsObj.deviceAlarmSwitch;
	// 是否支持人脸导入（1支持，其他不支持；注意还有前提条件判断：通道、分享、VMS不支持）
	localStorage.deviceFr = argsObj.deviceFr;
	// 是否支持车牌导入（1支持，其他不支持；注意还有前提条件判断：通道、分享、VMS不支持）
	localStorage.deviceVr = argsObj.deviceVr;
	// 云端设备在线状态（“true”在线；“false”离线）
	localStorage.deviceOs = argsObj.deviceOs;
	// 门铃呼叫开关（2无功能不显示；0状态关闭；1状态开启）
	localStorage.doorbellCallSwitch = argsObj.doorbellCallSwitch;
	//是否有新版本（1有；0没有。有需要红点提示）
	localStorage.hasNewVersion = argsObj.hasNewVersion;
	//是否国内服务器（1国内；0海外）
	localStorage.isDomestic = argsObj.isDomestic;
	// 手机是否联网（1连接；0无网）
	localStorage.isNetConnect = argsObj.isNetConnect;
	//是否为免注册设备（1是；0不是）
	localStorage.isNoAccount = argsObj.isNoAccount;
	//免注册设备的服务器（1国内；0海外）
	localStorage.noSignupDevServiceType = argsObj.noSignupDevServiceType;
	//是否为他人分享的设备/通道（1分享；0非分享）
	localStorage.isShare = argsObj.isShare;
	//APP是否支持分享功能(定制)（1支持；0不支持）
	localStorage.isSupportShare = argsObj.isSupportShare;
	//SDK版本号（不显示；其他直接显示数据）
	localStorage.sdkType = argsObj.sdkType;
	//当前版本号
	localStorage.versionNumber = argsObj.versionNumber;
	//Wifi名称
	localStorage.wifiName = argsObj.wifiName;
	//wifi信号强度
	localStorage.wifiValue = argsObj.wifiValue;
	//是否支持远程配置  “1”支持；“0”不支持
	localStorage.isSupportRemoteConfig = argsObj.isSupportRemoteConfig;
	//状态栏高度
	localStorage.statusBarHeight = argsObj.statusBarHeight;
	//老数据
	//localStorage.dStatus = argsObj.status;
	localStorage.cloudUserName1 = argsObj.cloudUserName;
	localStorage.firstArea = true; //是否第一次加区号
	localStorage.hasNotchInScreen = argsObj.hasNotchInScreen; //是否为刘海屏
	localStorage.hasHomeIndicator = argsObj.hasHomeIndicator; //是否有homeBar
	//是否支持门磁定制项
	localStorage.isSupportDoorLock = argsObj.isSupportDoorLock;
	localStorage.isMultiChannelIPC = argsObj.isMultiChannelIPC; //是否是多通道IPC
	localStorage.deviceModel = argsObj.deviceModel; //设备型号
	localStorage.isSupportShowDevModel = argsObj.isSupportShowDevModel; //是否支持显示设备型号
	localStorage.isSupportShowDevSN = argsObj.isSupportShowDevSN ; //是否支持显示设备序列号
  // 是否支持文字转语音功能 （ '0'：不支持、 '1'： 支持）
  localStorage.isSupportTextToAudio = argsObj.isSupportTextToAudio;
    	//支持低功耗设备模式切换：无-1， 0:休眠 1:工作 2:关机
	localStorage.workingStatus = argsObj.workingStatus;
	localStorage.isSupportMediaTrans = argsObj.isSupportMediaTrans;
}

function getSDK3Ver() {
	localStorage.sdkVer = "";
	var svList = localStorage.sv.split(";");
	var stList = localStorage.st.split(";");
	for(var i = 0; i < stList.length; i++) {
		if(stList[i] == "SDK3" && stList[i] != "") {
			var sList = svList[i].split(".");
			if(Number(sList[1]>=10)) {
				localStorage.sdkVer = svList[i].substr(0, 6);
			} else {
				localStorage.sdkVer = svList[i].substr(0, 5);
			}

		}
	}
}

/******************新增原生App上报Web功能接口******************/
dsBridge.register("callWebDoFuncAsyn", function(args) {
	appLog("Web --- args: " + args);
	var webInfo = JSON.parse(args);
	for(var key in webInfo) {
		switch(webInfo[key].whichInfo) {
			case "deviceStatus": // 更新设备在线状态
				localStorage.deviceStatus = webInfo[key].infoValue;
				if(document.getElementById("redPoint") != null) {
					if(localStorage.deviceStatus == "1" && localStorage.hasNewVersion == "1") { // 设备在线且有新版本时显示红点
						document.getElementById("redPoint").classList.remove("mui-hidden");
					} else {
						document.getElementById("redPoint").classList.add("mui-hidden");
					}
				}
				break;
			case "ip": // 更新ip
				localStorage.Ip = webInfo[key].infoValue;
				break;
			case "port": // 更新port
				localStorage.Port = webInfo[key].infoValue;
				break;
			case "logInfo": //更新登录信息
				localStorage.logInfo = webInfo[key].infoValue;
				break;
			case "deviceName": //更新设备名称
				var deviceName = document.getElementById("deviceName");
				localStorage.deviceName = webInfo[key].infoValue;
				if(deviceName != null) {
					deviceName.innerText = localStorage.deviceName;
				}
				break;
			case "sdkType": //更新SDK类型
				localStorage.sdkType = webInfo[key].infoValue;
				break;
			case "isNetConnect": //更新手机是否联网
				var wifiName = document.getElementById("wifiName");
				localStorage.isNetConnect = webInfo[key].infoValue;
				if(wifiName != null) {
					if(localStorage.isNetConnect == "0") { //断网时，wifi信号格树变为0
						wifiSrc = "../images/appConfig/wifi0.png";
						document.getElementById("wifiImg").src = wifiSrc;
					} else {
						if(localStorage.deviceOs == "false") { //设备云端不在线，wifi信号格树变为0
							wifiSrc = "../images/appConfig/wifi0.png";
							document.getElementById("wifiImg").src = wifiSrc;
						} else {
							var wifiSrc = checkWifiSiginal(localStorage.wifiValue);
							document.getElementById("wifiImg").src = wifiSrc;
						}
					}
				}
				break;
			case "hasNewVersion": //是否有新版本
				localStorage.hasNewVersion = webInfo[key].infoValue;
				if(document.getElementById("redPoint") != null) {
					if(localStorage.hasNewVersion == "1" && localStorage.deviceStatus == "1") { // 设备在线且有新版本时显示红点
						document.getElementById("redPoint").classList.remove("mui-hidden");
					} else {
						document.getElementById("redPoint").classList.add("mui-hidden");
					}
				}
				break;
			case "versionNumber": //当前版本号
				localStorage.versionNumber = webInfo[key].infoValue;
				break;
			case "LocalDeviceUname": //免注册设备用户名更新
				localStorage.LocalDeviceUname = webInfo[key].infoValue;
				break;
			case "deviceOs": //设备云端在线状态 “true”在线，“false”离线
				localStorage.deviceOs = webInfo[key].infoValue;
				if(document.getElementById("wifiImg") != null) {
					if(localStorage.deviceOs == "false") { //设备云端不在线，wifi信号格树变为0
						wifiSrc = "../images/appConfig/wifi0.png";
						document.getElementById("wifiImg").src = wifiSrc;
					} else {
						var wifiSrc = checkWifiSiginal(localStorage.wifiValue);
						document.getElementById("wifiImg").src = wifiSrc;
					}
				}
				break;
			case "updateChannelName": // TODO：通道名称修改成功后，主页同步更新
				var deviceName = document.getElementById("deviceName");
				localStorage.deviceName = webInfo[key].infoValue;
				if(deviceName != null) {
					deviceName.innerText = localStorage.deviceName;
				}
				break;
			case "workingStatus":
				localStorage.workingStatus = webInfo[key].infoValue;
				break;
			case "channelStatus":
				localStorage.channelStatus = webInfo[key].infoValue;
				break;
			default:
				break;
		}
	}
})
/**
 * Ajax请求
 * @param {Object} url
 * @param {Object} type
 * @param {Object} callback
 * @param {Object} map
 */
function SendAjaxNew(url, type, callback, map) {
	var Type = type.toUpperCase();
	var callback = callback;
	var headers = {};
	headers["Content-Type"] = 'application/json';
	var channelId = "0";
	var ajaxURL = "";
	if(localStorage.isNetConnect == "1") {
		if(localStorage.deviceStatus == "0") {
			callback(errorCode.err_deviceOffline, map);
			return;
		} else {
			if((localStorage.deviceType == "1" && localStorage.channelId != "0") || (localStorage.deviceType == "0" && localStorage.channelId != "0" && localStorage.isMultiChannelIPC == "1")) {
				channelId = localStorage.channelId;
			}
		}
	} else {
		callback(errorCode.err_noNetwork, map);
		return;
	}
	localStorage.devPwd = dsBridgeFuncSyn.updatePWD();
	if(localStorage.LocalOrCloud == "0") {
		localStorage.Pwd = localStorage.LocalDevicePwd;
		ajaxURL = 'http://' + "@" + localStorage.Ip + ':' + localStorage.Port + url;
	} else {
		ajaxURL = 'http://' + "@" + localStorage.Ip + ':' + localStorage.Port + url;
	}
	if(ajaxURL.indexOf('<ID>') > -1) {
		ajaxURL = ajaxURL.replace(/<ID>/, channelId);
	}
	if(typeof localStorage.responseAuthInfo != "undefined" && localStorage.responseAuthInfo !== "") {
		var authorization = web_Digest(localStorage.responseAuthInfo, ajaxURL, Type);
		headers["Authorization"] = authorization;
	}
	mui.ajax(ajaxURL, {
		data: map,
		dataType: "json",
		type: Type,
		timeout: 10000,
		headers: headers,
		success: function(data, textStatus, xhr) {
			if(xhr.status == 200) {
				if(401 == data.Response.StatusCode) {
					localStorage.responseAuthInfo = xhr.getResponseHeader("WWW-Authenticate");
					SendAjax(url, Type, callback, map);
				} else {
					callback(data.Response.StatusCode, data.Response.Data);
				}
			}
		},
		error: function(xhr, type, err) {
			if(type == "timeout") {
				callback(errorCode.err_request_timeout, map);
			} else if(type == "abort") {
				callback(errorCode.err_authenticationFailed, map);
			} else {
				var errCode = xhr.status;
				if(errCode == 599) {
					var StatusCode = JSON.parse(xhr.responseText).Response.StatusCode;
					if(StatusCode == 60031) {
						localStorage.responseAuthInfo = "";
						SendAjax(url, Type, callback, map);
					} else {
						callback(StatusCode, map);
					}
				} else if(errCode == 401) {
					localStorage.responseAuthInfo = xhr.getResponseHeader("WWW-Authenticate");
					SendAjax(url, Type, callback, map);
				} else {
					callback(errCode, map);
				}
			}
		}
	})
}
/**
 * 跳转至Web配置详情页
 * @param {Object} id 功能页面id
 * @param{String}extra，传参，序列化JSON格式
 */
function jumpToWebPage(id, extra, rotation) {
	var param = "";
	if(extra != undefined) {
		param = extra;
	}
	if(localStorage.isNetConnect == "1") {
		if(localStorage.deviceOs == 'true') { // 判断云端在线
			if(localStorage.workingStatus == "0") {
				dsBridgeFuncSyn.showDeviceWakeUpView();
				return;
			}
		if(localStorage.deviceStatus == "0") {
				if(localStorage.isSupportMediaTrans == "1") {
				} 
				else if (localStorage.workingStatus != -1) {
					dsBridgeFuncSyn.showDeviceWakeUpView();
			        return;
				}else{
					showToast(langTip["WEB_toast_devicenotonline"]);
					return;
				}

		} else {
			if(localStorage.deviceType == "1" && localStorage.channelId != "0") {
				if(localStorage.channelStatus == "0") {
					showToast(langTip["WEB_toast_devicenotonline"]);
					return;
				}
			}
		}
	} else {
			showToast(langTip["WEB_toast_devicenotonline"]);
			return;
		}
	} else {
		showToast(langTip["WEB_networkerror_text"]);
		return;
	}
	// TODO:页面跳转+传参
	var Url = "web/newPages/" + id + ".html";
	dsBridgeFuncSyn.pageTo(Url, param,rotation);
}
/**
 * 添加加载失败占位图(默认显示加载失败)
 * @param {Object} type 0:加载失败 1:暂无可进行的配置,2暂无SD卡
 * @param {Object} customText 
 */
function addBitmap(type, customText) {
	if(customText == undefined) {
		customText = langTip["WEB_loadFailed"];
	}
	var imgUrl;
	var div3 = document.createElement("div");
	switch(type) {
		case 0:
			imgUrl = "../images/cancel_fail.png";
			div3.className = "full-occupation-bitmap-placeholder-imgbox-loadFailed";
			break;
		case 1:
			imgUrl = "../images/appConfig/noConfiguration.png";
			div3.className = "full-occupation-bitmap-placeholder-imgbox-noConfig";
			break;
		case 2:
			imgUrl = "../images/appConfig/noSDcard.png";
			div3.className = "full-occupation-bitmap-placeholder-imgbox-noSDCard";
			break;
		default:
			break;
	}
	var parent = document.getElementsByClassName("mui-content")[0];
	var div1 = document.createElement("div");
	var div2 = document.createElement("div");
	var img = document.createElement("img");
	var pText = document.createElement("p");
	var span = document.createElement("span");
	div1.className = "full-occupation-bitmap";
	div2.className = "full-occupation-bitmap-placeholder";
	img.src = imgUrl;
	span.innerText = customText;
	pText.appendChild(span);
	div3.appendChild(img);
	div3.appendChild(pText);
	div2.appendChild(div3);
	div1.appendChild(div2);
	parent.appendChild(div1);
}

function getJSONData(url, callback, callbcakFaild, map) {
	var callback = callback;
	var targetUrl = url;
	var timeStamp = new Date().getTime();
	if(map == undefined) {
		map = {};
	}
	map.timeStamp = timeStamp;
	mui.ajax(targetUrl, {
		data: map,
		dataType: 'json', //服务器返回json格式数据
		type: 'get', //HTTP请求类型
		timeout: 10000,
		success: function(data) {
			callback(data);
		},
		error: function(xhr, type, err) {
			dsBridgeFuncSyn.dismiss();
			//closeWaiting();
			callbcakFaild();
		}
	});
}
/*
 *判断sdkVer是否大于等于某个值 
 * 
 * */
function judgeSDkVersion(compareSdkVer) {
	var sdkList = localStorage.sdkVer.split(".");
	var compareSdkVerList = compareSdkVer.split(".");
	for(var i = 0; i < compareSdkVerList.length; i++) {
		var result = compareNumber(sdkList[i], compareSdkVerList[i]);
		if(result == 1) {
			return true;
		} else if(result == -1) {
			return false;
		}
		if(i == 2 && result == 0) {
			return true;
		}
	}
}

function compareNumber(a, b) {
	a = Number(a);
	b = Number(b);
	if(a > b) {
		return 1;
	} else if(a < b) {
		return -1;
	} else {
		return 0;
	}
}

