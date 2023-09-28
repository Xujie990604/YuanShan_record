var languages = ["zh", "en"];
var errorCode = {
	"err_common_error": 51051,
	"err_network_unreachable": 51308,
	"err_request_timeout": 63800,
	"err_noNetwork": -1,
	"err_deviceOffline": -2,
	"err_authenticationFailed": -3
};
var LAPI = {
	AudioInput: "/LAPI/V1.0/Channels/<ID>/Media/Audio/Input", //音频输入
	AudioOutput: "/LAPI/V1.0/Channels/<ID>/Media/Audio/Output", //音频输出
	AudioCapabilities: "/LAPI/V1.0/Channels/<ID>/Media/Audio/Capabilities", //通过能力获取IPC是否支持音频输出
	SDFormat: "/LAPI/V1.0/Channel/<ID>/Media/SDFormat", //SD卡格式化
	Storage: "/LAPI/V1.0/Channel/<ID>/Media/Storage", //SD信息查询
	Reboot: "/LAPI/V1.0/System/Reboot", //重启设备
	SystemTime: "/LAPI/V1.0/System/Time", //设置时间
	TimeDst: "/LAPI/V1.0/System/Time/DST", //夏令时
	DetectionAreas: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/Areas/Grid", //区域绘制,查询指定视频输入通道运动检测的所有宏块区域信息。
	DetectionWeekPlan: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/WeekPlan", //运动检测时段
	KeepAliveNvr: "/LAPI/V1.0/System/Security/KeepAlive", //保活
	KeepAliveIpc: "/LAPI/V1.0/System/KeepAlive", //保活
	Reboot: "/LAPI/V1.0/System/Reboot", //重启设备
	FullCover: "/LAPI/V1.0/Storage/StoreStrategy", //满覆盖
	OSDsContents: "/LAPI/V1.0/Channels/<ID>/Media/OSDs/Contents", //通道名称修改
	SchedulePicture: "/LAPI/V1.0/Channels/<ID>/Storage/Schedule/Picture", //告警抓图，查询指定视频通道的抓图计划
	LinkageActions: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/LinkageActions", //告警抓图，查询运动检测的联动动作
	ChannelDetailInfos: "/LAPI/V1.0/Channels/System/ChannelDetailInfos", //查询所有通道的详细信息
	RecordScheduleInfo: "/LAPI/V1.0/Channels/<ID>/Storage/Schedule/Record", //查询指定视频输入通道的录像计划
	StatusSD: "/LAPI/V1.0/Channels/<ID>/System/DeviceStatus/SD", //是否有SD卡
	WideDynamic: "/LAPI/V1.0/Channels/<ID>/Image/Advanced/Exposure", //宽动态是否开启
	HumanDetectionRule: "/LAPI/V1.0/Channels/<ID>/Alarm/HumanShapeDetection/Rule", //查询人形检测使能
	AlarmCapabilities: "/LAPI/V1.0/Channels/<ID>/Alarm/Capabilities", //获取人形检测能力
	SmartCapabilities: "/LAPI/V1.0/Channels/<ID>/Smart/Capabilities", //获取自动跟踪能力
	ObjTrackRule: "/LAPI/V1.0/Channels/<ID>/Smart/ObjTrack/Rule", //获取、设置自动跟踪配置，建议APP支持使能即可
	MutexRelationInfos: "/LAPI/V1.0/Channels/<ID>/Smart/MutexRelationInfos", //查询通道Smart智能功能互斥关系，用户判断个智能使能情况
	WorkingStatus: "/LAPI/V1.0/Channels/<ID>/Smart/WorkingStatus", //获取智能工作状态，用于判断个智能使能情况
	WeekPlan: "/LAPI/V1.0/Channels/<ID>/Smart/ObjTrack/WeekPlan", //查询设置智能跟踪不烦计划
	OSDCapabilities: "/LAPI/V1.0/Channels/<ID>/Media/OSDs/Capabilities", //OSD能力
	OSDStyle: "/LAPI/V1.0/Channels/<ID>/Media/OSDs/ContentStyle", //OSD样式
	PTZCapabilities: "/LAPI/V1.0/Channels/<ID>/PTZ/Capabilities", //PTZ能力
	PTZRectifyCfg: "/LAPI/V1.0/Channels/<ID>/PTZ/RectifyCfg", //PTZ矫正配置
	PTZRectify: "/LAPI/V1.0/Channels/<ID>/PTZ/Rectify", //PTZ手动矫正
	HumanAreas: "/LAPI/V1.1/Channels/<ID>/Alarm/HumanShapeDetection/Areas", //查询人形检测区域还在
	LinkageWeekPlan: "/LAPI/V1.0/Channels/<ID>/Alarm/HumanShapeDetection/LinkageWeekPlan", //报警联动计划
	HumanLinkageActions: "/LAPI/V1.0/Channels/<ID>/Alarm/HumanShapeDetection/LinkageActions", //人形联动
	HumanWeekPlan: "/LAPI/V1.0/Channels/<ID>/Alarm/HumanShapeDetection/WeekPlan", //人形布防
	AudioFile: "/LAPI/V1.0/Channels/<ID>/System/AudioFile/Info", // 报警音
	ImageCapabilities: "/LAPI/V1.0/Channels/<ID>/Image/Capabilities", //灯光能力接口
	ImageLampCtrl: "/LAPI/V1.0/Channels/<ID>/Image/LampCtrl", //灯光类型控制
	CancelAccount: "/openapi/user/account/unregister", //账号注销
	GetCode: "/API/v1/VerificationCode", //获取验证码
	AccountCode: "/API/v1/VerificationCode?MobileNum=<MobileNum>&Email=<Email>&Code=<Code>", //校验验证码
	CancelReason: "/openapi/user/account/unregister/reason/set", //账号注销原因
	IPCorChannelCapabilities: "/LAPI/V1.0/Channels/<ID>/System/Capabilities", //报警音能力接口
	delAlarmAudio: "/LAPI/V1.0/Channels/<ID>/System/AudioFile/", // 删除自定义报警音
	StreamsDetailInfo: "/LAPI/V1.0/Channels/<ID>/Media/Video/Streams/DetailInfos", // 视频流信息
	VideoMode: "/LAPI/V1.0/Channels/<ID>/Media/Video/Mode", // 查询图像采集制式
	ImageCapabilities: "/LAPI/V1.0/Channels/<ID>/Image/Capabilities", //图像设置能力集
	DayNightInfo: "/LAPI/V1.0/Channels/<ID>/Image/Advanced/Exposure", //昼夜模式设置
	ImageDefault: "/LAPI/V1.0/Channels/<ID>/Image/ImageParamReset", //恢复默认图像设置
	PlanMode: "/LAPI/V1.0/Channels/<ID>/Alarm/HumanShapeDetection/PlanMode", //报警联动类型
	modifyAudioFileName: "/LAPI/V1.0/Channels/<ID>/System/AudioFile/", // 重命名 自定义警戒音名称
	audioFilePlay: "/LAPI/V1.0/Channels/<ID>/System/AudioFile/", // 试听 自定义警戒音
	SystemCapabilities: "/LAPI/V1.0/System/Capabilities", //系统能力接口
	linkageModeConfigNVR: "/LAPI/V1.0/System/ShieldLinkage", // 撤防模式和配置接口
  oneClickLinkageCapable: "/LAPI/V1.1/System/ShieldLinkage",   // 一键联动撤防
	linkageModeConfig: "/LAPI/V1.0/Channels/<ID>/System/ShieldLinkage", // 撤防模式和配置接口
	SystemCapabilitiesList: "/LAPI/V1.0/System/Capabilities?ChannelID=0", // 批量获取通道系统能力接口
	CrossLineDetectionRule: "/LAPI/V1.0/Channels/<ID>/Smart/CrossLineDetection/Rule", //查询越界检测使能
	CrossLineAreas: "/LAPI/V1.0/Channels/<ID>/Smart/CrossLineDetection/Areas", //越界检测区域
	CrossLineWeekPlan: "/LAPI/V1.0/Channels/<ID>/Smart/CrossLineDetection/WeekPlan", //越界检测计划
	IntrusionDetectionRule: "/LAPI/V1.0/Channels/<ID>/Smart/IntrusionDetection/Rule", //查询区域入侵使能
	IntrusionDetectionAreas: "/LAPI/V1.0/Channels/<ID>/Smart/IntrusionDetection/Areas", //区域入侵区域
	IntrusionDetectionWeekPlan: "/LAPI/V1.0/Channels/<ID>/Smart/IntrusionDetection/WeekPlan", //区域入侵计划
	AccessZoneRule: "/LAPI/V1.0/Channels/<ID>/Smart/AccessZone/Rule", //进入区域检测使能
	AccessZoneAreas: "/LAPI/V1.0/Channels/<ID>/Smart/AccessZone/Areas", //进入区域检测区域
	AccessZoneWeekPlan: "/LAPI/V1.0/Channels/<ID>/Smart/AccessZone/WeekPlan", //进入区域检测计划
	LeaveZoneRule: "/LAPI/V1.0/Channels/<ID>/Smart/LeaveZone/Rule", //离开区域检测使能
	LeaveZoneAreas: "/LAPI/V1.0/Channels/<ID>/Smart/LeaveZone/Areas", //离开区域检测区域
	LeaveZoneWeekPlan: "/LAPI/V1.0/Channels/<ID>/Smart/LeaveZone/WeekPlan", //离开区域检测计划
	CrossLineDetectionLinkageActions: "/LAPI/V1.0/Channels/<ID>/Smart/CrossLineDetection/LinkageActions",
	IntrusionDetectionLinkageActions: "/LAPI/V1.0/Channels/<ID>/Smart/IntrusionDetection/LinkageActions",
	AccessZoneLinkageActions: "/LAPI/V1.0/Channels/<ID>/Smart/AccessZone/LinkageActions",
	LeaveZoneLinkageActions: "/LAPI/V1.0/Channels/<ID>/Smart/LeaveZone/LinkageActions",
	VideoCapabilities: "/LAPI/V1.0/Channels/<ID>/Media/Video/Capabilities",
	customLinkageAction: "/LAPI/V1.0/Alarm/CustomAlarms/<ID>/LinkageActions",//自动义报警联动计划
	CheckUnregister: "/private/user/account/unregister/check", //检验账号是否可以注销
	AudioDetectionRule :"/LAPI/V1.0/Channels/<ID>/Alarm/AudioDetection/Rule", //声音使能Enabled字段控制使能
	StoreStrategy: "/LAPI/V1.0/Channels/<ID>/Storage/StoreStrategy", //满覆盖策略、图像清晰度配置
	StorageDetailInfos: "/LAPI/V1.0/Storage/Containers/DetailInfos", //SD卡状态、SD存储状态
	NewMotionDetectionRule: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/Rule", //运动检测使能
	SmartMotionDetectionAreas: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/Areas/RECTAreas", //智能云端检测区域、灵敏度、抓拍目标
	MotionDetectionLinkageActions: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/LinkageActions?Mode=<Mode>", //智能云端检测报警联动接口
	NewNVRMotionDetectionRule: "/LAPI/V1.0/Channels/<ID>/Alarm/MotionDetection/Rule?Mode=<Mode>", //NVR运动检测使能
	NVRSmartMotionDetectionAreas: "/LAPI/V1.0/Alarm/MotionDetection/Areas/RECTAreas?ChannelID=<ID>&Mode=<Mode>",
	NewHumanAlarm: "/LAPI/V1.1/Channels/<ID>/Alarm/HumanShapeDetection/LinkageActions", //新人形报警联动计划
	PowerMode:"/LAPI/V1.0/System/PowerMode",//功耗模式
	PowerStatus:"/LAPI/V1.0/System/Power/Status"//供电系统状态
}
var openAPI = {
  getTrustDeviceList: "/private/user/trust/device/list", //私有获取用户下可托管设备列表
	addTrustDevice: "/openapi/user/trust/device/add", //添加托管设备
	deleteDevice: "/openapi/user/trust/device/delete", //删除托管设备
	getAppAuthList: "/private/user/app/authorization/list", //获取用户下可授权应用列表
	getAuthCode:"/openapi/user/oauth2/code/get",// 获取授权码
	AddSensor:"/private/sensor/add",//绑定传感器
	UpdateSensor:"/private/sensor/name/update", //修改传感器名称
	SetSensor:"/private/sensor/alarm/set", //配置传感器告警开关
	getSensorList: "/private/sensor/list", //获取设备绑定的传感器列表
	SetCustomAlarmEnable: "/private/device/custom/alarm/set", //设备自定义告警使能配置
	GetCustomAlarmEnable: "/private/device/custom/alarm/get", //获取设备自定义告警使能配置
  lapiInvoke: "/openapi/device/lapi/invoke", // 透明通道接口
  shareUserList: "/openapi/user/share/user/list", // 查询分享用户列表
  shareableDeviceList: "/openapi/user/share/device/shareable/list", // 获取可分享设备列表
  batchShareCreate: "/openapi/user/share/device/batch/create", // 批量分享设备
  getDeviceListByID: "/openapi/user/share/device/list/getbyuserid",  //根据用户ID查询分享记录
  deleteSharedByID: "/openapi/user/share/device/deletebyuserid",     // 根据用户ID删除分享记录
  updateDeviceBatchShare: "/openapi/user/share/device/batch/update", //批量编辑分享记录
};