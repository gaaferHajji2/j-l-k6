import http from 'k6/http'
import { sleep } from 'k6'
import { Trend } from 'k6/metrics'

export const options = {
  vus: 20,
  duration: '5s',
  thresholds: {
		// Simple threshold: 95% of requests must be below 1000ms
		http_req_duration: ['p(95)<1500'],

		// here we use 75% because we request not found page
		http_req_failed: ['rate<0.75'],

		// more than 20-req in total
		http_reqs: ['count>20'],

		//bigger that 2 req per second
		http_reqs: ['rate>2'],

		checks: ['rate>0.9'],
    
    jlokaResTimeTrend: ['max<1000', 'p(95)<500']
  },
}

let responseTimeTrend = new Trend('jlokaResTimeTrend')

export default function() {
    http.get('https://quickpizza.grafana.com/')
    sleep(1)

    let res = http.get('https://quickpizza.grafana.com/admin')
    responseTimeTrend.add(res.timings.duration)
    sleep(1)
}