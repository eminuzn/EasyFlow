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

    let path = this.CalcPath()
    let transform = this.CalcTransform()
    let html = ''

    html += '<g>' 
    html += '<path id="link-'+this.id+'" d="'+path+'" style="stroke: rgb(255, 136, 85);stroke-width: 2.73205;fill:none"></path>'
    html += '<path id="arrow-'+this.id+'" d="M -1 -1 L 0 1 L 1 -1 z" style="stroke: rgb(255, 136, 85);stroke-width: 5.73205;fill: none;" transform="'+transform+'"></path>'
    html += '</g>'
    return html
  }

  CalcPath(){
    let cx = this.startX
    let cy = this.startY
    let ex = this.endX
    let ey = this.endY

    let x1 = cx, y1 = cy + 50, x2 = ex, y2 = ey - 50;
    return `M ${cx}, ${cy} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey}`;
  }

  CalcTransform(){
    let arrowX = this.startX + ((this.endX - this.startX) / 2);
    let arrowY = this.startY + ((this.endY - this.startY) / 2);

    const angle = -Math.atan2(this.endX - this.startX, this.endY - this.startY);
    let degree = angle * 180 / Math.PI;
    degree = degree < 0 ? degree + 360 : degree;

    return `translate(${arrowX}, ${arrowY}) rotate(${degree})`;
  }

  CalcPosition(){
    let mainFlowBoxPosition = $(".main-flow-box").offset()
    let fromPosition = $(".process-"+this.from).offset()
    let fromWith = $(".process-"+this.from).outerWidth()
    let fromHeight = $(".process-"+this.from).outerHeight()

    fromPosition.top = fromPosition.top - mainFlowBoxPosition.top
    fromPosition.left = fromPosition.left - mainFlowBoxPosition.left

    this.startX = fromPosition.left + (fromWith / 2)
    this.startY = fromPosition.top + fromHeight

    if(this.to != null){
      let toPosition = $(".process-"+this.to).offset()
      let toWith = $(".process-"+this.to).outerWidth()
      let toHeight = $(".process-"+this.to).outerHeight()

      toPosition.top = toPosition.top - mainFlowBoxPosition.top
      toPosition.left = toPosition.left - mainFlowBoxPosition.left

      this.endX = toPosition.left + (toWith / 2)
      this.endY = toPosition.top
    }
  }

  UpdatePositions(){
    this.CalcPosition()
    let path = this.CalcPath()
    let transform = this.CalcTransform()

    Pablo("#link-"+this.id).attr("d",path)
    Pablo("#arrow-"+this.id).attr("transform",transform)
  }

  AppendLink(){
    this.CalcPosition()
    Pablo(".link-box").append(this.DrawLinkHtml())
  }
}