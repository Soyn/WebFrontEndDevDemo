/**
 * The util class for spread sheet
 */
const DEFAULTROWCOUNTS = 50, DEFAULTCOLUMNCOUNTS = 27

class Util {

    constructor(rowCounts = DEFAULTROWCOUNTS, columnCounts = DEFAULTCOLUMNCOUNTS) {
        this.rowCounts = rowCounts;
        this.columnCounts = columnCounts;
        console.log('From Util --> rowCounts: ' + this.rowCounts + ' columnCounts: ' + this.columnCounts)
    }

    /**
     * Show options menu
     */
    showMenu() {}
    /**
     * To insert row at specified position
     * @param {object} event, {boolean} initializeTable
     * @public
     */
    insert(target) {
        console.log('Util --> enter insert.....')
        let className = $(target).attr('class')
        let tdClassName = ''
        console.log('Insert on: ' + className)

        if (className === 'rowHeader') {  // add new row

            let positionRow = $(target).parent()

            if(positionRow.index() > 1) {
                positionRow = positionRow.prev()
            }

            let newRow = $('<div class="tr"></div>')

            for(let elem of positionRow.children()) {
                if(elem.index() === 1){
                    tdClassName = 'rowHeader'
                } else {
                    tdClassName = 'cell'
                }

                let newTd =$(`<div class=${tdClassName}></div>`)
                let [newWidth, newHeight] = [elem.innerWidth, elem.innerHeight]
                console.log('clientWidth: ' + newWidth + ' clientHeight: ' + newHeight)
                newTd.css({'width': newWidth, 'height': newHeight})
                newRow.append(newTd)
            }
            newRow.insertAfter(positionRow)
            ++this.rowCounts
            this.updateHeaderContent(newRow.index(), true)
        } else {
            //@TODO
        }
    }

    /***
     * Update the header content
     *
     * @param {number} index, {boolean} isRow
     * @public
     */
    updateHeaderContent(index = 0, isRow = true){
        if(index) {
            let rows = $('.tr')
            for(let i = index; index < this.rowCounts; ++i){
                if (isRow){  // update the row header content
                    rows.eq(i).children().first().innerHTML = i
                } else {  // update column header content
                    let alpha = ''
                    for(let j = index; j < this.columnCounts; ++j) {
                        if(j <= 26){
                            alpha = string.fromCharCode(j + 64)
                        } else {
                            alpha = string.fromCharCode(j - 27 + 97)
                        }
                        rows.eq(i).children().eq(j).innerHTML = alpha
                    }
                }
            }
        } else {
            alert('Insert in right position');
        }
    }

    /**
     * Initialize the sheet
     *
     * @public
     */
    initializeSheet(){
        console.log('Init sheet......')
        let myTable = $('#myTable')
        for(let i = 0; i < this.rowCounts; ++i){
            myTable.append('<div class="tr"></div>')
            console.log('div tr inserted......')

            let currentRow = myTable.children().last()
            let currentRowIndex = currentRow.index()

            for(let col = 0; col < this.columnCounts; ++col) {
                if(currentRowIndex !== 0) {  // not the first row
                    if(col) {
                        currentRow.append('<div class="cell"></div>')
                    } else {
                        currentRow.append(`<div class="rowHeader">
                            ${currentRowIndex}
                            <div class="horizontalDiv"></div>
                            </div>`)
                    }
                } else {  // first row in sheet
                    let title = ''

                    if(col){
                        title = String.fromCharCode(col+64)
                    }
                    currentRow.append(`<div class="columnHeader">
                        ${title}
                        <div class="verticalDiv"></div>
                        </div>`)
                }
            }
        }
    }
    print(){
        console.log("It works!")
    }
}

export default Util