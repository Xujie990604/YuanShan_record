# 栈

- 后进先出

## 定义栈

- 借用数组的数据结构定义栈
- 借用对象的数据结构定义栈

## 栈的应用

### 十进制转化为二进制

```js
// 十进制转化为二进制
function decimalToBinary(devNumber) {
  // 借用的栈数据类型
  const remStack = new Stack();
  // 当前被除数
  let number = devNumber;
  // 当前余数
  let rem;
  // 最终结果
  let binaryString = "";

  // 如果当前被除数大于零，继续进行除法操作
  while (number > 0) {
    rem = Math.floor(number % 2);
    // 将当前余数放进栈中
    remStack.push(rem);
    // 得到最新的被除数
    number = Math.floor(number / 2);
  }
  // 如果栈非空，使用pop()将栈内数据一个个取出
  while (!remStack.isEmpty()) {
    binaryString += remStack.item.pop().toString();
  }
  return binaryString;
}
```
