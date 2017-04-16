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
                var alpha = 65;
                var currentRow = tableRows[i];

                for (var j = 0; j < Util.COLUMN_NUMBER + 1; ++j) {  // initialize the excel header
                    var currentTableData = document.createElement('TD');
                    currentTableData.setAttribute('class', 'cell');
                    var textNode = document.createElement('text');


                    if (i == 0 && j > 0) {  // top left is blank
                        textNode.innerHTML = String.fromCharCode(alpha);
                        currentTableData.setAttribute('class', 'columnHeader');
                        ++alpha;

                    } else {
                        if (j == 0 && i) {
                            currentTableData.setAttribute('class', 'rowHeader');
                            textNode.innerHTML = i;
                        } else {
                            textNode.setAttribute('contentEditable', true);
                        }
                    }

                    currentTableData.appendChild(textNode);
                    currentRow.appendChild(currentTableData);
                }
            }
        },

        createNativeMenuBody: function (rowNumber, menuOptions) {

            var divMenu = document.createElement('div');
            divMenu.setAttribute('id', 'contextMenu');
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
            var td = event.target;
            if (td.nodeName.toLowerCase() == 'text') {
                td = td.parentNode;
            }

            var triggerElementClassName = td.className;
            if (triggerElementClassName == 'rowHeader' || triggerElementClassName == 'columnHeader') {
                var posX = event.clientX + window.pageXOffset + 'px';
                var posY = event.clientY + window.pageYOffset + 'px';
                var menuLayout = document.getElementById('contextMenu');

                menuLayout.style.display = 'block';
                menuLayout.style.position = 'absolute';
                menuLayout.style.left = posX;
                menuLayout.style.top = posY;
            } else {
                if (triggerElementClassName == 'cell') {
                    Util.hideMenu();
                }
            }

            if(triggerElementClassName == 'rowHeader') {
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
            } else {
                var currentColumn = td.index;

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
                }
            }
        },

        insertRowCallback: null,
        deleteRowCallback: null,
        clearRowCallback: null,

        insertColumnCallback: null,
        deleteColumnCallback: null,
        clearColumnCallback: null,


        hideMenu: function () {
            document.getElementById('contextMenu').style.display = 'none';
            document.getElementById('insert').removeEventListener('click', Util.insertRowCallback, false);
            document.getElementById('clear').removeEventListener('click', Util.clearRowCallback, false);
            document.getElementById('delete').removeEventListener('click', Util.deleteRowCallback, false);
        },

        insertRow: function (currentRow) {
            var myTable = document.getElementById('myTable');
            var insertedPosition = currentRow + 1;
            var newRow = document.createElement('tr');

            for(var i = 0; i < Util.COLUMN_NUMBER + 1; ++i) {
                var td = document.createElement('td');
                var textNode = document.createElement('text');

                td.setAttribute('class', 'cell');

                if(i == 0) {
                    td.setAttribute('class', 'rowHeader');
                    textNode.innerText = insertedPosition;
                } else {
                    textNode.setAttribute('contentEditable', true);
                }

                td.appendChild(textNode);
                newRow.appendChild(td);

            }


            myTable.insertBefore(newRow, myTable.children[insertedPosition]);
            // update the row number
            for(var row = insertedPosition; row < myTable.childElementCount; ++row) {
                myTable.children[row].firstElementChild.innerText = row;
            }
        },

        deleteRow: function (currentRow) {
            var myTable = document.getElementById('myTable');
            myTable.removeChild(myTable.children[currentRow]);

            for(var row = currentRow; row < myTable.childElementCount; ++row) {
                myTable.children[row].firstElementChild.innerText = row;
            }
        },
        
        clearRow: function (currentRow) {
            var myTable = document.getElementById('myTable');
            var trNode = myTable.children[currentRow];
            for(var i = 1; i < trNode.childElementCount; ++i) {
                trNode.children[i].firstElementChild.innerText = '';
            }
        },

        insertColumn: function (currentColumn) {
            var myTable = document.getElementById('myTable');
            var insertPosition = currentColumn + 1;
            for(var row = 0; row < myTable.childElementCount; ++row) {
                var newTD = document.createElement('td');
                var textNode = document.createElement('text');
                myTable.insertBefore(newTD, myTable.children[row].children[insertPosition]);
                newTD.appendChild(textNode);


        },

        deleteColulmn: function (currentColumn) {
            
        },
    
        clearColumn: function () {
            
        },



};

function test() {
    var myTable = document.getElementById('layout');
    myTable.addEventListener('click', Util.showMenu);
}
Util.generateTable();
Util.makeDivMenu();
Util.hideMenu();
test();
