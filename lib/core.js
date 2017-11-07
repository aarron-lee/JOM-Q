
const NodeCollection = require('./node_collection');


window.$JOM = ( arg ) => {

  if( typeof arg === "string"){
    let docElements = document.querySelectorAll(arg);

    let docElementsArr = docElements.map( (el)=>{
      return el;
    });

    return new NodeCollection(docElementsArr);
  }




}
