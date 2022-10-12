<!--
 * @Author: xujie 1607526161@qq.com
 * @Date: 2022-04-22 13:10:59
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\Node.js学习\typescript教程\Ts基础类型.md
 * @Description: 
-->
# TypeScript

## 基础类型

* 布尔值 isTrue: boolean
* 数字 num: number Ts中所有的数字都是浮点数
* 字符串 str: string
* 数组 :

1. list: number[] = [1, 2, 3]      元素类型后面接上[]  表示由数字类型构成的数组  
2. list: Array<number> = [1, 2, 3]  Array<元素类型>   使用数组泛型来定义

* 就算是在定义值的时候你没有手动的定义类型，系统也会根据第一次的赋值类型来规范数据，首次赋值为string之后，就不能在复制number类型了(类型推断)

* 元组类型 允许表示一个已知数量和类型的数组，各元素的类型不必相同，越界访问的时候，会使用联合数据类型代替。也就是说你可以越界定义一个值为string或者是number，但是不能越界定义一个Boolean类型的值。

```typeScript
let x: [string,number];
x = ['hello',10] //ok
x= [10,'hello']  //Error
```

* 枚举类型 是js标准数据类型的一个补充。使用枚举类型可以为一组数值赋予友好的名字，下标值默认从零开始，也可以自己手动赋值。

```ts
enum Color { Red = 1, Green = 5, Blue = 3 };
let c: Color = Color.Green;  // c === 5
let colorName: string = Color[5]  //colorName === Green
```

* Any类型 在你不确定变量的指定类型的时候，使用any来取消类型检查。和Object类型的区别在于，尽管你能给Object(必须是大写的O)类型赋任何值，但是你不能调用对应的方法。any支持调用对应的方法。

```ts
let a: any = 3;
a.toFixed();  //支持调用

let b: Object = 3;
b.toFixed();  //不支持调用， Error: Property 'toFixed' doesn't exist on type 'Object'.

// 利用any来定义包含不同数据类型的数组
let list: any[] = [1, "xujie", false];
list[1]  //xujie
```

* void表示没有类型，当一个函数没有返回值的时候通常定义返回类型为void。声明一个void类型的变量没有什么意义，因为只能被赋值undefined或者null。

* null 和 undefined 类型，默认情况下 null 和 undefined 类型是所有类型的子类型。可以被赋值给 number 类型。但是当你指定了--strictNullChecks标记(官方推荐使用这个标记)，null 就只能被赋值给 void 和他们自身。但是也可以用联合属性来打破这个规则。

* never类型  

1. 表示的是永不存在的值的类型
2. never类型是那些总是会抛出异常或者根本就不会有返回值的函数的返回值类型。
3. never是任何类型的子类型，可以赋值给任何类型，没有任何类型是never的子类型(除了自身),即使是 any 也不能赋值给 never。

* object类型(小写的o)

1. 表示非原始类型数据，也就是除了number，string，boolean，symbol，null，或者undefined之外的类型。
2. object作为函数的参数时，不能和被赋值number，string等等类型

* 类型断言

1. 适用于你比Typescript更加了解某个值的详情
2. 尖括号语法 和 as 语法

```ts
let someValue: any = "this is a string";
// 相当于强制的把 any 类型转化为 string 类型，两种形式是等价的.
let strLength: number = (<string>someValue).length;

let someValue1: any = "this is a string";
// 相当于强制的把 any 类型转化为 string 类型，并且我明确的知道这个就是 string 类型的数值
let strLength1: number = (someValue1 as string).length;
```
