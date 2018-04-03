/**
 * HomeController
 *
 * @description :: Server-side logic for managing Homes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	default: function (req, res) {
    console.info("Page index");
    return res.view("contact/home", {
        status: 'OK',
        title: "Diary Go",
        message: "Hello, world now..."
    });
	},
  cry: function (req, res) {
  	console.info("cry invoked");
    return res.json({title: "I am crying..."});
  },
};

