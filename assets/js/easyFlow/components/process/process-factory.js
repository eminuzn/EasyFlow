export default class ProcessFactory{
  
  processes = []

  constructor(processes){
    this.processes = processes
  }

  InitProcesses(){
    
    for(let item of this.processes){
      item.AppendProcess()
    }

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
        //do something
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
    //Add Db process 
  }

}