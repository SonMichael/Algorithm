# you can write to stdout for debugging purposes, e.g.
# print("this is a debug message")
import heapq;

def solution(A):
    if len(A) == 0:
        return 0
    sum_pp = sum(A)
    target = sum_pp/ 2
    filt = 0
    fac_pp_max_heap = [-p for p in A]
    heapq.heapify(fac_pp_max_heap)
    while sum_pp > target:
        worst_fac = heapq.heappop(fac_pp_max_heap)
        pp = worst_fac / 2
        sum_pp += pp
        heapq.heappush(fac_pp_max_heap, pp)
        filt += 1

    return  filt

