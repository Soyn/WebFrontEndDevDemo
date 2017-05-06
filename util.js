/**
 * The util class for spread sheet
 */
const DEFAULTROWCOUNTS = 50, DEFAULTCOLUMNCOUNTS = 27

class Util {

    constructor(rowCounts = DEFAULTROWCOUNTS, columnCounts = DEFAULTCOLUMNCOUNTS) {
        this.rowCounts = rowCounts;
        this.columnCounts = columnCounts;
        console.log('From Util --> rowCounts: ' + this.rowCounts + ' columnCounts: ' + this.columnCounts)
        this.menuOptions = ['insert', 'delete', 'clear']
    }
    /**
     * Initialize the sheet
     *
     * @public
     */
    initializeSheet() {
        console.log('Init sheet......')
        let myTable = $('#myTable')
        for (let i = 0; i < this.rowCounts; ++i) {
            myTable.append('<div class="tr"></div>')
            console.log('div tr inserted......')

            let currentRow = myTable.children().last()
            let currentRowIndex = currentRow.index()

            for (let col = 0; col < this.columnCounts; ++col) {
                if (currentRowIndex !== 0) {  // not the first row
                    if (col) {
                        currentRow.append('<div class="cell"><text></text></div>')
                    } else {
                            currentRow.append(`<div class="rowHeader">
                            <text>${currentRowIndex}</text>
                            <div class="horizontalDiv"></div>
                            </div>`)
                    }
                } else {
                    let title = ''

                    if (col) {
                        title = String.fromCharCode(col + 64)
                        currentRow.append(`<div class="columnHeader">
                        <text>${title}</text>
                        <div class="verticalDiv"></div>
                        </div>`)
                    } else {
                        currentRow.append('<div id="header"></div>')
                    }

                }
            }
        }
        this.makeOptionsMenu()
    }

    /**
     * To insert row at specified position
     * @param {object} event, {boolean} initializeTable
     * @public
     */
    insert(target) {
        console.log('Util --> enter insert.....')
        let className = $(target).attr('class')
        console.log('Insert on: ' + className)

        if (className === 'rowHeader') {  // add new row

            let positionRow = $(target).parent()

            if (positionRow.index() > 1) {
                positionRow = positionRow.prev()
            }

            let newRow = $('<div class="tr"></div>')
            let originalTds = $.makeArray(positionRow.children())

            for (let elem of originalTds) {
                let newTd = ''
                let tdClassName = elem.className

                if (tdClassName === 'rowHeader') {
                    newTd = $(`<div class=${tdClassName}>
                                    <text></text>
                                    <div class="horizontalDiv"></div>
                               </div>`)
                } else {
                    newTd = $(`<div class=${tdClassName}><text></text></div>`)
                }

                let [newWidth, newHeight] = [[elem.clientWidth], [elem.clientHeight]]
                console.log('clientWidth: ' + newWidth + ' clientHeight: ' + newHeight)
                newTd.css({'width': newWidth, 'height': newHeight, 'line-height': newHeight + 'px'})
                newRow.append(newTd)
            }
            newRow.insertAfter(positionRow)
            ++this.rowCounts
            this.updateHeaderContent(newRow.index(), true)

        } else if (className === 'columnHeader') {  // insert new column
            let indexOfTarget = $(target).index()


            $.each($('.tr'), (index, value) => {
                let newTd = ''
                let [newWidth, newHeight] = [[$(value).children().eq(indexOfTarget).innerWidth()],
                    [$(value).children().eq(indexOfTarget).innerHeight()]]
                if (index === 0) {  // first row in sheet
                    newTd = $('<div class="columnHeader"><text></text><div class="verticalDiv"></div></div>')
                } else {
                    newTd = $('<div class="cell"><text></text></div>')
                    newTd.css({'line-height': newHeight + 'px'})
                }

                newTd.css({'width': newWidth, 'height': newHeight})
                let targetTd = $(value).children().eq(indexOfTarget).prev()
                newTd.insertAfter(targetTd)
            })
            this.columnCounts += 1
            this.updateHeaderContent(indexOfTarget, false)
        }
    }


    /***
     * Update the header content
     *
     * @param {number} index, {boolean} isRow
     * @public
     */
    updateHeaderContent(index = 0, isRow = true) {
        if (index) {
            let rows = $('.tr')
            if (isRow) {  // update the row header content
                for (let i = index; i < this.rowCounts; ++i) {
                    rows.eq(i).children().get(0).firstElementChild.innerHTML = i
                }
            } else {  // update column header content
                let alpha = ''
                for (let j = index; j < this.columnCounts; ++j) {
                    if (j <= 26) {
                        alpha = String.fromCharCode(j + 64)
                    } else {
                        alpha = String.fromCharCode(j - 27 + 97)
                    }
                    rows.first().children().eq(j).get(0).firstElementChild.innerHTML = alpha
                }
            }

        } else {
            alert('Insert in right position');
        }
    }



