import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        // This simulate real scenario for spike test
        {
            duration: '2h',
            target: 10000
        }
    ]
    // vus: 100,
    // duration: '30s'
}

export default function() {
    // in spike test usually we call only one address
    http.get('https://quickpizza.grafana.com/')
    sleep(1)
} 