function test(array, target) {
    var map = new Map();
    var resultArray = [];
    array.forEach(function (index, value) { return map.set(value, index); });
    var length = array.length;
    for (var index = 0; index < length; index++) {
        var targetValue = target - array[index];
        if (map.has(targetValue)) {
            resultArray.push(index);
            resultArray.push(map.get(targetValue));
        }
    }
    return resultArray;
}
test([2, 4, 6, 9], 13);
