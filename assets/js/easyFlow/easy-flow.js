import Flow from './flow.js';

export default class EasyFlow{

  el = null
  flow = new Flow()
  constructor(_el, _flow){
    this.el = _el
    this.flow = _flow

    this.init()
  }

  init(){
    const _flow = this.flow

    $(this.el).html(this.flow.DrawHtml())
    $(".process-box").draggable({
      start: function() {
        //do something
      },
      drag: function() {
        //do something
      },
      stop: function() {
        let draggedProcess = _flow.processes.find(process => process.id == parseInt($(this).attr("process-id")))
        var offset = $(this).offset()
        draggedProcess.posX = offset.left;
        draggedProcess.posY = offset.top;
        draggedProcess.SaveChanges()
      }
    })
  }

}