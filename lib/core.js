
const NodeCollection = require('./node_collection');
const funcQueue = [];
var _readyState = false;

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

  if (typeof arg === 'function') {
    if ( !_readyState ) {
      funcQueue.push(arg);
    } else {
      arg();
    }
  }


}



document.addEventListener("DOMContentLoaded", () => {
  _readyState = true;
  funcQueue.forEach ( (func) => {
    func();
  });
});
