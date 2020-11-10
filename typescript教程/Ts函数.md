# Ts函数

## 函数的参数类型和返回值类型定义

```ts
// 函数声明
// Ts能根据return语句来判断返回值的类型，因此我们一般省略函数返回值类型
function add(a: number, b: number): number {
    return a + b;
}
add(2,5);

// 函数表达式
// (a: number, b: number) => number 这个叫函数类型，必须有返回值类型，没有返回值填写void 函数类型中的参数列表名字不用和函数定义的参数名字一一对应，类型能对应上就行。
let add: (a: number, b: number) => number = function (x: number, y: number): number {
    return x + y;
}
add(2, 5);

// 推断类型
// 如果左边指定了类型，typescript在右边会自动识别出类型，这叫做按上下文归类，是类型推论的一种
let add: (a: number, b: number) => number = function (x, y) {
    return x + y;
}
```

## 参数

* typescript中每个函数的参数都是必须的，传入函数的参数个数必须和函数期望的参数个数相同。

### 可选参数 `？`

```ts
// 可选参数没有传递的时候是undefined  可选参数必须在必须参数的后面
function fullName(firstname: string, lastName?: string): string {
    return firstname + lastName;
}

fullName('xu', 'jie')  //xujie
(fullName('xu') //xuundefined
```

### 默认参数

```ts
// 当没有传递参数和传递的参数时undefined时，使用参数的默认值
// 如果定义的时候带有默认值的参数声明在普通参数的前面，想要使用默认参数的时候。必须在传入参数的时候在前面传入undefined
function fullName(firstname: string, lastName = "jie"): string {
    return firstname + lastName;
}

fullName('xu', 'han'); //xuhan
fullName('xu'); //xujie
```

### 可选参数和默认参数共享函数类型

```ts
// 后面跟着的函数定义既可以是有可选参数的也可以是有默认值的
let fullName = (x: string, y?: string) => string
```

### 剩余参数

```ts
// 使用...a 表示个数不限的可选参数
function fullName(firstName: string, ...restName: string[]): string {
    return firstName + " " + restName.join(" ");
}

// 在函数类型上定义时也会用到...a这个符号
let fullNameFun: (x: string, ...y: string[]) => string = fullName;

fullNameFun("xu", "jie", "han");
```

## this

### 