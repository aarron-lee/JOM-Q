
const NodeCollection = require('./node_collection');


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
