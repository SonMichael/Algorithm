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
def best_buy(prices):
    if len(prices) == 0:
        return 0
    min_p = prices[0]
    n = len(prices)
    max_p = prices[n -1]
    profit = max_p - min_p
    l = 1
    r = n - 2
    while l < r:
        price = max_p - min_p
        profit = max(profit, price)


        min_p = min(prices[l], min_p)
        max_p = max(max_p, prices[r])

        l += 1
        r -= 1
    return profit

prices = [7,1,5,3,6,4]
print(best_buy(prices))