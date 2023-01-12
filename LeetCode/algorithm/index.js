/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-15 20:31:24
 * @LastEditors: xujie 1607526161@qq.com
 * @FilePath: \HTML-CSS-Javascript-\LeetCode\algorithm\index.ts
 * @Description:
 */
// tsc --target es6 index.ts 这样编译的ts代码能认识ES6的语法
// 对比结果的枚举类型
var compareResult;
(function (compareResult) {
    compareResult[compareResult["BIGGER"] = 0] = "BIGGER";
    compareResult[compareResult["SMALLER"] = 1] = "SMALLER";
    compareResult[compareResult["EQUAL"] = 2] = "EQUAL";
})(compareResult || (compareResult = {}));
// 对比函数
const defaultCompare = function (num1, num2) {
    if (num1 > num2) {
        return compareResult.BIGGER;
    }
    else if (num1 < num2) {
        return compareResult.SMALLER;
    }
    else {
        return compareResult.EQUAL;
    }
};
const DOES_NOT_EXIST = -1;
// 顺序搜索，线性搜索
// 对比函数的类型
function sequentialSearch(array, value, equals = defaultCompare) {
    let result;
    result = array.findIndex((item, index) => {
        if (equals(item, value) === compareResult.EQUAL) {
            return true;
        }
    });
    return result;
}
console.log(sequentialSearch([1, 2, 3, 4, 5], 2));
