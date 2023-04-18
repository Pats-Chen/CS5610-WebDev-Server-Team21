import * as reviewDao from "../../daos/reviews/review-dao.js";


const  ReviewController= (app) => {
    app.post('/api/reviews', createReview);
    app.get('/api/reviews/plan/:planId/', findAllReviewByPlanId);
    app.delete('/api/reviews/:rId', deleteReview);
    app.get('/api/reviews/:rId', findReview);
    app.get('/api/reviews/author/:authorId', findAllReviewByAuthor);
    app.put('/api/reviews/:rId', updateReview);
}

const findAllReviewByPlanId = async (req, res) => {
    try {
        const planId = req.params.planId;
        const views = await reviewDao.findAllReviewByPlanId(planId);
        res.json(views);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findReview = async (req, res) => {
    try {
        const rId = req.params.rId;
        const views = await reviewDao.findReview(rId);
        res.json(views);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const findAllReviewByAuthor = async (req, res) => {
    try {
        const authorId = req.params.authorId;

        const views = await reviewDao.findAllReviewByAuthor(authorId);
        res.json(views);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const deleteReview = async (req, res) => {
    try {
        const rId = req.params.rId;
        await reviewDao.deleteReview(rId);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const createReview = async (req, res) => {
    try {
        const newReview = req.body;
        const review = await reviewDao.createReview(newReview);
        res.json(review);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateReview = async (req, res) => {
    const rId = req.params.rId;
    const updates = req.body;
    // console.log(updates);
    const status = await reviewDao.updateReview(rId, updates);
    // console.log(status);
    const newReview = await reviewDao.findReview(rId);
    res.json(newReview);

}
export default ReviewController
