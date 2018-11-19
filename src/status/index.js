const AWS = require('aws-sdk');
const ecs = new AWS.ECS({ apiVersion: '2014-11-13' });
const ec2 = new AWS.EC2();
exports.handler = async message => {
  console.log(message);
  console.log(process.env);
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse);
    const descResponse = await ecs.describeTasks({ tasks: listResponse.taskArns }).promise();
    const eni = descResponse.tasks[0].attachments[0].details[1].value;
    const descNI = await ec2.describeNetworkInterfaces({ NetworkInterfaceIds: [eni] }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(descNI, null, 2)
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    };
  }
};
