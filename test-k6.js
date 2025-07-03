import http from "k6/http";
import { check } from "k6";
import { Rate } from "k6/metrics";

// Custom metrics
const errorRate = new Rate("errors");

// Test configuration
export const options = {
  stages: [
    { duration: "10s", target: 50 }, // Ramp up to 50 VUs in 10s
    { duration: "50s", target: 100 }, // Stay at 100 VUs for 50s
    { duration: "10s", target: 0 }, // Ramp down to 0 VUs in 10s
  ],
  thresholds: {
    http_req_duration: ["p(95)<200"], // 95th percentile should be < 200ms
    http_req_failed: ["rate<0.05"], // Error rate should be < 5%
    errors: ["rate<0.05"], // Custom error rate < 5%
  },
};

// Main test function
export default function () {
  // Make GET request to categories API

  // headers for token
  const headers = {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NjNiYjhkNGY2MTgxN2IyOTRhMzI2MSIsIm5hbWUiOiJ5dXN1ZiIsImVtYWlsIjoieXVzdWZAZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NTEzNjgxNzAsImV4cCI6MTc1MTk3Mjk3MH0.8iroov9AiM8YarO_LeidVDQ7TsUSc9vxyEtnw9iA8WA",
    },
  };
  const response = http.get("http://localhost:3300/api/v1/users", headers);

  // Record errors in custom metric
  errorRate.add(response.status !== 200);

  // Perform checks
  check(response, {
    "status is 200": (r) => r.status === 200,
    "response time < 200ms": (r) => r.timings.duration < 200,
    "response has body": (r) => r.body.length > 0,
    "content type is JSON": (r) =>
      r.headers["Content-Type"] &&
      r.headers["Content-Type"].includes("application/json"),
  });

  // Optional: Add small delay between requests to simulate real user behavior
  // sleep(1);
}

// Setup function (runs once at the beginning)
export function setup() {
  console.log("Starting performance test for categories API");
  console.log("Target: http://localhost:3300/api/v1/users");
  console.log("Scenario: 10s ramp-up to 50 VUs, 50s at 100 VUs, 10s ramp-down");
}

// Teardown function (runs once at the end)
export function teardown() {
  console.log("Performance test completed");
}
