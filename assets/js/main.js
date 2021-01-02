import EasyFlow from './easyFlow/easy-flow.js';
import Process from './easyFlow/components/process/process.js';
import Link from './easyFlow/components/link/link.js';

$(function() {
    let flow = new EasyFlow(
      "#example-box",
      [
        new Process({
          id:1,
          type:'question',
          question:'naber',
          text:'example text',
          posX:500,
          posY:50
        }),
        new Process({
          id:2,
          type:'text',
          question:'',
          text:'Deneme Yazı',
          posX:300,
          posY:300
        }),
        new Process({
          id:3,
          type:'text',
          question:'',
          text:'qweqweqweqwe',
          posX:600,
          posY:400
        })
      ],
      [
        new Link({
          id:1,
          text:'deneme link 1',
          from:1,
          to:2
        }),
        new Link({
          id:2,
          text:'deneme link 1',
          from:1,
          to:3
        }),
        
        new Link({
          id:3,
          text:'deneme link 1',
          from:2,
          to:3
        })
      ]
    )
});