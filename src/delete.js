import handler from "./util/handler";
import dynamoDb from "./util/dynamodb";

export const main = handler(async(event) => {
    const params = {
        TableName: process.env.TABLE_NAME,
        // The 'Key' defines the partition key and sort key of the item to be removed
        Key: {
            userId: event.requestContext.authorizer.iam.cognitoIdentity.identityId, // The id of the author
            noteId: event.pathParameters.id, // The id of the note from the path
        },
    };

    await dynamoDb.delete(params);
    
    // Return the retrieved item
    return { status: true };
})