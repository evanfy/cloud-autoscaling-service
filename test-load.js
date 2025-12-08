// Simple load testing script to test the /calculate endpoint
const http = require('http');

const TARGET_URL = 'http://localhost:3000/calculate?iterations=5000000';
const CONCURRENT_REQUESTS = 10;
const DURATION_SECONDS = 30;

let completedRequests = 0;
let failedRequests = 0;
let totalResponseTime = 0;

function makeRequest() {
    const startTime = Date.now();

    http.get(TARGET_URL, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const responseTime = Date.now() - startTime;
            completedRequests++;
            totalResponseTime += responseTime;

            if (completedRequests % 10 === 0) {
                const avgTime = (totalResponseTime / completedRequests).toFixed(2);
                console.log(`Completed: ${completedRequests} | Failed: ${failedRequests} | Avg: ${avgTime}ms`);
            }
        });
    }).on('error', (err) => {
        failedRequests++;
        console.error(`Request failed: ${err.message}`);
    });
}

console.log(`Starting load test...`);
console.log(`Target: ${TARGET_URL}`);
console.log(`Concurrent requests: ${CONCURRENT_REQUESTS}`);
console.log(`Duration: ${DURATION_SECONDS} seconds`);
console.log('');

// Send concurrent requests continuously for the duration
const startTime = Date.now();
const interval = setInterval(() => {
    for (let i = 0; i < CONCURRENT_REQUESTS; i++) {
        makeRequest();
    }
}, 1000);

// Stop after duration
setTimeout(() => {
    clearInterval(interval);

    console.log('');
  console.log('Load test complete!');
  console.log(`Total requests: ${completedRequests}`);
  console.log(`Failed requests: ${failedRequests}`);
  console.log(`Average response time: ${(totalResponseTime / completedRequests).toFixed(2)}ms`);
  console.log(`Requests per second: ${(completedRequests / DURATION_SECONDS).toFixed(2)}`);

  process.exit(0);
}, DURATION_SECONDS * 1000);