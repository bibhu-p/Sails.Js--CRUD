'use strict';

var bcryptjs = require('bcryptjs');

module.exports = {
    register:async(req, res) =>{
        // const data = req.body;

        const saltRounds = 12;
        const password = req.body.password;

        const hash = bcryptjs.hashSync(password, saltRounds);

        // return res.send(hash);

        // User.create({
        //     name: req.body.name,
        //     email: req.body.email,
        //     password: hash
                
        // })
        // .then((user) => {
        //     res.send({ token: jwToken.issue({ id: user.id }) }); // payload is { id: user.id}
        // })
        // .catch((err) => {
        //     sails.log.error(err);
        //     return res.serverError("Something went wrong");
        // });


        const data = {
            name:req.body.name,
            email:req.body.email,
            password: hash   
        }
        try{
            let result = await User.create(data).fetch();
            if(result){
                return res.status(200).json({success:true, data:result})
            }
        }catch(error){
            console.log(error)
            return res.status(500).json({success:false, message:"Something went wrong."})
        }
    },

    login: (req, res) =>{
        const email = req.body.email;
        const pass = req.body.password;
        // console.log(">>>>>>>>>>>>>>>>>>>>>>>.");
// 
        // return res.send(req.body);
        if (!email || !pass) return res.badRequest('Email and password required');

        User.findOne({ email: email }).then((user) => {
                if (!user) return res.notFound();

                bcryptjs.compare(req.body.password, user.password)
                    .then(() => {
                        return res.send({ token: jwToken.issue({ id: user.id }) })
                    })
                    .catch((err) => {
                        return res.forbidden();
                    });
            })
            .catch((err) => {
                sails.log.error(err);
                return res.serverError();
        });
    }
};