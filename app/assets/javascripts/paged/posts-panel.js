window.posts ||= {}
window.posts.initPanel = (container) => {
    new PostsPanelController(container)
}

class PostsPanelController {
    constructor(container) {
        this.container = container
        this.initCopyLinks()
        this.initDestroyLinks()
    }

    initCopyLinks() {
        this.container.find('.copy-post-title').on('click', (evt) => {
            let clicked = $(evt.currentTarget)
            let row = clicked.closest('tr')
            let fullText = row.find('.title-text').text()

            let temp = $("<input>")
            $("body").append(temp)
            temp.val(fullText).select()
            document.execCommand("copy")
            temp.remove()

            clicked.closest('.tooltip-wrapper').find('.copied-alert').fadeIn(300).delay(1000).fadeOut(1500);
        })
    }

    initDestroyLinks() {
        this.container.on('click', '.destroy', (evt) => {
            if (confirm('Delete this Post?')) {
                let clicked = $(evt.currentTarget)
                let clickedRow = clicked.closest('tr')
                let destroyUrl = clicked.attr('href')

                $.post(
                    destroyUrl,
                    (res) => {
                        if (res.status == 'success') {
                            clickedRow.remove()
                        } else {
                            alert(res)
                        }
                    }
                )
            }
            return false
        })
    }
}
