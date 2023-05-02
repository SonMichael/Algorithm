def countVowelPermutation(n: int) -> int:
    a, e, i, o, u = 1, 1, 1, 1, 1
    for _ in range(n - 1):
        a, e, i, o, u = e + i + u, a + i, e + o, i, i + o
    return (a + e + i + o + u) % (10**9 + 7)

print(countVowelPermutation(2))