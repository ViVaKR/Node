import express, { response } from "express";
import { validationResult, matchedData, checkSchema } from 'express-validator'
import { createuserValidationSchema } from "./utils/validationSchemas.mjs";
import usersRouter from "./routes/users.mjs";
import { mockUsers } from "./utils/constants.mjs";

//* 데이터
const app = express();
const PORT = process.env.PORT || 58880;

//* prevent 304 status code.
app.disable('etag');

//--> Global Middlaware
app.use(express.json());
app.use(usersRouter);

const loggingMiddleware = (req, res, next) => {
    console.log(`${req.method} -> ${req.url}`);
    next();
};

//--> Refactoring Part
const resolveIndexbyUserId = (req, res, next) => {
    const { params: { id } } = req;
    const parasedId = parseInt(id);
    if (isNaN(parasedId)) return response.sendStatus(400);
    const findUserIndex = mockUsers.findIndex((user) => user.id === parasedId);
    if (findUserIndex === -1) return response.sendStatus(404);
    req.findUserIndex = findUserIndex;
    next();
};

//--> [ GET ]
app.get('/',
    (req, res) => {
        let env = process.env.PORT;
        res.status(201).send({ msg: `Node Camp! ( ${env} )` });
    },
);

// Parameters
app.get('/api/users/:id', resolveIndexbyUserId, (req, res) => {

    const { findUserIndex } = req;
    const findUser = mockUsers[findUserIndex];
    // const parsedId = parseInt(req.params.id);
    // if (isNaN(parsedId)) return res.status(400).send({ msg: 'Bad Request. Invalid Id' });
    // const findUser = mockUsers.find((user) => user.id == parsedId);
    if (!findUser) return res.sendStatus(404);
    return res.send({ msg: findUser });
})

// Query String : Key, Value Pairs, &key=value

//* [ POST ]
app.post('/api/users', checkSchema(createuserValidationSchema),
    // [
    //     body('username')
    //         .notEmpty()
    //         .withMessage('Username cannot be empty')
    //         .isLength({ min: 5, max: 32 })
    //         .withMessage('Username must be at least 5 characters with a max of 32 characters')
    //         .isString()
    //         .withMessage('Username must be a string!'),
    //     body('displayName')
    //         .notEmpty()
    // ],
    (req, res) => {

        const result = validationResult(req);
        console.log(result);

        if (!result.isEmpty())
            return res.status(400).send({ error: result.array(), message: "잘못된 데이터입니다." });

        const data = matchedData(req);
        //! 바로 구문 분석을 하지 않음으로 미들웨어 필요.--> app.use(express.json())
        const { body } = req;
        const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...data };
        mockUsers.push(newUser);
        return res.status(201).send(newUser);
    });

//* [ PUT ] : Update Data, 전체 업데이트
app.put("/api/users/:id", resolveIndexbyUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { id: mockUsers[findUserIndex].id, ...body };
    return res.sendStatus(200);
});

//* [ PATCH ] : Updae Data, 부분 업데이트
app.patch('/api/users/:id', resolveIndexbyUserId, (req, res) => {
    const { body, findUserIndex } = req;
    mockUsers[findUserIndex] = { ...mockUsers[findUserIndex], ...body }
    return res.sendStatus(200);
});

//* [ DELETE ] : DeleteData
app.delete('/api/users/:id', resolveIndexbyUserId, (req, res) => {
    const { findUserIndex } = req;
    mockUsers.splice(findUserIndex, 1);
    return res.sendStatus(200);
});

//------------------------------------------//
//* Listen
app.listen(PORT, () => {
    console.log(`Running on Port ${PORT}`);
});

//------------------------------------------//

//! npm run start:dev //

// locahost:58880
// localhost: 3000/api/users
// localhost:3000/api/products
// localhost: 58880/air/products?key=value&key2=value2
// localhost:58880/api/users?filter=username&&value=son

//! install extensions
//* thunder client

//! install packages
//$ npm i express-validator

