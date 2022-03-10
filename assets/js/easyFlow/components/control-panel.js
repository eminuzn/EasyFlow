import EasyFlow from "../easy-flow.js"
import ProcessFactory from "./process/process-factory.js"
import Process from "./process/process.js"

export default class ControlPanel {

    processFactory = null

    constructor(processFactory) {
        this.processFactory = processFactory
    }

    InitControlPanel(el) {
        let _this = this
        $(el).append(this.DrawControlPanel())

        $(".easy-flow-overlay").click(function () {
            $(".easy-flow-overlay").fadeOut(200)
            $(".easy-flow-edit-modal").fadeOut(200)
            $(".link-update-modal").fadeOut(200)
        })

        $(".new-process").click(function () {
            _this.AddProcess($(this).attr("type"))
        })

        $(".update-link").click(function () {
            let linkid = $(this).parent().attr("link-id");
            _this.processFactory.linkFactory.UpdateLink(linkid)
            $(".easy-flow-overlay").fadeOut(200)
            $(".link-update-modal").fadeOut(200)
            _this.ClearForms()
        })

        $(".easy-flow-edit-modal").on("click", ".update-process", function () {
            let process = _this.GetUpdatedProcessData(this)

            _this.processFactory.UpdateProcess(process)
            _this.processFactory.linkFactory.ReCalcPositions(process.id)

            $(".easy-flow-overlay").fadeOut(200)
            $(".easy-flow-edit-modal").fadeOut(200)
            _this.ClearForms()
        })
    }

    GetUpdatedProcessData(el) {
        let updatedProcess = this.processFactory.processes.find(x => x.nodeGuid == $("#nodeGuid").val())
        let updateData = {
            nodeGuid: updatedProcess.nodeGuid,
            type: updatedProcess.type
        }
        updatedProcess.typeDetail.variables.forEach((item) => {
            if (item.inputType == "select") {
                updateData[item.name] = $(".ef-form[name='" + item.name + "'] option:selected").text()
                updateData[item.valName] = $(".ef-form[name='" + item.name + "']").val()
            } else {
                updateData[item.name] = $(".ef-form[name='" + item.name + "']").eq(0).val()
            }
        })

        return new Process(updateData)
    }

    AddProcess(type) {

        let mainFlowBoxleft = $(".main-flow-box").css("left")
        let mainFlowBoxTop = $(".main-flow-box").css("top")
        console.log(mainFlowBoxleft, mainFlowBoxTop)
        let process = new Process({
            nodeGuid: null,
            posX: 0 - mainFlowBoxleft.replace("px", ""),
            posY: 0 - mainFlowBoxTop.replace("px", ""),
            type: type,
            question: type == "question" ? "Örnek Soru" : "",
            category: type == "category" ? "Kategori Seçiniz" : "",
            text: type == "text" ? "Örnek Bilgilendirme" : "",
            postBeforeRequest: "",
            postErrorRequest: ""
        })
        this.processFactory.AddProcess(process)
    }

    ClearForms() {
        $(".easy-flow-edit-modal .ef-form.question").val("")
        $(".easy-flow-edit-modal .ef-form.text").val("")
        $(".link-update-modal .ef-form.text").val("")
    }

    DrawControlPanel() {
        let html = ''
        html += '<div class="easy-flow-control-panel">'

        EasyFlow.customNodes.filter(x => !x.type.endsWith("Service") && !x.type.endsWith("Table") && !x.type.endsWith("IFrame")).forEach((item) => {
            html += '<button class="new-process black-transition" type="' + item.type + '">Yeni ' + item.header.name + '</button>'
        })


        html += '</div>'
        html += this.DrawUpdateModal()
        return html
    }

    DrawUpdateModal() {
        let html = ''

        //overlay
        html += '<div class="easy-flow-overlay"></div>'

        //Dynamic düzenleme modalı
        html += '<div class="easy-flow-edit-modal easy-flow-modal" type="">'
        html += '</div>'

        //Link Update Modal
        html += '<div class="link-update-modal easy-flow-modal">'
        html += '<input class="ef-form text" placeholder="Text"/>'
        html += '<button class="update-link black-transition">Update</button>'
        html += '</div>'

        return html
    }

}