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
        if(table) {
            for(var i = 0; i < Util.ROW_NUMBER; ++i) {
                var tableRow = document.createElement('TR');
                table.appendChild(tableRow);
            }
        }
    },

    generateTableData: function () {
        var tableRows = document.getElementsByTagName('tr');
        var rowCounts = tableRows.length;

        for(var i = 0; i < rowCounts; ++i) {
            var alpha = 65;
            var currentRow = tableRows[i];

            for(var j = 0; j < Util.COLUMN_NUMBER + 1; ++j) {  // initialize the excel header
                var currentTableData = document.createElement('TD');
                currentTableData.setAttribute('class', 'cell');
                var textNode = document.createElement('text');


                if(i == 0 && j > 0) {  // top left is blank
                    textNode.innerHTML = String.fromCharCode(alpha);
                    currentTableData.setAttribute('class', 'columnHeader');
                    ++alpha;

                } else {
                    if(j == 0 && i) {
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

    coverDivOnTableData: function () {
        alert('sss');
    },
};


document.getElementsByTagName('body').onload = Util.generateTable();

document.getElementById('myTable').onclick = test();

function test() {
    alert('Hello');
}
/*
table.addEventListener('onclick', test, false);*/