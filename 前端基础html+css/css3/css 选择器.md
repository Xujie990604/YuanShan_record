# css选择器

1. element > element(div>p) 直接子元素选择器用于选取带有特定父元素的元素。
注释：如果元素不是父元素的直接子元素，则不会被选择。
2. element + element (div + p) 相邻兄弟选择器。可选择紧接在另一元素后的元素，且二者有相同父元素。
3. element ~ element (div ~ p) 兄弟选择器 二者具有相同的父元素，并且不一定位置上紧紧相连。
4. [attribute] [type]  属性选择器 选择带有 target 属性所有元素。
5. [attribute = value] [type = "text"] 属性选择器 选择 target="_blank" 的所有元素。
6. 属性以什么开头(^=)，结尾($=)，包含(~=)，存在(*=)等于都有对应的选择器。
7. :focus input:focus 伪类选择器 选择获得焦点的 input 元素。
8. :first-child (p:first-child) p元素的父元素的第一个子元素并且是p元素。
9. :last-child (p:last-child) p元素的父元素的倒数第一个子元素并且是p元素。
10. :nth-child(n) (p:nth-child(2)) 选择属于其父元素的第二个子元素，并且是p元素 even 偶数 odd 奇数 2n + 1 n从零开始
11. :nth-last-child(n) (:nth-last-child(2)) 选择属于其父元素的倒数第二个子元素，并且是p元素
12. :first-of-type (p:first-of-type) 选择属于其父元素的首个p元素
13. :last-of-type (p:last-of-type) 选择属于其父元素的最后一个p元素
14. :nth-of-type(n) (p:nth-of-type(2)) 选择属于其父元素第二个p元素
15. :nth-last-of-type(n) p:nth-last-of-type(2) 选择属于其父元素倒数第二个p元素
16. :not(selector) :not(p) 选择非p元素的每个元素。(可以连续使用) li:not(.a)选择li中类名不带有a的li。
17. :enable  :disabled  :checked 表单的伪类有很多
18. :root 根文档选择器
19. :empty 空标签选择器，一个空格都不行。伪元素添加的话不算文本内有东西。伪元素不占DOM结构。
20. :selection 使用鼠标选中（突出显示的文本）时，才会出现的样式。 user-select: none;不允许用户选中文本。

!!! 伪类选择器的：前最好放置的是元素的类型比如p div啥的。如果放置类名的话会有不预期的效果。

* div:nth-of-type(2)  div用来确定范围 在div的父元素下的第二个div
* .a:nth-of-type(2)   没有指定元素类型，那就自动把所有的元素类型都过一遍。每种元素类型的第二个都被选中
* div.a：nth-of-type(2) div用来指定范围，.a用来限定结果。 div(意味着，如果div.a前面有div.b他也在范围内)的父元素下的第二个div被选中。并且必须是带有.a的类名。

```html
<style>
    div.a:nth-of-type(2) { color: red; }
    </style>
</head>
<body>
    <div>
        <div class="a">1</div>
        <div class="b">2</div> 这种情况就很特殊，div父元素的第二个是div.b。不带有a类名，所以这个选择器没有选择任何DOM
        <div class="a">3</div>
        <div class="a">4</div>
    </div>
</body>
```

```html
<style>
        * {
            padding: 0;
            margin: 0;
        }

        .xujie .a:nth-of-type(2) {
            color: red;
        }
    </style>

    <div class="xujie">
        <div class="a">1</div>
        <div class="a">2</div> //红色
        <p class="b">3</p>
        <p class="a">4</p>     //红色 并没有按照预期的想法在.a的DOM数组中挑选第二个，而是分别在DIV，P，SPAN的类型下挑选的第二个并且带有类名a。
        如果伪类选择器的前面的修饰符是div的话，就只会在div中找第二个，如果是.a的话，就会在每种元素类型下都寻找一遍第二个。
        <span class="c">5</span>
        <span class="c">6</span>
    </div>
```
