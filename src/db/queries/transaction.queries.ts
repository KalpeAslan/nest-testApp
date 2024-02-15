export namespace TransactionQueries {
    export const GET_MOST_FREQUENCY_ADDRESS = `SELECT address, COUNT(*) AS frequency
                                                FROM (
                                                    SELECT "transactionFrom" AS address
                                                    FROM transaction
                                                    UNION ALL
                                                    SELECT "transactionTo"
                                                    FROM transaction
                                                ) AS combined_addresses
                                                GROUP BY address
                                                ORDER BY frequency DESC
                                                LIMIT 1;
    `
}