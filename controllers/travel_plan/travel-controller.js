import * as travelDao from "../../daos/travel_plan/travel_plan_dao.js";
import {
    adminFind,
    deletePlanByPlanID,
    deleteTravelPlan,
    findTravelPlanbyID, getRecommendation,
    updateTravelPlan
} from "../../daos/travel_plan/travel_plan_dao.js";
import {json} from "express";


const travelController = (app) => {

    const travel_create = async (req, res) => {
        let travel_info = req.body;
        if (!req.session['profile']) {
            res.status(200);
            res.json({success: false, "msg": "login timeout， please refresh browser re-login"})
            return;
        }

        console.log(req.session['profile'])
        travel_info.planCreator = req.session['profile']['_id']
        travel_info.planOwner = req.session['profile']['_id']

        console.log(travel_info)

        try {

            //if addNew
            if (travel_info.addnew) {
                const inserted = await travelDao.createTravelPlan(travel_info)
                inserted.success = true;
                res.json(inserted);
                return;
            }
            //del
            const data = await travelDao.findAllUsersTravelPlan(travel_info.user_id)

            //no
            if (travel_info.planName) {
                if (data) {
                    console.log('delete deleteTravelPlain')
                    console.log(await travelDao.deleteTravelPlan(travel_info.user_id))
                }
            } else {
                if (data) {

                    data.locations = travel_info.locations
                    delete travel_info._id;
                    console.log('else delete deleteTravelPlain')
                    console.log(await travelDao.deleteTravelPlan(travel_info.user_id))
                    travel_info = data;
                    console.log('update', travel_info)
                }
            }

            const inserted = await travelDao.createTravelPlan(travel_info)
            inserted.success = true;
            res.json(inserted);
        } catch (err) {
            console.log(err)
            res.json({success: false, "msg": "write db failed" + err})
        }
    }

    const travel_info = async (req, res) => {
        const uid = req.params.uid;
        if (!uid) {
            res.status(200);
            res.json({success: false, "msg": "login timeout， please re-login"})
            return;
        }
        try {
            let inserted = await travelDao.findAllUsersTravelPlan(uid)
            if (!inserted)
                inserted = {};
            inserted.success = true;
            res.json({success: true, data: inserted});
        } catch (err) {
            console.log(err)
            res.json({success: false, "msg": "write db failed" + err})
        }
    }
    const deletePlanByPlanID = async (req, res) => {
        try {
            const pid = req.params.pid;
            await travelDao.deletePlanByPlanID(pid);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    const updateTravelPlan = async (req, res) => {
        const pid = req.params.pid;
        let updates = req.body;
        // console.log(updates);
        const status = await travelDao.updateTravelPlan(pid, updates);
        // console.log(status);
        const newPlan = await travelDao.findTravelPlanbyID(pid);
        res.json(newPlan);

    }

    const findTravelPlanbyID = async (req, res) => {
        try {
            const pId = req.params.pid;
            const plans = await travelDao.findTravelPlanbyID(pId);
            res.json(plans);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    const findAllTravelPlanByUser = async (req, res) => {
        try {
            const userId = req.params.uid;
            const plans = await travelDao.findAllTravelPlanByUser(userId);
            res.json(plans);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    const getRecommendation = async (req, res) => {
        try {
            const plans = await travelDao.getRecommendation();
            res.json(plans);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    const adminFind = async (req, res) => {
        try {
            const plans = await travelDao.adminFind();
            res.json(plans);
        } catch (err) {
            res.status(500).send(err.message);
        }
    }

    app.post("/api/travel/create", travel_create);
    app.get("/api/travel/get/:uid", travel_info);
    app.delete('/api/travel/delete/:pid', deletePlanByPlanID);
    app.put('/api/travel/update/:pid', updateTravelPlan);
    app.get("/api/travel/findOne/:pid", findTravelPlanbyID);
    app.get("/api/travel/findAll/:uid", findAllTravelPlanByUser);
    app.get("/api/travel/findAll", adminFind);
    app.get("/api/travel/recommendation", getRecommendation);
};

export default travelController;
