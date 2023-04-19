import * as travelDao from "../../daos/travel_plan/travel_plan_dao.js";


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

    app.post("/api/travel/create", travel_create);
    app.get("/api/travel/get/:uid", travel_info);

};

export default travelController;
