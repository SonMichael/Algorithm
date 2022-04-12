
def exercise3(aList, k):
  result = 0
  
  hashMap = generateHashMap(aList)
  if isOdd(k):
    result = countResultWhenKOdd(hashMap, k)
  else:
    result = countResultWhenKEven(hashMap, k)

  return result

def countResultWhenKEven(hashMap, k):
  result = 0
  for item in hashMap:
    key = k - item
    if key == item:
      count = hashMap[item]
      result = countTotalResultNumberDuplicate(count)
  return result

def countTotalResultNumberDuplicate(number):
  result = 0
  for i in range(1, number):
    result += i
  return result
  
def countResultWhenKOdd(hashMap, k):
  result = 0
  for item in hashMap:
    if hashMap[item] == 0:
      continue
    key = k - item
    if key in hashMap:
      count1 = hashMap[key]
      count2 = hashMap[item]
      result += count1 * count2
      hashMap[key] = 0
      hashMap[item] = 0
  return result

def isOdd(k):
  return k % 2 != 0

def generateHashMap(aList):
  hashMap = {}
  for item in aList:
    if item in hashMap:
      count = hashMap[item]
      hashMap[item] = count +1
      continue
    hashMap[item] = 1
  return hashMap

  # inp = [
  #     ([1, 2, 1], 3),
  #     ([-1, 10, 10, 2], 9),
  #     ([0, 0, 0, 1, 1, 1, -1, 0], 1),
  #     ([1] * 1000, 2), # Mảng có 6000 nghìn số 1
  # ]
  # out = [
  #   2,
  #   2,
  #   12,
  #   499500
  # ]
  
  
try:
  import time
  def calTime(func, inp):
    start = time.time()
    result = func(*inp)
    stop = time.time()
    return stop - start
  aList = [1] * 6000
  k = 2
  print('Thời gian tính toán hàm này: {}'.format(calTime(exercise3, ([1]*6000, 2))))
  
except Exception as e:
  print("Lỗi thực thi: ", e)
  
try:
  aList = [1, 2, 1]
  result = exercise3(aList, 3)
  print('Kết quả: {}'.format(result))
except Exception as e:
  print("Lỗi thực thi: ", e)
