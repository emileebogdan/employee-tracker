// Import and require mysql2
const inquirer = require('inquirer');
const mysql = require('mysql2');
require("console.table");


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employee_db'
  },
  console.log(`Connected to the employee_db database.`)
);

prompts();

function prompts() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'menuChoices',
        message: 'What do you want to do?',
        choices: [
          "View All Departments",
          "View All Roles",
          "View All Employees",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee Role",
          "Quit"
        ]
      },
    ])
    .then((data) => {
      switch (data.menuChoices) {
        case "View All Departments":
          viewDepartments()
          break;
        case "View All Roles":
          viewRoles()
          break;
        case "View All Employees":
          viewEmployees()
          break;
        case "Add a Department":
          addDepartment()
          break;
        case "Add a Role":
          addRole()
          break;
        case "Add an Employee":
          addEmployee()
          break;
        case "Update an Employee Role":
          updateRole()
          break;
        default:
          quit()
          break;
      }
    });
}
function viewDepartments() {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) {
      console.log(err)
      return;
    }
    else {
      console.table(result)
      prompts()
    }
  });
};
// update to view all roles
function viewRoles() {
  db.query("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err)
      return;
    }
    else {
      console.table(result)
      prompts()
    }
  });
};

// update to view all employees
function viewEmployees() {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err)
      return;
    }
    else {
      console.table(result)
      prompts();
    }
  });
};

function addDepartment() {
  inquirer.prompt([
    {
      name: "deptName",
      message: "What is the name of the department?"
    }])
    .then(({ deptName }) => {
      db.query("INSERT INTO department(name) VALUES(?)", [deptName], (err, res) => {
        prompts();
      })
    })
};
// add role 
function addRole() {
  inquirer.prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of this role?",
      type: "number"
    },
    {
      name: "department_id",
      message: "What is the department id of this role?",
      type: "number"
    }
  ])
    .then(({ title, salary, department_id }) => {
      db.query("INSERT INTO role(title, salary, department_id) VALUES(?,?,?)", [title, salary, department_id], (err, res) => {
        prompts();
      })
    })
};
// add employee
function addEmployee() {
  inquirer.prompt([
    {
      name: "first_name",
      message: "What is the first name of this employee?"
    },
    {
      name: "last_name",
      message: "What is the last name of this employee?"
    },
    {
      name: "role_id",
      message: "What is the role id of this employee?",
      type: "number"
    },
    {
      name: "manager_id",
      message: "What is the manager id of this employee?",
      type: "number",
      default: "NULL"
    }

  ])
    .then(({ first_name, last_name, role_id, manager_id }) => {
      db.query("INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)", [first_name, last_name, role_id, manager_id], (err, res) => {
        prompts();
      })
    })
};

function updateRole(){
  inquirer.prompt([
    {
      name: "role_id",
      message: "What is the role that you want to edit?"
    }
  ])
  .then(({role_id}) => {
    db.query("SELECT * FROM role WHERE id = ?", [role_id], (err, res) => {
      inquirer.prompt([
        {
          name: "title",
          message: "What is the title of the role?",
          default: res[0].title
        },
        {
          name: "salary",
          message: "What is the salary of the role?",
          default: res[0].salary
        },
        {
          name: "department_id",
          message: "What is the department id of the role?",
          default: res[0].department_id
        },
      ])
      .then(({title, salary, department_id}) =>{
        db.query("UPDATE role  SET title = ?,salary = ?, department_id = ? WHERE id = ? ",[title, salary, department_id,role_id], (err, res) => {
          prompts();
        })
      })
    }) 
  })
};