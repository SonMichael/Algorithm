# // Cho 1 string: inputString Tra ye so luong chuoi con khac nhau
# // VI du: inputString = "abc" => Output = 7 Danh sach chu6i con bao gem: (a, b, c, ab, bc, ac, abc) 
# // VI du: inputString = "aaa" => Output = 3 Danh sach chu6i con bao gam: (a, aa, aaa) 
# // VI du: inputString = "bcb" => Output = 6 Danh sach chu6i con bao gam (b, c, bc, cb, bb, bcb) 
def get_substring_continue(input_string, start_pos , num, result):
    end_pos = start_pos + num
    sub = input_string[start_pos: end_pos]
    len_input = len(input_string)
    if num > len_input:
        return 0
    if end_pos > len_input:
        return get_substring_continue(input_string,0 , num + 1, result)
    if result.get(sub) is not None:
        return get_substring_continue(input_string,start_pos + 1 , num, result)
    result[sub] = 1
    return 1 + get_substring_continue(input_string,start_pos + 1 , num, result)

def get_substring_separate(input_string, start_pos , num, result):
    end_pos = start_pos + num
    len_input = len(input_string)
    if start_pos >= len_input:
        return 0
    if end_pos >= len_input:
        return get_substring_separate(input_string,start_pos + 1 , 1 , result)
    sub = input_string[start_pos] + input_string[end_pos]
    if sub in result:
        return get_substring_separate(input_string, start_pos , num + 1, result)
    result[sub] = 1
    return 1 + get_substring_separate(input_string, start_pos , num + 1, result)
input_string = "abc"
result = dict()
result1 = get_substring_continue(input_string, 0 , 1, result)
result2 = get_substring_separate(input_string, 0 , 1, result)
print(result1 + result2)
