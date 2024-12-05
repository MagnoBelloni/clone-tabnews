test("GET to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status")
    expect(response.status).toBe(200)

    const responseBody = await response.json()

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString()
    expect(parsedUpdatedAt).toBe(responseBody.updated_at)

    const databaseConfigurations = responseBody.dependencies.database

    expect(databaseConfigurations.version).toBe('16.0')

    expect(databaseConfigurations.max_connections).toBeGreaterThanOrEqual(100)

    expect(databaseConfigurations.current_connections).toBeGreaterThanOrEqual(1)
})