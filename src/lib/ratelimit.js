import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";

// Initializes the Redis client using your environment variables
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// sliding window implementation: Allows max 10 requests every 10 seconds per IP
export const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.slidingWindow(10, "10 s"),
  analytics: true,
});