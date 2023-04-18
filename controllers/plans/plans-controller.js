import * as plansDao from "../../daos/plans/plans-dao.js";

const  PlansController= (app) => {
    app.post('/api/plans', createPlan);
    app.delete('/api/plans/:pId', deletePlan);
    app.get('/api/plans/:pId', findPlan);
    app.get('/api/plans/:userId', findAllPlanByUser);
    app.put('/api/plans/:pId', updatePlan);
}

const findPlan = async (req, res) => {
    try {
        const pId = req.params.pId;
        const plans = await plansDao.findPlan(pId);
        res.json(plans);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findAllPlanByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const plans = await plansDao.findAllPlanByUserId(userId);
        res.json(plans);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deletePlan = async (req, res) => {
    try {
        const pId = req.params.pId;
        await plansDao.deletePlan(pId);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createPlan = async (req, res) => {
    try {
        const newPlan = req.body;
        const plan = await plansDao.createPlan(newPlan);
        res.json(plan);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updatePlan = async (req, res) => {
    const pId = req.params.pId;
    const updates = req.body;
    // console.log(updates);
    const status = await plansDao.updatePlan(pId, updates);
    // console.log(status);
    const newPlan = await plansDao.findPlan(pId);
    res.json(newPlan);

}
export default PlansController