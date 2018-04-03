/**
 * ContactController
 *
 * @description :: Server-side logic for managing Contacts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	form : function (req, res) {
    console.log("Form contact");
    return res.view("contact/form_contact", {
      contact: {
        name: "",
        lastname: "",
        username: "",
        email: "",
        birth: "",
        phone: "",
        image_url: ""
      },
      status: "No",
      info: "",
      title: "Add a new contact"
    });
  },

  create: function (req, res) {
    console.log("Create contact: " + JSON.stringify(req.params.all()));
    var contact = {
      name: req.param("name"),
      lastname: req.param("lastname"),
      username: req.param("username"),
      email: req.param("email"),
      birth: new Date(req.param("birth")),
      phone: req.param("phone"),
      image_url: req.param("image_url")
    };
    return Contact.create(contact).then(function (_contact) {
      console.log("Contact created: " + JSON.stringify(_contact));
      return res.redirect("find_all");
      /* return res.view("contact/form_contact", {
        contact: contact,
        status: "Ok",
        info: "Contact created ok",
        title: "Add a new contact"
      }); */
    }).catch(function (err) {
      console.error(JSON.stringify(err));
      return res.view("contact/form_contact", {
        contact: contact,
        status: "Error",
        info: err,
        title: "Add a new contact"
      });
    });
  },

  update: function (req, res) {
    console.log("Update contact");
    return Contact.update({id: req.param("id")}, {
      name: req.param("name"),
      lastname: req.param("lastname"),
      username: req.param("username"),
      email: req.param("email"),
      birth: new Date(req.param("birth")),
      phone: req.param("phone"),
      image_url: req.param("image_url")
    }).then(function (_contact) {
        return res.redirect("find_all");
    }).catch(function (err) {
        console.error("Error on ContactService.updateContact");
        console.error(err);

        return Contact.find().where({pid: req.param("pid")}).then(function (_contact) {
            if (_contact && _contact.length > 0) {
                return res.view("contact/edit", {
                    contact: _contact[0],
                    status: 'Error',
                    errorType: 'validation-error',
                    statusDescription: err,
                    title: 'Contact Details'
                });
            } else {
                return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
            }
        }).catch(function (err) {
            return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
        });
    });
  },

  find: function (req, res) {
    console.log("Find one contact");
    var id = req.params.id;
    return Contact.find().where({id: id}).then(function (_contact) {
      if (_contact && _contact.length > 0) {
        return res.view("contact/update_contact", {
            contact: _contact[0],
            status: "No",
		        info: "",
		        title: "Edit contact"
        });
      } else {
      	// falta
        console.log("Inside find NOT Found .... ");
        return res.view("contact/form_contact", {
            status: 'Error',
            errorType: 'not-found',
            statusDescription: 'No contact found with pid, ' + id,
            title: 'Contact Details'
        });
      }
    }).catch(function (err) {
    		// falta
        console.log("Inside find ERROR .... ");
        return res.view("contact/edit", {
            status: 'Error',
            errorType: 'not-found',
            statusDescription: 'No contact found with pid, ' + id,
            title: 'Contact Details'
        });
    });
  },

  findall: function (req, res) {
    console.log("Find all contact");
    return Contact.find().sort('id ASC').then(function (contacts) {
      return res.view("contact/find_all", {
        contacts: contacts,
        status: "Ok",
      	info: "",
      	title: "List all contact"
      });
    }).catch(function (err) {
      console.error(err);
      return res.view('500', {message: "Sorry, an error occurd - " + err});
    });
  },

  delete: function (req, res) {
    console.log("Delete contact");
    return Contact.find().where({id: req.param("id")}).then(function (_contact) {
      if (_contact && _contact.length > 0) {
        _contact[0].destroy().then(function (_contact) {
          return res.redirect("find_all");
        }).catch(function (err) {
          return res.redirect("find_all");
        });
      } else {
        return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
      }
    }).catch(function (err) {
        return res.view('500', {message: "Sorry, no Contact found with pid - " + req.param("pid")});
    });
  },
};

