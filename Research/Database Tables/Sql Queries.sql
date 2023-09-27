create database csm;

use csm;

create table user (
id int primary key auto_increment,
firstName varchar(50),
lastName varchar(50),
mobile varchar(10),
email varchar(100),
password varchar(50),
status enum ("ACTIVE", "INACTIVE"),
token varchar(255));
