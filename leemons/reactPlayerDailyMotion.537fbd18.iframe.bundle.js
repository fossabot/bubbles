"use strict";(self.webpackChunk_bubbles_ui_leemons=self.webpackChunk_bubbles_ui_leemons||[]).push([[7596],{"../../node_modules/react-player/lazy/players/DailyMotion.js":(__unused_webpack_module,exports,__webpack_require__)=>{function _typeof(obj){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function _typeof(obj){return typeof obj}:function _typeof(obj){return obj&&"function"==typeof Symbol&&obj.constructor===Symbol&&obj!==Symbol.prototype?"symbol":typeof obj},_typeof(obj)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var _react=function _interopRequireWildcard(obj){if(obj&&obj.__esModule)return obj;if(null===obj||"object"!==_typeof(obj)&&"function"!=typeof obj)return{default:obj};var cache=_getRequireWildcardCache();if(cache&&cache.has(obj))return cache.get(obj);var newObj={},hasPropertyDescriptor=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var key in obj)if(Object.prototype.hasOwnProperty.call(obj,key)){var desc=hasPropertyDescriptor?Object.getOwnPropertyDescriptor(obj,key):null;desc&&(desc.get||desc.set)?Object.defineProperty(newObj,key,desc):newObj[key]=obj[key]}newObj.default=obj,cache&&cache.set(obj,newObj);return newObj}(__webpack_require__("../../node_modules/react/index.js")),_utils=__webpack_require__("../../node_modules/react-player/lazy/utils.js"),_patterns=__webpack_require__("../../node_modules/react-player/lazy/patterns.js");function _getRequireWildcardCache(){if("function"!=typeof WeakMap)return null;var cache=new WeakMap;return _getRequireWildcardCache=function _getRequireWildcardCache(){return cache},cache}function ownKeys(object,enumerableOnly){var keys=Object.keys(object);if(Object.getOwnPropertySymbols){var symbols=Object.getOwnPropertySymbols(object);enumerableOnly&&(symbols=symbols.filter((function(sym){return Object.getOwnPropertyDescriptor(object,sym).enumerable}))),keys.push.apply(keys,symbols)}return keys}function _objectSpread(target){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?ownKeys(Object(source),!0).forEach((function(key){_defineProperty(target,key,source[key])})):Object.getOwnPropertyDescriptors?Object.defineProperties(target,Object.getOwnPropertyDescriptors(source)):ownKeys(Object(source)).forEach((function(key){Object.defineProperty(target,key,Object.getOwnPropertyDescriptor(source,key))}))}return target}function _slicedToArray(arr,i){return function _arrayWithHoles(arr){if(Array.isArray(arr))return arr}(arr)||function _iterableToArrayLimit(arr,i){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(arr)))return;var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{_n||null==_i.return||_i.return()}finally{if(_d)throw _e}}return _arr}(arr,i)||function _unsupportedIterableToArray(o,minLen){if(!o)return;if("string"==typeof o)return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);"Object"===n&&o.constructor&&(n=o.constructor.name);if("Map"===n||"Set"===n)return Array.from(o);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen)}(arr,i)||function _nonIterableRest(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function _arrayLikeToArray(arr,len){(null==len||len>arr.length)&&(len=arr.length);for(var i=0,arr2=new Array(len);i<len;i++)arr2[i]=arr[i];return arr2}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}function _setPrototypeOf(o,p){return _setPrototypeOf=Object.setPrototypeOf||function _setPrototypeOf(o,p){return o.__proto__=p,o},_setPrototypeOf(o,p)}function _createSuper(Derived){var hasNativeReflectConstruct=function _isNativeReflectConstruct(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function _createSuperInternal(){var result,Super=_getPrototypeOf(Derived);if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget)}else result=Super.apply(this,arguments);return _possibleConstructorReturn(this,result)}}function _possibleConstructorReturn(self,call){return!call||"object"!==_typeof(call)&&"function"!=typeof call?_assertThisInitialized(self):call}function _assertThisInitialized(self){if(void 0===self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return self}function _getPrototypeOf(o){return _getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function _getPrototypeOf(o){return o.__proto__||Object.getPrototypeOf(o)},_getPrototypeOf(o)}function _defineProperty(obj,key,value){return key in obj?Object.defineProperty(obj,key,{value,enumerable:!0,configurable:!0,writable:!0}):obj[key]=value,obj}var DailyMotion=function(_Component){!function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function");subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,writable:!0,configurable:!0}}),superClass&&_setPrototypeOf(subClass,superClass)}(DailyMotion,_Component);var _super=_createSuper(DailyMotion);function DailyMotion(){var _this;_classCallCheck(this,DailyMotion);for(var _len=arguments.length,args=new Array(_len),_key=0;_key<_len;_key++)args[_key]=arguments[_key];return _defineProperty(_assertThisInitialized(_this=_super.call.apply(_super,[this].concat(args))),"callPlayer",_utils.callPlayer),_defineProperty(_assertThisInitialized(_this),"onDurationChange",(function(){var duration=_this.getDuration();_this.props.onDuration(duration)})),_defineProperty(_assertThisInitialized(_this),"mute",(function(){_this.callPlayer("setMuted",!0)})),_defineProperty(_assertThisInitialized(_this),"unmute",(function(){_this.callPlayer("setMuted",!1)})),_defineProperty(_assertThisInitialized(_this),"ref",(function(container){_this.container=container})),_this}return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(DailyMotion,[{key:"componentDidMount",value:function componentDidMount(){this.props.onMount&&this.props.onMount(this)}},{key:"load",value:function load(url){var _this2=this,_this$props=this.props,controls=_this$props.controls,config=_this$props.config,onError=_this$props.onError,playing=_this$props.playing,id=_slicedToArray(url.match(_patterns.MATCH_URL_DAILYMOTION),2)[1];this.player?this.player.load(id,{start:(0,_utils.parseStartTime)(url),autoplay:playing}):(0,_utils.getSDK)("https://api.dmcdn.net/all.js","DM","dmAsyncInit",(function(DM){return DM.player})).then((function(DM){if(_this2.container){var Player=DM.player;_this2.player=new Player(_this2.container,{width:"100%",height:"100%",video:id,params:_objectSpread({controls,autoplay:_this2.props.playing,mute:_this2.props.muted,start:(0,_utils.parseStartTime)(url),origin:window.location.origin},config.params),events:{apiready:_this2.props.onReady,seeked:function seeked(){return _this2.props.onSeek(_this2.player.currentTime)},video_end:_this2.props.onEnded,durationchange:_this2.onDurationChange,pause:_this2.props.onPause,playing:_this2.props.onPlay,waiting:_this2.props.onBuffer,error:function error(event){return onError(event)}}})}}),onError)}},{key:"play",value:function play(){this.callPlayer("play")}},{key:"pause",value:function pause(){this.callPlayer("pause")}},{key:"stop",value:function stop(){}},{key:"seekTo",value:function seekTo(seconds){this.callPlayer("seek",seconds)}},{key:"setVolume",value:function setVolume(fraction){this.callPlayer("setVolume",fraction)}},{key:"getDuration",value:function getDuration(){return this.player.duration||null}},{key:"getCurrentTime",value:function getCurrentTime(){return this.player.currentTime}},{key:"getSecondsLoaded",value:function getSecondsLoaded(){return this.player.bufferedTime}},{key:"render",value:function render(){var style={width:"100%",height:"100%",display:this.props.display};return _react.default.createElement("div",{style},_react.default.createElement("div",{ref:this.ref}))}}]),DailyMotion}(_react.Component);exports.default=DailyMotion,_defineProperty(DailyMotion,"displayName","DailyMotion"),_defineProperty(DailyMotion,"canPlay",_patterns.canPlay.dailymotion),_defineProperty(DailyMotion,"loopOnEnded",!0)}}]);