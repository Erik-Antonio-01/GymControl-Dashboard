import mysql from "mysql2/promise";

/**
 * Conexão com o MySQL.
 *
 * As credenciais vêm de variáveis de ambiente (arquivo .env carregado com
 * `node --env-file=.env`). Os valores padrão abaixo servem apenas para
 * desenvolvimento local e nunca chegam ao navegador — o front-end fala só
 * com a API REST.
 */
const connection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD ?? "2709",
    database: process.env.DB_NAME || "academia",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export default connection;
