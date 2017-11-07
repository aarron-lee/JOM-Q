
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


}



module.exports = NodeCollection;
