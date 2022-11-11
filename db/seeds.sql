INSERT INTO department (name)
VALUES ("Analytics"),
       ("Product");

INSERT INTO role (title, salary, department_id)
VALUES ("Analyst", 50000, 1),
       ("Architect", 600000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joe", "Smith", 1, NULL),
       ("Becky", "Johnson", 2, 1);
       
