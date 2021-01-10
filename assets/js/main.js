import EasyFlow from './easyFlow/easy-flow.js';
import Process from './easyFlow/components/process/process.js';
import Link from './easyFlow/components/link/link.js';

$(function() {
    let flow = new EasyFlow({
      el: "#example-box",
      processes: [
        {
          id: "0d7c0925-dbe1-465a-adab-837612ce3c31",
          type: 'question',
          question: 'naber',
          text: 'example text',
          posX: 500,
          posY: 50
        },
        {
          id: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c",
          type: 'text',
          question: '',
          text: 'Deneme Yazı',
          posX: 300,
          posY: 300
        }
      ],
      links: [
        {
          id: "9efb33a9-d1eb-4d37-8637-1faf98fd52e0",
          text: 'deneme link 1',
          from: "0d7c0925-dbe1-465a-adab-837612ce3c31",
          to: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c"
        }
      ],
      onProcessAdded: (process) => {
        //Insert DB or Do something
        console.log(process)
      },
      onProcessDragged: (process, links) => {
        //Update DB positions or Do something
        console.log(process, links)
      }
    })
});