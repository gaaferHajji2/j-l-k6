import http from 'k6/http'
import { sleep, check } from 'k6'
import { Counter } from 'k6/metrics'

export const options = {
    vus: 25,
    duration: '5s',
    thresholds: {
        http_errors: ['count==0'],
        'http_req_duration{createUser:creating}': ['p(95)<150']
    }
}

let httpErrors = new Counter('http_errors')

export default function() {
    let res = http.get('https://jsonplaceholder.typicode.com/users')
    if(res.error){
        httpErrors.add(1)
    }
    check(res, {
        'getting_users': (res) => res.status == 200
    })

    res = http.post(
        'https://jsonplaceholder.typicode.com/users', 
        { name: 'JLoka-01' }, 
        {
            tags: {
                createUser: 'creating'
            }
        }
    )
    if(res.error){
        httpErrors.add(1)
    }
    check(res, {
        'posting_user': (res) => res.status == 201
    })

    sleep(1)
}