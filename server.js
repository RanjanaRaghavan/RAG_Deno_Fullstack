import { loadEnv } from "./utils/loadEnv.js";
import { setupQueryEngine } from "./queryEngine.js";
//import * as mod from "https://deno.land/std@0.213.0/dotenv/mod.ts";

// Load environment variables
await loadEnv();

// Setup the query engine
const queryEngine = await setupQueryEngine();

// Define the request handler
const handler = async (req) => {
    if (req.method === "POST") {
        const data = await req.json();
        const answer = await queryEngine.query({ query: data.query });
        const responseObj = {
            response: answer.toString(),
        };
        return new Response(JSON.stringify(responseObj), { status: 200 });
    } else {
        return new Response("Not found", { status: 404 });
    }
};

// Start the server
console.log("Server running on http://localhost:8002/");
Deno.serve({ port: 8002 }, handler);
