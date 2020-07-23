import mongodb from 'mongodb';

export default async () => {
  const MongoClient = mongodb.MongoClient
  const url = 'mongodb+srv://ServizTestingUser:ServizTestingUserPassword@cluster0-poxvv.mongodb.net/test?authSource=admin&replicaSet=Cluster0-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true'
  const dbName = 'rest_api'
  const client = new MongoClient(url, { useNewUrlParser: true })
  await client.connect()
  const db = await client.db(dbName)
  db.ObjectID = makeIdFromString
  return db
}

function makeIdFromString (id) {
  return new mongodb.ObjectID(id)
}