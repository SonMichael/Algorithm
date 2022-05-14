#!/usr/bin/env python
# -*- coding: utf-8 -*- 
# xs =  [30, 20, 150, 100, 40]
# result = 3
# Giải thích : Có các cặp thời lượng:
# [ 30, 150 ] có tổng là 180, chia hết cho 60.
# [ 20, 40 ] có tổng là 60, chia hết cho 60.
# [ 20, 100 ] có tổng là 120, chia hết cho 60.
# và tạo thành các phút tròn.
def exercise3(xs):
    # Lập trình tại đây
    length = len(xs)
    if length < 2:
      return 0
    
    result = countResult(xs,length)
    return result        
def countResult(xs, n):
    freq = [0] * 60
    for i in range(n):
        key = xs[i] % 60
        freq[key]+= 1
    # toàn bộ số kết hợp với một nữa là ra tất cả các cặp
    sum = freq[0] * (freq[0] - 1) / 2
    i = 1
    while i < 30:
        sum += freq[i] * freq[60-i]
        i+= 1
    # ko thể để trong while vì cách tính trong while khiến có cặp bị lặp
    sum += (freq[30] * (freq[30]-1)/2)
        
    return int(sum)
    
xs = [30, 20, 150, 100, 40, 20]
# xs = [120, 60, 180]
result = exercise3(xs)
print('Kết quả: {}'.format(result))
