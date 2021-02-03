import EasyFlow from "../../easy-flow.js"
import LinkFactory from "../link/link-factory.js"
import Process from "./process.js"

export default class ProcessFactory{
  
  processes = []
  linkFactory = null 
  OnProcessAdded = function(){}
  OnProcessDragged = function(){}
  onProcessDeleted = function(){}
  onProcessUpdated = function(){}

  constructor(processes,linkFactory, onProcessAdded, onProcessDragged, onProcessDeleted, onProcessUpdated){
    let _this = this
    for(let item of processes){
      _this.processes.push(new Process(item))
    }
    this.linkFactory = linkFactory
    this.OnProcessAdded = onProcessAdded
    this.OnProcessDragged = onProcessDragged
    this.onProcessDeleted = onProcessDeleted
    this.onProcessUpdated = onProcessUpdated
  }

  InitProcesses(){
    
    for(let item of this.processes){
      item.AppendProcess()
    }
    
    this.InitDeletable()
    this.InitDraggable()
    this.InitEditable()
  }

  InitDeletable(){
    let _this = this
     $(".main-flow-box").on("click",".delete-process",function(){
      if(confirm("İşlemi Silmek İstediğinize Emin misiniz?")){
        _this.RemoveProcess($(this).attr("process-id"))
      }
    })
  }

  InitEditable(){
    let _this = this
     $(".main-flow-box").on("click",".process-edit",function(){
        $(".easy-flow-edit-modal").attr("form-type", $(this).attr("process-type"))
        $(".easy-flow-edit-modal").attr("process-id", $(this).attr("process-id"))
        $(".easy-flow-overlay").fadeIn(200)
        $(".easy-flow-edit-modal").fadeIn(200)
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
        _this.UpdateProcessPosition($(this))
      }
    })
  }

  UpdateProcessPosition(processEl){
    
    let draggedProcess = this.processes.find(process => process.id == processEl.attr("process-id"))
    var offset = processEl.offset()

    let mainFlowBoxPosition = $(".main-flow-box").offset()
    draggedProcess.posX = offset.left - mainFlowBoxPosition.left;
    draggedProcess.posY = offset.top - mainFlowBoxPosition.top;

    let effectedLinks = this.linkFactory.ReCalcPositions(draggedProcess.id)

    this.OnProcessDragged(draggedProcess, effectedLinks)
  }

  UpdateProcess(_process){
    let process = this.processes.find(x=>x.id === _process.id)
    process.question = process.type == "question"?_process.question:""
    process.text = _process.text

    if(process.type == "question")
    $('.process-'+process.id).children(".question-box").eq(0).text(process.question)
    $('.process-'+process.id).children(".text-box").eq(0).text(process.text)
    
    this.onProcessUpdated(process)
  }

  AddProcess(process){
    //Add Db process and get id 
    process.id = EasyFlow.GenerateUUID()
    //Math.floor(Math.random() * Math.floor(1000))
    this.processes.push(process)
    process.AppendProcess()
    this.InitDraggable()

    this.OnProcessAdded(process)
  }

  RemoveProcess(processId){
    //Remove Db process 
    let process = this.processes.find(x=>x.id === processId)
    let effectedLinks = []
    if(process != null){
      //call api link delete
      this.processes = this.processes.filter(x=>x.id !== processId)
      $(".process-"+processId).remove()
      effectedLinks = this.linkFactory.links.filter(x=>x.from==processId || x.to==processId )

      for(let item of effectedLinks){
        this.linkFactory.RemoveLink(item.id)
      }

      this.onProcessDeleted(process, effectedLinks)
    }
  }

}