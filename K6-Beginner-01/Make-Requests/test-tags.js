import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    vus: 1,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<200'],
        'http_req_duration{status:201}': ['p(95)<150']
    }
}

export default function() {
    let res = http.post('https://jsonplaceholder.typicode.com/users', { name: "Jafar Loka"})
    sleep(2)
    let t1 = http.get('https://jsonplaceholder.typicode.com/users')

    console.log(`the status code is: ${res.status}`)
    console.log(`the status of get is: ${t1.status}`)
}