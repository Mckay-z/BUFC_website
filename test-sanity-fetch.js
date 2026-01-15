// Run this with: node test-sanity-fetch.js
// This will test if Sanity data is being fetched correctly

const { createClient } = require("@sanity/client");

const client = createClient({
  projectId: "u9ra5r4a",
  dataset: "production",
  apiVersion: "2025-12-16",
  useCdn: false,
});

async function testFetch() {
  console.log("Testing Sanity data fetch...\n");

  try {
    // Test sponsor settings with _id
    const sponsorSettings = await client.fetch(
      `*[_id == "sponsorSettings"][0]`
    );
    console.log(
      "Sponsor Settings (by _id):",
      JSON.stringify(sponsorSettings, null, 2)
    );
    console.log("\n---\n");

    // Test home page settings with _id
    const homeSettings = await client.fetch(`*[_id == "homePageSettings"][0]`);
    console.log(
      "Home Page Settings (by _id):",
      JSON.stringify(homeSettings, null, 2)
    );
    console.log("\n---\n");

    // List all sponsor documents
    const allSponsorDocs = await client.fetch(
      `*[_type == "sponsorSettings"]{_id, _type, sponsorSectionTitle}`
    );
    console.log(
      "ALL sponsor setting documents:",
      JSON.stringify(allSponsorDocs, null, 2)
    );
    console.log("\n---\n");

    // List all home page documents
    const allHomeDocs = await client.fetch(
      `*[_type == "homePageSettings"]{_id, _type, newsUpdatesSectionTitle}`
    );
    console.log(
      "ALL home page setting documents:",
      JSON.stringify(allHomeDocs, null, 2)
    );
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

testFetch();
