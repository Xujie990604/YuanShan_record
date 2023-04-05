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

const mo = new Container();
mo.provide('a',  new A('xujieAAA'))

class B {
  a: A
  constructor(mo: Container) {
    this.a = mo.get('a')
  }
}
