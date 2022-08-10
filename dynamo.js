const AWS = require('aws-sdk');
require('dotenv').config(); //you use dotenv to keep your environment variables out of source code

AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
    accessKeyID: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
})

console.log("server refreshed");
const dynamo_client = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = "test_table_1";

const getUsernames = async () => {
    const params = {
        TableName: TABLE_NAME
    };
    const usernames = await dynamo_client.scan(params).promise();
    console.log(usernames)
    return usernames;
}

const add_or_update_user = async (person) => {
    const params = {
        TableName: TABLE_NAME,
        Item: person
    }
    return await dynamo_client.put(params).promise();
}

const delete_user = async (username) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username
        }
    }
    return await dynamo_client.delete(params).promise();
}

const getUserByID = async (username) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            username
        }
    }
    return await dynamo_client.get(params).promise();
    
}

//this is really interesting because I didn't event need to add the name column in AWS, I guess I just add primary key?
//insendi was already in the db and i guess he got updated just based on the username
const insendi = {
    username: 'insendi',
    name: "Humza Baig"
}

//add_or_update_user(insendi);

module.exports = {
    dynamo_client,
    getUsernames,
    getUserByID,
    add_or_update_user,
    delete_user
} //so that we can use them inside out application file in express