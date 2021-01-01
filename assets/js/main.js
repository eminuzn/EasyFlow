import EasyFlow from './easyFlow/easy-flow.js';
import Flow from './easyFlow/flow.js';
import Process from './easyFlow/process.js';

$(function() {
    console.log( "ready!" );

    let flow = new EasyFlow(
      "#example-box",
      new Flow([
        new Process({
          id:1,
          type:'question',
          question:'naber',
          text:'example text',
          posX:50,
          posY:20
        }),
        new Process({
          id:2,
          type:'text',
          question:'',
          text:'Deneme Yazı',
          posX:100,
          posY:100
        })
      ])
    )

    

});