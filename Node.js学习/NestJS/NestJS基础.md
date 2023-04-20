# Nest 基础

* 完全支持 TS
* 结合 AOP 面向切面的编程方式
* Nest 拥有 Spring 风格: DI 依赖注入，IOC 控制反转

## 核心概念

## AOP 切面编程

* 一个请求会经过 controller service repository 三个地方，如果想要调用链路中加入一些通用的逻辑(日志记录，权限控制，异常处理)。直接加载 controller 中可以实现，但是不优雅，因为这些通用的逻辑会侵入业务层。
* 在调用 controller 之前和之后加入通过的逻辑，这个横向的扩展点就叫切面，这种透明的加入一些切面逻辑的编程方式叫做 `AOP 面向切面编程`
* Nest 中实现 AOP 的方式： middleware(中间件) Guard(守卫) Pipe(管道) Inteceptor(拦截器) ExceptionFilter(异常过滤)
* `请求 -> 中间件 -> 守卫 -> (路由前)拦截器 -> 管道 -> 路由处理程序 -> (路由后)拦截器 -> 异常过滤(如果有异常) -> 响应`
* middleware: 和 express 一样的概念 (在请求之前加入一些逻辑处理)(支持全局和路由范围)
* Guard：用于在调用 Controller 之前判断权限，返回 true 或者 false(可以抽离路由的访问控制逻辑，Controller 本身不需要做任何的修改就能透明的加入权限判断逻辑)(但是不能对请求响应进行修改)(支持全局和路由范围)
* Interceptor：可以在目标 Controller 方法前后加入一些逻辑(根据 next() 函数的调用实际分前后)(因为 Controller 中的逻辑可能是异步的，所以需要配合 rxjs 来组织它们)(支持路由范围和全局范围)
* Pipe: 是对参数的一个通用处理逻辑(主要对参数进行验证和转换)(支持全局和路由范围)
* ExceptionFilter：无论是 middleware， Guard，Interceptor，Pipe 还是 Controller 都可以抛出一些异常，对这些异常实现通用的处理逻辑采用 ExceptionFilter (可以在一定约束下自定义异常类型)

## IOC 控制反转

* 是一种面向对象编程中的一种设计原则，用来降低计算机代码之间的耦合度，基本思想: 借助于 `第三方` 实现具有依赖关系的对象之间的解耦。第三方也就是指 `IOC容器`。使得对象依赖关系的控制权不在由开发者进行控制，而是转交给 `第三方` IOC容器。
* 当 A 类依赖于 B 类时，不在由开发者手动去创建 B 实例添加到 A 实例中，而是交给 `IOC容器` 去创建。A 依赖 B 的过程由主动行为变成了被动的行为，控制权颠倒过来了，这就是 `控制反转` 名称的由来
* 高层模块不应该依赖低层模块
* 控制反转是一种`思想`，`依赖注入`则是实现控制反转最典型的`实现方式`。
* IOC 架构的好处就是不需要手动创建对象和根据依赖关系传入不同对象的构造器中，一切都是自动扫描并创建，注入的

### DI 依赖注入

* A 依赖 B 时，不是在 A 的实例过程中去主动 new B()。而是在 new A() 之前就初始化好了 B 实例，然后将 B 实例通过参数的形式传入 A 实例。这种非自己主动初始化依赖，而是通过外部来传入依赖的方式被称之为 `依赖注入`
* 通过 @Controller @Injectable 装饰器声明的 class 会被 NestJS 扫描，创建对应的对象并添加到一个容器里，这些所有的对象会根据构造器里声明的依赖自动注入，也就是 `依赖注入`

```ts
// 不使用依赖注入， B 类依赖 A 类的话，就直接在 B 类中 new A()
// 耦合很强，如果哪天需要更换依赖，必须要在 B 类中修改代码(伤筋动骨)
class A {
  name: string;
  constructor() {
    this.name = 'xujie';
  }
}

// B 类严重依赖 A 类
// ! 强耦合
class B {
  a: string
  constructor() {
    this.a = new A().name
  }
}

// 使用依赖注入， 把依赖 A 当作 B 类的一个参数进行传入
// 耦合较低，如果哪天需要更换依赖，只需要在实例化 B 时传入不同的参数
class A {
  name: string;
  constructor() {
    this.name = 'xujie';
  }
}

// B 类不再依赖某个具体的类
class B {
  a: string
  constructor(x) {
    this.a = x
  }
}
// 实例化 B 的时候将依赖当作参数传入
const b = new B(new A())
```

```ts
class A {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

// 容器
class Container {
  mo: any;
  constructor() {
    this.mo = {}
  }
  // 依赖注入
  provide(key: string, mo: any) {
    this.mo[key] = mo;
  }
  // 取出依赖
  get(key: string) {
    return this.mo[key];
  }
}

class B {
  a: A
  constructor(mo: Container) {
    // A 类的获取不在直接操作 A 而是变成操作 Container 容器
    // 由容器来负责依赖的读取
    this.a = mo.get('a')
  }
}

// B 类现在已经不在依赖 A 类, 而是依赖 Container 容器
// 由容器来负责依赖的注入
const mo = new Container('a',  new A('xujieAAA'), 'b', new B('xujieBBB'))
// 直接将容器实例 mo 注入到 B 实例中即可
// 在创建多个 B 实例的时候，不需要一遍遍的 new A() new B()。只需要制作好一个容器就可以重复使用
const b1 = new B(mo)
const b2 = new B(mo)
const b3 = new B(mo)
```

## 装饰器

* TS 的语法，实际上就是将对被装饰主体进行操作(添加属性，方法...)使得被装饰主题能够很简单的拥有一类功能

```ts
// 自定义一个 GET 方法
const Get = (url:string) => {
  return (target, key, descriptor) => {
    // 获取到被装饰的方法主体
    const fnc = descriptor.value
    axios.get(url)
    .then(res => {
      // 成功的话，调用函数主体并传入成功的消息和自定义参数
      fnc(res, status: 200)
    })
    .catch((err) => {
       // 失败的话，调用函数主体并传入失败的错误和自定义参数
      fnc(err, status: 500)
    })
  }
}

@Get('https://xxx.com/xxx')
// 在运行该函数时，就会把该函数使用装饰器来修饰
// 在修饰的过程中会调用 axios 的 get 方法，并且 axios 有结果之后调用被修饰主体(调用的时候还能传递一些参数)
getText(content, code) {}
```
