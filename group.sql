
-- create
CREATE TABLE logs (
  id INTEGER PRIMARY KEY,
  num INTEGER
);

-- insert
INSERT INTO logs VALUES (1, 1);
INSERT INTO logs VALUES (2, 1);
INSERT INTO logs VALUES (3, 1);
INSERT INTO logs VALUES (4, 1);
INSERT INTO logs VALUES (5, 2);
INSERT INTO logs VALUES (6, 2);
INSERT INTO logs VALUES (7, 1);
INSERT INTO logs VALUES (8, 2);
INSERT INTO logs VALUES (9, 3);
INSERT INTO logs VALUES (10, 3);
INSERT INTO logs VALUES (11, 4);
INSERT INTO logs VALUES (12, 4);
INSERT INTO logs VALUES (13, 4);

-- fetch 
SELECT custom_group, num
FROM (
    SELECT
    num
    , @groupNumber := IF(@prev_id != id and @prev_num != num, @groupNumber + 1, @groupNumber) AS custom_group
    , @prev_num := num
		, @prev_id := id
    FROM logs l , (select @groupNumber := 0, @prev_num := NULL, @prev_id := NULL ) init 
) l1
GROUP BY custom_group, num
HAVING count(*) >= 3


