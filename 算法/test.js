var merge = function (nums1, m, nums2, n) {
  const result = []
  point1 = 0;
  point2 = 0
  mLength = m > n ? m : n
  for (let i = 0; i < mLength; i++) {
    if (nums1[point1] < nums2[point2]) {
      result.push(nums1[point1])
      point1++
    }else {
      result.push(nums2[point2])
      point2
    }
  }
  result.push(...nums1.slice(point1 + 1, m ))
  result.push(...nums2.slice(point2 + 1, n ))
  console.log(result)
  nums1 = result
};

merge([1,2,3,0,0,0], 3, [2,5,6], 3)