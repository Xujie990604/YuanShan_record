# css选择器

* 有效且结构良好的文档是添加样式的基础

1. element > element(div > p) 直接子元素选择器用于选取带有特定父元素的元素。
注释：如果元素不是父元素的直接子元素，则不会被选择。
2. element + element (div + p) 相邻兄弟选择器。可选择紧接在另一元素后的元素，且二者有相同父元素。
3. element ~ element (div ~ p) 兄弟选择器   可选择位于该元素后面的，所有同辈的兄弟元素。
4. element[attribute]  (div[type])  属性选择器 选择带有 type 属性所有元素。
5. element[attribute = value] (div[type = "text"]) 属性选择器 选择 type="text" 的所有元素。
6. 属性以什么开头(^=)，结尾($=)，包含(~=)，存在(*=)等于都有对应的选择器。
7. :focus (input:focus) 伪类选择器 选择获得焦点的 input 元素。
8. :first-child (p:first-child) 偽元素選擇器 p元素的父元素的第一个子元素并且是p元素。
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

**伪类选择器的前面最好放置的是元素的 类型 例如p div等。如果放置 类名 的话会有不预期的效果。**
