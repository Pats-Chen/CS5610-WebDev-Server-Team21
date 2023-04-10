import * as testDao from './test-dao.js'
import {json} from "express";


const findAllTestUser = async(req, res)=>{
    const users = await testDao.findAllTestUser()
    res.json(users)
}

const createTestUser = async(req, res)=>{
    const newUser = req.body
    const insertedUser= await testDao.createTestUser(newUser);
    res.json(insertedUser);
}
const deleteTestUser = async(req, res)=>{
    const uId = req.params.uId;
    const status= await testDao.deleteTestUser(uId);
    res.json(status);
}

const updateTestUser = async(req, res)=>{
    const userIdTolUpdate = req.params.uId;
    const updates = req.body;
    const status= await testDao.updateUser(userIdTolUpdate,updates);
    res.json(status);
}


export default (app) => {
    app.post('/api/test', createTestUser);
    app.get('/api/test', findAllTestUser);
    app.put('/api/test/:uId', updateTestUser);
    app.delete('/api/test/:uId', deleteTestUser);
}