#include <stdio.h>
#include <string.h>  // 提供strlen()函数的原型

double power(double n, int p);   // 函数声明
int main()
{
  double x, xpow;
  int exp;
  printf("请输入两个数字\n");
  while (scanf("%lf%d", &x, &exp) == 2)
  {
    xpow = power(x, exp);
    printf("最终的结果是%f\n", xpow);
  }
  printf("程序退出\n");

  return 0;
}


// 计算 n 的 p 次幂
double power(double n , int p) {
  double pow = 1;
  for (int i = 0; i < p; i++)
  {
    pow *= n;
  }

  return pow;
}