/*
 * @Author: x09898 coder_xujie@163.com
 * @Date: 2022-12-12 20:47:29
 * @LastEditors: x09898 coder_xujie@163.com
 * @FilePath: \HTML-CSS-Javascript-\dataStructure\algorithm\sort.ts
 * @Description: 排序算法的实现
 */
// 对比结果的枚举类型
var compareResult;
(function (compareResult) {
    compareResult[compareResult["BIGGER"] = 0] = "BIGGER";
    compareResult[compareResult["SMALLER"] = 1] = "SMALLER";
    compareResult[compareResult["EQUAL"] = 2] = "EQUAL";
})(compareResult || (compareResult = {}));
// 对比函数
function defaultCompare(num1, num2) {
    if (num1 > num2) {
        return compareResult.BIGGER;
    }
    else if (num1 < num2) {
        return compareResult.SMALLER;
    }
    else {
        return compareResult.EQUAL;
    }
}
// 交换函数
function swap(array, num1, num2) {
    var _a;
    _a = [array[num2], array[num1]], array[num1] = _a[0], array[num2] = _a[1];
    return array;
}
// 冒泡排序的算法实现 O(n²)
function bubbleSort(array, compareFn) {
    if (compareFn === void 0) { compareFn = defaultCompare; }
    console.log("\u539F\u6570\u7EC4: ".concat(array));
    console.time("time");
    var length = array.length;
    // 外循环, 有多少条数据就要循环多少次
    for (var i = 0; i < length; i++) {
        // 内循环，每轮结束后都会将数组 无序部分 中最大的值放到 无序部分 的末尾和 有序部分 组成新的 有序数组
        // 每轮内循环结束后, 无序部分 数量都会减一，所以下一轮要比较的次数就可以减少一次，避免无效运算
        for (var j = 0; j < length - 1 - i; j++) {
            console.count('对比次数');
            if (compareFn(array[j], array[j + 1]) === compareResult.BIGGER) {
                swap(array, j, j + 1);
                console.count('交换次数');
                console.log("\u4EA4\u6362 ".concat(array[j + 1], " \u548C ").concat(array[j], " \u540E: ").concat(array));
            }
        }
        console.log("\u5916\u5FAA\u73AF: \u65E0\u5E8F\u6570\u7EC4\u4E2D\u6700\u5927\u503C: ".concat(array[length - i - 1], " \u88AB\u653E\u5230\u6709\u5E8F\u6570\u7EC4\u7684\u5F00\u5934\u3002\u6570\u7EC4\u540E ").concat(i + 1, " \u4F4D\u6709\u5E8F: ").concat(array));
    }
    console.timeEnd("time");
    return array;
}
// 选择排序的算法实现 O(n²)
function selectActionSort(array, compareFn) {
    if (compareFn === void 0) { compareFn = defaultCompare; }
    console.time('time');
    console.log("\u539F\u6570\u7EC4: ".concat(array));
    var length = array.length;
    var indexMin;
    // 外循环，n 条数据，循环 n-1 次。因为每次循环都会把 无序部分 的*最*小值放到数组开头组成有序部分
    // 当 n-1 次后，前 n-1 个数据有序，剩下的最后一个数据也是有序的
    for (var i = 0; i < length - 1; i++) {
        // 假设 无序部分 的第一条数据为 无序部分 的最小值
        indexMin = i;
        console.log("\u5047\u5B9A\u65E0\u5E8F\u6570\u7EC4\u7B2C\u4E00\u4F4D: ".concat(array[i], " \u4E3A\u5F53\u524D\u65E0\u5E8F\u6570\u7EC4\u4E2D\u6700\u5C0F\u503C"));
        // 内循环，每次内循环过后都会有一条数据放到最终位置
        // 所以第 n 次内循环时，前 n-1 项是有序的，不需要参与对比
        for (var j = i + 1; j < length; j++) {
            console.count('对比次数');
            if (compareFn(array[indexMin], array[j]) === compareResult.BIGGER) {
                indexMin = j;
                console.log("\u5185\u5FAA\u73AF: ".concat(array[indexMin], " \u662F\u5F53\u524D\u8F83\u5C0F\u503C"));
            }
        }
        // 将无序部分的最小值放到有序部分的结尾
        if (indexMin !== i) {
            swap(array, i, indexMin);
            console.count('交换次数');
        }
        console.log("\u5916\u5FAA\u73AF: ".concat(array[i], " \u662F\u65E0\u5E8F\u6570\u7EC4\u4E2D\u7684\u6700\u5C0F\u503C,\u653E\u5230\u6709\u5E8F\u6570\u7EC4\u7B2C ").concat(i + 1, " \u4F4D\u3002\u524D ").concat(i + 1, " \u4F4D\u6570\u636E\u662F\u6709\u5E8F\u7684: ").concat(array));
    }
    console.timeEnd('time');
    return array;
}
// 插入排序的算法实现
function insertSort(array, compareFn) {
    if (compareFn === void 0) { compareFn = defaultCompare; }
    console.time('time');
    console.log("\u539F\u6570\u7EC4: ".concat(array));
    var length = array.length;
    // 认为第一个值就是有序的，所以从第二个值开始循环比较
    for (var i = 1; i < length; i++) {
        // 使用变量接收待比较值的索引
        var j = i;
        // 这一轮需要被比较的值
        var temp = array[i];
        // j 会一直递减
        // 只要有一次前面的数值不大于 temp 就可以退出循环了，因为前面的数组已经是有序的
        while (j > 0 && compareFn(array[j - 1], temp) === compareResult.BIGGER) {
            // 如果 j-1 位置的值大于 temp, 则将 j-1 的值后移一位(j-1 前面的位置就空出来了)
            // 这个空出来的位置有两种情况 
            // 1. 下一次循环的值不大于 temp 了，这个位置就是给 temp 留的
            // 2. 下一次循环的位置还大于 temp, 则下一次循环的值占用这次空出来的位置~
            // ~下一次循环值的位置又空出来了......直到碰到情况 1.
            array[j] = array[j - 1];
            console.log("\u5185\u5FAA\u73AF: ".concat(array[j - 1], " \u88AB\u540E\u79FB: ").concat(array));
            console.count('移位次数');
            j--;
        }
        // 两种情况
        // 1. while 语句没有执行过，就是将原数据放回原处
        // 2. while 语句有执行过，就是把 temp 放到空出来的位置上
        array[j] = temp;
        console.log("\u5916\u5FAA\u73AF: ".concat(temp, " \u88AB\u653E\u5230\u6709\u5E8F\u6570\u7EC4\u4E2D: ").concat(array));
        console.count('赋值次数');
    }
    console.timeEnd('time');
    return array;
}
bubbleSort([8, 4, 9, 5, 2, 6, 3, 1]);
