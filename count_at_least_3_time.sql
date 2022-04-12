
// Gia su trong database có table Logs gam 2 column id & num 
// Logs id(int) I num(varchar) 
// Viet cau lenh SQL tre ye tat ca cac 56 a( column xuat hien It nhat 3 lan lien tuc 
// Vi du có table Logs nhu' sau: 
// Logs id num 11 21 31 41 52 62 71 82 93 103 114 124 134 
// Output: 
// Result 
// 1 
// 4

SELECT custom_group, num
FROM (
    SELECT
    num
    , @groupNumber := IF(@prev_id != id and @prev_num != num, @groupNumber + 1, @groupNumber) AS custom_group
    , @prev_num := num
		, @prev_id := id
    FROM logs l, (select (@groupNumber := 0)) init
) l1
GROUP BY custom_group, num
HAVING count(*) >= 3



