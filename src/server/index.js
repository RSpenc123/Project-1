
const express = require('express');
const app = express();
const port = 6969;
const cors = require('cors')
app.use(cors())
const set = require('./controller')
app.use(express.json());



app.get('/api/files', set.filesPlus);
app.post('/api/files', set.addFiles);
app.delete('/api/files/:index',set.deleteFile);
app.put('/api/files/text', set.editText)
app.put('/api/files/name', set.editFile)








app.listen(port, () => console.log(' we up'))