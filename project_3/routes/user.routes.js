import {Router} from 'express';
import { getUser, getUsers } from '../controllers/user.controllers.js';
import authorize from '../middleware/auth.middleware.js';

const userRouter = Router()

userRouter.get('/',getUsers);


userRouter.get('/:id',authorize,getUser);

userRouter.post('/:id',(req,res) => {
    res.send({title : 'create new users'})
});


userRouter.put('/:id',(req,res) => {
    res.send({title : 'Update the users'})
});


userRouter.delete('/:id',(req,res) => {
    res.send({title : 'delete user'})
});

export default userRouter; 