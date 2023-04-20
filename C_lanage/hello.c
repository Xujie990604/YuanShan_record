#include <stdio.h>

int main()
{
  int a, b, sum;
  printf("input two int nums\n");
  if (scanf("%d %d\n", &a, &b) == 2) {
    printf("uuu %d and %d", a, b);
  } 
  else {
    printf("rrr");
  }
  printf("DDDD");
  return 0;
}