export default class LinkFactory{
  
  links = []

  constructor(links){
    this.links = links
  }

  InitLinks(){
    for(let item of this.links){
      item.AppendLink()
    }
    
  }

  ReCalcPositions(processId){
    let effectedLinks = this.links.filter(x=>x.from==parseInt(processId) || x.to==parseInt(processId) )
    
    for(let item of effectedLinks){
      item.UpdatePositions()
    }
  }


}