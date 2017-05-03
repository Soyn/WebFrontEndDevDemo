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
         */
    insert(event, initializeTable) {
        console.log('Util --> enter insert.....')
        if (!initializeTable) {
            console.log('Util --> Just insert')
            // @TODO:
        } else {
            console.log('Init sheet......')
            let myTable = $('#myTable')
            myTable.append('<div class="tr"></div>')
            console.log('div tr inserted......')
            let currentRow = myTable.children().last()
            console.log(typeof currentRow)
            let currentRowIndex = currentRow.index()
            for(let col = 0; col < this.columnCounts; ++col) {
                if(currentRowIndex !== 0) {
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
    print(){
        console.log("It works!")
    }
}

export default Util