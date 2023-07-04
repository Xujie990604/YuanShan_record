# Ts变量声明

## let const

* 尽量使用 ES6 的新的声明变量的语法 let 和 const

### 解构赋值

* 数组的解构赋值，并且在函数定义时

```ts
//数组的解构赋值
function add([first ,second]: [number,number]) {
    console.log(first);
    console.log(second);

}
add([1,2]);
```

* 对象的解构赋值

```ts
// 对象的解构赋值 重命名 没有类型验证
let { a: first, b: second } = { a: '123', b: '456' };
console.log(first, second);

//对象的解构赋值 重命名呢 加上类型验证
let { a: first, b: second }: {a: string, b: string} = { a: '123', b: '456' };
console.log(first, second);

```

* 对象的解构赋值放在函数定义时并且函数有默认值

```ts
function f({a, b = 0} = { a: "xujie" }):void {
  console.log(a, b);
}
f({ a: '9' }); //ok 传入参数覆盖了函数定义时的默认值 因为解构赋值获取参数且b参数有默认值，所以传参时没有b属性不报错
f({}) //error 传入参数覆盖了函数定义时候的默认值，且参数中没有a属性，所以报错
f() //ok 没有传入参数，使用函数的默认值
```
