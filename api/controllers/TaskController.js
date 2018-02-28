/**
 * TaskController
 *
 * @description :: Server-side logic for managing tasks
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    index:function (req,res) {
        Task.find({ where: { isActive: 1 }, sort: 'createdAt DESC' }).exec(function (err,record) {
            if (err) {
                console.log(err);
                
                return res.serverError(err);
            }
            res.view('home',{
                tasks:record
            })
        });
    },
	create: function (req,res) {
        Task.create({
            task:req.param('task'),
            isCompleted : 0,
            isActive : 1
        }).exec(function (err,records) {
            if (err) {
                return res.serverError(err);
            }
            res.redirect('/')
        });
    },
    delete: function (req,res) {
        
        Task.update({id:req.param('id')},{isActive : 0}).exec(function (err , result) {
            if (err) {
                return res.serverError(err);
            }
            res.redirect('/')
        });
    },
    update:function (req,res) {
        Task.update({id:req.param('id')},{task : req.param('task')}).exec(function (err , result) {
            if (err) {
                return res.serverError(err);
            }
            res.redirect('/')
        });
    },
    statusToggle:function (req,res) {
        Task.update({id:req.param('id')},{isCompleted : req.param('status')}).exec(function (err , result) {
            if (err) {
                return res.serverError(err);
            }
            res.redirect('/')
        });
    }
};

