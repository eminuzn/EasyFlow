import EasyFlow from "../../easy-flow.js"
import LinkFactory from "../link/link-factory.js"
import Process from "./process.js"

export default class ProcessFactory {

    processes = []
    linkFactory = null
    OnProcessAdded = function () { }
    OnProcessDragged = function () { }
    onProcessDeleted = function () { }
    onProcessUpdated = function () { }

    constructor(processes, linkFactory, onProcessAdded, onProcessDragged, onProcessDeleted, onProcessUpdated) {
        let _this = this
        for (let item of processes) {
            _this.processes.push(new Process(item))
        }
        this.linkFactory = linkFactory
        this.OnProcessAdded = onProcessAdded
        this.OnProcessDragged = onProcessDragged
        this.onProcessDeleted = onProcessDeleted
        this.onProcessUpdated = onProcessUpdated
    }

    InitProcesses() {
        for (let item of this.processes) {
            item.AppendProcess()
        }
        this.InitDeletable()
        this.InitInfoToggle()
        this.InitDraggable()
        this.InitEditable()
    }

    InitInfoToggle() {
        $(".main-flow-box").on("click", ".info-process", function () {
            $(this).children("div").eq(0).toggle()
        })
    }

    InitDeletable() {
        let _this = this
        $(".main-flow-box").on("click", ".delete-process", function () {
            if (confirm("İşlemi Silmek İstediğinize Emin misiniz?")) {
                _this.RemoveProcess($(this).attr("process-id"))
            }
        })
    }

    InitEditable() {
        let _this = this
        $(".main-flow-box").on("click", ".process-edit", function () {
            let processType = $(this).attr("process-type")
            let processId = $(this).attr("process-id")
            let selectedProcess = _this.processes.find(x => x.nodeGuid == processId)

            if (selectedProcess) {
                $(".easy-flow-edit-modal").html(selectedProcess.DrawModalHtml())

                selectedProcess.typeDetail.variables.filter(x => x.inputType == "select").forEach((item) => {
                    $(".easy-flow-edit-modal select[name='" + item.name + "']").select2()
                })

                $(".easy-flow-edit-modal[type='" + processType + "']").attr("form-type", processType)
                $(".easy-flow-edit-modal[type='" + processType + "']").attr("process-id", processId)
                $(".easy-flow-overlay").fadeIn(200)
                $(".easy-flow-edit-modal").fadeIn(200)
            }
        })
    }

    InitDraggable() {
        let isDrawing = false
        let drawingProcess = null;

        window.addEventListener('mousedown', e => {
            if ((e.target.matches('.process-box') || e.target.matches('.process-box div')) && !e.target.matches('.noDrag')) {
                drawingProcess = e.target
                if (!e.target.matches('.process-box')) {
                    drawingProcess = e.target.closest('.process-box')
                }
                this.x = (e.clientX / EasyFlow.zoomFactor) - drawingProcess.offsetLeft
                this.y = (e.clientY / EasyFlow.zoomFactor) - drawingProcess.offsetTop
                isDrawing = true
            }
        });
        window.addEventListener('mousemove', e => {

            if (isDrawing === true) {
                this.MoveProcessBox(drawingProcess)
                this.linkFactory.ReCalcPositions(drawingProcess.getAttribute("process-id"))
            }
        });
        window.addEventListener('mouseup', e => {
            if (isDrawing === true) {
                this.MoveProcessBox(drawingProcess)
                this.UpdateProcessPosition($(".process-box[process-id='" + drawingProcess.getAttribute("process-id") + "']"))
                isDrawing = false
                drawingProcess = null
            }
        });
    }

    MoveProcessBox(target) {
        target.style.left = ((event.clientX / EasyFlow.zoomFactor) - this.x) + "px"
        target.style.top = ((event.clientY / EasyFlow.zoomFactor) - this.y) + "px"
    }

    UpdateProcessPosition(processEl) {

        let draggedProcess = this.processes.find(process => process.nodeGuid == processEl.attr("process-id"))
        var offset = processEl.offset()

        let mainFlowBoxPosition = $(".main-flow-box").offset()
        draggedProcess.posX = offset.left - mainFlowBoxPosition.left;
        draggedProcess.posY = offset.top - mainFlowBoxPosition.top;

        let effectedLinks = this.linkFactory.ReCalcPositions(draggedProcess.nodeGuid)

        this.OnProcessDragged(draggedProcess, effectedLinks)
    }

    UpdateProcess(_process) {
        let process = this.processes.find(x => x.nodeGuid === _process.nodeGuid)

        process.typeDetail.variables.forEach((item) => {
            process[item.name] = _process[item.name]
            if (item.valName)
                process[item.valName] = _process[item.valName]

            let tempText = process[item.name]
            if (item.inputType == "select") {
                let selectedItem = item.innerdata.find(x => x.id == process[item.valName])
                if (selectedItem)
                    tempText = selectedItem?.sym
            }
            $("[variable-id='" + process.nodeGuid + item.name + "']").text(tempText)
        })

        this.onProcessUpdated(process)
    }

    AddProcess(process) {
        process.nodeGuid = EasyFlow.GenerateUUID()
        this.processes.push(process)
        process.AppendProcess()
        this.OnProcessAdded(process)
    }

    RemoveProcess(processId) {
        //Remove Db process 
        let process = this.processes.find(x => x.nodeGuid === processId)
        let effectedLinks = []
        if (process != null) {
            //call api link delete
            this.processes = this.processes.filter(x => x.nodeGuid !== processId)
            $(".process-" + processId).remove()
            effectedLinks = this.linkFactory.links.filter(x => x.fromGuid == processId || x.toGuid == processId)

            for (let item of effectedLinks) {
                this.linkFactory.RemoveLink(item.linkGuid)
            }

            this.onProcessDeleted(process, effectedLinks)
        }
    }

}