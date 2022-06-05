#  -*- coding: utf-8 -*-
# You are given a list of airline tickets where tickets[i] = [from, to] represent the departure and
# the arrival airports of one flight. Reconstruct the itinerary in order and return it.
# All of the tickets belong to a man who departs from “JFK™ , thus, the itinerary must begin with "JFK" .
# If there are multiple valid itineraries, you should return the itinerary that has the smallest lexical order 
# when read as a single string.
# For example: the itinerary [“JFK", "LGA"] has a smaller lexical order than ["JFK", "LGB"]. 
# You may assume all tickets form at least one valid itinerary. You must use all the tickets once and only  once.

# Ex1: Input: tickets = [["MUC","LHR"],["JFK","MUC"],["SFO","SJC"],["LHR","SFO"]]
# output: [JFK, "MUC,"LHR", "SFO", "SJC"]

# Ex2: Input: tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"], ["ATL" , "JFK"], ["ATL", SFO"]]
# Output: ["JFK","ATL","JFK","SFO","ATL","SFO"] 
# Explanation: Another possible reconstruction is 
# ["JFK","SFO","ATL","JFK","ATL","SFO"] but it is larger in lexical order.

def findItinerary(tickets, keyDepart):
    if len(tickets) == 0:
        return None
    hashMap = {src: [] for src, dst in tickets}
    tickets.sort(reverse=True)
    for src, dst in tickets:
        hashMap[src].append(dst)
    memo = dict()
    dff(hashMap, keyDepart, [], memo)
    return memo
    

def dff(hashMap, key, arr, memo):
    if len(hashMap.get(key)) == 0:
        arr.append(key)
        return arr
    if memo.get(key) != None:
        return arr
    key1 = hashMap.get(key).pop()
    arr.append(key)
    dff(hashMap, key1, arr, memo)
    memo[key] = arr

tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"], ["ATL" , "JFK"], ["ATL","SFO"]]
keyDepart = 'JFK'
hashMap = findItinerary(tickets, keyDepart)
print(hashMap.get(keyDepart))


