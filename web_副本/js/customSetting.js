$(".mui-bar").css("backgroundColor", localStorage.BarBgColor); // 导航栏颜色提取为定制项，具体值由原生App提供
//修改页面尺寸
dsBridge.register("callWebDoBaseFuncAsyn", function(args) {
      var webInfo = JSON.parse(args);
      for(var key in webInfo) {
        switch(webInfo[key].whichInfo) {
          case "rotation": // 绘图数据发还给运检测配置页面
            document.documentElement.style.height = webInfo[key].infoValue.screenHeight+"px";
            document.documentElement.style.width = webInfo[key].infoValue.screenWidth+"px";
            break;
        }
      }
    });
    
document.body.style.paddingBottom = "21px";
if (localStorage.hasHomeIndicator == "1" ) {
  mui(".mui-popover.mui-popover-action.mui-popover-bottom").each(function () {
  this.style.paddingBottom = "21px";
  });
}