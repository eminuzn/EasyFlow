import ControlPanel from './components/control-panel.js';
import LinkFactory from './components/link/link-factory.js';
import ProcessFactory from './components/process/process-factory.js';

export default class EasyFlow{

  el = null
  controlPanel = null
  processFactory = null
  links = null

  constructor(_el, processes, links){
    this.el = _el
    this.processFactory = new ProcessFactory(processes, links)
    this.controlPanel = new ControlPanel(this.processFactory)
    this.init()
  }

  async init(){
    const temp = this
    this.controlPanel.InitControlPanel(this.el)
    $(this.el).append(this.DrawFlowHtml())
    this.processFactory.InitProcesses()

    var infinitedrag = jQuery.infinitedrag("#wall", {}, {
      width: 100,
      height: 100,
      start_col: 0,
      start_row: 0
    });
  }

  DrawFlowHtml(){
    let html = ''
    html += '<div id="viewport">'
    html += '<div id="wall">'
    html += '<div class="main-flow-box">'
    html += '<svg class="link-box"></svg>'
    html += '</div>'
    html += '</div>'
    html += '</div>'
    return html
  }

  static GenerateUUID(){
    var seed = Date.now();
    if (window.performance && typeof window.performance.now === "function") {
        seed += performance.now();
    }

    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (seed + Math.random() * 16) % 16 | 0;
        seed = Math.floor(seed/16);

        return (c === 'x' ? r : r & (0x3|0x8)).toString(16);
    });

    return uuid;
}

  

}