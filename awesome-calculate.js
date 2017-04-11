/**
 * @Author:Created by AlnordWang on 2017/4/11.
 * @Brief: Implementation of reverse poland
 * @Note: Algorithm details in
 * https://zh.wikipedia.org/zh-cn/%E9%80%86%E6%B3%A2%E5%85%B0%E8%A1%A8%E7%A4%BA%E6%B3%95
 * /

/**
 *
 * @param suffixExpression
 * @returns {*}
 */
function calculate(suffixExpression) {
    var result = new Array(100);
    var topOfResult = -1;
    var InvalidInput = false;
    for(var i = 0; i < suffixExpression.length; ++i) {
        if(InvalidInput) {
            break;
        }
        var chr = suffixExpression[i];
        if(topOfResult == -1) {
            ++topOfResult;
            result[topOfResult] = chr;
        } else {
            if(chr.match(/\d/)) {
                ++topOfResult;
                result[topOfResult] = chr;
            } else {
                    var leftOperand = topOfResult - 1;
                switch (chr) {
                    case '+':
                        if(leftOperand >= 0){
                            result[leftOperand] = (result[leftOperand] * 1) + (result[topOfResult] * 1);
                            --topOfResult;
                        } else {
                            InvalidInput = true;
                        }
                        break;
                    case '-':
                        if(leftOperand >= 0) {
                            result[leftOperand] = (result[leftOperand] * 1) - (result[topOfResult] * 1);
                            --topOfResult;
                        } else {

                            InvalidInput = true;
                        }
                        break;

                    case '*':
                        if(leftOperand >= 0) {
                            result[leftOperand] = (result[leftOperand] * 1) * (result[topOfResult] * 1);
                            --topOfResult;
                        } else {
                            InvalidInput = true;
                        }
                        break;

                    case '/':
                        if(leftOperand >= 0) {
                            result[leftOperand] = (result[leftOperand] * 1) / (result[topOfResult] * 1);
                            --topOfResult;
                        } else {
                            InvalidInput = true;
                        }
                        break;
                    case '.':
                        result[topOfResult] = ((result[topOfResult] * 1) / 10.0);
                        --topOfResult;
                        break;
                }
            }
        }
    }

    if(InvalidInput == true) {
        alert("Invalid Input! Plz Check Your Input!");
        return;
    }
    return result[topOfResult];
}

/**
 * @Brief: Convert thw infix expression to suffix expression
 * @param infixExpression
 * @returns {string}
 */
function convertInfixToSuffix(infixExpression) {
    var suffixExpression = '';
    var topOfOperatorArray = -1;
    var operatorArray = new Array(100);

    // core code
    for(var i = 0; i < infixExpression.length; ++i) {
        var chr = infixExpression.charAt(i);

        if(chr.match(/\d/)) {  // digit
            suffixExpression += chr;
            suffixExpression += ','
        } else {  // operator symbol
            if(topOfOperatorArray == -1) { // operator array is empty, push the operator
                ++topOfOperatorArray;
                operatorArray[topOfOperatorArray] = chr;
            } else {
                if(chr == '(' || operatorArray[topOfOperatorArray] == '(') {
                    ++topOfOperatorArray;
                    operatorArray[topOfOperatorArray] = chr;
                } else {
                    if(chr == ')') {
                        while (operatorArray[topOfOperatorArray] != '(') {
                            suffixExpression += operatorArray[topOfOperatorArray];
                            suffixExpression += ',';
                            --topOfOperatorArray;
                        }

                        --topOfOperatorArray;  // pop the '('
                    } else {
                        while(!compare(chr, operatorArray[topOfOperatorArray])) {
                            suffixExpression += operatorArray[topOfOperatorArray];
                            suffixExpression += ',';
                            --topOfOperatorArray;
                            if(topOfOperatorArray == -1) {  // reach the bottom
                                operatorArray[topOfOperatorArray] = chr;
                                break;
                            }
                        }

                        if(compare(chr, operatorArray[topOfOperatorArray]) || topOfOperatorArray == -1) {
                            ++topOfOperatorArray;
                            operatorArray[topOfOperatorArray] = chr;
                        }
                    }
                }
            }
        }
    }

    while(topOfOperatorArray >= 0) {  // until the operator array is empty
        suffixExpression += operatorArray[topOfOperatorArray];
        suffixExpression += ',';
        --topOfOperatorArray;
    }
    suffixExpression = suffixExpression.split(',');
    return suffixExpression.valueOf();
}

function compare(operator1, operator2) {
    return operator1.match(/\*|\//) && operator2.match(/\+|\-/);
}

/**
 * Wrap all the methods
 * @param infixExpression
 * @returns {*}
 */
function awesomeCalculator(infixExpression){
    infixExpression = infixExpression.replace(/\s+/g, '');  // remove spaces
    var suffixExpression = convertInfixToSuffix(infixExpression);
    var result = calculate(suffixExpression);
    return result;
}
