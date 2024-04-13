
const express = require('express')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/todos', require('./api-routes'))

app.get('/', (_, response) => {
	response.sendFile('index.html', { root })
})

app.listen(port, () => console.log(`Server is running http://localhost:${port}`))