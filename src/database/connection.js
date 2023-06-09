import { Console } from 'console';
import { Server } from 'http'
import sql from 'mssql'

const dbSettings = {
    user : 'admin',
    password : 'Gabriela8*',
    server  : '3.18.183.217',
    database : 'CRMCENTROMAYOR',
    options: {
        encrypt: false,
        trustServerCertificate: true,
        } 
}

export async function getConnection(){
    try
    {
        const pool = await sql.connect(dbSettings)
        return pool;
    }
    catch  (error)
    {
        console.error(error)
    }    
}

export { sql };