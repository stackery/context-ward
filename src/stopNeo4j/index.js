const AWS = require('aws-sdk')

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13'});
  console.log(process.env)
  const params = {
    task: process.env.DOCKER_TASK_ARN,
  };
  console.log(params);
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse)
    listResponse.taskArns && listResponse.taskArns.forEach(arn => {
      const stopResponse = await ecs.stopTask(arn).promise();
      console.log(stopResponse)
    });
    return {
      statusCode: 200,
      body: `neo4j stopped`
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
};
