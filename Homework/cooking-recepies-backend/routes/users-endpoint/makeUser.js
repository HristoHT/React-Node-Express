import requiredParam from '../../helpers/requeredParam';
import { InvalidPropertyError } from '../../helpers/errors';
import { hashPassword } from '../../helpers/passwordHash';

export default async function makeUser(userInfo = requiredParam('userInfo')) {
    const validUser = validate(userInfo);
    const normalizeUser = await normalize(validUser);
    return Object.freeze(normalizeUser);

    function validate({
        userName = requiredParam('userName'),
        nickName = requiredParam('nickName'),
        password = requiredParam('password'),
        sex = requiredParam('sex'),
        userRole = requiredParam('userRole'),
        ...rest
    }) {
        validateUserName(userName);
        validateNickName(nickName);
        validatePassword(password);

        return { userName, password, nickName, sex, userRole, ...rest };
    }

    async function normalize({
        password,
        sex,
        avatar = null,
        ...rest
    }) {
        password = await hashPassword(password);
        avatar = getAvatar(avatar, sex);

        return { password, sex, avatar, ...rest };
    }

    function getAvatar(avatar, sex) {
        if (!avatar) {
            if (sex === 'female') avatar = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fplanetbotanix.com%2Ftestimonials%2Fconnie-h%2Ffemale-avatar-1-300x300%2F&psig=AOvVaw2ea362av8XfjjF7D_ZrOtH&ust=1591702378032000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCKDehdqP8ukCFQAAAAAdAAAAABAD'
            else avatar = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.shutterstock.com%2Fes%2Fsearch%2Favatar%2Bheads%3Fcontext_photo%3D619318991%26search_source%3Dbase_related_searches&psig=AOvVaw3tbmmp2gmwDkNNm60URQe1&ust=1591702285134000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLiqwOeP8ukCFQAAAAAdAAAAABAD';
        }

        return avatar;
    }

    function validateNickName(nickName) {
        if (nickName.length < 4 || nickName.length > 15) {
            throw new InvalidPropertyError(
                `A user's nickName must be between 4 and 15 characters long.`
            )
        }
    }

    function validateUserName(userName) {
        if (userName.length < 5) {
            throw new InvalidPropertyError(
                `A user's userName must be at least 5 characters long.`
            )
        }
    }

    function validatePassword(password) {
        if (password.length < 6) {
            throw new InvalidPropertyError(
                `A user's password must be at least 6 characters long.`
            )
        }
    }
}