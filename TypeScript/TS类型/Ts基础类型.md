# TypeScript

* :string 代表的是 TS 中的字符串类型
* :String 代表的是 JS 中的字符串包装类类型

## 类型推断

* 就算是在定义值的时候你没有手动的定义类型，系统也会根据第一次的赋值类型来规范数据，首次赋值为 string 之后，就不能在复制 number 类型了

## 类型断言

* 适用于你比 Typescript 更加了解某个值的详情
* 把一个比较 `宽泛` 的类型转成一个更加 `具体` 的类型

```ts
// 尖括号语法
let someValue: any = "this is a string";
// 相当于强制的把 any 类型转化为 string 类型，两种形式是等价的.
let strLength: number = (<string>someValue).length;

// as 语法
let someValue1: any = "this is a string";
// 相当于强制的把 any 类型转化为 string 类型，并且我明确的知道这个就是 string 类型的数值
let strLength1: number = (someValue1 as string).length;
```

## TS 中的符号

### `?.` 可选链

```ts
// 可选链是为了避免冗余的前置检验
// 不使用可选链
if(user && user.info && user.info.name) {
  console.log(user.info.name)
}
```

```ts
// 使用可选链
// TS 在尝试访问 user.info.name 之前会先检查 user 是否为 null 或者 undefined
// TS 在尝试访问 user.info.name 之前会先检查 user.info 是否为 null 或者 undefined
// 如果上一级的属性不存在，那么表达式的返回值为 undefined
user?.info?.name
```

### `??` 空值合并运算符

```ts
// ?? 属于高级的 ||

const user = { number: 10 }

// 只有当 user.number 为 null 或者 undefined 的时候才会返回 '暂无数据'
user.number ??  '暂无数据'    
// 当 user.number 为 false 类型(undefined, null, false, 0, '')时就会返回 '暂无数据'
// 所有的 false 类型都会返回 '暂无数据'，有时候会出现意料之外的行为
user.number || '暂无数据'
```

### `!` 非空断言

```ts
let user: undefined | { number: 1 } = xxxx
// ! 能够缩小 TS 的类型检查范围
// 这会告诉编辑器 user 不会是 undefined 或者 null
// 但是也仅仅是骗过了编辑器而已，如果 user 实际值为 undefined 则程序运行起来之后照样会报错
console.log(user!.number)
```

## 基础类型

### 布尔类型

* 布尔值 isTrue: boolean

### 数字类型

* 数字 num: number TS 中所有的数字都是浮点数(不区分浮点数和整数类型)

### 字符串类型

* 字符串 str: string

### undefined null

```ts
let u: undefined = undefined
let n: null = null
```

## any

* 在你不确定变量的指定类型的时候，使用 any 来取消类型检查。any 是类型系统的顶级类型
* any 类型可以接收任何类型，也可以赋值给任何类型
* 和 object 类型的区别在于，尽管你能给 object(必须是大写的O)类型赋任何值，但是你不能调用对应的方法。any 支持调用对应的方法。

```ts
// 当给一个数据 object 类型注解时，无法拿到对象上的属性，但是可以拿到对象原型链上的方法 toString valueOf 等
const obj: object = {
  name: 'xujie',
  age: 12
}
console.log(obj.toString()) // 支持调用
console.log(obj.name)       // 不支持调用

const obj: any = {
  name: 'xujie',
  age: 12
}
console.log(obj.name)       // 支持调用
console.log(obj.toString()) // 支持调用

// 利用 any 来定义包含不同数据类型的数组
let list: any[] = [1, "xujie", false];
list[1]  //xujie
```

### unknown

* unknown 类型能接受任何类型(unknown 也是类型系统的顶级类型)

### void

* 表示没有类型，当一个函数没有返回值的时候通常定义返回类型为 void。
* 声明一个 void 类型的变量没有什么意义，因为只能被赋值 undefined 或者 null。

### never 类型

1. 表示的是永不存在的值的类型
2. never 类型是那些总是会抛出异常或者根本就不会有返回值的函数的返回值类型。
3. never 是任何类型的子类型，可以赋值给任何类型，没有任何类型是 never 的子类型(除了自身),即使是 any 也不能赋值给 never。

### 数组类型

* ```list: number[] = [1, 2, 3]```   类型后面接上 [] 表示由只某种类型元素构成的数组  
* ```list: Array<number> = [1, 2, 3]``` (不推荐使用这种形式，<> 语法在 jsx 中会识别异常)  Array<元素类型>  使用数组泛型来定义

### 元组类型

* 允许表示一个已知数量和类型的数组，各元素的类型不必相同，越界访问的时候，会使用联合数据类型代替。也就是说你可以越界定义一个值为 string 或者是 number ，但是不能越界定义一个 Boolean 类型的值(!:测试时发现并不能越界访问和读取, 可能是 TS 版本问题也可能是开启了严格模式)

```typeScript
let arr: [string, number];
arr = ['xujie', 12] //ok
x= [12, 'xujie']  //Error

const b = arr[0] // TS 会推断出来 b 是个 string 类型
```

### 枚举类型

是 JS 标准数据类型的一个补充。使用枚举类型可以为一组数值赋予友好的名字，下标值默认从 `零` 开始，也可以自己手动赋值。

```ts
// 定义一组常量
// 这样做的话是代码的可读性特别好
enum Position {
  LEFT,
  RIGHT
}

function test(position: Position) {
  switch(position){
    case Position.LEFT:
      console.log('left')
      break;
    case Position.RIGHT:
      console.log('right')
      break;
      default:
        // 这是 never 类型的一个典型应用，任何类型的值都不能被赋值给 never
        // 如果正常传入参数的话是不会执行到 default 这步的，如果执行到了这步说明入参有问题
        // 我们就可以在这个错误的逻辑块中执行一个违规的操作。如果进入了这个逻辑块就会报错
        let result: never = position
  }
}

// 其实 Position.LEFT 是有值的，具体值为 0 
// 其实传参数的时候，也就是把 0 传进去了。但是我们并不关心这个值是多少，这样写的话代码可读性非常好，一眼就看出了我想要执行的是 left 相关的操作。否则的话还需要定义一个映射表 0-left 1-right 然后当参数为 0 时执行 left 相关的操作
// 并且在传参时，输入 Position. 编辑器会提示你有几种类型的值可以传
test(Position.LEFT)
```

### object 类型

* 表示非原始类型数据，也就是除了 number，string，boolean，symbol，null，或者 undefined 之外的类型。
* object 作为函数的参数时，不能和被赋值 number，string 等等类型

### 联合类型

```ts
// 表示一个变量可能是几种数据类型
let a: number | string

a = 123
a = 'xujie'

// 字面量类型和联合类型结合
// 字面量类型的值和类型必须保持一致
type positionType = 'left' | 'right'

let a: positionType = 'left'   // 赋值成功
let b: positionType = 'middle' // 赋值失败
```
