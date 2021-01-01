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
    html += '<div class="process-box" process-id="'+this.id+'" style="left:'+this.posX+'px; top:'+this.posY+'px;">'
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
    html += '</div>'

    return html
  }

  SaveChanges(){
    //Update Db process positions and other things
  }

}