import database from "infra/database"

async function status(request, response) {
    const updatedAt = new Date().toISOString()

    const databaseName = process.env.POSTGRES_DB

    const databaseResult = await database.query({
        text: "SELECT current_setting('server_version') as version, current_setting('max_connections') as MaxConnections, sum(1) as NumberOfUsedConnections FROM pg_stat_activity WHERE datname = $1;",
        values: [databaseName]
    })

    const databaseConfigurations = databaseResult.rows[0]

    response.status(200).json({
        updated_at: updatedAt,
        dependencies: {
            database: {
                version: databaseConfigurations.version,
                max_connections: parseInt(databaseConfigurations.maxconnections),
                current_connections: parseInt(databaseConfigurations.numberofusedconnections)
            }
        }
    })
}

export default status