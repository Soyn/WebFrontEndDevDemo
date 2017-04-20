/**
 * Created by AlnordWang on 2017/4/14.
 */

/**
 * all the methods in Util
 */

var Util = {

    ROW_NUMBER: 50,
    COLUMN_NUMBER: 26,


    generateTable: function () {
        var layoutDiv = document.getElementById('layout');

        if (layoutDiv) {
            var table = document.createElement('TABLE');
            table.setAttribute('id', 'myTable');
            table.setAttribute('cellspacing', '0');
            table.setAttribute('cellpadding', '0');
            layoutDiv.appendChild(table);
        }

        Util.generateTableRow();
        Util.generateTableData();
    },

    generateTableRow: function () {
        var table = document.getElementById('myTable');
        if (table) {
            for (var i = 0; i < Util.ROW_NUMBER; ++i) {
                var tableRow = document.createElement('TR');
                table.appendChild(tableRow);
            }
        }
    },

    generateTableData: function () {
        var tableRows = document.getElementsByTagName('tr');
        var rowCounts = tableRows.length;

        for (var i = 0; i < rowCounts; ++i) {
            var alpha = 65; // #A
            var currentRow = tableRows[i];

            for (var j = 0; j < Util.COLUMN_NUMBER + 1; ++j) {  // initialize the excel header
                var currentTableData = document.createElement('TD');
                var cellDiv = document.createElement('div');

                currentTableData.appendChild(cellDiv);
                currentTableData.setAttribute('class', 'cell');

                var textNode = document.createElement('text');
                cellDiv.appendChild(textNode);

                if (i == 0 && j > 0) {  // top left is blank
                    var lineDiv = document.createElement('div');
                    lineDiv.setAttribute('class', 'lineDiv');
                    cellDiv.appendChild(lineDiv);
                    textNode.innerHTML = String.fromCharCode(alpha);
                    currentTableData.setAttribute('class', 'columnHeader');
                    ++alpha;

                } else {
                    if (j == 0 && i) {
                        currentTableData.setAttribute('class', 'rowHeader');
                        textNode.innerHTML = i;
                    }

                }
                currentRow.appendChild(currentTableData);
            }
        }
    },

    createNativeMenuBody: function (rowNumber, menuOptions) {

        var divMenu = document.createElement('div');
        divMenu.setAttribute('id', 'Menu');
        divMenu.setAttribute('class', 'menu');

        var menuBody = document.createElement('table');
        menuBody.setAttribute('border', '0');
        menuBody.setAttribute('cellpadding', '0');
        menuBody.setAttribute('cellspacing', '0');

        for (var i = 0; i < rowNumber; ++i) {
            var tr = document.createElement('tr');
            var td = document.createElement('button');

            td.innerText = menuOptions[i];
            td.setAttribute('id', menuOptions[i]);
            tr.appendChild(td);
            menuBody.appendChild(tr);
        }

        divMenu.appendChild(menuBody);
        document.body.appendChild(divMenu);
    },

    makeDivMenu: function () {
        var menuOptions = ['insert', 'delete', 'clear'];
        Util.createNativeMenuBody(menuOptions.length, menuOptions);

    },

    showMenu: function (event) {
        var divCell = event.target;
        var td = divCell.parentNode;

        var triggerElementClassName = td.className;

        if (triggerElementClassName == 'rowHeader' || triggerElementClassName == 'columnHeader') {
            var posX = event.clientX + window.pageXOffset + 'px';
            var posY = event.clientY + window.pageYOffset + 'px';
            var menuLayout = document.getElementById('Menu');

            menuLayout.style.display = 'block';
            menuLayout.style.position = 'absolute';
            menuLayout.style.left = posX;
            menuLayout.style.top = posY;
        } else {
            Util.hideMenu();
        }

        if (triggerElementClassName == 'rowHeader') {
            var currentRow = td.parentElement.rowIndex;
            Util.insertRowCallback = function () {
                Util.insertRow(currentRow);
                Util.hideMenu();
            };

            Util.deleteRowCallback = function () {
                Util.deleteRow(currentRow);
                Util.hideMenu();

            };

            Util.clearRowCallback = function () {
                Util.clearRow(currentRow);
                Util.hideMenu();

            };
            document.getElementById('insert').addEventListener('click', Util.insertRowCallback, false);
            document.getElementById('delete').addEventListener('click', Util.deleteRowCallback, false);
            document.getElementById('clear').addEventListener('click', Util.clearRowCallback, false);
        } else if (triggerElementClassName == 'columnHeader') {
            var currentColumn = td.cellIndex;

            Util.insertColumnCallback = function () {
                Util.insertColumn(currentColumn);
                Util.hideMenu();
            };

            Util.deleteColumnCallback = function () {
                Util.deleteColulmn();
                Util.hideMenu();
            };

            Util.clearColumnCallback = function () {
                Util.clearColumn();
                Util.hideMenu();
            };

            document.getElementById('insert').addEventListener('click', Util.insertColumnCallback, false);
        }
    },

    insertRowCallback: null,
    deleteRowCallback: null,
    clearRowCallback: null,

    insertColumnCallback: null,
    deleteColumnCallback: null,
    clearColumnCallback: null,


    hideMenu: function () {
        document.getElementById('Menu').style.display = 'none';
        document.getElementById('insert').removeEventListener('click', Util.insertRowCallback, false);
        document.getElementById('clear').removeEventListener('click', Util.clearRowCallback, false);
        document.getElementById('delete').removeEventListener('click', Util.deleteRowCallback, false);

        document.getElementById('insert').removeEventListener('click', Util.insertColumnCallback, false);
    },

    insertRow: function (currentRow) {
        var myTable = document.getElementById('myTable');
        var insertedPosition = currentRow + 1;
        var newRow = document.createElement('tr');

        for (var i = 0; i < Util.COLUMN_NUMBER + 1; ++i) {
            var td = document.createElement('td');
            var cellDiv = document.createElement('div');
            td.appendChild(cellDiv);

            var textNode = document.createElement('text');

            td.setAttribute('class', 'cell');

            if (i == 0) {
                td.setAttribute('class', 'rowHeader');
                textNode.innerText = insertedPosition;
            } else {
                textNode.setAttribute('contentEditable', true);
            }

            cellDiv.appendChild(textNode);
            newRow.appendChild(td);

        }


        myTable.insertBefore(newRow, myTable.children[insertedPosition]);
        // update the row number
        for (var row = insertedPosition; row < myTable.childElementCount; ++row) {
            var currentTD = myTable.children[row].firstElementChild;  // td element
            currentTD.firstElementChild.children[0].innerText = row;
        }
    },

    deleteRow: function (currentRow) {
        var myTable = document.getElementById('myTable');
        myTable.removeChild(myTable.children[currentRow]);

        for (var row = currentRow; row < myTable.childElementCount; ++row) {
            myTable.children[row].firstChild.firstChild.firstChild.innerText = row;
        }
    },

    clearRow: function (currentRow) {
        var myTable = document.getElementById('myTable');
        var trNode = myTable.children[currentRow];

        for (var i = 1; i < trNode.childElementCount; ++i) {
            trNode.children[i].firstChild.firstChild.innerText = '';
        }
    },

    insertColumn: function (currentColumn) {
        var myTable = document.getElementById('myTable');
        var insertPosition = currentColumn + 1;

        for (var row = 0; row < myTable.childElementCount; ++row) {
            var newTD = document.createElement('td');
            newTD.setAttribute('class', 'cell');

            var helperDiv = document.createElement('div');
            var textNode = document.createElement('text');
            var positionNode = myTable.children[row].children[insertPosition];
            if (row == 0) {
                newTD.setAttribute('class', 'columnHeader');
                textNode.innerHTML = positionNode.innerHTML;
                myTable.style.width = myTable.clientWidth + 53 + 'px';
            }
            myTable.children[row].insertBefore(newTD, positionNode);
            newTD.appendChild(helperDiv);
            helperDiv.appendChild(textNode);
        }

        var rowHeader = myTable.children[0];
        for (var i = insertPosition; i < rowHeader.childElementCount; ++i) {
            rowHeader.children[i].firstChild.firstChild.innerText = String.fromCharCode(i + 64);
        }

    },

    deleteColulmn: function (currentColumn) {
        var mytable = document.getElementById('myTable');

        for(var row = 0; row < mytable.length; ++row) {
            var toBeDeletedNode = mytable.children[row].children[currentColumn];
            trNode.removeChild(toBeDeletedNode);
        }

        /*for(var i = currentColumn; i < mytable.children[0].childElementCount; ++i) {
            mytable.children[0].
        }*/
    },

    clearColumn: function () {

    },

    mouseMoveCallback: null,
    mouseUpCallback: null,

    moveOnColumn: function (mouseDownEvent) {

        var currentLineDiv = mouseDownEvent.target;
        var divHelperInDiv = currentLineDiv.parentNode;
        var mousePositionToLineDivBorder = mouseDownEvent.clientX - currentLineDiv.getBoundingClientRect().left;

        var tableNode = divHelperInDiv.parentNode.parentNode.parentNode;

        var lineDivHeight = tableNode.clientHeight;

        currentLineDiv.classList.add('selected');

        // mouse move event handler
        Util.mouseMoveCallback = function (mouseMoveEvent) {
            mouseMoveEvent.preventDefault();

            Util.changeThePseudoElementRule(lineDivHeight);

            var offset = mouseMoveEvent.clientX - currentLineDiv.getBoundingClientRect().left - mousePositionToLineDivBorder;
            currentLineDiv.style.left = currentLineDiv.offsetLeft + offset + 'px';
            currentLineDiv.style.right = 'inherit'
        };

        // mouseup event handler
        Util.mouseUpCallback = function (mouseUpEvent) {

            document.removeEventListener('mousemove', Util.mouseMoveCallback, false);
            var originalTDWidth = divHelperInDiv.clientWidth;

            var newWidth = mouseUpEvent.clientX - currentLineDiv.getBoundingClientRect().left - mousePositionToLineDivBorder + originalTDWidth;

            var tableWidth = tableNode.offsetWidth;

            if (newWidth >= originalTDWidth) {
                tableWidth += newWidth - originalTDWidth;
            } else {
                tableWidth -= originalTDWidth - newWidth;
            }

            divHelperInDiv.style.width = newWidth + 'px';
            currentLineDiv.style.right = '-8px';
            currentLineDiv.style.left = 'inherit';
            document.removeEventListener('mouseup', Util.mouseUpCallback, false);
            tableNode.style.width = tableWidth + 'px';

            currentLineDiv.setAttribute('class', 'lineDiv');

            Util.updateCurrentColumnWidth(divHelperInDiv, newWidth);

        };
        document.addEventListener('mousemove', Util.mouseMoveCallback, false);
        document.addEventListener('mouseup', Util.mouseUpCallback, false);

    },

    //update current column's width
    updateCurrentColumnWidth: function (divHelperInDiv, newWidth) {
        var currentTable = document.getElementById('myTable');
        var length = currentTable.childElementCount;

        var col = divHelperInDiv.parentNode.cellIndex;

        for(var row = 1; row < length; ++row) {
            var currentRow = currentTable.children[row];
            currentRow.children[col].firstElementChild.style.width = newWidth + 'px';

        }
    },

    changeThePseudoElementRule: function (afterHeight) {
        var style = document.createElement('style');
        document.head.appendChild(style);
        var sheet = style.sheet;
        sheet.addRule('div.selected:after', 'height: ' + afterHeight + 'px; background-color: red;');
    },

    inputDiv: function (event) {
        var td = event.target.parentNode;
        var textNode = event.target.firstChild;
        var divForInput = document.getElementById('inputDiv');
        divForInput.innerText = '';
        if(td.className == 'cell'){

            function setDivPosition() {
                divForInput.style.left = td.getBoundingClientRect().left + 'px';
                divForInput.style.top = td.getBoundingClientRect().top + 'px';
            }

            divForInput.setAttribute('contenteditable', true);
            divForInput.setAttribute('class', 'selected');
            divForInput.style.display = 'block';
            divForInput.style.minWidth = td.clientWidth + 'px';
            divForInput.style.minHeight = td.clientHeight + 'px';
            divForInput.position = 'absolute';
            setDivPosition();

            Util.getContentFromTextNode = function (evt) {
                if(textNode.textContent){
                    divForInput.innerText = textNode.textContent;
                    divForInput.style.backgroundColor = td.style.backgroundColor;
                    textNode.textContent = '';
                }
            };
            Util.extractDivContentsToText = function () {
                textNode.textContent = inputDiv.innerText;
                divForInput.style.display = 'none';
                divForInput.removeEventListener('focus', Util.getContentFromTextNode, false);
                divForInput.removeEventListener('blur', Util.extractDivContentsToText, false);
            };

            Util.completeInput = function (keyPressEvent) {
                if(keyPressEvent.which == 13) {  // enter press event trigger
                    Util.extractDivContentsToText();
                    divForInput.setAttribute('contenteditable', false);
                    divForInput.removeEventListener('focus', Util.getContentFromTextNode, false);
                    divForInput.removeEventListener('blur', Util.extractDivContentsToText, false);
                }
            };

            divForInput.addEventListener('focus', Util.getContentFromTextNode, false);
            divForInput.addEventListener('blur', Util.extractDivContentsToText, false);
            divForInput.addEventListener('keypress', Util.completeInput, false);
        }},

    createInputDiv: function () {
        var divForInput = document.createElement('div');
        divForInput.setAttribute('id', 'inputDiv');
        document.body.appendChild(divForInput);
    },

    getContentFromTextNode: null,
    extractDivContentsToText: null,
    completeInput: null,
};



function init() {
    Util.generateTable();
}

function testForLineDiv() {
    init();
    var lineDivNodes = document.getElementsByClassName('lineDiv');
    for(var i = 0; i < lineDivNodes.length; ++i) {
        lineDivNodes[i].addEventListener('mousedown', Util.moveOnColumn, false);
    }
}


function testForExcelMenu() {
    Util.makeDivMenu();
    Util.hideMenu();
    var myTable = document.getElementById('layout');
    myTable.addEventListener('contextmenu', Util.showMenu, false);
    document.addEventListener('dblclick', Util.hideMenu, false);
}


function testForInputDiv() {
    Util.createInputDiv();
    var myTableLayout = document.getElementById('layout');

    myTableLayout.addEventListener('dblclick', Util.inputDiv, false);
}
testForExcelMenu();
testForInputDiv();
testForLineDiv();