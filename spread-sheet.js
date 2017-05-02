/**
 * Spread sheet for practice
 * @Author: WangYao
 */

import Util from './util'

const DEFAULTROWCOUNTS = 50,
    DEFAULTCOLUMNCOUNTS = 27

class SpreadSheet {
    constructor(rowCounts = DEFAULTROWCOUNTS, columnCounts = DEFAULTCOLUMNCOUNTS) {
            if (rowCounts > 0 && columnCounts >= 0) {
                this.rowCounts = rowCounts
                this.columnCounts = columnCounts
                this.utilObject = new Util()
            } else {
                alert("Invalid!")
            }
        }

    /**
     * Insert the row or column into the spread sheet
     *
     * @param:{event object}
     * @public
     */
    insert(event, initializeTable = false) {
        utilObject.insert(event, initializeTable)
    }

    /**
     * Delete the row or column of spread sheet
     *
     * @param {string} position
     * @public
     */
    delete(position) {}

    /**
     * Clear the contents of row or column
     *
     * @param {string} position
     * @public
     */
    clear(position) {}

    /**
     * Generate the spread sheet body
     * @public
     */
    generateSpreadSheetBody() {
        // create sheet layout
        $('#container').append('<div id="myTable"></div>')
        console.log('init.....')
        this.insert(true)
    }

    /**
     * Get content
     *
     * @public
     */
    inputToSheetCell() {}

    /**
     * Change the size of cell
     *
     * @public
     */
    changeTheSizeOfCell() {}
}

let sheet = new SpreadSheet().generateSpreadSheetBody()