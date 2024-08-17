import { serve } from "https://deno.land/std@0.213.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.213.0/http/file_server.ts";
import { loadEnv } from "./utils/loadEnv.js";
import { setupQueryEngine } from "./queryEngine.js";

// Load environment variables
await loadEnv();

// Setup the query engine
const queryEngine = await setupQueryEngine();

// Define the request handler
const handler = async (req) => {
    const url = new URL(req.url);

    // Serve API requests
    if (req.method === "POST" && url.pathname === "/") {
        const data = await req.json();
        const answer = await queryEngine.query({ query: data.query });
        const responseObj = {
            response: answer.toString(),
        };
        return new Response(JSON.stringify(responseObj), { status: 200 });
    }

// Serve static files from the React build
else if (req.method === "GET") {
    try {
        let filePath = `./frontend/query-frontend/build${url.pathname}`;

        // If the request is for a directory, serve index.html
        if (url.pathname === "/") {
            filePath = "./frontend/query-frontend/build/index.html";
        }

        console.log("Serving file:", filePath);
        return await serveFile(req, filePath);
    } catch (error) {
        console.log("File not found, serving index.html:", error);
        return await serveFile(req, "./frontend/query-frontend/build/index.html");
    }
}



    // If the request doesn't match any route, return 404
    else {
        return new Response("Not found", { status: 404 });
    }
};

// Start the server
console.log("Server running on http://localhost:8002/");
serve(handler, { port: 8002 });
