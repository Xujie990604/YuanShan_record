# css选择器

1. element > element(div>p) 直接子元素选择器用于选取带有特定父元素的元素。
注释：如果元素不是父元素的直接子元素，则不会被选择。
2. element + element (div + p) 相邻兄弟选择器。可选择紧接在另一元素后的元素，且二者有相同父元素。
3. element ~ element (div ~ p) 兄弟选择器 二者具有相同的父元素，并且不一定位置上紧紧相连。
4. [attribute] [type]  属性选择器 选择带有 target 属性所有元素。
5. [attribute = value] [type = "text"] 属性选择器 选择 target="_blank" 的所有元素。
6. :focus input:focus 伪类选择器 选择获得焦点的 input 元素。
7. :first-child (p:first-child) p元素的父元素的第一个子元素并且是p元素。
8. :last-child (p:last-child) p元素的父元素的倒数第一个子元素并且是p元素。
9. :nth-child(n) (p:nth-child(2)) 选择属于其父元素的第二个子元素，并且是p元素 even 偶数 odd 奇数 2n + 1 n从零开始
10. :nth-last-child(n) (:nth-last-child(2)) 选择属于其父元素的倒数第二个子元素，并且是p元素
11. :first-of-type (p:first-of-type) 选择属于其父元素的首个p元素
12. :last-of-type (p:last-of-type) 选择属于其父元素的最后一个p元素
13. :nth-of-type(n) (p:nth-of-type(2)) 选择属于其父元素第二个p元素
14. :nth-last-of-type(n) p:nth-last-of-type(2) 选择属于其父元素倒数第二个p元素
15. :not(selector) :not(p) 选择非p元素的每个元素。(可以连续使用)
16. 属性以什么开头(^=)，结尾($=)，包含(~=)，存在(*=)等于都有对应的选择器。
17. :enable  :disabled 表单元素的可用和不可用
18. :checked 被选中的表单元素
19. :root 根文档选择器
20. :empty 空标签选择器，一个空格都不行。伪元素添加的话不算文本内有东西。伪元素不占DOM结构。
21. :selection 使用鼠标选中（突出显示的文本）时，才会出现的样式。 user-select: none;不允许用户选中文本。
