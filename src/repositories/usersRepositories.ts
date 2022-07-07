import connectDB from "../app/connectDB.js";

export async function checkFighter(username: string){
    const db = await connectDB()
    const {rows} = await db.query('SELECT * FROM fighters WHERE username=$1',[username])
    if(rows.length){
        return(true)
    }
}

export async function insertFighter(username: string, status: number) {
    const db = await connectDB()
    const userCreated = await checkFighter(username)
    if(userCreated){
        if(status === 1){
            await db.query('UPDATE fighters SET wins=wins+1 WHERE username=$1',[username])
        }
        else if(status === 2){
            await db.query('UPDATE fighters SET draws=draws+1 WHERE username=$1',[username])
        }
        else{
            await db.query('UPDATE fighters SET losses=losses+1 WHERE username=$1',[username])
        }
    }
    else{
        if(status === 1){
            await db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1,1,0,0)',[username])
        }
        else if(status === 2){
            await db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1,0,0,1)',[username])
        }
        else{
            await db.query('INSERT INTO fighters (username, wins, losses, draws) VALUES ($1,0,1,0)',[username])
        }
    }
}

export async function rankAllFighters(){
    const db = await connectDB()
    const {rows}:{rows:object} = await db.query('SELECT username, wins, losses, draws FROM fighters ORDER BY wins + draws DESC')
    return (rows)
}