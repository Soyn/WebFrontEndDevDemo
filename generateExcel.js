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
                var helperDiv = document.createElement('div');

                currentTableData.appendChild(helperDiv);
                currentTableData.setAttribute('class', 'cell');

                var textNode = document.createElement('text');
                helperDiv.appendChild(textNode);


                if (i == 0 && j > 0) {  // top left is blank
                    var lineDiv = document.createElement('div');
                    lineDiv.setAttribute('class', 'lineDiv');
                    helperDiv.appendChild(lineDiv);
                    textNode.innerHTML = String.fromCharCode(alpha);

                    currentTableData.setAttribute('class', 'columnHeader');
                    ++alpha;

                } else {
                    if (j == 0 && i) {
                        var lineDiv = document.createElement('div');
                        lineDiv.setAttribute('class', 'horizontalDiv');
                        helperDiv.appendChild(lineDiv);
                        currentTableData.setAttribute('class', 'rowHeader');
                        textNode.innerHTML = i;
                    }

                }
                currentRow.appendChild(currentTableData);
            }
        }
    },

    createNativeMenuBody: function (menuOptions) {

        var menuBody = document.createElement('div');
        menuBody.setAttribute('id', 'Menu');
        for (var i = 0; i < menuOptions.length; ++i) {
            var button = document.createElement('button');

            button.innerText = menuOptions[i];
            button.setAttribute('id', menuOptions[i]);
            menuBody.appendChild(button);
        }
        document.body.appendChild(menuBody);
    },

    makeDivMenu: function () {
        var menuOptions = ['insert', 'delete', 'clear'];
        Util.createNativeMenuBody(menuOptions);

    },

    showMenu: function (event) {

        event.preventDefault();

        var divCell = event.target;
        var td = divCell.parentNode;

        var triggerElementClassName = td.className;

        if (triggerElementClassName == 'rowHeader' || triggerElementClassName == 'columnHeader') {
            var posX = event.clientX + window.pageXOffset + 'px';
            var posY = event.clientY + window.pageYOffset + 'px';
            var menuLayout = document.getElementById('Menu');

            menuLayout.style.display = 'block';
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
            }
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
                Util.deleteColumn(currentColumn);
                Util.hideMenu();
            };

            Util.clearColumnCallback = function () {
                Util.clearColumn(currentColumn);
                Util.hideMenu();
            };

            document.getElementById('insert').addEventListener('click', Util.insertColumnCallback, false);
            document.getElementById('delete').addEventListener('click', Util.deleteColumnCallback, false);
            document.getElementById('clear').addEventListener('click', Util.clearColumnCallback, false);
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
        document.getElementById('delete').removeEventListener('click', Util.deleteColumnCallback, false);
        document.getElementById('clear').removeEventListener('click', Util.clearColumnCallback, false);
    },

    insertRow: function (currentRow) {
        var myTable = document.getElementById('myTable');
        var insertedPosition = currentRow + 1;
        var newRow = document.createElement('tr');

        for (var i = 0; i < myTable.firstChild.childElementCount; ++i) {
            var td = document.createElement('td');
            var helperDiv = document.createElement('div');
            td.appendChild(helperDiv);
            var textNode = document.createElement('text');
            helperDiv.style.width = myTable.children[currentRow].children[i].firstChild.clientWidth + 'px';
            helperDiv.appendChild(textNode);
            td.setAttribute('class', 'cell');

            if (i == 0) {
                var horizontalDiv = document.createElement('div');
                horizontalDiv.setAttribute('class', 'horizontalDiv');
                horizontalDiv.addEventListener('mousedown', Util.moveOnColumn, false);
                helperDiv.appendChild(horizontalDiv);
                td.setAttribute('class', 'rowHeader');
                textNode.innerText = insertedPosition;
            } else {
                textNode.setAttribute('contentEditable', true);
            }

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
            var tdHeight = myTable.children[row].children[currentColumn].firstChild.clientHeight;

            helperDiv.style.height = tdHeight + 'px';
            var positionNode = myTable.children[row].children[insertPosition];

            if (row == 0) {
                var lineDiv = document.createElement('div');
                lineDiv.setAttribute('class', 'lineDiv');
                lineDiv.addEventListener('mousedown', Util.moveOnColumn, false);
                helperDiv.appendChild(textNode);
                helperDiv.appendChild(lineDiv);
                newTD.setAttribute('class', 'columnHeader');
            }
            Util.insertAfter(newTD, myTable.children[row].children[currentColumn]);
            newTD.appendChild(helperDiv);
        }

        var rowHeader = myTable.children[0];
        for (var i = insertPosition; i < rowHeader.childElementCount; ++i) {
            if(i <= 26){
                rowHeader.children[i].firstChild.firstChild.innerText = String.fromCharCode(i + 64);
            } else {
                rowHeader.children[i].firstChild.firstChild.innerText = String.fromCharCode(i-27 + 97);
            }

        }
    },

    insertAfter: function (newNode, referenceNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    },

    deleteColumn: function (currentColumn) {
        var mytable = document.getElementById('myTable');
        var tableWidth = mytable.clientWidth;
        for(var row = 0; row < mytable.childElementCount; ++row) {
            var trNode = mytable.children[row];
            var toBeDeletedNode = trNode.children[currentColumn];
            if(row == 0) {
                tableWidth -= toBeDeletedNode.clientWidth;
                mytable.style.width = tableWidth + 'px';
            }
            trNode.removeChild(toBeDeletedNode);
        }

        // update column index
        for(var i = currentColumn; i < mytable.children[0].childElementCount; ++i) {
            var currentColumnNode = mytable.children[0].children[i].firstElementChild.firstChild;
            currentColumnNode.innerText = String.fromCharCode(i + 64);
        }
    },

    clearColumn: function (currentColumn) {
        var myTable = document.getElementById('myTable');
        for(var row = 1; row <myTable.childElementCount; ++row) {
            var trNode = myTable.children[row];
            trNode.children[currentColumn].firstChild.firstChild.innerText = '';

        }
    },

    mouseMoveCallback: null,
    mouseUpCallback: null,

    moveOnColumn: function (mouseDownEvent) {

        var currentLineDiv = mouseDownEvent.target;
        var divHelperInDiv = currentLineDiv.parentNode;
        var isColumnMove = true;
        var tableNode = divHelperInDiv.parentNode.parentNode.parentNode;
        var mousePositionToLineDivBorder = mouseDownEvent.clientX - currentLineDiv.getBoundingClientRect().left;
        var lineStyle = tableNode.clientHeight;

        if(currentLineDiv.className == 'horizontalDiv'){
            isColumnMove = false;
            mousePositionToLineDivBorder = mouseDownEvent.clientY - currentLineDiv.getBoundingClientRect().top;
            lineStyle = tableNode.clientWidth;
        }

        currentLineDiv.classList.add('selected');

        // mouse move event handler
        Util.mouseMoveCallback = function (mouseMoveEvent) {
            mouseMoveEvent.preventDefault();
            Util.changeThePseudoElementRule(lineStyle, isColumnMove);

            var offset = mouseMoveEvent.clientX - currentLineDiv.getBoundingClientRect().left
                - mousePositionToLineDivBorder;

            if(isColumnMove) {
                currentLineDiv.style.left = currentLineDiv.offsetLeft + offset + 'px';
                currentLineDiv.style.right = 'inherit'

            }
            else {
                offset = mouseMoveEvent.clientY - currentLineDiv.getBoundingClientRect().top
                    - mousePositionToLineDivBorder;
                currentLineDiv.style.top = currentLineDiv.offsetTop + offset + 'px';
                currentLineDiv.style.left = '0px';
            }

        };



        // mouseup event handler
        Util.mouseUpCallback = function (mouseUpEvent) {

            document.removeEventListener('mousemove', Util.mouseMoveCallback, false);
            Util.removeStyleElement();

            if(isColumnMove) {
                var originalTDWidth = divHelperInDiv.clientWidth;
                var newWidth = currentLineDiv.offsetLeft  + (currentLineDiv.clientWidth - 1) / 2;
                var tableWidth = tableNode.offsetWidth;

                tableWidth += newWidth - originalTDWidth;
                divHelperInDiv.style.width = newWidth + 'px';
                currentLineDiv.style.right = '-7px';
                currentLineDiv.style.left = 'inherit';
                tableNode.style.width = tableWidth + 'px';
            } else {
                var originalTDHeight = divHelperInDiv.clientHeight;
                var newHeight = currentLineDiv.offsetTop + (currentLineDiv.clientHeight - 1) / 2;
                var tableHeight = tableNode.offsetHeight

                tableHeight += newHeight - originalTDHeight;
                divHelperInDiv.style.height = newHeight + 'px';
                currentLineDiv.style.left = '0px';
                currentLineDiv.style.bottom = '7px';
                divHelperInDiv.style.lineHeight = newHeight + 'px';
                divHelperInDiv.style.textAlign = 'center';
                tableNode.style.height = tableHeight + 'px';
            }


            document.removeEventListener('mouseup', Util.mouseUpCallback, false);

            if(isColumnMove) {
                currentLineDiv.setAttribute('class', 'lineDiv');
                Util.updateCurrentColumnWidth(divHelperInDiv, newWidth);

            } else {
                currentLineDiv.setAttribute('class', 'horizontalDiv');
                Util.updateCurrentRowHeight(divHelperInDiv, newHeight);
            }

        };

        document.addEventListener('mousemove', Util.mouseMoveCallback, false);
        document.addEventListener('mouseup', Util.mouseUpCallback, false);

    },


    removeStyleElement: function () {
        var element = document.getElementsByTagName('style'), index;
        for(idnex = element.length - 1; index >= 0; --index) {
            element[idnex].parentNode.removeChild(element[index]);
        }
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

    updateCurrentRowHeight: function (divHelperDiv, newHeight) {
        var currentTable = document.getElementById('myTable');
        var length = currentTable.children[0].childElementCount;
        var currentRowIndex = divHelperDiv.parentNode.parentNode.rowIndex;

        for(var col = 1; col < length; ++col) {
            var currentTD = currentTable.children[currentRowIndex].children[col];
            currentTD.firstElementChild.style.height = newHeight + 'px';
        }
    },

    changeThePseudoElementRule: function (lineStyle, isColumnMove) {
        if(!document.getElementsByTagName('style').length) {
            var style = document.createElement('style');
        } else {
            var style = document.getElementsByTagName('style')[0];
        }
        document.head.appendChild(style);
        var sheet = style.sheet;

        if (isColumnMove) {
            sheet.addRule('div.lineDiv.selected:after', 'height: ' + lineStyle + 'px;');
        } else {
            sheet.addRule('div.horizontalDiv.selected:after', 'width: ' + lineStyle + 'px;');
        }

    },
    inputDivSetted: false,

    inputDiv: function (event) {
        var td = event.target.parentNode;
        var textNode = event.target.firstChild;
        var divForInput = document.getElementById('inputDiv');
        console.log('row: ' + td.parentNode.rowIndex + ' column: ' + td.cellIndex);

        divForInput.removeEventListener('focus', Util.getContentFromTextNode, false);
        divForInput.removeEventListener('blur', Util.extractDivContentsToText, false);
        divForInput.removeEventListener('keypress', Util.completeInput, false);

        if(td.className == 'cell'){

            function setDivPosition() {
                divForInput.style.left = td.getBoundingClientRect().left + window.pageXOffset+ 'px';
                divForInput.style.top = td.getBoundingClientRect().top + window.pageYOffset + 'px';
                console.log('scroll-left: ' + divForInput.scrollLeft + ' scroll-top: ' + divForInput.scrollTop);
                console.log('left: ' + divForInput.style.left + ' top: ' + divForInput.style.top);
                console.log('window.pageYOfset: ' + window.pageYOffset);
                console.log('windows.pageXoffset: ' + window.pageXOffset);
            }

            divForInput.setAttribute('contenteditable', true);
            divForInput.setAttribute('class', 'selected');
            divForInput.style.display = 'block';
            divForInput.style.minWidth = td.clientWidth + 'px';
            divForInput.style.minHeight = td.clientHeight + 'px';
            divForInput.position = 'absolute';
            setDivPosition();

            Util.getContentFromTextNode = function () {
                divForInput.innerText = textNode.textContent;
                divForInput.style.backgroundColor = td.style.backgroundColor;
                textNode.textContent = '';
            };

            Util.extractDivContentsToText = function () {
                //console.log('Output content to text node.....');
                console.log('+row: ' + td.parentNode.rowIndex + ' +column: ' + td.cellIndex);
                //console.log('Div Contents: ' + divForInput.innerText);
                textNode.textContent = divForInput.innerText;
                divForInput.style.display = 'none';
                divForInput.innerText = '';
                divForInput.removeEventListener('focus', Util.getContentFromTextNode, false);
                divForInput.removeEventListener('blur', Util.extractDivContentsToText, false);
                document.getElementById('layout').removeEventListener('scroll', Util.extractDivContentsToText, false);
                Util.inputDivSetted = false;
            };

            Util.completeInput = function (keyPressEvent) {
                if(keyPressEvent.which == 13) {  // enter press event trigger
                    Util.extractDivContentsToText();
                    divForInput.setAttribute('contenteditable', false);
                    divForInput.removeEventListener('keypress', Util.completeInput, false);
                };
            }


                divForInput.addEventListener('focus', Util.getContentFromTextNode, false);
                divForInput.addEventListener('blur', Util.extractDivContentsToText, false);
                divForInput.addEventListener('keypress', Util.completeInput, false);
                document.getElementById('layout').addEventListener('scroll', Util.extractDivContentsToText, false);

        }
    },

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
    var lineDivNodes = document.getElementsByClassName('lineDiv');
    var horizontalDivNodes = document.getElementsByClassName('horizontalDiv');
    for(var i = 0; i < lineDivNodes.length; ++i) {
        lineDivNodes[i].addEventListener('mousedown', Util.moveOnColumn, false);
    }

    for(var i = 0; i < horizontalDivNodes.length; ++i) {
        horizontalDivNodes[i].addEventListener('mousedown', Util.moveOnColumn, false);
    }
}


function testForExcelMenu() {
    Util.makeDivMenu();
    Util.hideMenu();
    var myTable = document.getElementById('layout');
    myTable.addEventListener('contextmenu', Util.showMenu, false);
    document.addEventListener('click', Util.hideMenu, false);
}


function testForInputDiv() {
    Util.createInputDiv();
    var myTableLayout = document.getElementById('myTable');

    myTableLayout.addEventListener('click', Util.inputDiv, false);
}

init();
testForExcelMenu();
testForInputDiv();
testForLineDiv();
