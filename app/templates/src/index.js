/*
* 兼容规范加载器模块
* 功能描述：
* 
*  
* 
*/

(function (name, context, factory) {

  // 支持 UMD. AMD, CommonJS/Node.js   
  if (typeof module !== "undefined" && module.exports) {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    context[name] = factory();
  }

})("HeatmapOverlay", this, function () {

  var HeatmapOverlay=function(){};
  return HeatmapOverlay;
});