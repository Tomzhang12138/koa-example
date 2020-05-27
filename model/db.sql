create table if not EXISTS user (
    id int not null auto_increment primary key,
    name VARCHAR(50),
    intro text,
    sex ENUM("女", "男"),
    skills text
)ENGINE=InnoDB default CHARSET=utf8;