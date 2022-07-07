import axios, { AxiosResponse } from "axios"
import { insertFighter } from "../repositories/usersRepositories.js"

export async function checkUserInformation({firstUser, secondUser}: {firstUser: string, secondUser:string}) {
    let firstCounter: number = 0
    let secondCounter: number = 0
    const firstUserInformation: AxiosResponse = await axios.get(`https://api.github.com/users/${firstUser}/repos`)
    const secondUserInformation: AxiosResponse = await axios.get(`https://api.github.com/users/${secondUser}/repos`)
    const firstUserData: Array<any> = firstUserInformation.data
    firstUserData.forEach(data => {
        firstCounter += data.stargazers_count
    })
    const secondUserData: Array<any> = secondUserInformation.data
    secondUserData.forEach(data => {
        secondCounter += data.stargazers_count
    })
    
    if(firstCounter > secondCounter){
        insertFighter(firstUser, 1)
        insertFighter(secondUser, 0)
        return({
            winner: firstUser,
            loser: secondUser,
            draw: false
        })
    }
    else if(firstCounter < secondCounter){
        insertFighter(firstUser, 0)
        insertFighter(secondUser, 1)
        return({
            winner: secondUser,
            loser: firstUser,
            draw: false
        })
    }
    insertFighter(firstUser, 2)
    insertFighter(secondUser, 2)
    return({
        winner: null,
        loser: null,
        draw: true
    })
}