    /**
     * delete row or column
     */
    delete(target) {
        let className = $(target).attr('class')
        if (className === 'rowHeader') {
            let toBeDeletedRow = $(target).parent()
            let toBeDeletedRowIndex = toBeDeletedRow.index()
            toBeDeletedRow.remove()
            this.rowCounts -= 1

            let rowHeaders = $('.rowHeader')
            for (let i = toBeDeletedRowIndex; i < this.rowCounts; ++i) {
                rowHeaders.eq(i - 1).children().get(0).innerHTML = i
            }
        }
        else {
            let toBeDeletedTDIndex = $(target).index()
            console.log(toBeDeletedTDIndex)

            $.each($('.tr'), (index, value) => {
                let toBeDelete = $(value).children().eq(toBeDeletedTDIndex)
                toBeDelete.remove()
            })
            this.columnCounts -= 1
            console.log(this.columnCounts)

            let columnHeaders = $('.columnHeader')
            for (let i = toBeDeletedTDIndex; i < this.columnCounts; ++i) {
                let originalContent = columnHeaders.eq(i).children().get(0).innerHTML
                columnHeaders.eq(i).children().get(0).innerHTML = String.fromCharCode(
                    originalContent.charCodeAt(0) - 1)
            }
        }
    }

    /**
     * generate options menu
     */
    makeOptionsMenu() {
        let myTable = $('#myTable')
        let menuLayout = $('<div class="menuLayout"></div>')
        myTable.append(menuLayout)
        for (let option of this.menuOptions) {
            menuLayout.append(`<button class="option" id=${option}>${option}</button>`)
        }
        menuLayout.css({'visibility': 'hidden'})
    }

    /***
     * Show options menu
     *
     * @public
     */
    showMenu() {
        this.makeOptionsMenu()
    }

    /**
     * Set the menu's position which it should be placed
     *
     * @param {object} target
     */
    setMenuPosition(evt) {
        let posX = evt.clientX + window.pageXOffset
        let posY = evt.clientY + window.pageYOffset
        console.log('mouseX: ' + evt.clientX + ' mouseY: ' + evt.clientY)
        console.log('pageXOffset: ' + window.pageXOffset + ' pageYOffset: ' + window.pageYOffset)
        console.log('posX: ' + posX + ' posY: ' + posY)
        console.log('pageX: ' + evt.pageX)
        console.log('pageY: ' + evt.pageY)
        $('.menuLayout').css({'left': posX + 'px', 'top': posY + 'px'})
        $('body').on({
            'mousewheel': (evt) => {
                if(evt.target.id === 'el') return
                evt.preventDefault()
                evt.stopPropagation()
            }
        })
    }

    /**
     * Resize the sheet cell
     * procedure: mousedown ==> mousemove  ==> mouseup
     * @param {object} mousedownEvt
     * @private
     */
    resize(mousedownEvt) {
        let target = mousedownEvt.target
        let className = $(target).attr('class')

        if (className === 'horizontalDiv' || className === 'verticalDiv') {
            let baseLine = $('#myTable').innerHeight()
            let mouseToResizeDivBorder = mousedownEvt.clientX - target.getBoundingClientRect().left

            if (className === 'horizontalDiv') {
                console.log('mouse down on row horizontalDiv.....')
                baseLine = $('#myTable').innerWidth()
                mouseToResizeDivBorder = mousedownEvt.clientY - target.getBoundingClientRect().top
            }

            console.log('baseLine: ' + baseLine + ' mouseToResizeDivBirder: ' + mouseToResizeDivBorder)

            $(target).addClass('selected')

            $(`<style type="text/css" id="dynamic"></style>`).appendTo('head')

            let afterProperty = 'height'
            if (className === 'horizontalDiv') {
                afterProperty = 'width'
            }

            $('#dynamic').text(
                `.${className}.selected:after {
                    ${afterProperty}: ${baseLine}px;       
             }`
            )

            let mouseMoveHandler = (mousemoveEvent) => {
                mousemoveEvent.preventDefault()
                let offset = 0
                if (className === 'verticalDiv') {
                    offset = mousemoveEvent.clientX - target.getBoundingClientRect().left - mouseToResizeDivBorder
                    let left = target.offsetLeft + offset
                    console.log('left: ' + left)
                    $(target).css({'left': left + 'px', 'right': 'inherit'})
                    $(target).parent().css({'width': (left + target.clientWidth / 2) + 'px'})
                    let targetIndex = $(target).parent().index()
                    $.each($('.tr'), (index, value) => {
                        let idName = $(value).children().eq(targetIndex).attr('id')
                        if( idName=== 'waitToBeInput') {
                            $('#input').css({'width': (left + target.clientWidth / 2) - 2 + 'px'})
                        }
                    })
                } else {
                    if (className === 'horizontalDiv') {
                        offset = mousemoveEvent.clientY - target.getBoundingClientRect().top - mouseToResizeDivBorder
                        let top = target.offsetTop + offset
                        console.log('top: ' + top)
                        $(target).css({'top': top + 'px', 'left': '0px'})

                        $(target).parent().css({'height': (top + target.clientHeight / 2) + 'px'})
                        $.each($(target).parent().parent().children(), (index, elem) => {
                            let idName = $(elem).attr('id')
                            if(idName === 'waitToBeInput') {
                                $('#input').css({'height': (top + target.clientHeight / 2) - 2 + 'px'})
                            }
                        })

                    }
                }
            }

            let mouseupHandler = (mouseupEvt) => {
                $('#myTable').off('mousemove')
                let className = $(target).attr('class')
                let targetIndex = $(target).parent().index()

                console.log('targetClassName: ' + className + ' targetIndex: ' + targetIndex)

                if(className === 'verticalDiv selected') {
                    let newWidth = $(target).parent().innerWidth()
                    console.log('newWidth: ' + newWidth)
                    let rows = $.makeArray($('.tr'))

                    $.map(rows, (row) => {
                        console.log('type: ' + typeof row + ' rowIndex: ' + row.cellIndex)
                        let tableCell = $(row).children().eq(targetIndex)
                        tableCell.css({'width': newWidth + 'px'})
                        if(tableCell.attr('id') === 'waitToBeInput') {
                            $('#input').css({'width': newWidth - 2 + 'px'})
                        }else {
                            let inputDiv = $('#waitToBeInput')
                            if(inputDiv.length) {
                                let [top, left] = [[inputDiv.get(0).getBoundingClientRect().top + window.pageYOffset],
                                    [inputDiv.get(0).getBoundingClientRect().left + window.pageXOffset]]
                                $('#input').css({
                                    'top': top + 'px',
                                    'left': left + 'px',
                                })
                            }
                        }
                    })
                } else {
                    let newHeight = $(target).parent().innerHeight()
                    console.log('newHeight: ' + newHeight)
                    let row = $(target).parent().parent()
                    let tds = $.makeArray(row.children())
                    $.map(tds, (td) => {
                        console.log('type: ' + typeof td + 'cellIndex' + td.cellIndex)
                        $(td).css({'height': newHeight + 'px', 'line-height': newHeight + 'px'})
                        if($(td).attr('id') === 'waitToBeInput') {
                            $('#input').css({'height': newHeight -2 + 'px'})
                        } else {
                            let inputDiv = $('#waitToBeInput')
                            if(inputDiv.length) {
                                let [top, left] = [[inputDiv.get(0).getBoundingClientRect().top + window.pageYOffset],
                                    [inputDiv.get(0).getBoundingClientRect().left + window.pageXOffset]]
                                $('#input').css({
                                    'top': top + 'px',
                                    'left': left + 'px',
                                })
                            }
                        }
                    })
                }
                $(target).removeClass('selected')
                $('#myTable').off('mouseup')
            }
            $('#myTable').on('mousemove', mouseMoveHandler)
            $('#myTable').on('mouseup', mouseupHandler)
        }
    }

