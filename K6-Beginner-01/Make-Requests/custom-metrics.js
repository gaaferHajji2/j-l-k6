import http from 'k6/http'
import { check, sleep } from 'k6'
import exec from 'k6/execution'
import { Counter } from 'k6/metrics'

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

		//bigger that 2 req per second
		http_reqs: ['rate>2'],

		checks: ['rate>0.9'],

    jlokaCounter: ['count>20']
  },
}

let jlokaCounter = new Counter('jlokaCounter')

export default function() {
    const t1 = http.get('https://example.com/' + (exec.scenario.iterationInTest % 2 == 1 ? 'jloka' : ''))
    console.log(`The status code ${t1.status}, and status text ${t1.status_text}`)
    check(t1, { 
        "jloka-01": (t1) => t1.status == 200 && jlokaCounter.add(1), 
        "jloka-test-01": (t1) => t1.body.includes('Example')
    })

    // jlokaCounter.add(1)

    sleep(2)
}