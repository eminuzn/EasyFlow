import Link from './link.js';
import Process from './process.js';

export default class Flow{

  processes = []
  links = []

  constructor(_processes){
    this.processes = _processes
  }

  DrawHtml(){
      let html = ''

      html += '<div class="main-flow-box">'
      for(let item of this.processes){
        html += item.DrawProcessHtml()
      }
      html += '</div>' 

      return html
  }

}