import {
    httpError,
    UniqueConstraintError,
    InvalidPropertyError,
    RequiredParameterError
} from '../../helpers/errors';
import makeUser from './makeUser';

export default function makeUserEndpointHandler({ userList }) {
    return async function handle(httpResuest) {
        switch (httpResuest.method) {
            case 'POST':
                return postUser(httpResuest);

            case 'GET':
                return getUser(httpResuest);

            case 'PATCH':
                return patchUser(httpResuest);

            default:
                return makeHttpError({
                    statusCode: 405,
                    errorMessage: `${httpRequest.method} method not allowed.`
                });
        }
    }

    async function postUser(httpResuest) {
        const userInfo = httpResuest.body;

        try {
            const user = await makeUser(userInfo);
            const result = await userList.add(user)
            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 201,
                data: JSON.stringify(result)
            }
        } catch (e) {
            return httpError({
                errorMessage: e.message,
                statusCode:
                    e instanceof UniqueConstraintError
                        ? 409
                        : e instanceof InvalidPropertyError ||
                            e instanceof RequiredParameterError
                            ? 400
                            : 500
            })
        }
    }

    async function getUser(httpRequest) {
        try {
            const { nickName } = httpRequest.pathParams || {}
            const { max, before, after } = httpRequest.queryParams || {}

            const result = nickName
                ? await userList.findByNickName({ nickName: nickName })
                : await userList.getUsers({ max, before, after });

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify(result)
            };
        } catch (e) {
            throw e.stack;
        }
    }

    async function patchUser(httpRequest) {
        try {
            const { nickName } = httpRequest.pathParams || {}
            const { userStatus } = httpRequest.queryParams || {}

            console.log('------------');
            console.log(userList.setStatus.toString());
            const result = await userList.setStatus({ nickName, userStatus });
            console.log('------------');

            return {
                headers: {
                    'Content-Type': 'application/json'
                },
                statusCode: 200,
                data: JSON.stringify(result)
            };
        } catch (e) {
            return {
                errorMessage: e.message,
                statusCode:
                    e instanceof UniqueConstraintError
                        ? 409
                        : e instanceof InvalidPropertyError ||
                            e instanceof RequiredParameterError
                            ? 400
                            : 500
            }
        }
    }


}
