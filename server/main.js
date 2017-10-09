import { Meteor } from 'meteor/meteor';
Rooms = new Mongo.Collection('Rooms');
Meteor.startup(() => {
    
    Picker.route('/rooms', function(params, req, res, next) {
	  let post = Rooms.find({}).fetch();
	  res.end(JSON.stringify(post));
	});

    Picker.route('/rooms/:name', function(params, req, res, next) {
	  let post = Rooms.findOne({name:params.name});
	  res.end(post ? JSON.stringify(post) : JSON.stringify({success: true, msg:'No such record exist.'}));
	});

	Picker.route('/registerRoom', function(params, req, res, next) {
		let _room = Rooms.find({name:params.query.name}).fetch();
		if(_room.length>0){			
	  		res.end(JSON.stringify({success: false, msg:'Name already exist.'}));
		}else{
			Rooms.insert({name:params.query.name, createdAt: new Date(), updatedAt: new Date()})
	  		res.end(JSON.stringify(JSON.stringify({success: true, msg:'Done'})));	
		}		
	});
    
    Picker.route('/updateRoom', function(params, req, res, next) {
    	let _newRoom = Rooms.find({name:params.query.newName}).fetch();
    	let _oldRoom = Rooms.find({name:params.query.oldName}).fetch();
    	if(_oldRoom.length>0){			
	  		res.end(JSON.stringify({success: false, msg:'NO such record exist.'}));
		}else if(_newRoom.length>0){			
	  		res.end(JSON.stringify({success: false, msg:'old name already exist.'}));
		}else{
			Rooms.update({name:params.query.oldName},{$set:{name:params.query.newName}})
	  		res.end(JSON.stringify(JSON.stringify({success: true, msg:'Done'})));
		}	
		
	});
});
