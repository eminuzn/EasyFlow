import EasyFlow from "../../easy-flow.js"
import Link from "./link.js"

export default class LinkFactory{
  
  links = []
  newLink = new Link({id:'newLink',from:null,to:null,text:''})
  
  constructor(links){
    let _this = this
    links.forEach((item) => _this.links.push(new Link(item)));
  }

  InitLinks(){
    for(let item of this.links){
      item.AppendLink()
    }
    this.newLink.AppendLink() 
    this.InitDeletable()
  }

  AddLink(link){
    this.links.push(link)
    link.AppendLink()
  }

  RemoveLink(linkId){
    let link = this.links.find(x=>x.id === linkId)

    if(link != null){
      //call api link delete
      this.links = this.links.filter(x=>x.id !== linkId)
      $("#link-"+linkId).parent().remove()
    }
  }

  ReCalcPositions(processId){
    let effectedLinks = this.links.filter(x=>x.from==processId || x.to==processId )
    
    for(let item of effectedLinks){
      item.UpdatePositions()
    }

    return effectedLinks
  }

  InitDeletable(){
    let _this = this
    $(".link-box").on("click",".close-x",function(){
      if(confirm("Linki Silmek İstediğinize Emin misiniz?")){
        _this.RemoveLink(parseInt($(this).attr("link-id")))
      }
    })
  }

  InitLinkable(){

    let _this = this
    let outputClickFix = false

    $(".main-flow-box").on("mousedown",".link-socket-output",function(){
      _this.newLink.from = $(this).attr("process-id")
    })

    $(".main-flow-box").on("mouseenter",".link-socket-output",function(){
      outputClickFix = true
    })
    
    $(".main-flow-box").on("mouseleave",".link-socket-output",function(){
      outputClickFix = false
    })

    $(".main-flow-box").on("mousedown", ".link-socket-input", function(){

      let filteredLink = _this.links.filter(x=>x.from==_this.newLink.from && x.to==parseInt($(this).attr("process-id")))
      if(filteredLink.length == 0)
      {
        let linkToAdd = new Link({
          id: EasyFlow.GenerateUUID(),
          from:_this.newLink.from,
          to: $(this).attr("process-id"),
          text: ''
        })
        _this.AddLink(linkToAdd)
      }
      _this.newLink.from = null
      _this.newLink.UpdatePositions()
    })
    
    $("#viewport").mousedown(function(){
      if(outputClickFix === false){
        _this.newLink.from = null
        _this.newLink.UpdatePositions()
      }
    })

    $(window).mousemove(function(event){
      if(_this.newLink.from!==null){
        _this.newLink.UpdatePositions(event)
      }
    })
  }


}