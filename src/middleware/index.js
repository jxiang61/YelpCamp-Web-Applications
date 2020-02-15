//all middleware goes here;
var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {		
		Campground.findById(req.params.id, function(err, foundCampground) {
			 if (err) {res.redirect("back");}
			 else {
				//does the user own the campgorund
				if (foundCampground.author.id.equals(req.user._id)) {
					next();
				}
				
				else {
					req.flash("error", "You don't have permission to do that");
					res.redirect("back");
				}
			}
		});
	}
	else {
			res.flash("error","You need to login to do that");
			res.redirect("back");
		}
}


middlewareObj.checkCommentOwnership = function(req,res,next) {
	if(req.isAuthenticated()) {		
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			 if (err) {res.redirect("back");}
			 else {
				//does the user own the comment
				if (foundComment.author.id.equals(req.user._id)) {
					next();
				}
				
				else {
					res.redirect("back");
				}
			}
		});
	}
	else {
			res.redirect("back");
		}
}

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	req.flash("error","Please login first");
	res.redirect("/login");
}

module.exports = middlewareObj