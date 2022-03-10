import EasyFlow from "../../easy-flow.js"

export default class Process {
    nodeGuid = null
    type = null
    data = {}
    posX = 0
    posY = 0
    constructor(props) {
        this.typeDetail = EasyFlow.customNodes.find(x => x.type == props.type)
        this.nodeGuid = props.nodeGuid
        this.type = props.type
        this.typeDetail.variables.forEach((item) => {
            this[item.name] = props[item.name]
            if (item.valName)
                this[item.valName] = props[item.valName]
        })
        this.posX = props.posX
        this.posY = props.posY
    }

    DrawProcessHtml() {
        let html = ''
        let nodeTypeDetail = EasyFlow.customNodes.find(x => x.type == this.type);
        html += '<div class="process-box ef-noselect process-' + this.nodeGuid + '" process-id="' + this.nodeGuid + '" style="left:' + this.posX + 'px; top:' + this.posY + 'px;">'
        if (nodeTypeDetail.socketInput == null || nodeTypeDetail.socketInput != false)
            html += '<div class="link-socket-input noDrag" process-id="' + this.nodeGuid + '"></div>'
        html += '<div class="delete-process noDrag" process-id="' + this.nodeGuid + '">x</div>'
        html += this.DrawProcessInnerHtml()

        if (nodeTypeDetail.editable == null || nodeTypeDetail.editable != false)
            html += '<button class="noDrag process-edit bg-gradient-primary black-transition" process-type="' + this.type + '" process-id="' + this.nodeGuid + '">Edit</button>'

        if (nodeTypeDetail.socketOutput == null || nodeTypeDetail.socketOutput != false)
            html += '<div class="link-socket-output noDrag" process-id="' + this.nodeGuid + '"></div>'

        if (this.typeDetail.information) {
            html += '<div class="info-process noDrag"><i class="noDrag">i</i>'
            html += '<div class="noDrag">' + this.typeDetail.information + '</div>'
            html += '</div>'

        }

        html += '</div>'
        return html
    }

    DrawModalHtml() {
        let html = ''
        html += '<h4 style="color: white;font-size: 24px;margin: 5px 0px;">' + this.typeDetail.header.name + ' Düzenle</h4>'

        this.typeDetail.variables.forEach((item) => {
            html += ""
            html += "<input id='nodeGuid' type='hidden' value='" + this.nodeGuid + "'></input>"
            let tempValue = (this[item.name]) ? this[item.name] : ""

            html += '<label style="color:white">' + item.beforeText + '</label>'
            if (item.inputType == "text")
                html += '<input class="ef-form" name="' + item.name + '" placeholder="' + item.beforeText + '" value="' + tempValue + '"/>'
            else if (item.inputType == "textarea")
                html += '<textarea class="ef-form" name="' + item.name + '" placeholder="' + item.beforeText + '">' + tempValue + '</textarea>'
            else if (item.inputType == "select") {
                html += '<select id="' + item.name + '-select" name="' + item.name + '" class="ef-form">'
                item.innerdata.forEach((x) => {
                    let selected = x.id == this[item.valName] ? "selected" : ""
                    html += '<option data-id="' + x.id + '" value="' + x.id + '" ' + selected + '>' + x.sym + '</option>'
                })
                html += '</select>'
            }
        })

        html += '<button class="update-process black-transition">Güncelle</button>'
        return html;
    }

    DrawProcessInnerHtml() {
        let html = ''

        html += '<div class="node-header" style="' + this.typeDetail.header?.style?.join(";") + '">' + this.typeDetail.header?.name + '</div>'

        this.typeDetail.variables.forEach((item) => {
            let tempText = this[item.name] == null ? "" : this[item.name]
            if (item.inputType == "select") {
                let selectedItem = item.innerdata.find(x => x.id == this[item.valName])
                if (selectedItem)
                    tempText = selectedItem?.sym
            }

            html += '<div class="' + item.classes.join(' ') + ' node-variable" variable-id="' + this.nodeGuid + item.name + '" style="--before-content:\'' + item.beforeText + '\'"> ' + tempText + '</div>'
        })

        return html
    }

    AppendProcess() {
        $(".main-flow-box").append(this.DrawProcessHtml())
    }

}