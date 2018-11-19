const AWS = require('aws-sdk');

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({ apiVersion: '2014-11-13' });
  console.log(process.env);
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse);
    return {
      statusCode: 200,
      body: JSON.stringify(listResponse.taskArns)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }
};
