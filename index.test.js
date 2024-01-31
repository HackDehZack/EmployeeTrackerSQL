const { addEmployee } = require('./index');

// Mock the dependencies
jest.mock('inquirer', () => ({
  prompt: jest.fn().mockResolvedValue({
    first_name: 'John',
    last_name: 'Doe',
    role_id: 1,
    manager_id: 2,
  }),
}));
jest.mock('./db', () => ({
  query: jest.fn().mockResolvedValue([
    { id: 1, title: 'Manager' },
    { id: 2, title: 'Employee' },
  ]),
}));

describe('addEmployee', () => {
  it('should add a new employee to the database', async () => {
    // Mock the console.log function
    console.log = jest.fn();

    // Call the addEmployee function
    await addEmployee();

    // Assertions
    expect(console.log).toHaveBeenCalledWith('Employee added!');
    expect(console.log).toHaveBeenCalledTimes(1);
  });

});