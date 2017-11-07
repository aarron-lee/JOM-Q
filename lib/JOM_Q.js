/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


const NodeCollection = __webpack_require__(1);


window.$JOM = ( arg ) => {

  if( typeof arg === "string"){
    let docElements = document.querySelectorAll(arg);

    let docElementsArr = [];

    docElements.forEach( (el)=>{
      docElementsArr.push(el);
    });

    return new NodeCollection(docElementsArr);
  }

  if( typeof arg === HTMLElement){
    let docElementsArr = [arg];
    return new NodeCollection(docElementsArr);
  }




}


/***/ }),
/* 1 */
/***/ (function(module, exports) {


class NodeCollection{
  constructor(DOMelements){
    this.DOMelements = DOMelements;
  }

  html(str){
    if(str){
      this.DOMelements.forEach((el) =>{
        el.innerHTML = str;
      });
    }else{
      return this.DOMelements[0].innerHTML;
    }
  }

  empty(){
    this.DOMelements.forEach(el =>{
      el.innerHTML = '';
    });
  }

  append(arg){
    if(arg instanceof NodeCollection){
      let newEls = arg.DOMelements;
      newEls.forEach( (newEl) =>{
        this.append(newEl);
      });
    }else{
      this.DOMelements.forEach( (el) =>{
        if (arg instanceof HTMLElement) {
          el.innerHTML += arg.outerHTML;
        }else if (typeof arg === 'string'){
          el.innerHTML += arg;
        }
      });
    }
  }

  addClass(arg){
    if(typeof arg === 'string'){
      this.DOMelements.forEach(el =>{
        el.classList.add(arg);
      });
    }
  }

  removeClass(arg){
    if(typeof arg === 'string'){
      this.DOMelements.forEach(el =>{
        el.classList.remove(arg);
      });
    }
  }

  children(){
    let childs = [];
    this.DOMelements.forEach( (el)=>{
      for(let i = 0; i < el.children.length; i++){
        childs.push(el.children[i]);
      }
    } );
    return new NodeCollection(childs);
  }

  parent(){
    let parents = [];
    this.els.forEach( (el)=>{
      if( !el.parentNode.added ){
        parents.push(el.parentNode);
        el.parentNode.added = true;
      }
    } );
    parents.forEach(parent =>{
      parent.added = false;
    });
    return new NodeCollection(parents);
  }

  find(selector){
    let foundEls = [];
    this.DOMelements.forEach( (el) =>{
      let found = el.querySelectorAll(selector);
      found.forEach( newEl =>{
        foundEls.push(newEl);
      });
    });
    return new NodeCollection(foundEls);
  }



}



module.exports = NodeCollection;


/***/ })
/******/ ]);