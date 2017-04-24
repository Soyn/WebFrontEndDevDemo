# Javascript中的This
## Javascript中的this常见用法：

- 常见用法：
    - 示例一(正常函数调用)：

    ```javascript
        var obj = {};
        obj.x = 1;
        obj.getX = function (){
            alert(this.x);
        };
        obj.getX();  // 输出1
    ```
    在示例一中，执行obj.getX()的时候，函数是作为obj的方法调用的，所以此时this指针指向的是obj对象，这里和C++中this的用法没有差异。

    - 示例二（对象中方法的调用）：
        ```javascript
            var checkThis = function() {
                alert(this.x);
            };

            var x = 'this is a property of windows';

            var obj = {};
            obj.x = 100;
            obj.getX = function() {
                alert(this.x);
            };
            var foo = obj.getX;

            obj.getX();  // 输出100，this指向obj
            checkThis();  // 输出‘this is a property of window’this指向全局的windows对象
            foo();  //输出'this is a property of window'，this指向全局的windows对象
        ```
        示例二中让人不解的是后两个调用，在javascript的变量作用域中，有一条规则，`全局变量都是window对象`，所以这里的checkThis()相当于windows.checkThis(),foo()相当于window对象，所以现在来看这个输出也不奇怪了

        - 示例三(函数闭包导致的诡异现象)：
            ```javascript
                script type="text/javascript">
                var obj = {
                x: 100,
                console.log();
                foo: function () {
	                function bar() {
		                alert(this.x);  // 输出undefined
                    };
                    bar();
                    }
                };
                obj.foo();
            ```
            在示例三种诡异的是输出的值是`undefined`，我们加上调试日志，来观察一下`this`的指向
            如下：
            ```javascript
                var obj = {
                    x: 100,
                    foo: function () {
                    console.log(this === obj); // 输出为true
	                function bar() {
	                console.log(this === window); //输出为true
		            alert(this.x);
                    };
                bar();
                }
            };
            obj.foo();
            ```
            从调试log中发现在`foo`的闭包中我们发现`this`的指向变为了`window`而不是`obj`，我们来回忆整个调用的过程，在执行`obj.foo(()`的时候，我们先调用到外部的匿名函数，然后到内部的闭包，在调用到内部的闭包时，我们需要找`x`的值，而此时的`this`的并没有像我们预期的那样，而是指向了`window`对象，但是在全局环境下并没有定义`x`所以输出`underfined`。

            - 示例三（事件绑定中的`this`指针）:
                ```javascript
                    var one = document.getElementById('one');
                    one.addEventListener('click', callback, false);
                ```
                在这种事件绑定上，大多数情况下`this`指针指向触发事件的`DOM`对象.

## - Summary
    以上所表示的例子并不包含node环境，但是总体原则是，如何正确的使用`this`，`this`的变量值实际上和其上层对象的调用相关，并不完全像C++或者Java等面向对象的语言一样，这点注意区分，特别是函数闭包所带来的诡异现象

##  Reference
    [this MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
    [all this](http://bjorn.tipling.com/all-this)
    [Javascript中this的用法](http://www.ruanyifeng.com/blog/2010/04/using_this_keyword_in_javascript.html)
    [深入理解Javascript中的this]http://www.cnblogs.com/rainman/archive/2009/05/03/1448392.html()
