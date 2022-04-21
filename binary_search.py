from string import printable
from unicodedata import numeric


def binary_search(arr , number):
  length = len(arr)
  mid = length/2
  for i in range(0 , mid):
    currentPos = i
    oppositePos = length - i - 1
    if arr[currentPos] == number or arr[oppositePos] == number:
      return 1
  if arr[mid] == number:
    return 1
  return 0

print(binary_search([1,2,3,4,5], 5))
