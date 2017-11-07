
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

$JOM.extend = function(obj, ...args){

  args.forEach( (arg)=>{
    Object.keys(arg).forEach( (key)=>{
      obj[key] = arg[key];
    });
  } );

  return obj;
};

$JOM.ajax = function(options){
  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: "GET",
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    dataType: 'JSON',
  };

  //step 1 - create xhr object
  const xhr = new XMLHttpRequest();

  // step 2 - specify path and verb
            // method    // url
  xhr.open(options.type, options.url );

  // step 3 - register a callback
  xhr.onload = () => {
    if((xhr.status === 200) ){
      // successful call
      options.success(JSON.parse(xhr.response));
    }else if(xhr.status >= 400){
      options.error(JSON.parse(xhr.response));
    }
  };

  // step 4 - send off the request with optional data
  const optionalData = $JOM.extend(defaults, options);
  xhr.send(JSON.stringify(optionalData.data));

};



document.addEventListener("DOMContentLoaded", () => {
  _readyState = true;
  funcQueue.forEach ( (func) => {
    func();
  });
});
