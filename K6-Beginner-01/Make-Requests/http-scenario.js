import http from 'k6/http'

export default function() {
    const t1 = http.get('https://example.com/')
    console.log(`The status code ${t1.status}, and status text ${t1.status_text}`)

    const t2 = http.get('https://example.com/test.php')
    console.log(`The status code ${t2.status}, and status text ${t2.status_text}`)
}