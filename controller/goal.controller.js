
var goalService = require('../services/goal.service')


var createGoalControllerFn = async (req, res) => {
    try {
        console.log(req.body);

        const goalDetails = { ...req.body, userId: req.user.id };

        var status = await goalService.createGoalDBService(goalDetails);
        if (status) {
            res.send({ "status": true, "message": "Goal created successfully" });
        } else {
            res.send({ "status": false, "message": "Error creating goal" });
        }
    } catch (error) {
        console.error("Error in createGoalControllerFn:", error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};


    var updateGoalController = async (req, res) => {
        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body)
    
        var result = await goalService.updateGoalDBService(req.params.id, req.body);
        if (result) {
            res.send({ "status": true, "message": "Goal Updated" });
        } else {
            res.send({ "status": false, "message": "Goal Update Failed" });
        }
    };
    
    var getDataControllerfn = async (req, res) => {
        try {
            const userId = req.user.id; 
            var goals = await goalService.getDataFromDBService(userId);
            res.send({ "status": true, "data": goals });
        } catch (error) {
            console.error("Error in getDataControllerfn:", error);
            res.status(500).send({ "status": false, "message": "Internal Server Error" });
        }
    };

var deleteGoalController = async (req, res) => {
    console.log(req.params.id);

    var result = await goalService.deleteGoalDBService(req.params.id);
    if (result) {
        res.send({ "status": true, "message": "Goal Deleted" });
    } else {
        res.send({ "status": false, "message": "Goal Deletion Failed" });
    }
};



module.exports = { getDataControllerfn, createGoalControllerFn, updateGoalController, deleteGoalController};