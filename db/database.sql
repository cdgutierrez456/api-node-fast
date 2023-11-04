CREATE DATABASE IF NOT EXISTS companydb;

use companydb;

create table employee (
	id int not null auto_increment,
	name varchar(50) default null,
	lastname varchar(50) default null,
	salary int(15) default null,
	primary key (id)
);




