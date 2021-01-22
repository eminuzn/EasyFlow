import EasyFlow from "../easy-flow.js"
import ProcessFactory from "./process/process-factory.js"
import Process from "./process/process.js"

export default class ControlPanel{

  processFactory = null

  constructor(processFactory){
    this.processFactory=processFactory
  }

  InitControlPanel(el){
    let _this = this
    $(el).append(this.DrawControlPanel())
    
    $(".easy-flow-overlay").click(function(){
      $(".easy-flow-overlay").fadeOut(200)
      $(".easy-flow-edit-modal").fadeOut(200)
      $(".link-update-modal").fadeOut(200)
    })

    $(".new-question").click(function(){
      _this.AddProcess("question")
    })

    $(".new-text").click(function(){
      _this.AddProcess("text")
    })

    $(".update-link").click(function(){
      let linkid = $(this).parent().attr("link-id");
      _this.processFactory.linkFactory.UpdateLink(linkid)
      $(".easy-flow-overlay").fadeOut(200)
      $(".link-update-modal").fadeOut(200)
      _this.ClearForms()
    })

    $(".update-process").click(function(){

      let type = $(this).parent().attr("form-type")
      let process = new Process({
        id: $(this).parent().attr("process-id"),
        question: type == "question"?$(this).parent().children(".ef-form.question").val():"",
        text: $(this).parent().children(".ef-form.text").val()
      })
      _this.processFactory.UpdateProcess(process)

      $(".easy-flow-overlay").fadeOut(200)
      $(".easy-flow-edit-modal").fadeOut(200)
      _this.ClearForms()
    })


  }

  AddProcess(type){
    let process = new Process({
        id: null,
        posX: 0,
        posY: 0,
        type: type,
        question: type == "question"?"question":"",
        text: "text"
    })
    this.processFactory.AddProcess(process)
  }

  ClearForms(){
    $(".easy-flow-edit-modal .ef-form.question").val("")
    $(".easy-flow-edit-modal .ef-form.text").val("")
    $(".link-update-modal .ef-form.text").val("")
  }

  DrawControlPanel(){
    let html = ''

    html += '<div class="easy-flow-control-panel">'
    html += '<button class="new-question black-transition">New Question</button>'
    html += '<button class="new-text black-transition">New Text</button>'
    html += '</div>'
    html += this.DrawAddModal()

    return html
  }

  DrawAddModal(){
    let html = ''

    html += '<div class="easy-flow-overlay"></div>'
    html += '<div class="easy-flow-edit-modal easy-flow-modal">'
    // html += '<select class="ef-form type">'
    // html += '<option value="question">Question</option>'
    // html += '<option value="text">Text</option>'
    // html += '</select>'
    html += '<input class="ef-form question" placeholder="Question"/>'
    html += '<input class="ef-form text" placeholder="Text"/>'
    html += '<button class="update-process black-transition">Update</button>'
    html += '</div>'

    html += '<div class="link-update-modal easy-flow-modal">'
    html += '<input class="ef-form text" placeholder="Text"/>'
    html += '<button class="update-link black-transition">Update</button>'
    html += '</div>'

    return html
  }

}