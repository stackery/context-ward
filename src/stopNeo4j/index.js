const AWS = require('aws-sdk')

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13'});
  console.log(process.env)
  const params = {
      task: process.env.DOCKER_TASK_ARN,
      cluster: 'default',
    };
  };
  console.log(params);
  return ecs.stopTask(params).promise();
}
