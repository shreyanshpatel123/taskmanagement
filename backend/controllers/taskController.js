
const Task = require("../models/taskModel");
const User = require("../models/userModel");

// Assign Task Controller
const assignTask = async (req, res) => {
    console.log(req.body)
  const { title, description, dueDate, priority } = req.body;
  const { userId } = req.params; 

  if (!title || !description || !dueDate || !priority) {return res.status(400).json({ message: "All fields are required." });}
try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {return res.status(404).json({ message: "User not found." }); }

    // Create a new task
    const newTask = new Task({ title, description, dueDate, priority, assignedTo: userId,});

    // Save the task to the database
    const savedTask = await newTask.save();

    return res.status(201).json({
      message: "Task assigned successfully.",task: savedTask,});
  } catch (error) {
    console.error("Error assigning task:", error);return res.status(500).json({ message: "Server error." }); }
 };

 // Fetch all tasks with user details
const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find()
        .populate("assignedTo", "username email") // Populate user details
        .exec();
      res.status(200).json(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      res.status(500).json({ message: "Server error" });
    }
  };

  // Delete a task
const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
      const task = await Task.findByIdAndDelete(taskId);
      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Server error" });
    }}

    const updateTask = async (req, res) => {
        const { taskId } = req.params;
        const { title, description, dueDate, priority, status } = req.body;
      
        try {
          const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, description, dueDate, priority, status },
            { new: true }
          );
      
          if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
          }
      
          res.status(200).json(updatedTask);
        } catch (error) {
          console.error("Error updating task:", error);
          res.status(500).json({ message: "Server error." });
        }
      };
 

      const getUserTasks = async (req, res) => {
        const { userId } = req.params; // Extract userId from request parameters
      
      
        try {
          // Query tasks assigned to the given userId
          const tasks = await Task.find({ assignedTo: userId });
          
          // If no tasks are found, return a 404 response
          if (!tasks || tasks.length === 0) {
            return res.status(404).json({ message: "No tasks found for this user." });
          }
      
          // Return the tasks in the response
          res.status(200).json(tasks);
        } catch (error) {
          // Log the error and return a 500 response
          console.error("Error fetching user tasks:", error);
          res.status(500).json({ message: "Server error." });
        }
      };

      const updateTaskStatus = async (req, res) => {
        const { taskId } = req.params;
        const { status } = req.body;
      
        try {
          const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { status },
            { new: true }
          );
      
          if (!updatedTask) {
            return res.status(404).json({ message: "Task not found." });
          }
      
          res.status(200).json(updatedTask);
        } catch (error) {
          console.error("Error updating task status:", error);
          res.status(500).json({ message: "Server error." });
        }
      };
      
    
      
      
        
          

module.exports = { assignTask,
    deleteTask,
    getAllTasks,
    updateTask,
    getUserTasks ,
updateTaskStatus};


   
