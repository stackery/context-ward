const AWS = require('aws-sdk')
const lambda = new AWS.Lambda({apiVersion: '2015-03-31'});


exports.handler = async message => {
  console.log(message);
  const ecs = new AWS.ECS({apiVersion: '2014-11-13'});
  console.log(process.env)
  try {
    const listResponse = await ecs.listTasks().promise();
    console.log(listResponse)
    const promises = []
    if (listResponse.taskArns[0]){
      return {
        statusCode: 200,
        body: `instance already running`
      }

    } else {

      const params = {
        FunctionName: process.env.FUNCTION_NAME,
        InvokeArgs: '{}' 
       };
      await lambda.invokeAsync(params).promise();
      return {
        statusCode: 200,
        body: `started neo4j`
      }
    }
      
  } catch (e) {
    return {
      statusCode: 500,
      body: e.message
    }
  }
};
