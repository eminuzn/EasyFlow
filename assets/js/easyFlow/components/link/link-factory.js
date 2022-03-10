import EasyFlow from "../../easy-flow.js"
import Link from "./link.js"

export default class LinkFactory {

    links = []
    newLink = new Link({ linkGuid: 'newLink', fromGuid: null, toGuid: null, text: '' })
    onLinkAdded = function () { }
    onLinkUpdated = function () { }
    onLinkDeleted = function () { }

    constructor(links, onLinkAdded, onLinkUpdated, onLinkDeleted) {
        let _this = this

        for (let item of links) {
            _this.links.push(new Link(item))
        }
        this.onLinkAdded = onLinkAdded
        this.onLinkUpdated = onLinkUpdated
        this.onLinkDeleted = onLinkDeleted
    }

    InitLinks() {
        for (let item of this.links) {
            item.AppendLink()
        }
        this.newLink.AppendLink()
        this.InitDeletable()
        this.InitUpdatable()
        this.InitLinkable()
    }

    AddLink(link) {
        this.links.push(link)
        link.AppendLink()

        this.onLinkAdded(link)
    }

    UpdateLink(linkid) {
        let link = this.links.find(x => x.linkGuid == linkid)

        if (link) {
            link.text = $(".link-update-modal .ef-form.text").val()
            link.UpdateText()
            this.onLinkUpdated(link)
        }
    }

    RemoveLink(linkId) {
        let link = this.links.find(x => x.linkGuid === linkId)

        if (link != null) {
            //call api link delete
            this.links = this.links.filter(x => x.linkGuid !== linkId)
            $("#link-" + linkId).parent().remove()

            this.onLinkDeleted(link)
        }
    }

    ReCalcPositions(processId) {
        let effectedLinks = this.links.filter(x => x.fromGuid == processId || x.toGuid == processId)

        for (let item of effectedLinks) {
            item.UpdatePositions()
        }

        return effectedLinks
    }

    InitDeletable() {
        let _this = this
        $(".link-box").on("click", ".close-x", function () {
            if (confirm("Linki Silmek İstediğinize Emin misiniz?")) {
                _this.RemoveLink($(this).attr("link-id"))
            }
        })
    }


    InitUpdatable() {
        let _this = this
        $(".link-box").on("click", ".link-line", function () {
            let linkText = $(this).parent().children(".link-text").eq(0).text();
            $(".link-update-modal .ef-form.text").val(linkText ? linkText : "")
            $(".link-update-modal").attr("link-id", $(this).attr("link-id"))
            $(".easy-flow-overlay").fadeIn(200)
            $(".link-update-modal").fadeIn(200)
            $(".link-update-modal .ef-form.text").focus()
        })
    }

    InitLinkable() {

        let _this = this
        let outputClickFix = false

        $(".main-flow-box").on("mousedown", ".link-socket-output", function () {
            _this.newLink.fromGuid = $(this).attr("process-id")
        })

        $(".main-flow-box").on("mouseenter", ".link-socket-output", function () {
            outputClickFix = true
        })

        $(".main-flow-box").on("mouseleave", ".link-socket-output", function () {
            outputClickFix = false
        })

        $(".main-flow-box").on("mouseup", ".link-socket-input", function () {

            if (_this.newLink.fromGuid != null) {
                let filteredLink = _this.links.filter(x => x.from == _this.newLink.fromGuid && x.toGuid == $(this).attr("process-id"))
                console.log($(this).attr("process-id"))
                if (filteredLink.length == 0) {
                    let linkToAdd = new Link({
                        linkGuid: EasyFlow.GenerateUUID(),
                        fromGuid: _this.newLink.fromGuid,
                        toGuid: $(this).attr("process-id"),
                        text: ''
                    })
                    _this.AddLink(linkToAdd)
                    $(".link-line#link-" + linkToAdd.linkGuid).click()
                }
                _this.newLink.fromGuid = null
                _this.newLink.UpdatePositions()
            }
        })

        $("#viewport").mouseup(function () {
            if (outputClickFix === false) {
                _this.newLink.fromGuid = null
                _this.newLink.UpdatePositions()
            }
        })

        $(window).mousemove(function (event) {
            if (_this.newLink.fromGuid !== null) {
                _this.newLink.UpdatePositions(event)
            }
        })
    }


}