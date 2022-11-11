// Import and require mysql2
const { default: inquirer } = require('inquirer');
const mysql = require('mysql2');


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
          addRoles()
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

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: body
  });
});

// Read all movies
db.query(sql, (err, rows) => {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: rows
  });
});

// Delete a movie

db.query(sql, params, (err, result) => {
  if (err) {
    res.statusMessage(400).json({ error: res.message });
  } else if (!result.affectedRows) {
    res.json({
      message: 'Movie not found'
    });
  } else {
    res.json({
      message: 'deleted',
      changes: result.affectedRows,
      id: req.params.id
    });
  }
});

// Read list of all reviews and associated movie name using LEFT JOIN
db.query(sql, (err, rows) => {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json({
    message: 'success',
    data: rows
  });
});

// BONUS: Update review name

db.query(sql, params, (err, result) => {
  if (err) {
    res.status(400).json({ error: err.message });
  } else if (!result.affectedRows) {
    res.json({
      message: 'Movie not found'
    });
  } else {
    res.json({
      message: 'success',
      data: req.body,
      changes: result.affectedRows
    });
  }
});


