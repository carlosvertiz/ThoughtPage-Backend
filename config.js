import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 1234


// export const DB_HOST = process.env.DB_HOST || "localhost"
// export const DB_USER = process.env.DB_USER || "root"
// export const DB_PASSWORD = process.env.DB_PASSWORD || "115935"
// export const DB_NAME = process.env.DB_NAME || "thoughtsdb"
// export const DB_PORT = process.env.DB_PORT || 3306

export const DB_HOST = "monorail.proxy.rlwy.net"
export const DB_NAME= "railway"
export const DB_PASSWORD = "GcBDa-G4-26aechH2H5hea1BFDHeB1Da"
export const DB_PORT = 32977
export const DB_USER = "root"