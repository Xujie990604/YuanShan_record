#include <stdio.h>

int main()
{
  int a, b, sum;
  printf("input two int nums\n");
  scanf("%d,%d", &a, &b);
  sum = a + b;
  printf("%d+%d=%d\n", a, b, sum);
  return 0;
}