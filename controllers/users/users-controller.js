import * as userDao from "../../daos/users/users-dao.js";

const UserController = (app) => {
    app.get('/api/users/:uid/excluded', findAllUsersWithoutMe);
    app.get('/api/users/:uid', findUserByUserId);
    app.put('/api/users/:uid', updateUser);
}

const findAllUsersWithoutMe = async (req, res) => {
    const userId = req.params.uid;
    // filter out logged in user
    const users = await userDao.findAllUsersWithoutMe(userId);
    res.json(users);
}

const findUserByUserId = async (req, res) => {
    try {
        const userId = req.params.uid;
        const user = await userDao.findUserById(userId)
        res.json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

const updateUser = async (req, res) => {
    const uid = req.params.uid;
    const updates = req.body;
    const status = await userDao.updateUser(uid, updates);
    const newuser = await userDao.findUserById(uid);
    res.json(newuser);

}

export default UserController;