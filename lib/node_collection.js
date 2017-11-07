
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
      parents.push(el.parentNode);
    } );
    return new DOMNodeCollection(parents);
  }



}



module.exports = NodeCollection;
