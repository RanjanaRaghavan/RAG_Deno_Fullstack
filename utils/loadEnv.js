import * as mod from "https://deno.land/std@0.213.0/dotenv/mod.ts";

export async function loadEnv() {
    await mod.load({ export: true });
}
