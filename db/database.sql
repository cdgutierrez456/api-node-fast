CREATE DATABASE IF NOT EXISTS companydb;

use companydb;

create table employee (
	id int not null auto_increment,
	name varchar(50) default null,
	lastname varchar(50) default null,
	salary int(15) default null,
	primary key (id)
);

-- List employees
select * from employee;

-- delete employees
delete from employee where id = "9999";

-- update employee
update employee 
set 
name = "new name", 
lastname = "new lastname",
salary = 0000
where id = "999";

-- partial update employee
-- Si el primer parametro es undefined o null, toma el segundo parametro
update employee 
set 
name = ifnull(null, "new name"), 
lastname = ifnull(null, "new lastname"),
salary = ifnull(null, 0000)
where id = "999";


