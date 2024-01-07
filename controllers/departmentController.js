let departments = [
    { id: 1, name: "Sales" },
    { id: 2, name: "Marketing" },
    { id: 3, name: "Engineering" }
  ];
  
  // Define the departmentController object
  const departmentController = {
    // Function to get all departments
    getAllDepartments: function () {
      // Format the departments as a table
      const formattedDepartments = departments.map((dept) => {
        return { "Department ID": dept.id, "Department Name": dept.name };
      });
  
      return formattedDepartments;
    },
  
    // Function to add a new department
    addDepartment: function (name) {
      const newDepartment = { id: departments.length + 1, name: name };
      departments.push(newDepartment);
      return newDepartment;
    },
  
    // Other functions for update and delete can be added here
  };
  
  // Export the departmentController object
  module.exports = departmentController;