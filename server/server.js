const PORT = process.env.PORT || 3000;
const express = require('express');
const host = require('./Objects/host');
const student = require('./Objects/student');
const verify = require('./utils/verify');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: './config/.env' });

//Start Server
const server = app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
});
const io = require('socket.io')(server, {
    cors: {
        origin: "*"
    }
});

mongoose.connect(process.env.DATABASE_ACCESS)

let newStudent = {
    username: "test1",
    email: "test@mail.net",
    password: "testPassword",
    fullName: {
        firstName: "First",
        lastName: "Last"
    },
    birthDate: new Date(2002, 6, 11),
    gender: "Male"
};

let newHost = {
    email: "testhost@mail.net",
    hostEmail: "testhost@mail.net",
    password: "testPassword",
    hostName: "hostNameTest",
    description: "descriptionTest",
    phoneNumber: "+1 (999) 1234 567",
    website: "www.host.com",
    tags: []
};

io.on('connection', (socket) => {
    socket.on('verifySignup', (request, callback) => {
        if (request.type == 'EMAIL') {
            verify.checkEmailExists(request.email, (ret) => {
                if (ret) {
                    callback({ err: 'Email exists' });
                    return;
                }

                callback({ ret: 'Email does not exist' });
            });
        } else if (request.type == 'USERNAME') {
            verify.checkUsernameExists(request.username, (ret) => {
                if (ret) {
                    callback({ err: 'Username exists' });
                    return;
                }

                callback({ ret: 'Username does not exist' });
            });
        }
    });

    socket.on('login', async (request, callback) => {
        let isStudentLogin = await student.isStudentLogin(request);
        let isHostLogin = await host.isHostLogin(request);

        if(isStudentLogin) {
            student.studentLogin(request, (err, res) => {
                if(err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else if (isHostLogin) {
            host.hostLogin(request, (err, res) => {
                if(err) {
                    callback(err, null);
                    return;
                }
                callback(null, res);
            });
        } else {
            callback({err: "INCORRECT_EMAIL"}, null);
        }
    });

    socket.on('verifyToken', (request, callback) => {
        try {
            let decoded = jwt.verify(request.token, process.env.APP_SECRET);

            callback(null, { signInType: decoded.signInType });
        } catch (err) {
            console.log(err);
            callback(err, null);
        }
    });

    studentListeners(socket);
    hostListeners(socket);
});

//Possible other events for students:
//Retreive list of interested and confirmed events
//Retreive list of hosts
var studentListeners = (socket) => {
    socket.on('studentSignup', (request, callback) => {
        student.studentSignup(request.newStudent, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('addInterestedEvent', (request, callback) => {
        student.addInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('addConfirmedEvent', (request, callback) => {
        student.addConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('removeInterestedEvent', (request, callback) => {
        student.removeInterestedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('removeConfirmedEvent', (request, callback) => {
        student.removeConfirmedEvent(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('followHost', (request, callback) => {
        student.followHost(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('unfollowHost', (request, callback) => {
        student.unfollowHost(request.uid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });
};

//Possible events to listen for in hosts:
//Retreive list of events
var hostListeners = (socket) => {
    socket.on('hostSignup', (request, callback) => {
        host.hostSignup(request.newHost, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('createEventHost', (request, callback) => {
        host.createEventHost(request.newEvent, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });

    socket.on('updateEventHost', (request, callback) => {
        //Implement Later
    });

    socket.on('deleteEventHost', (request, callback) => {
        host.deleteEventHost(request.hid, request.eid, (err, ret) => {
            if (err) {
                callback({ err: err });
                return;
            }

            callback({ ret: ret });
        });
    });
};