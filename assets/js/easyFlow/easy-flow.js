import ControlPanel from './components/control-panel.js';
import ProcessFactory from './components/process/process-factory.js';

export default class EasyFlow{

  el = null
  controlPanel = null
  processFactory = null
  links = null

  constructor(_el, processes){
    this.el = _el
    this.processFactory = new ProcessFactory(processes)
    this.controlPanel = new ControlPanel(this.processFactory)
    this.init()
  }

  init(){
    const temp = this
    this.controlPanel.InitControlPanel(this.el)
    $(this.el).append(this.DrawFlowHtml())
    this.processFactory.InitProcesses()
  }

  DrawFlowHtml(){
      return '<div class="main-flow-box"></div>' 
  }

  

}