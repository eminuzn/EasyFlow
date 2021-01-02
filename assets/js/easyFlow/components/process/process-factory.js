import LinkFactory from "../link/link-factory.js"

export default class ProcessFactory{
  
  processes = []
  linkFactory = null 

  constructor(processes,links){
    this.processes = processes
    
    this.linkFactory = new LinkFactory(links)
  }

  async InitProcesses(){
    
    for(let item of this.processes){
      item.AppendProcess()
    }

    this.linkFactory.InitLinks()
    this.InitDraggable()
    
  }

  InitDraggable(){
    let _this = this

    $(".process-box").draggable({
      cancel: '.noDrag',
      start: function() {
        //do something
      },
      drag: function() {
        _this.linkFactory.ReCalcPositions($(this).attr("process-id"))
      },
      stop: function() {
        let draggedProcess = _this.processes.find(process => process.id == parseInt($(this).attr("process-id")))
        var offset = $(this).offset()
        draggedProcess.posX = offset.left;
        draggedProcess.posY = offset.top;

        _this.UpdateProcess(draggedProcess)
      }
    })
  }


  UpdateProcess(process){
    //Update Db process positions and other things
  }

  AddProcess(process){
    //Add Db process and get id 
    process.id = Math.floor(Math.random() * Math.floor(1000))
    this.processes.push(process)
    process.AppendProcess()
    this.InitDraggable()
  }

  RemoveProcess(process){
    //Remove Db process 
  }

}