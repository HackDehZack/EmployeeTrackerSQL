
let employees = [
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      roleId: 1,
      managerId: null
    },
    {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      roleId: 2,
      managerId: 1
    }
  ];
  
  let roles = [
    {
      id: 1,
      title: "Manager",
      departmentId: 1,
      salary: 100000
    },
    {
      id: 2,
      title: "Developer",
      departmentId: 3,
      salary: 75000
    }
  ];
  
  let departments = [
    {
      id: 1,
      name: "Sales"
    },
    {
      id: 2,
      name: "Marketing"
    },
    {
      id: 3,
      name: "Engineering"
    }
  ];
  
  // Define the employeeController object
  const employeeController = {
    // Function to get all employees
    getAllEmployees: function () {
      // Format the employees as a table
      const formattedEmployees = employees.map((employee) => {
        return {
          "Employee ID": employee.id,
          "First Name": employee.firstName,
          "Last Name": employee.lastName,
          "Job Title": this.getJobTitle(employee.roleId),
          "Department": this.getDepartment(employee.roleId),
          "Salary": this.getSalary(employee.roleId),
          "Manager": this.getManager(employee.managerId)
        };
      });
  
      return formattedEmployees;
    },
  
    // Function to add a new employee
    addEmployee: function (firstName, lastName, roleId, managerId) {
      const newEmployee = {
        id: employees.length + 1,
        firstName: firstName,
        lastName: lastName,
        roleId: roleId,
        managerId: managerId
      };
      employees.push(newEmployee);
      return newEmployee;
    },
  
    // Function to update an employee's role
    updateEmployeeRole: function (employeeId, newRoleId) {
      const employee = employees.find((emp) => emp.id === employeeId);
      if (employee) {
        employee.roleId = newRoleId;
        return employee;
      }
      return null;
    },
  
    // Helper function to get job title based on roleId
    getJobTitle: function (roleId) {
      const role = roles.find((r) => r.id === roleId);
      return role ? role.title : "";
    },
  
    // Helper function to get department based on roleId
    getDepartment: function (roleId) {
      const role = roles.find((r) => r.id === roleId);
      if (role) {
        const department = departments.find((dept) => dept.id === role.departmentId);
        return department ? department.name : "";
      }
      return "";
    },
  
    // Helper function to get salary based on roleId
    getSalary: function (roleId) {
      const role = roles.find((r) => r.id === roleId);
      return role ? role.salary : "";
    },
  
    // Helper function to get manager name based on managerId
    getManager: function (managerId) {
      const manager = employees.find((emp) => emp.id === managerId);
      return manager ? `${manager.firstName} ${manager.lastName}` : "";
    }
  };
  
  // Export the employeeController object
  module.exports = employeeController;