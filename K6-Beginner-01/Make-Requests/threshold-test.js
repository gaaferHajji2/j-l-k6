import http from 'k6/http'
import { check, sleep } from 'k6'

export const options = {
    vus: 2,
    duration: '3s',
    

}

export default function() {
    const t1 = http.get('https://example.com/')
    console.log(`The status code ${t1.status}, and status text ${t1.status_text}`)
    check(t1, { 
        "jloka-01": (t1) => t1.status == 200, 
        "jloka-test-01": (t1) => t1.body.includes('Example') == true
    })

    const t2 = http.get('https://example.com/test.php')
    console.log(`The status code ${t2.status}, and status text ${t2.status_text}`)
    check(t2, {"jloka-02": (t2) => t2.status != 200 && t2.status < 500})

    sleep(2)
}