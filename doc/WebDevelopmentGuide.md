# 以下是我在将近一个月的Web开发培训中的心得和体会，记录下来给后续参加相关培训的新人有个参考和指导

## 个人背景
- 2017校招应届生
- 熟悉C/C++，有*NIX下的编程经验和服务端开发能力
- 了解PHP开发（有过相关开发经验），来公司之前未接触过Web前端开发

## 前端基础篇
- **HTML**

     - **HTML是整个web前端的骨架，标签很多，最主要是对常用的元素熟悉掌握，重点区分块级元素和行内元素的区别，理解文档流的概念，其中比较坑的一点是Table元素的使用，在用Table布局的时候，Table自适应的特点对于某些场景下并不是好的选择**
     - **在学习HTML的时候多实践看不同元素的表现，不要仅仅停留在概念上**
     - **w3School的HTML相关的内容足够熟悉和入门**
- **CSS**
    - **CSS布局的坑会在实际的编程的时候会遇见，这一块主要是要搞懂CSS布局每个属性的作用，同时对要改变样式的元素的属性也要心里有数（块级元素和行内元素的表现是不同的）**
    - **CSS布局中重点在于理解position属性，特别是absolute、relative的区别，这篇文章讲的比较清楚==》[对CSS中的Position、Float属性的一些深入探讨](http://www.cnblogs.com/coffeedeveloper/p/3145790.html)**
    - **CSS中还存在一点坑的的就是计算各种偏移量的时候会遇见问题，由于content会overflow所以往往会伴随着scroll产生偏移，如果没有考虑到这些的话往往会产生奇怪的偏移的问题，在计算偏移的时候要知道存在viewport page和page，这篇MSDN上的文章有各种偏移的计算==》[Measuring Element Dimension and Location with CSSOM in Windows Internet Explorer 9](https://msdn.microsoft.com/en-us/library/hh781509(VS.85).aspx)**
    - **学习CSS布局的时候看w3school的材料足够了，快速浏览实验一遍，编程时遇见问题查询google即可，[CSS-TRICKS](https://css-tricks.com/guides/)上的文章写的不错，可以看看**
- **Javascript**
    - **Javascript是整个培训中需要大量时间去学习和实践的，同时也是整个前端开发的核心，HTML和CSS算不上是编程语言，核心在于JS的使用，但是在JS不熟悉的时候JS会存在一些反直觉的东西，例如：**

        ```javascript
            ``````
            ``````
            var sum = 0
            for(var i = 0; i < 10; ++i) {
                sum += i
            }
            console.log(i)  // 输出45
            ``````
            ``````
        ```
        **有过静态语言编程开发经验的，看着这个程序肯定会说报错，报undefined的错误，可是在JS中由于缺少块级作用域，for循环中的变量i是全局的，这种情况在ES6出现之后得到缓解，更加符合编程直觉，javascript中的this也和其他语言不一样，C++中的this和当前这个对象绑定，Python中的self同样也和当前对象绑定，但是js中的this就会变化，js中的this代表了执行程序的上下文，简而言之就是this的指向的是谁调用当前函数的对象，这点和其他语言有很大不同，ES6的出现一定程度上解决了类内部的this的指向，但是在事件绑定的时候还this还存在一定的坑**

        ```javascript
            /**
             * ES6 style
             */
            let x = 10
            class Foo {
                constructor(x, y){
                    this.x = x
                    this.y = y
                }
                print(){
                    console.log(this)
                    console.log(this.x)
                }
            }

            let foo = new Foo(1,2)
            $('#test').on('click', foo.print)  // undefined
        ```
        **这段程序如果按照对于静态语言的理解的话，this和对象绑定的话，这里应该会调用foo对象中的print并输出foo中的属性值，但是在这里会报错，提示this没有属性x，其实这里的this指向触发事件的dom对象，因为调用来自dom对象，没有定义x属性，所以会undefined**

        **在使用javascript的时候，其实大量的操作都在，拿元素挂事件，挂handler，handler处理事件，在挂event的时候，要记得摘事件，否则会陷入一些奇怪的bug，同时会造成内存泄漏**
    - Javascript推荐资料: [JavaScript高级程序设计](https://book.douban.com/subject/10546125/)


*（孟岩）我主张，在具备基础之后，学习任何新东西，都要抓住主线，突出重点。对于关键理论的学习，要集中精力，速战速决。而旁枝末节和非本质性的知识内容，完全可以留给实践去零敲碎打。*

*“原因是这样的，任何一个高级的知识内容，其中都只有一小部分是有思想创新、有重大影响的，而其它很多东西都是琐碎的、非本质的。因此，集中学习时必须把握住真正重要那部分，把其它东西留给实践。对于重点知识，只有集中学习其理论，才能确保体系性、连贯性、正确性，而对于那些旁枝末节，只有边干边学能够让你了解它们的真实价值是大是小，才能让你留下更生动的印象。如果你把精力用错了地方，比如用集中大块的时间来学习那些本来只需要查查手册就可以明白的小技巧，而对于真正重要的、思想性东西放在平时零敲碎打，那么肯定是事倍功半，甚至适得其反。*

*“因此我对于市面上绝大部分开发类图书都不满——它们基本上都是面向知识体系本身的，而不是面向读者的。总是把相关的所有知识细节都放在一堆，然后一堆一堆攒起来变成一本书。反映在内容上，就是毫无重点地平铺直叙，不分轻重地陈述细节，往往在第三章以前就用无聊的细节谋杀了读者的热情。为什么当年侯捷先生的《深入浅出MFC》和 Scott Meyers 的 Effective C++ 能够成为经典？就在于这两本书抓住了各自领域中的主干，提纲挈领，纲举目张，一下子打通读者的任督二脉。可惜这样的书太少，就算是已故 Richard Stevens 和当今 Jeffrey Richter 的书，也只是在体系性和深入性上高人一头，并不是面向读者的书。*

**以上是我在以前学习C++和网络编程的时候看到一位大牛的引用，在学习任何技术的时候我认为以上说的话都没错，抓住主线和重点，对于关键的东西要深刻理解搞懂，细枝末节和非本质的东西在实战中很早就会暴露出来，容易发现，但是关键性的东西触发bug的时候，如果没有打好基础，很难看到问题出在哪里，我在学习js的过程中，认为重点精力应该放在原型链、继承、函数闭包、js面向对象的设计、DOM以及浏览器的工作原理（Event Loop），同时在学习的过程中要善于利用google，提高英语理解能力，很多时候中文搜出来的内容的数量和质量和英文相比差很多，遇见问题不要着急下断点，先找到能够稳定重现bug的手段，然后不看代码在脑子里面过一下这个逻辑，这时候大致能够找到可能出bug的地方，然后再去做debug**


## JQuery
- **JQuery的学习其实不难，主要是使用的时候，从原生转换到JQuery的习惯问题，在使用的时候注意提醒自己当前的调用是不是JQuery对象在调用，慢慢的就熟悉了，但是JQuery背后的原理值得去研究，不能仅仅停留在用的阶段**
- **推荐学习材料：[Learn JQuery](http://learn.jquery.com/)**
- **[JQuery技术内幕](https://book.douban.com/subject/25823709/)**

## ES6
- **ES6中出现的将以前的一些坑解决掉了，比如出现了class、块级作用域等，学习门槛和从其他编程语言的转换成本进一步降低，ES6的一些feature比如promise、generator是学习的难点和重点**
- **在学习的过程中重点看了以下材料：**
    - [ECMAScript 6 入门](http://es6.ruanyifeng.com/)这是阮一峰写的ES6入门教程，写的很不错，但是不推荐一上手就看这个，这个讲的很细致，但是问题在于太细致了，很多很trick的东西，看了之后也记不住，适合快速过一遍，然后遇见问题查阅
    - [ECMAScript 6 Tutorial](http://ccoenraets.github.io/es6-tutorial/)这个是一个老外写的tutorial，内容不多，可以先过这个
    - [ES6 Features](https://github.com/lukehoban/es6features)github上es6的一个repo，介绍es6的feature，另外MDN是个好网站，大部分Web相关的东西都能找到很好的资料
    - [Exploring ES6](http://exploringjs.com/es6/index.html)大牛写的书，阮一峰的教程很多东西也是参考的这本书，网上有online for free版本，谁适合读这本书呢？作者在书的序中已经写到了，我这里直接粘贴过来：

- ## `Why should I read this book?`

    - ### You decide how deep to go:
        **This book covers ECMAScript 6 in depth, but is structured so that you can also quickly get an overview if you want to.**

    - ### Not just “what”, also “why”:
        **This book not only tells you how ES6 works, it also tells you why it works the way it does.**

- Javascript中的编码风格
    - **Javascript中的编码风格参考整个项目组的编码风格，组内Jacascript编码风格采用google javascript code style，养成良好的编码习惯和风格，避免出现特立独行的写法**
    - [ES6 Code Style(Airbnb)](http://es6.ruanyifeng.com/#docs/style) Airbnb的ES6编码风格
    - [JavaScript 语句后应该加分号么？](https://www.zhihu.com/question/20298345)
    - [JavaScript Semicolon Insertion Everything you need to know](http://inimino.org/~inimino/blog/javascript_semicolons)
    - [JavaScript Standard Style ](https://github.com/feross/standard)
# Summary

在将近一个月的学习中，改变了我以前对于前端开发只是画画页面的刻板印象，前端开发相比于服务端开发，前端知识的迭代更快，特别是前端开发这种直接和产品打交道的岗位，不仅仅要考虑技术上的实现，也要考虑用户体验和交互，对于技术上的学习和追求不能浮在表面，要看到问题本质，理解原理，整个过程是很辛苦，是需要付出很大的努力的，以前看过一本书《暗时间》的作者刘未鹏先生，讲了一句话，至今记忆犹新，兴趣遍地都是，坚持和持之以恒才是稀缺的，希望能与君共勉。