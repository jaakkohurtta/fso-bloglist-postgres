import "dotenv/config";

export const DATABASE_URL = process.env.DATABASE_URL;
export const PORT = process.env.PORT || 3001;
export const JWT_SECRET = process.env.JWT_SECRET;
