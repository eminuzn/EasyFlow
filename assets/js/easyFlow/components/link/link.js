import EasyFlow from "../../easy-flow.js"
export default class Link {

    linkGuid = null
    text = ''
    fromGuid = null
    toGuid = null
    startX = null
    startY = null
    endX = null
    endY = null

    constructor({ linkGuid, text, fromGuid, toGuid }) {
        this.linkGuid = linkGuid
        this.text = text
        this.fromGuid = fromGuid
        this.toGuid = toGuid
    }

    DrawLinkHtml() {

        let path = '', transform = '', translate = ''
        if (this.fromGuid != null) {
            path = this.CalcPath()
            transform = this.CalcTransform()
            if (this.text != null && this.text.trim() != "") {
                translate = this.CalcTranslate()
            }
        }

        let html = ''
        html += '<g>'
        html += '<path id="link-' + this.linkGuid + '" d="' + path + '" class="link-line" data-text="' + this.text + '" link-id="' + this.linkGuid + '"></path>'
        html += '<path id="arrow-' + this.linkGuid + '" class="arrow" d="M -1 -1 L 0 1 L 1 -1 z" transform="' + transform + '"></path>'
        html += '<text filter="url(#bg-text)" y="-20" class="link-text-' + this.linkGuid + '" style="z-index:7" text-anchor="middle"  transform="' + translate + '">' + this.text + '</text>'
        html += '<text y="-20" class="link-text link-text-' + this.linkGuid + ' ef-noselect" text-anchor="middle" transform="' + translate + '">' + this.text + '</text>'
        html += '<a href="javascript:void(0)" class="close-x" link-id="' + this.linkGuid + '"><path id="remove-link-' + this.linkGuid + '" d="M -5,-5 L 5,5 M 5,-5 L -5,5" transform="' + transform + '" /></a>'
        html += '</g>'
        return html
    }

    UpdateText() {
        $(".link-text-" + this.linkGuid).text(this.text)
        this.UpdatePositions()
    }

    CalcPath() {
        let cx = this.startX
        let cy = this.startY
        let ex = this.endX
        let ey = this.endY
        let x1 = cx, y1 = cy + 60, x2 = ex, y2 = ey - 60;
        return `M ${cx}, ${cy + 15} C ${x1}, ${y1}, ${x2}, ${y2}, ${ex}, ${ey + 15}`;
    }


    CalcTranslate() {
        let arrowX = (this.startX) + (((this.endX - this.startX)) / 3);
        let arrowY = (this.startY) + (((this.endY - this.startY)) / 3) + (14);

        return `translate(${arrowX}, ${arrowY})`
    }

    CalcRotate() {
        const angle = -Math.atan2((this.endX - this.startX), (this.endY - this.startY));
        let degree = angle * 180 / Math.PI;
        degree = degree < 0 ? degree + 360 : degree;

        return `rotate(${degree})`
    }

    CalcTransform() {
        return `${this.CalcTranslate()} ${this.CalcRotate()}`;
    }

    CalcPosition(mousePos = null) {

        if (this.fromGuid != null) {
            let mainFlowBoxPosition = $(".main-flow-box").offset()
            let fromPosition = $(".process-" + this.fromGuid).offset()
            let fromWith = $(".process-" + this.fromGuid).outerWidth()
            let fromHeight = $(".process-" + this.fromGuid).outerHeight()

            fromPosition.top = fromPosition.top - mainFlowBoxPosition.top
            fromPosition.left = fromPosition.left - mainFlowBoxPosition.left

            this.startX = fromPosition.left + (fromWith / 2)
            this.startY = fromPosition.top + fromHeight - 5

            if (this.linkGuid != 'newLink') {
                let toPosition = $(".process-" + this.toGuid).offset()
                let toWith = $(".process-" + this.toGuid).outerWidth()

                toPosition.top = toPosition.top - mainFlowBoxPosition.top
                toPosition.left = toPosition.left - mainFlowBoxPosition.left

                this.endX = toPosition.left + (toWith / 2)
                this.endY = toPosition.top - 20
            }
            else {
                this.endX = (mousePos.pageX / EasyFlow.zoomFactor) - mainFlowBoxPosition.left
                this.endY = (mousePos.pageY / EasyFlow.zoomFactor) - mainFlowBoxPosition.top
            }
        }
        else {
            this.startX = null
            this.startY = null
            this.endX = null
            this.endY = null
        }
    }

    UpdatePositions(mousePos = null) {
        this.CalcPosition(mousePos)

        let path = '', transform = '', translate = ''
        if (this.fromGuid != null) {
            path = this.CalcPath()
            transform = this.CalcTransform()
            if (this.text != null && this.text.trim() != "") {
                translate = this.CalcTranslate()
            }
        }

        Pablo("#link-" + this.linkGuid).attr("d", path)
        Pablo("#arrow-" + this.linkGuid).attr("transform", transform)
        Pablo("#remove-link-" + this.linkGuid).attr("transform", transform)
        Pablo(".link-text-" + this.linkGuid).attr("transform", translate)
    }

    AppendLink() {
        if (($(".process-" + this.fromGuid).length > 0 && $(".process-" + this.toGuid).length > 0) || this.linkGuid == 'newLink') {

            if (this.fromGuid != this.toGuid || this.linkGuid == 'newLink') {
                this.CalcPosition()
                Pablo(".link-box").append(this.DrawLinkHtml())
            }
            else {
                alert("flowu direkt kendine bağlayamazsınız")
            }
        }
    }
}