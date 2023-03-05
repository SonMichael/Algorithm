import heapq

def max_performance(efficiencies, speed, k):
    entries = []
    for eff ,spd in zip(efficiencies, speed):
        entries.append([eff, spd])
    entries.sort(reverse= True)

    sp = 0
    min_heap  = []
    res = 0
    for eff, spd in entries:
        if len(min_heap) == k:
            sp -= heapq.heappop(min_heap)
        sp += spd
        heapq.heappush(min_heap, spd)
        res = max(res, eff * sp)
    return res

efficiencies = [5,4,3,9,7,2]
speed = [2, 10, 3, 1, 5, 8]
k = 2
print(max_performance(efficiencies, speed, k))