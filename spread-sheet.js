/**
 * Spread sheet for practice
 * @Author: WangYao
 */

import Util from './util'

const DEFAULTROWCOUNTS = 50,
    DEFAULTCOLUMNCOUNTS = 27
class SpreadSheet {
    constructor(rowCounts = DEFAULTROWCOUNTS, columnCounts = DEFAULTCOLUMNCOUNTS) {
        if (rowCounts > 0 && columnCounts > 0) {
            this.rowCounts = rowCounts
            this.columnCounts = columnCounts
            console.log("From spread-sheet --> rowCounts: " + this.rowCounts + " ColumnCounts: " + this.columnCounts)
            this.utilObject = new Util()
            this.self = this
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

    insert(event) {
        let target = event.target
        this.utilObject.insert(target)
    }

    /**
     * Delete the row or column of spread sheet
     *
     * @param {string} position
     * @public
     */
    delete(position) {
    }

    /**
     * Clear the contents of row or column
     *
     * @param {string} position
     * @public
     */
    clear(position) {
    }

    /**
     * Generate the spread sheet body
     * @public
     */
    generateSpreadSheetBody() {
        // create sheet layout
        $('#container').append('<div id="myTable"></div>')
        console.log('From spread-sheet --> Init.....')
        this.utilObject.initializeSheet()
    }

    /**
     * Get content
     *
     * @public
     */
    inputToSheetCell() {
    }

    /**
     * Change the size of cell
     *
     * @public
     */
    changeTheSizeOfCell() {
    }
}

let sheet = new SpreadSheet()
$(sheet.generateSpreadSheetBody(true))
document.body.addEventListener('click', function (evt) {
    sheet.insert(evt)
}, false)




