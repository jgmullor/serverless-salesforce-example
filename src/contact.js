const jsforce = require('jsforce');

module.exports.get = async function (event) {
    let contact;
    const connection = new jsforce.Connection({});
    await connection.login(process.env.SF_USER, process.env.SF_PASSWORD);

    if (!('id' in event.pathParameters) || event.pathParameters.id === null) {
        return {
            statusCode: 500, // or whatever status code you want
            body: JSON.stringify({
                error: 'User id not found in parameters'
            })
        };
    }

    try {
        contact = await conn.sobject("Contact").retrieve(event.pathParameters.id);
    } catch (error) {
        return {
            statusCode: 404,
            body: JSON.stringify({
                error: 'User not found in Salesforce'
            })
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            name: contact.FirstName
        })
    };
}