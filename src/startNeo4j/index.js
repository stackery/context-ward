const AWS = require('aws-sdk')

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13', region: 'us-west-2'});
  console.log(process.env)
  const params = {
    launchType: 'FARGATE',
    cluster: 'default',
    count: 1,
    taskDefinition: process.env.DOCKER_TASK_ARN,
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: process.env.DOCKER_TASK_SUBNETS.split(','),
        assignPublicIp: 'ENABLED',
        securityGroups: [process.env.DOCKER_SG],
      }
    },
  };
  console.log(params);
  try {
    await ecs.runTask(params).promise();
    return {
      statusCode: 200,
      body: 'neo4j started'
    }
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
};
