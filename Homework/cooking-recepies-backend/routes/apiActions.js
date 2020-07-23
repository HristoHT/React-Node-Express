'use strict'
import getDatabase from '../database/databaseConnetion';
import makeUserEndpointHandler from './users-endpoint/makeUserEndpointHandler';
import makeUserList from './users-endpoint/makeUserList';

const database = getDatabase();
const userList = makeUserList({ database });
const processUserRequest = makeUserEndpointHandler({ userList });

export { processUserRequest };