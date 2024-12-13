import axios from "axios"
import { SERVER_API } from "../Helper/serverUrl"
import lodash from "lodash"

const injectheader = () => {
    const data = JSON.parse(localStorage.getItem('userInfo'))
    
    
    if(data) {
        const token = data.token
        return token
    }
    const token =""
    return token
    
}

export const getListsAsync = (userId) => {
    const headers = {
        Authorization: `Bearer ${injectheader()}`,
        'Content-Type': 'application/json'
    }
    return new Promise((resolve, reject) => {
  
        axios({
            method: 'get',
            params: { user_id: userId },
            headers: headers,
            url: `${SERVER_API}/getLists`
        })
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("Failed to fetch")
                }

                var responseBody = {
                    data: lodash.get(response, 'data', [])
                }

                return resolve(responseBody)
            })
            .catch(err => {

                if (err.response) {
                    return reject(err.response.data.message)
                }
                return reject(err)
            })
    })

}

export const addListsAsync = (data) => {
    const headers = {
        Authorization: `Bearer ${injectheader()}`,
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            data: data,
            headers: headers,

            url: `${SERVER_API}/addList`
        })
        .then((response) => {
            if(response.status !== 200){
                throw new Error("Failed to add ")
            }

            var responseBody = {
                data: lodash.get(response,'data',{})
            }

            return resolve(responseBody)
        })
        .catch(err => {
            if (err.response) {
                return reject(err.response.data.message)
            }
           return  reject(err)
        })
    })

    
    
}

export const removeListAsync = (data) => {
    const headers = {
        Authorization: `Bearer ${injectheader()}`,
        'Content-Type': 'application/json'
    }

    return new Promise((resolve,reject) => {
        axios({
            method: 'post',
            data: data,
            headers: headers,

            url: `${SERVER_API}/removeList`
        })
        .then((response) => {
            if(response.status !== 200){
                throw new Error("Failed to add ")
            }

            var responseBody = {
                data: lodash.get(response,'data',{})
            }

            return resolve(responseBody)
        })
        .catch(err => {
            if (err.response) {
                return reject(err.response.data.message)
            }
           return  reject(err)
        })
    })
}