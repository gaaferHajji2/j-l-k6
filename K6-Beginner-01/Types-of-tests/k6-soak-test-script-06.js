import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    stages: [
        // this configuration for real scenario
        // {
        //     duration: '5m',
        //     target: 1000
        // }, 
        // {
        //     duration: '12h',
        //     target: 1000
        // },
        // {
        //     duration: '5m',
        //     target: 0
        // },

        // This configuration for testing scenario
        {
            duration: '3s',
            target: 10
        }, 
        {
            duration: '30s',
            target: 10
        },
        {
            duration: '3s',
            target: 0
        },
    ]
    // vus: 100,
    // duration: '30s'
}

export default function() {
    http.get('https://quickpizza.grafana.com/')
    sleep(1)

    http.get("https://quickpizza.grafana.com/login")
    sleep(2)

    http.get("https://quickpizza.grafana.com/admin")
    sleep(3)
} 