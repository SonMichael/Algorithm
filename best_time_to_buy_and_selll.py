# Say you have an array for which the { element is the price of a given 
# stock on day
# If you were only permitted to complete at most one transaction (i.e.,
# buy one and sell one share of the stock), design an algorithm to find
# the maximum profit.
# Note that you cannot sell a stock before you buy one.
# Input: [7,1,5,3,6,4]
# Output: 5
# Explanation: Buy on day 2 (price = 1) and sell on day 5
# (price = 6), profit = 6-1 = 5.
# Not 7-1 = 6, as selling price needs to be
# larger than buying price.
def maxProfit(arr):
    length = len(arr)
    if length == 0:
        return 0
    minPrice = arr[0]
    maxPrice = arr[length -1]
    maxProfit = 0

    for i in range(1, length -1):
        if arr[i] < minPrice:
            minPrice = arr[i]
        if arr[i] > maxPrice:
            maxPrice = arr[i]
        maxProfitTemp = maxPrice - minPrice
        if maxProfitTemp > maxProfit:
            maxProfit = maxProfitTemp
    return maxProfit



    

arr = [7,1,5,3,6,4]
print(maxProfit(arr))