import EasyFlow from "../../easy-flow.js"
import LinkFactory from "../link/link-factory.js"

export default class ProcessFactory{
  
  processes = []
  linkFactory = null 

  constructor(processes,links){
    this.processes = processes
    this.linkFactory = new LinkFactory(links)
  }

  InitProcesses(){
    
    for(let item of this.processes){
      item.AppendProcess()
    }

    this.linkFactory.InitLinks()
    this.InitDraggable()
    
    this.linkFactory.InitLinkable()
    this.InitDeletable()
  }

  InitDeletable(){
    let _this = this
     $(".main-flow-box").on("click",".delete-process",function(){
      if(confirm("İşlemi Silmek İstediğinize Emin misiniz?")){
        _this.RemoveProcess(parseInt($(this).attr("process-id")))
      }
    })
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
        _this.UpdateProcess($(this))
      }
    })
  }

  UpdateProcess(processEl){
    //Update Db process positions and other things
    let draggedProcess = this.processes.find(process => process.id == processEl.attr("process-id"))
    var offset = processEl.offset()

    let mainFlowBoxPosition = $(".main-flow-box").offset()
    draggedProcess.posX = offset.left - mainFlowBoxPosition.left;
    draggedProcess.posY = offset.top - mainFlowBoxPosition.top;

    this.linkFactory.ReCalcPositions(draggedProcess.id)
  }

  AddProcess(process){
    //Add Db process and get id 
    process.id = EasyFlow.GenerateUUID()
    //Math.floor(Math.random() * Math.floor(1000))
    this.processes.push(process)
    process.AppendProcess()
    this.InitDraggable()
  }

  RemoveProcess(processId){
    //Remove Db process 
    console.log(processId)

    let process = this.processes.find(x=>x.id === processId)

    if(process != null){
      //call api link delete
      this.processes = this.processes.filter(x=>x.id !== processId)
      $(".process-"+processId).remove()
      let effectedLinks = this.linkFactory.links.filter(x=>x.from==parseInt(processId) || x.to==parseInt(processId) )

      for(let item of effectedLinks){
        this.linkFactory.RemoveLink(item.id)
      }
    }
  }

}