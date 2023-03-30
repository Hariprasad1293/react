import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

//axios.defaults.baseURL = 'https://product1827.azurewebsites.net/api/rest/v1/';
axios.defaults.baseURL = 'https://apigateway1827.azure-api.net/';
//axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async response => {
    //await sleep();
    return response
}, (error: AxiosError) => {
    const {data, status} = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: string[] = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 500:
            router.navigate('/server-error', {state: {error: data}});
            break;
        default:
            break;
    }

    return Promise.reject(error.response);
})


const requests = {
    get: (url: string, body : {}) => axios.get(url, body).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('productmicroservice/api/rest/v1/productdetails/all', {}),
    details: (id: string) => requests.get(`productmicroservice/api/rest/v1/productdetails/${id}`, {})
}
const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request', {}),
    get401Error: () => requests.get('buggy/unauthorised', {}),
    get404Error: () => requests.get('buggy/not-found', {}),
    get500Error: () => requests.get('buggy/server-error', {}),
    getValidationError: () => requests.get('buggy/validation-error', {})
}
const customerId = JSON.stringify({ cId:  '3fa85f64-5717-4562-b3fc-2c963f66afa6', pId : '3aac608c-ca0f-4d26-a5ec-303e70958f88'});

const Basket = {
    get: () => requests.get('cartmicroservice/api/rest/v1/cart/items/', {cId : '3fa85f64-5717-4562-b3fc-2c963f66afa6'}),
    //addItem: (productId: string, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
    //removeItem: (productId: string, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)
    addItem: (productId: string, /* quantity = 1*/ customerId : string) => requests.post(`cartmicroservice/api/rest/v1/cart/add/`,{cId:  '3fa85f64-5717-4562-b3fc-2c963f66afa6', pId : '3aac608c-ca0f-4d26-a5ec-303e70958f88'}),
    removeItem: (productId: string, quantity = 1) => requests.del(`basket?productId=${productId}&quantity=${quantity}`)
}



const agent ={
    Catalog,
    TestErrors,
    Basket
}

export default agent;