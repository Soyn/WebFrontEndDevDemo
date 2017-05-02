/**
 * The util class for spread sheet
 */
const DEFAULTROWCOUNTS = 50, DEFAULTCOLUMNCOUNTS = 27

class Util {

    constructor(rowCounts = DEFAULTROWCOUNTS, columnCounts = DEFAULTCOLUMNCOUNTS) {
        this.rowCounts = rowCounts;
        this.columnCounts = columnCounts;
    }

    /**
     * Show options menu
     */
    showMenu() {}
        /**
         * To insert row at specified position
         */
    insert(event, initializeTable) {
        if (!initializeTable) {
            // @TODO:
        } else {
            let myTable = $('#myTable')
            myTable.append('<div class="tr"></div>')
            let currentRow = $('.tr').lastChild()

            for(let col = 0; col < this.columnCounts; ++i) {
                if(currentRow.cellIndex !== 0) {
                    if(col) {
                        currentRow.append('<div class="cell"></div>')
                    } else {
                        currentRow.append('<div class="columnHeader">${col}</div>')
                    }
                } else {  // first row in sheet
                    let title = ''

                    if(col){
                        title = String.fromCharCode(col+65)
                    }
                    currentRow.append('<div class="rowHeader">${title}</div>')
                }
            }
        }
    }
}

export {Util}