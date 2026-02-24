// Run with: node v-test-api.mjs
const BACKEND_URL = "http://localhost:3001/api";

async function testEndpoint(name, endpoint) {
    console.log(`Testing ${name}: ${BACKEND_URL}${endpoint}...`);
    try {
        const response = await fetch(`${BACKEND_URL}${endpoint}`);
        if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${name} Success! Received ${Array.isArray(data) ? data.length : '1'} items.`);
        } else {
            console.log(`❌ ${name} Failed with status: ${response.status}`);
        }
    } catch (err) {
        console.log(`❌ ${name} Error: ${err.message}`);
    }
}

async function runTests() {
    console.log("🔍 Checking Backend Integration Status...\n");

    await testEndpoint("Upcoming Fixtures", "/fixtures/upcoming");
    await testEndpoint("Match Results", "/fixtures/results");
    await testEndpoint("League Table", "/fixtures/table");

    console.log("\n🚀 Testing Auth Endpoints (Availability)...");
    try {
        const authCheck = await fetch(`${BACKEND_URL}/auth/login`, { method: 'POST', body: JSON.stringify({}), headers: { 'Content-Type': 'application/json' } });
        console.log(`✅ Auth service reachable (Login endpoint returned ${authCheck.status})`);
    } catch (err) {
        console.log(`❌ Auth service NOT reachable: ${err.message}`);
    }

    console.log("\n🏁 Done.");
}

runTests();
