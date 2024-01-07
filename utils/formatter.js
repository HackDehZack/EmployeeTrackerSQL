const { Table } = require('cli-table');

// Define the formatter object
const formatter = {
  // Function to format departments as a table
  formatDepartmentsTable: function (departments) {
    const table = new Table({
      head: ['Department ID', 'Department Name'],
    });

    departments.forEach((department) => {
      table.push([department.id, department.name]);
    });

    return table.toString();
  },

  // Function to format roles as a table
  formatRolesTable: function (roles) {
    const table = new Table({
      head: ['Role ID', 'Title', 'Department', 'Salary'],
    });

    roles.forEach((role) => {
      const department = this.getDepartmentName(role.departmentId);
      table.push([role.id, role.title, department, role.salary]);
    });

    return table.toString();
  },

  // Function to format employees as a table
  formatEmployeesTable: function (employees) {
    const table = new Table({
      head: ['Employee ID', 'First Name', 'Last Name', 'Job Title', 'Department', 'Salary', 'Manager'],
    });

    employees.forEach((employee) => {
      const jobTitle = this.getJobTitle(employee.roleId);
      const department = this.getDepartmentName(employee.roleId);
      const manager = this.getManagerName(employee.managerId);
      table.push([employee.id, employee.firstName, employee.lastName, jobTitle, department, employee.salary, manager]);
    });

    return table.toString();
  },

  // Helper function to get department name based on departmentId
  getDepartmentName: function (departmentId) {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : '';
  },

  // Helper function to get job title based on roleId
  getJobTitle: function (roleId) {
    const role = roles.find((role) => role.id === roleId);
    return role ? role.title : '';
  },

  // Helper function to get manager name based on managerId
  getManagerName: function (managerId) {
    const manager = employees.find((employee) => employee.id === managerId);
    return manager ? `${manager.firstName} ${manager.lastName}` : '';
  },
};

// Export the formatter object
module.exports = formatter;