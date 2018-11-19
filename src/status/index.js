const AWS = require('aws-sdk');
const util = require('util');

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({ apiVersion: '2014-11-13' });
  console.log(process.env);
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse);
    const descResponse = await ecs.describeTasks({ tasks: listResponse.taskArns });
    return {
      statusCode: 200,
      body: util.inspect(descResponse)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }
};
