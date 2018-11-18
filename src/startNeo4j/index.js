const AWS = require('aws-sdk')

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13', region: 'us-west-2'});
  console.log(process.env)
  const params = {
    cluster: 'default',
    networkConfiguration: {
      awsvpcConfiguration: {
        subnets: process.env.DOCKER_TASK_SUBNETS.split(',')
      }
    },
    launchType: 'FARGATE',
    taskDefinition: process.env.DOCKER_TASK_ARN,
  };
  console.log(params);
  return ecs.runTask(params).promise();
}
