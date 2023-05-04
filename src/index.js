import app from './app.js'
import {ruta} from './app.js'
import './database/connection.js'


app.listen(app.get('port'))
console.log('server',app.get('port'))
console.log('server',ruta)