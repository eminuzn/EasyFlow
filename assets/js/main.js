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
          question: 'Example Question',
          text: 'Example Text',
          posX: 500,
          posY: 50
        },
        {
          id: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c",
          type: 'text',
          question: '',
          text: 'Example Text',
          posX: 300,
          posY: 300
        }
      ],
      links: [
        {
          id: "9efb33a9-d1eb-4d37-8637-1faf98fd52e0",
          text: 'Example Link',
          from: "0d7c0925-dbe1-465a-adab-837612ce3c31",
          to: "ae22e0c6-1b3f-4f05-87eb-28ff6936bf8c"
        }
      ],
      onProcessAdded: (process) => {
        //Insert DB or Do something
        console.log("Added process:", process)
      },
      onProcessDragged: (process, links) => {
        //Update DB positions or Do something
        console.log("Dragged process and affected links:", process, links)
      },
      onProcessDeleted: (process, links) => {
        //Update DB positions or Do something
        console.log("Deleted Process and links:", process, links)
      },
      onLinkAdded: (link) => {
        //Insert DB or Do something
        console.log("Added link:", link)
      },
      onLinkUpdated: (link) => {
        //Update DB or Do something
        console.log("Updated link:", link)
      },
      onLinkDeleted: (link) => {
        //Delete DB or Do something
        console.log("Deleted link:", link)
      },
      onProcessUpdated: (process) => {
        //Update DB or Do something
        console.log("Updated Process:", process)
      }
    })
});