    /**
     * handler input
     *
     * @public
     */
    input(evt) {
        let target = evt.target
        if(target.nodeName === 'TEXT') {
            target = target.parentNode
        }
        let className = $(target).attr('class')

        if (className === 'cell') {
            $('#input').off()  // remove all the event handler to keep clear
            if($('#waitToBeInput')) {  // remove last div for input
                $('#waitToBeInput').removeAttr('id', 'waitToBeInput')
            }
            $(target).attr('id', 'waitToBeInput')
            $('.menuLayout').css({'visibility': 'hidden'})

            let [top, left] = [target.getBoundingClientRect().top + window.pageYOffset,
                target.getBoundingClientRect().left + window.pageXOffset]


            console.log('top:.....: ' + top + ' left.....: ' + left )
            let inputDivWidth = target.clientWidth - 2
            let inputDivHeight = target.clientHeight - 2
            let backgroundColor = $(target).css('background-color')

            $('#input').css({
                'width': inputDivWidth + 'px',
                'height': inputDivHeight,
                'border': '2px solid black',
                'visibility': 'visible',
            }).animate({'left':left + 'px', 'top': top + 'px'}, 120)

            let inputDiv = $('#input')
            let textNode = target.firstElementChild
            inputDiv.text($(textNode).text())
            let getContentFromCell = (evt) => {
                $(inputDiv).attr('contenteditable', true)
            }
            let extractContentToCell = () => {
                textNode.innerHTML = inputDiv.text()
                inputDiv.css({'visibility': 'hidden'})
                inputDiv.text('')
                $('#myTable').off('scroll')
            }
            let test = (evt) => {
                evt.preventDefault()
            }

            let changePosition = (scrollEvt) => {
                let [top, left] = [target.getBoundingClientRect().top + window.pageYOffset,
                    target.getBoundingClientRect().left + window.pageXOffset]
                $('#input').css({
                    'width': inputDivWidth + 'px',
                    'height': inputDivHeight,
                    'border': '2px solid black',
                    'visibility': 'visible',
                    'background-color': backgroundColor,
                    'display': 'fixed'
                }).animate({'left':left + 'px', 'top': top + 'px'}, 0)
            }
            $('#input').on('dblclick', getContentFromCell)
            $('#input').on('blur', extractContentToCell)
            $('#myTable').on('scroll', changePosition)
            $('#input').on('keypress', (evt) => {
                if(evt.which === 13) {
                    extractContentToCell()
                }
            })
        }
    }

    print() {
        console.log("It works!")
    }
}

export default Util