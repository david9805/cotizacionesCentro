import {config} from 'dotenv'
config()


export default
{
    port : process.env.PORT || 3099 ,
    dbUser : process.env.DB_USER || '',
    dbPassword : process.env.DB_PASSWORD|| '',

}