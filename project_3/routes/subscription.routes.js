import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get('/',(req,res) => {
res.send({title : 'GET all subscriptions' })
});

subscriptionRouter.get('/:id',(req,res) => {
res.send({title : 'GET user subscriptions' })
});

subscriptionRouter.post('/',(req,res) => {
res.send({title : 'create a subscriptions' })
});

subscriptionRouter.put('/:id',(req,res) => {
res.send({title : 'update subscriptions' })
});


subscriptionRouter.delete('/:id',(req,res) => {
res.send({title : 'delete user subscription' })
});

subscriptionRouter.get('/user/:id',(req,res) => {
res.send({title : 'GET all the subscriptions of  a specific user' })
});

subscriptionRouter.put('/:id/cancel',(req,res) => {
res.send({title :'cancel a subscriptions' })
});

subscriptionRouter.get('/upcoming-renewals',(req,res) => {
res.send({title : 'get upcoming renewal subscriptions' })
});

export default subscriptionRouter;