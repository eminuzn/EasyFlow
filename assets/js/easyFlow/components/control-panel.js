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
      $(".easy-flow-add-modal").fadeOut(200)
      $(".link-update-modal").fadeOut(200)
    })

    $(".new-process").click(function(){
      $(".easy-flow-overlay").fadeIn(200)
      $(".easy-flow-add-modal").fadeIn(200)
    })


    $(".add-process").click(function(){

      let process = new Process({
        id:null,
        posX:0,
        posY:0,
        type:$(".easy-flow-add-modal .ef-form.type").val(),
        question:$(".easy-flow-add-modal .ef-form.question").val(),
        text:$(".easy-flow-add-modal .ef-form.text").val()
      })
      _this.processFactory.AddProcess(process)

      $(".easy-flow-overlay").fadeOut(200)
      $(".easy-flow-add-modal").fadeOut(200)
      _this.ClearForms()
    })

    $(".update-link").click(function(){

      let linkid = $(this).parent().attr("link-id");
      _this.processFactory.linkFactory.UpdateLink(linkid)
       $(".easy-flow-overlay").fadeOut(200)
        $(".link-update-modal").fadeOut(200)
        _this.ClearForms()
    })
  }

  ClearForms(){
    $(".easy-flow-add-modal .ef-form.type").val("question")
    $(".easy-flow-add-modal .ef-form.question").val("")
    $(".easy-flow-add-modal .ef-form.text").val("")

    $(".link-update-modal .ef-form.text").val("")
  }

  DrawControlPanel(){
    let html = ''

    html += '<div class="easy-flow-control-panel">'
    html += '<button class="new-process black-transition">New Process</button>'
    html += '</div>'
    html += this.DrawAddModal()

    return html
  }

  DrawAddModal(){
    let html = ''

    html += '<div class="easy-flow-overlay"></div>'
    html += '<div class="easy-flow-add-modal easy-flow-modal">'
    html += '<select class="ef-form type">'
    html += '<option value="question">Question</option>'
    html += '<option value="text">Text</option>'
    html += '</select>'
    html += '<input class="ef-form question" placeholder="Question"/>'
    html += '<input class="ef-form text" placeholder="Text"/>'
    html += '<button class="add-process black-transition">Add</button>'
    html += '</div>'

    html += '<div class="link-update-modal easy-flow-modal">'
    html += '<input class="ef-form text" placeholder="Text"/>'
    html += '<button class="update-link black-transition">Update</button>'
    html += '</div>'

    return html
  }

}