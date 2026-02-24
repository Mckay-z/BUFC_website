import { authService } from "./lib/api/auth";
import { fixtureService } from "./lib/api/fixtures";

async function runSmokeTest() {
    console.log("🚀 Starting Smoke Test...");

    try {
        console.log("\n--- Testing API Connectivity ---");
        // We don't have a dedicated health check in our service, but we can try to get something public like fixtures
        try {
            const fixtures = await fixtureService.getUpcoming();
            console.log("✅ Backend API reachable (Fixtures fetched)");
        } catch (err) {
            console.log("❌ Backend API NOT reachable via /fixtures/upcoming. Is the backend server running?");
        }

        console.log("\n--- Verification of Auth Service structure ---");
        if (typeof authService.login === 'function' && typeof authService.register === 'function') {
            console.log("✅ Auth service initialized correctly");
        } else {
            console.log("❌ Auth service structure is incorrect");
        }

        console.log("\n--- Verification of Fixture Service structure ---");
        if (typeof fixtureService.getUpcoming === 'function' && typeof fixtureService.getLeagueTable === 'function') {
            console.log("✅ Fixture service initialized correctly");
        } else {
            console.log("❌ Fixture service structure is incorrect");
        }

        console.log("\n--- Verification of Environment Variables ---");
        if (process.env.NEXT_PUBLIC_API_URL) {
            console.log(`✅ NEXT_PUBLIC_API_URL is set to: ${process.env.NEXT_PUBLIC_API_URL}`);
        } else {
            console.log("❌ NEXT_PUBLIC_API_URL is NOT set in .env");
        }

        console.log("\n🏁 Smoke test complete.");
    } catch (error) {
        console.error("❌ Smoke test failed with error:", error);
    }
}

runSmokeTest();
