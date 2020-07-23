import { UniqueConstraintError } from '../../helpers/errors';
import requiredParam from '../../helpers/requeredParam';

export default function makeUserList({ database }) {
  return Object.freeze({
    add,
    findByNickName,
    getUsers,
    setStatus,
    /*findById,
    getItems,
    remove,
    replace,
    update*/
  });

  async function add({ ...user }) {
    const db = await database
    const { result, ops } = await db
      .collection('users')
      .insertOne(user)
      .catch(mongoError => {
        const [errorCode] = mongoError.message.split(' ')
        if (errorCode === 'E11000') {
          const [_, mongoIndex] = mongoError.message.split(':')[2].split(' ')
          throw new UniqueConstraintError(
            mongoIndex === 'ContactEmailIndex' ? 'emailAddress' : 'contactId'
          )
        }
        throw mongoError
      });

    return {
      success: result.ok === 1,
      created: ops[0]
    };
  }

  async function findByNickName({ nickName }) {
    try {
      const db = await database
      const results = await db
        .collection('users')
        .find({ nickName })
        .toArray();
      return results;
    } catch (e) {
      throw e.stack;
    }
  }

  async function getUsers({ max = 100, before, after } = {}) {
    try {
      const db = await database
      const query = {}

      if (before || after) {
        query._id = {}
        query._id = before ? { ...query._id, $lt: db.makeId(before) } : query._id
        query._id = after ? { ...query._id, $gt: db.makeId(after) } : query._id
      }

      return (await db
        .collection('users')
        .find(query)
        .limit(Number(max))
        .toArray());
    } catch (e) {
      throw e.stack;
    }
  }

  async function setStatus({
    nickName = requiredParam("nickName"),
    userStatus = requiredParam('userStatus') } = {}) {
    console.log(0);
    const db = await database;
    console.log(1);
    const { result, ops } = await db
      .collection('users')
      .update(nickName, { userStatus });

    return {
      success: result.ok === 1,
      created: ops[0]
    };

  }

}