import ControlPanel from './components/control-panel.js';
import LinkFactory from './components/link/link-factory.js';
import ProcessFactory from './components/process/process-factory.js';

export default class EasyFlow {

    static zoomFactor = 1
    static customNodes = []
    el = null
    controlPanel = null
    processFactory = null
    linkFactory = null
    x = 0
    y = 0

    constructor({ el, processes = [], links = [], customNodes=[], onProcessAdded = () => { }, onProcessDragged = () => { }, onProcessDeleted = () => { }, onLinkAdded = () => { }, onLinkUpdated = () => { }, onLinkDeleted = () => { }, onProcessUpdated = () => { }, onLoad = () => { } }) {
        this.el = el
        EasyFlow.customNodes = customNodes
        this.linkFactory = new LinkFactory(links, onLinkAdded, onLinkUpdated, onLinkDeleted)
        this.processFactory = new ProcessFactory(processes, this.linkFactory, onProcessAdded, onProcessDragged, onProcessDeleted, onProcessUpdated)
        this.controlPanel = new ControlPanel(this.processFactory)
        this.init()
        onLoad();
    }

    async init() {
        $(this.el).addClass("easy-flow-container")
        this.controlPanel.InitControlPanel(this.el)
        $(this.el).append(this.DrawFlowHtml())
        this.InitBoardDrag()
        this.processFactory.InitProcesses()
        this.linkFactory.InitLinks()
        this.InıtBoardZoom()
    }

    InitBoardDrag() {

        let wall = document.querySelector(this.el + " #wall")
        let isDrawing = false

        wall.addEventListener('mousedown', e => {
            if (e.target !== e.currentTarget && !e.target.matches(".link-box"))
                return;
            let mainBox = document.querySelector(this.el + " .main-flow-box")

            this.x = (e.clientX / EasyFlow.zoomFactor) - mainBox.offsetLeft
            this.y = (e.clientY / EasyFlow.zoomFactor) - mainBox.offsetTop

            isDrawing = true
        });

        wall.addEventListener('mousemove', e => {
            if (e.target !== e.currentTarget && !e.target.matches(".link-box"))
                return;
            if (isDrawing === true) {
                this.MoveMainBox(e)
            }
        });

        window.addEventListener('mouseup', e => {
            if (isDrawing === true) {
                this.MoveMainBox(e)
                isDrawing = false
            }
        });
    }

    InıtBoardZoom() {
        let wall = document.querySelector(this.el + " #wall")
        wall.addEventListener('wheel', function (e) {
            var dir;
            if (!e.ctrlKey) {
                return;
            }
            e.preventDefault();
            dir = (e.deltaY < 0) ? 0.05 : -0.05
            EasyFlow.zoomFactor += dir;
            $('.main-flow-box').css("zoom", EasyFlow.zoomFactor)
            return;
        });
    }

    MoveMainBox(mousePos) {
        let mainBox = document.querySelector(this.el + " .main-flow-box")
        mainBox.style.left = ((event.clientX / EasyFlow.zoomFactor) - this.x) + "px"
        mainBox.style.top = ((event.clientY/ EasyFlow.zoomFactor) - this.y) + "px"
    }

    DrawFlowHtml() {
        let html = ''
        html += '<div id="viewport">'
        html += '<div id="wall">'
        html += '<div class="main-flow-box" style="zoom:1">'
        html += '<svg class="link-box"><defs><filter x="0" y="0" width="1" height="1" id="bg-text"><feFlood flood-color="white"/><feComposite in="SourceGraphic" operator="xor" /></filter></defs>'
        html += '</svg>'
        html += '</div>'
        html += '</div>'
        html += '</div>'
        return html
    }

    static GenerateUUID() {
        var seed = Date.now();
        if (window.performance && typeof window.performance.now === "function") {
            seed += performance.now();
        }

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (seed + Math.random() * 16) % 16 | 0;
            seed = Math.floor(seed / 16);

            return (c === 'x' ? r : r & (0x3 | 0x8)).toString(16);
        });

        return uuid;
    }



}