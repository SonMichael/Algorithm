def compareArray(arr1, arr2, i):
  if(i >= len(arr1) or i >= len(arr2)) :
    return True
  if len(arr1)   == 0 or len(arr2) == 0 or len(arr1) != len(arr2) or arr1[i] != arr2[i] or isinstance(arr1[i], list) != isinstance(arr2[i], list):
    return False
  if isinstance(arr1[i], list) and isinstance(arr2[i], list):
    return compareArray(arr1[i], arr2[i], 0)
  return True and compareArray(arr1, arr2, i + 1)
print(compareArray([1 ,2,[3,5, 6]], [1,2, [3,5]], 0))