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
  
  // Define the roleController object
  const roleController = {
    // Function to get all roles
    getAllRoles: function () {
      // Format the roles as a table
      const formattedRoles = roles.map((role) => {
        return {
          "Role ID": role.id,
          "Title": role.title,
          "Department": this.getDepartmentName(role.departmentId),
          "Salary": role.salary
        };
      });
  
      return formattedRoles;
    },
  
    // Function to add a new role
    addRole: function (title, salary, departmentId) {
      const newRole = {
        id: roles.length + 1,
        title: title,
        departmentId: departmentId,
        salary: salary
      };
      roles.push(newRole);
      return newRole;
    },
  
    // Helper function to get department name based on departmentId
    getDepartmentName: function (departmentId) {
      const department = departments.find((dept) => dept.id === departmentId);
      return department ? department.name : "";
    }
  };
  
  // Export the roleController object
  module.exports = roleController;