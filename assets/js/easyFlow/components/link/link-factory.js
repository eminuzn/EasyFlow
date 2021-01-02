import Link from "./link.js"

export default class LinkFactory{
  
  links = []
  newLink = new Link({id:'newLink',from:null,to:null,text:''})
  
  constructor(links){
    this.links = links
  }

  InitLinks(){
    for(let item of this.links){
      item.AppendLink()
    }
    this.newLink.AppendLink() 
  }

  ReCalcPositions(processId){
    let effectedLinks = this.links.filter(x=>x.from==parseInt(processId) || x.to==parseInt(processId) )
    
    for(let item of effectedLinks){
      item.UpdatePositions()
    }
  }

  InitLinkable(){

    let _this = this

    $(".link-socket-output").click(function(){
      _this.newLink.from = $(this).attr("process-id")
      
    })

    $(".link-socket-input").click(function(){

      let filteredLink = _this.links.filter(x=>x.from==_this.newLink.from && x.to==parseInt($(this).attr("process-id")))
      if(filteredLink.length == 0)
      {
        let linkToAdd = new Link({
          id:Math.floor(Math.random() * Math.floor(1000)),
          from:_this.newLink.from,
          to: $(this).attr("process-id"),
          text: ''
        })
        
        _this.AddLink(linkToAdd)

      }
      _this.newLink.from = null
      _this.newLink.UpdatePositions()
    })

    
    $(".link-box").filter(":not(.link-socket-input)").click(function(){
      _this.newLink.from = null
      _this.newLink.UpdatePositions()
    })

    $(window).mousemove(function(event){
      if(_this.newLink.from!==null){
        _this.newLink.UpdatePositions(event)
      }
    })
  }


  AddLink(link){
    this.links.push(link)
    link.AppendLink()
  }

}