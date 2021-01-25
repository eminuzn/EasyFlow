export default class Link{

  id = null
  text = ''
  from = null
  to = null
  startX = null
  startY = null
  endX = null
  endY = null

  constructor({id,text,from,to}){
    this.id = id
    this.text = text
    this.from = from
    this.to = to
  }

  DrawLinkHtml(){
    
    let path = '',transform='',translate=''
    if(this.from != null){
      path = this.CalcPath()
      transform = this.CalcTransform()
      if(this.text != null && this.text.trim() != ""){
        translate = this.CalcTranslate()
      }
    }

    let html = ''
    html += '<g>' 
    html += '<path id="link-'+this.id+'" d="'+path+'" class="link-line" data-text="'+this.text+'" link-id="'+this.id+'"></path>'
    html += '<path id="arrow-'+this.id+'" class="arrow" d="M -1 -1 L 0 1 L 1 -1 z" transform="'+transform+'"></path>'
    html += '<text filter="url(#bg-text)" y="-20" class="link-text-'+this.id+'" style="z-index:7" text-anchor="middle"  transform="'+translate+'">'+this.text+'</text>'
    html += '<text y="-20" class="link-text link-text-'+this.id+'" text-anchor="middle" transform="'+translate+'">'+this.text+'</text>'
    html += '<a href="javascript:void(0)" class="close-x" link-id="'+this.id+'"><path id="remove-link-'+this.id+'" d="M -5,-5 L 5,5 M 5,-5 L -5,5" transform="'+transform+'" /></a>'
    html += '</g>'
    return html
  }

  UpdateText(){
    $(".link-text-"+this.id).text(this.text)
    this.UpdatePositions()
  }

  CalcPath(){
    let cx = this.startX
    let cy = this.startY
    let ex = this.endX
    let ey = this.endY
    let x1 = cx, y1 = cy + 50, x2 = ex, y2 = ey - 50;
    return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
  }


  CalcTranslate(){
    let arrowX = this.startX + ((this.endX - this.startX) / 3);
    let arrowY = this.startY + ((this.endY - this.startY) / 3) + 8;

    return `translate(${arrowX}, ${arrowY})`
  }

  CalcRotate(){
    const angle = -Math.atan2(this.endX - this.startX, this.endY - this.startY);
    let degree = angle * 180 / Math.PI;
    degree = degree < 0 ? degree + 360 : degree;

    return `rotate(${degree})`
  }

  CalcTransform(){
    return `${this.CalcTranslate()} ${this.CalcRotate()}`;
  }

  CalcPosition(mousePos = null){

    if(this.from!=null){
      let mainFlowBoxPosition = $(".main-flow-box").offset()
      let fromPosition = $(".process-"+this.from).offset()
      let fromWith = $(".process-"+this.from).outerWidth()
      let fromHeight = $(".process-"+this.from).outerHeight()

      fromPosition.top = fromPosition.top - mainFlowBoxPosition.top
      fromPosition.left = fromPosition.left - mainFlowBoxPosition.left

      this.startX = fromPosition.left + (fromWith / 2)
      this.startY = fromPosition.top + fromHeight - 5

      if(this.id != 'newLink'){
        let toPosition = $(".process-"+this.to).offset()
        let toWith = $(".process-"+this.to).outerWidth()

        toPosition.top = toPosition.top - mainFlowBoxPosition.top
        toPosition.left = toPosition.left - mainFlowBoxPosition.left

        this.endX = toPosition.left + (toWith / 2)
        this.endY = toPosition.top -20
      }
      else{
        this.endX = mousePos.pageX - mainFlowBoxPosition.left
        this.endY = mousePos.pageY - mainFlowBoxPosition.top
      }
    }
    else{
      this.startX = null
      this.startY = null
      this.endX = null
      this.endY = null
    }
  }

  UpdatePositions(mousePos = null){
    this.CalcPosition(mousePos)
    
    let path = '',transform='',translate=''
    if(this.from != null){
      path = this.CalcPath()
      transform = this.CalcTransform()
      if(this.text != null && this.text.trim() != ""){
        translate = this.CalcTranslate()
      }
    }

    Pablo("#link-"+this.id).attr("d", path)
    Pablo("#arrow-"+this.id).attr("transform", transform)
    Pablo("#remove-link-"+this.id).attr("transform", transform)
    Pablo(".link-text-"+this.id).attr("transform", translate)
  }

  AppendLink(){
    if(($(".process-"+this.from).length > 0 && $(".process-"+this.to).length > 0) || this.id == 'newLink'){
      
      if(this.from != this.to || this.id == 'newLink'){
        this.CalcPosition()
        Pablo(".link-box").append(this.DrawLinkHtml())
      }
      else{
        alert("flowu direkt kendine bağlayamazsınız")
      }
    
    }
    
  }
}