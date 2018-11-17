const AWS = require('aws-sdk')
exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13'});
  const params = {
    desiredCount: 1,
    serviceName: 'ward-neo4j',
    taskDefinition: process.env.DOCKER_TASK_ARN
  };
  console.log(params);
  return ecs.createService(params).promise();
}
