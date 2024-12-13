import axios from "axios"
import { SERVER_API } from "../Helper/serverUrl"
import lodash from "lodash"



export const userRegistrationAsync = (userData) => {
    return new Promise ((resolve,reject) => {

        axios({
            method: "POST",
            data:userData,
            url: `${SERVER_API}/register`
        })
        .then((response) => {
            if(response.status !==200){
                throw new Error ("Registration Failed")
            }

            var responseBody = {
                userDetails : lodash.get(response,"data",{})
            }

            return resolve(responseBody)
        })
        .catch((err) => {
           
            if (err.response) {
              
                console.log(err.response.data.message);
                return reject(err.response.data.message);  
            }
            return reject(err)
        })
    })
}


export const  userLoginAsync = (userData) => {

    return new Promise((resolve,reject) => {
        axios({
            method: 'POST',
            data: userData,
            url : `${SERVER_API}/login`,
        })
        .then((response) => {

            if(response.status !== 200){
                throw new Error("Login Failed")
            }

            var responseBody = {
                userDetails: lodash.get(response,'data',{})
            }

            return resolve(responseBody)
        })
        .catch((err) => {
            if (err.response) {
              
                console.log(err.response.data.message);
                return reject(err.response.data.message);  
            }
            return reject(err)
        })
    })

}