// TODO: 全局变量用于控制当前是否为 mock 阶段
var isMock = false;

var batchShareDeviceTypeEnum = {
  IPC: 0,    
  NVR:1,
  Access: 6,    // 门禁
  doorbell: 7   // 门铃
}

// 将权限值的字符串转化为对应的文字
function changePermissionToText(permissionString) {
  // 权限的对照表
  // TODO:枚举类型的定义，这个地方时是否符合枚举类型
  var permissionEnum = {
    Realplay: "视频查看",
    Replay: "录像回放",
    Talk: "语音对讲",
    PtzControl: "云台控制",
    AlarmPush: "告警消息",
    Config: "设备配置"
  }
  var permissionArray = []
  permissionString.split(",").forEach(function (item) {
    permissionArray.push(permissionEnum[item]);
  })
  return permissionArray.join("/")
}

// 从 设备&&通道 数据中筛选出被选中的信息
// 函数是没有副作用的，并不会对传进去的参数本身进行修改
// 函数有返回值
function filterSelectedDevice(deviceInfoArray, channelInfoArray) {
  var selectDeviceInfoArray = []
  var selectChannelsInfoArray = []

  // 1. 筛选出被选中的设备信息
  deviceInfoArray.forEach(function (deviceInfo) {
    if (deviceInfo.isShared == 1) {
      selectDeviceInfoArray.push(deviceInfo)
    }
  })
  // 2. 筛选中被选中的通道信息
  channelInfoArray.forEach(function (channelListInfo) {
    // 被选中的通道数组
    var sharedChannels = channelListInfo.channelList.filter(function (channelInfo) {
      return channelInfo.isShared == 1
    })
    if (sharedChannels.length > 0) {
      var channelListInfoTmp = deepCopy(channelListInfo)
      channelListInfoTmp.channelList = sharedChannels
      selectChannelsInfoArray.push(channelListInfoTmp)
    }
  })
  console.log('从所有设备信息中筛选出来被选中的设备%o', selectDeviceInfoArray);
  console.log('从所有通道信息中筛选出来被选中的通道%o', selectChannelsInfoArray);
  return {
    selectDeviceInfoArray: selectDeviceInfoArray,
    selectChannelsInfoArray: selectChannelsInfoArray
  }
}

// 给首次添加的设备上添加最大范围的权限
// 函数是有副作用的，直接在实参的基础上进行数据的添加
// 无返回值
function addPermissionToNewDevice(deviceInfoArray, channelInfoArray) {
  // 批量分享时，各种设备类型拥有的最大权限能力
  var deviceTypePermissionEnum = {
    IPC: 'Realplay,Replay,Talk,PtzControl,AlarmPush,Config', 
    NVR: 'Realplay,Replay,Talk,PtzControl,AlarmPush,Config', 
    channel: 'Realplay,Replay,Talk,PtzControl,AlarmPush',
    Access: "Realplay,Replay,Talk,AlarmPush",                
    doorbell: "Realplay,Replay,Talk,AlarmPush,Config"        
  }

  // 给被选中的设备添加权限
  deviceInfoArray.forEach(function (deviceInfo) {
    // 需要将新被勾选的设备添加最全的权限
    if (deviceInfo.isShared == 1) {
      // ！！！如果设备上没有权限信息则添加最大范围的权限
      // ！！！如果设备上已经有了权限信息则不变动
      if (deviceInfo.permission == undefined) {
        switch (deviceInfo.deviceType) {
          case batchShareDeviceTypeEnum.IPC:
            deviceInfo.permission = deviceTypePermissionEnum.IPC;
            break;
          case batchShareDeviceTypeEnum.NVR:
            deviceInfo.permission = deviceTypePermissionEnum.NVR;
            break;
          case batchShareDeviceTypeEnum.Access:
            deviceInfo.permission = deviceTypePermissionEnum.Access;
            break;
          case batchShareDeviceTypeEnum.doorbell:
            deviceInfo.permission = deviceTypePermissionEnum.doorbell;
            break;
          default:
            // 如果有未适配的设备类型，默认基于 IPC 的权限
            deviceInfo.permission = deviceTypePermissionEnum.IPC;
        }
      }
    } else {
      // 取消勾选的设备，需要把权限清空
      deviceInfo.permission = undefined
    }
  })

  // 给被选中的通道添加权限
  channelInfoArray.forEach(function (channelListInfo) {
    channelListInfo.channelList.forEach(function (channelInfo) {
      if (channelInfo.isShared == 1) {
        // 如果通道上没有权限信息则添加最大范围的权限
        // 如果通道上已经有了权限信息则不变动
        if (channelInfo.permission == undefined) {
          channelInfo.permission = deviceTypePermissionEnum.channel
        }
      }
    })
  })
}

// 生成用户信息列表
function buildUserInfoList(shareUserList) {
  // 避免数据叠加：每次渲染前将之前的生成的 DOM 结构清除
  $('#userInfoListUL li:not(.mui-hidden)').remove()
  var ulDom = $('#userInfoListUL');
  shareUserList.forEach((userInfo) => {
    // 克隆模板 li
    var templateLI = $('.user-info-card-template').clone();
    // 移除掉不需要的类名
    templateLI.removeClass("user-info-card-template mui-hidden");
    // 填充值：用户名
    // TODO：国内和海外是不是反了，看下这个字段的值是多少
    var userNameText;
    //是否国内服务器（1国内；0海外）
    if (localStorage.isDomestic == "1") {
      Boolean(userInfo.phone) ? userNameText = userInfo.userName + "(" + userInfo.phone + ")" : userNameText = userInfo.userName
    } else {
      Boolean(userInfo.email) ? userNameText = userInfo.userName + "(" + userInfo.email + ")" : userNameText = userInfo.userName
    }
    templateLI.find("span").eq(0).text(userNameText)
    // 填充值：备注
    var userRemarkText = "备注：" + userInfo.remark;
    templateLI.find("span").eq(1).text(userRemarkText)
    // 填充值：设备总数
    var deviceTotal = "设备：" + userInfo.total + "台"
    templateLI.find("span").eq(2).text(deviceTotal)
    // 添加属性：用户ID
    templateLI.attr('data-userId', userInfo.userId)
    // 事件绑定：li 标签的 tap 事件
    templateLI.on("tap", turnToShareDetailPage)
    ulDom.append(templateLI)
  });
}