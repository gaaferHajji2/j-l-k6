import http from 'k6/http'
import { check, sleep } from 'k6'
import exec from 'k6/execution'

export const options = {
  vus: 20,
  duration: '5s',
  thresholds: {
		// Simple threshold: 95% of requests must be below 1000ms
		http_req_duration: ['p(95)<1000'],

		// here we use 75% because we request not found page
		http_req_failed: ['rate<0.75'],

		// more than 20-req in total
		http_reqs: ['count>20'],

		//bigger that 5 req per second
		http_reqs: ['rate>2'],

		checks: ['rate>0.9']
  },
}

export default function() {
    const t1 = http.get('https://example.com/')
    console.log(`The status code ${t1.status}, and status text ${t1.status_text}`)
    check(t1, { 
        "jloka-01": (t1) => t1.status == 200, 
        "jloka-test-01": (t1) => t1.body.includes('Example')
    })

    const t2 = http.get('https://example.com/test.php')
    console.log(`The status code ${t2.status}, and status text ${t2.status_text}`)
    check(t2, {"jloka-02": (t2) => t2.status >= 300 && t2.status < 500})

    console.log(exec.scenario.iterationInTest)

    sleep(2)
}