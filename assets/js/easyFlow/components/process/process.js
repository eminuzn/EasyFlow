export default class Process{
  id = null
  type = null
  question = ''
  text = ''
  posX = 0
  posY = 0

  constructor({id,type,question,text,posX,posY}){
    this.id=id
    this.type=type
    this.question=question
    this.text=text
    this.posX = posX
    this.posY = posY
  }

  DrawProcessHtml(){
    let html = ''
    html += '<div class="process-box process-'+this.id+'" process-id="'+this.id+'" style="left:'+this.posX+'px; top:'+this.posY+'px;">'
    html += '<div class="link-socket-input noDrag" process-id="'+this.id+'"></div>'
    html += '<div class="delete-process noDrag" process-id="'+this.id+'">x</div>'
    if(this.type === 'question')
    {
      html += '<div class="question-box">'
      html += this.question
      html += '</div>'
    }
    if(this.text !== null || this.text !== '')
    {
      html += '<div class="text-box">'
      html += this.text
      html += '</div>'
    }
    html += '<button class="noDrag process-edit black-transition">Edit</button>'
    html += '<div class="link-socket-output noDrag" process-id="'+this.id+'"></div>'
    html += '</div>'

    return html
  }

  AppendProcess(){
    $(".main-flow-box").append(this.DrawProcessHtml())
  }

}