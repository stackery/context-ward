const AWS = require('aws-sdk');

exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({ apiVersion: '2014-11-13' });
  console.log(process.env);
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse);
    const promises = [];
    listResponse.taskArns && listResponse.taskArns.forEach(arn => {
      const stopPromise = ecs.stopTask({ task: arn }).promise();
      promises.push(stopPromise);
    });
    const results = await Promise.all(promises);
    console.log(results);
    return {
      statusCode: 200,
      body: `neo4j stopped`
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }
};
