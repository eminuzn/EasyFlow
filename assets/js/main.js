import EasyFlow from './easyFlow/easy-flow.js';
import Process from './easyFlow/components/process/process.js';

$(function() {
    let flow = new EasyFlow(
      "#example-box",
      [
        new Process({
          id:1,
          type:'question',
          question:'naber',
          text:'example text',
          posX:50,
          posY:50
        }),
        new Process({
          id:2,
          type:'text',
          question:'',
          text:'Deneme Yazı',
          posX:300,
          posY:50
        })
      ]
    )
});