const express = require('express');
const { assignTask, getAllTasks, deleteTask ,updateTask, getUserTasks, updateTaskStatus} = require('../controllers/taskController');

const router = express.Router();
router.post("/createTask/:userId", assignTask);
router.get("/getAllTasks", getAllTasks); // Fetch all tasks with user details
router.delete("/deleteTask/:taskId", deleteTask); // Delete a task
router.put("/updateTask/:taskId", updateTask);
router.get("/getUserTasks/:userId",getUserTasks);
router.put("/updateTaskStatus/:taskId", updateTaskStatus);
module.exports = router;
