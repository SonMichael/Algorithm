#  -*- coding: utf-8 -*-
# Given a string s, return the number oƒ Palindromic substrings in ¡t.
# A string is a palindrome when it reads the same backward as forward.
# A substring is a contiguous sequence of characters within the string.
# Example 1:
# Input: s = "abc"
# output: 3
# Explanation: Three palindromic strings: "a", "b", "c",
# Example 2:
# Input: s = "aaa"
# output: 6
# Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".
def count_subStrs(s):
    res = 0
    for i in range(len(s)):
        res += count_pali(s, i ,i)
        res += count_pali(s, i ,i + 1)
    return res

def count_pali(s, l ,r):
    res = 0
    while l >= 0 and r < len(s) and s[l] == s[r]:
        res += 1
        l -= 1
        r += 1
    return res

s = "aaa"
print(count_subStrs(s))