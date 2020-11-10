function fullName(firstName: string, ...restName: string[]): string {
    return firstName + " " + restName.join(" ");
}

let fullNameFun: (x: string, ...y: string[]) => string = fullName;

fullNameFun("xu");
console.log(fullNameFun("xu"));

