
const router = require('express').Router()
const { MongoClient, ObjectId } = require('mongodb')

const url = process.env.MONGODB_URI || require('./secrets/mongodb.json').url
const client = new MongoClient(url)

const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)
}

router.get('/', async (_, response) => {
    // this maps to GET /api/todos
    const collection = await getCollection('todo-api', 'todos')
    const todos = await collection.find().toArray()
	response.json(todos)
})

router.post('/', async (request, response) => {
    // this maps to POST /api/todos
    const { body } = request
    const { item } = body
    const complete = false

    const collection = await getCollection('todo-api', 'todos')
    const result = await collection.insertOne({ item, complete })
    response.json(result)
})

router.put('/:id', async (request, response) => {
    // this maps to PUT /api/todos/:id
    const { id } = request.params
    
    const collection = await getCollection('todo-api', 'todos')
	const todo = await collection.findOne({ _id: new ObjectId(id) })
    const complete = !todo.complete
    const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { complete } })
    response.json(result)
})

module.exports = router