import EasyFlow from './easyFlow/easy-flow.js';
import Process from './easyFlow/components/process/process.js';
import Link from './easyFlow/components/link/link.js';


let nodesConfig = [
  {
    header: {
      name: "Akış Başlat",
      style: [
        "background: var(--purple-500)"
      ]
    },
    type: "start",
    editable: false,
    socketInput: false,
    variables: []
  },
  {
    header: {
      name: "Soru",
      style: [
        "background: var(--orange-500)"
      ]
    },
    type: "question",
    variables: [
      {
        name: "question",
        defaultValue: "Deneme Soru",
        beforeText: "Soru :",
        inputType: "text",
        displayTag: "div",
        classes: ["question-box"]
      },
      {
        name: "text",
        defaultValue: "",
        beforeText: "Bilgilendirme :",
        inputType: "textarea",
        displayTag: "div",
        classes: ["text-box"]
      }
    ]
  },
  {
    header: {
      name: "Bilgilendirme",
      style: [
        "background: var(--green-500)"
      ]
    },
    type: "text",
    variables: [
      {
        name: "text",
        defaultValue: "",
        beforeText: "Bilgilendirme :",
        inputType: "textarea",
        displayTag: "div",
        classes: ["text-box"]
      },
      {
        name: "urlLabel",
        defaultValue: "",
        beforeText: "Url Metni :",
        inputType: "text",
        displayTag: "a",
        linkVariable: "url",
        classes: ["url-text-box"]
      },
      {
        name: "url",
        defaultValue: "",
        beforeText: "Url :",
        inputType: "text",
        displayTag: null,
        classes: ["url-box"]
      }
    ]
  }
];


$(function () {
  let flow = new EasyFlow({
    el: "#example-box",
    customNodes: nodesConfig,
    processes: [
      {
        nodeGuid: "29636b98-a136-4263-a2ec-7bfd1627b869",
        type: 'start',
        posX: 500,
        posY: 25
      },
      {
        nodeGuid: "1c74b0f5-821c-4464-a1c6-9652e0dbf49a",
        type: 'question',
        question: 'Example Question',
        text: 'Example Text',
        posX: 500,
        posY: 200
      },
      {
        nodeGuid: "839a671b-aefb-438e-a7f6-c7a90ab13c59",
        type: 'text',
        question: '',
        text: 'Example Text',
        posX: 200,
        posY: 600
      },
      {
        nodeGuid: "47a3dce2-7c1a-4e11-9595-157ca0577a6f",
        type: 'text',
        question: '',
        text: 'Example Text',
        posX: 800,
        posY: 600
      }
    ],
    links: [
      {
        linkGuid: "93de8395-3486-4dc5-b756-c41e27d93d45",
        fromGuid: "29636b98-a136-4263-a2ec-7bfd1627b869",
        toGuid: "1c74b0f5-821c-4464-a1c6-9652e0dbf49a"
      },
      {
        linkGuid: "81e086bf-a411-41b8-afe2-c1a1ff2b932d",
        text: 'Evet',
        fromGuid: "1c74b0f5-821c-4464-a1c6-9652e0dbf49a",
        toGuid: "839a671b-aefb-438e-a7f6-c7a90ab13c59"
      },
      {
        linkGuid: "b63c9861-6040-43da-9987-7d0e142574f5",
        text: 'Hayır',
        fromGuid: "1c74b0f5-821c-4464-a1c6-9652e0dbf49a",
        toGuid: "47a3dce2-7c1a-4e11-9595-157ca0577a6f"
      }
    ],
    onLoad: () => {
      console.log("EasyFlow is Load")
    },
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
    onProcessUpdated: (process) => {
      //Update DB or Do something
      console.log("Updated Process:", process)
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
    }
  })
});