/*
! Status Codes

[ Successful ]
? 200 - OK
The 200 status code is by far the most common returned. It means, simply, that the request was received and understood and is being processed.

? 201 - Created
 A 201 status code indicates that a request was successful and as a result, a resource has been created (for example a new page).

202 - Accepted
The status code 202 indicates that server has received and understood the request, and that it has been accepted for processing, although it may not be processed immediately.

203 - Non-Authoritative Information
A 203 status code means that the request was received and understood, and that information sent back about the response is from a third party, rather than the original server. This is virtually identical in meaning to a 200 status code.

204 - No Content
The 204 status code means that the request was received and understood, but that there is no need to send any data back.

205 - Reset Content
The 205 status code is a request from the server to the client to reset the document from which the original request was sent. For example, if a user fills out a form, and submits it, a status code of 205 means the server is asking the browser to clear the form.

206 - Partial Content
A status code of 206 is a response to a request for part of a document. This is used by advanced caching tools, when a user agent requests only a small part of a page, and just that section is returned.
Redirection

300 - Multiple Choices
The 300 status code indicates that a resource has moved. The response will also include a list of locations from which the user agent can select the most appropriate.

301 - Moved Permanently
A status code of 301 tells a client that the resource they asked for has permanently moved to a new location. The response should also include this location. It tells the client to use the new URL the next time it wants to fetch the same resource.
302 - Found
A status code of 302 tells a client that the resource they asked for has temporarily moved to a new location. The response should also include this location. It tells the client that it should carry on using the same URL to access this resource.
303 - See Other
A 303 status code indicates that the response to the request can be found at the specified URL, and should be retrieved from there. It does not mean that something has moved - it is simply specifying the address at which the response to the request can be found.
304 - Not Modified
The 304 status code is sent in response to a request (for a document) that asked for the document only if it was newer than the one the client already had. Normally, when a document is cached, the date it was cached is stored. The next time the document is viewed, the client asks the server if the document has changed. If not, the client just reloads the document from the cache.
305 - Use Proxy
A 305 status code tells the client that the requested resource has to be reached through a proxy, which will be specified in the response.
307 - Temporary Redirect
307 is the status code that is sent when a document is temporarily available at a different URL, which is also returned. There is very little difference between a 302 status code and a 307 status code. 307 was created as another, less ambiguous, version of the 302 status code.
Client Error
400 - Bad Request
A status code of 400 indicates that the server did not understand the request due to bad syntax.
401 - Unauthorized
A 401 status code indicates that before a resource can be accessed, the client must be authorised by the server.
402 - Payment Required
The 402 status code is not currently in use, being listed as "reserved for future use".
403 - Forbidden
A 403 status code indicates that the client cannot access the requested resource. That might mean that the wrong username and password were sent in the request, or that the permissions on the server do not allow what was being asked.
404 - Not Found
The best known of them all, the 404 status code indicates that the requested resource was not found at the URL given, and the server has no idea how long for.
405 - Method Not Allowed
A 405 status code is returned when the client has tried to use a request method that the server does not allow. Request methods that are allowed should be sent with the response (common request methods are POST and GET).
406 - Not Acceptable
The 406 status code means that, although the server understood and processed the request, the response is of a form the client cannot understand. A client sends, as part of a request, headers indicating what types of data it can use, and a 406 error is returned when the response is of a type not i that list.
407 - Proxy Authentication Required
The 407 status code is very similar to the 401 status code, and means that the client must be authorised by the proxy before the request can proceed.
408 - Request Timeout
A 408 status code means that the client did not produce a request quickly enough. A server is set to only wait a certain amount of time for responses from clients, and a 408 status code indicates that time has passed.
409 - Conflict
A 409 status code indicates that the server was unable to complete the request, often because a file would need to be editted, created or deleted, and that file cannot be editted, created or deleted.
410 - Gone
A 410 status code is the 404's lesser known cousin. It indicates that a resource has permanently gone (a 404 status code gives no indication if a resource has gine permanently or temporarily), and no new address is known for it.
411 - Length Required
The 411 status code occurs when a server refuses to process a request because a content length was not specified.
412 - Precondition Failed
A 412 status code indicates that one of the conditions the request was made under has failed.
413 - Request Entity Too Large
The 413 status code indicates that the request was larger than the server is able to handle, either due to physical constraints or to settings. Usually, this occurs when a file is sent using the POST method from a form, and the file is larger than the maximum size allowed in the server settings.
414 - Request-URI Too Long
The 414 status code indicates the the URL requested by the client was longer than it can process.
415 - Unsupported Media Type
A 415 status code is returned by a server to indicate that part of the request was in an unsupported format.
416 - Requested Range Not Satisfiable
A 416 status code indicates that the server was unable to fulfill the request. This may be, for example, because the client asked for the 800th-900th bytes of a document, but the document was only 200 bytes long.
417 - Expectation Failed
The 417 status code means that the server was unable to properly complete the request. One of the headers sent to the server, the "Expect" header, indicated an expectation the server could not meet.
Server Error
500 - Internal Server Error
A 500 status code (all too often seen by Perl programmers) indicates that the server encountered something it didn't expect and was unable to complete the request.
501 - Not Implemented
The 501 status code indicates that the server does not support all that is needed for the request to be completed.
502 - Bad Gateway
A 502 status code indicates that a server, while acting as a proxy, received a response from a server further upstream that it judged invalid.
503 - Service Unavailable
A 503 status code is most often seen on extremely busy servers, and it indicates that the server was unable to complete the request due to a server overload.
504 - Gateway Timeout
A 504 status code is returned when a server acting as a proxy has waited too long for a response from a server further upstream.
505 - HTTP Version Not Supported
A 505 status code is returned when the HTTP version indicated in the request is no supported. The response should indicate which HTTP versions are supported.
*/
