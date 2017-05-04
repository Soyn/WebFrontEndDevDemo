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

    insert(evt) {
        let target = evt.target
        this.utilObject.insert(target)
        this.hideMenu()
    }

    /**
     * Delete the row or column of spread sheet
     *
     * @param {string} position
     * @public
     */
    delete(evt) {
        let target = evt.target
        this.utilObject.delete(target)
        this.hideMenu()
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
     * R
     *
     * @public
     */
    resize(evt) {
        this.utilObject.resize(evt)
    }
    /**
     * Show options menu
     * @public*/
    showMenu(evt) {
        evt.preventDefault()
        let menuOptions = $('.menuLayout')
        if(menuOptions){
            $('#insert').on('click', () => {
                this.insert(evt)
            })
            $('#delete').on('click', () => {
                this.delete(evt)
            })

            menuOptions.css({'visibility': 'visible'})
            let target = evt.target
            let className = $(target).attr('class')

            if(className === 'rowHeader' || className === 'columnHeader') {
                this.utilObject.setMenuPosition(evt)
            } else {
                this.hideMenu()
            }
        } else {
            alert('Error: No menu exsits!')
        }
    }

    /**
     * Hide the menu
     */
    hideMenu(){
        $('.menuLayout').css({'visibility': 'hidden'})
        $('#insert').off('click')
        $('#delete').off('click')
    }
}

let sheet = new SpreadSheet()
$(sheet.generateSpreadSheetBody(true))
$('#myTable').on('contextmenu', (evt) => {
    sheet.showMenu(evt)
})

$('#myTable').on('mousedown', function (evt) {
    sheet.resize(evt)
})


