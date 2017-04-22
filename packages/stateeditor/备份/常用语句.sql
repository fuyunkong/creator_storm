

SELECT * FROM 'maps';


-- select count(*)  as c  from 'main' where type ='table' and name='maps' 

-- 判断表是否存在
SELECT COUNT(*) FROM sqlite_master where type='table' and name='maps';

-- 增
insert into maps (key, value) values ('test2', 'test');
-- 改
UPDATE maps set value='dddd' where key='test';
-- 查
select * from maps where key='test' limit 1;
-- 删
delete from maps where key='test';