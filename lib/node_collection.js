
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
    this.DOMelements.forEach( (el)=>{
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

  remove(selector){
    if(!selector){
      this.DOMelements.forEach(el =>{
        el.parentNode.removeChild(el);
      });
    }else{
      this.find(selector).remove();
    }
  }

  on(eventType, eventCallback) {
    this.DOMelements.forEach( (el) => {
      el.addEventListener(eventType, (arg) => {return eventCallback(arg);} );

      let eventKey = `${eventType}-listener`;
      if( typeof el[eventKey] === "undefined"){
        el[eventKey] = [];
      }
      el[eventKey].push(eventCallback);

    } );
  }

  off(eventType) {
    this.DOMelements.forEach( (el) => {
      let eventKey = `${eventType}-listener`;
      if( typeof el[eventKey] !== "undefined"){
        el[eventKey].forEach( ( el2 ) => {
          el.removeEventListener(eventType, el2);
        } );
      }
      el[eventKey] = [];
    } );
  }



}



module.exports = NodeCollection;
