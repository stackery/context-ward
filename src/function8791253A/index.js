exports.handler = async message => {
  console.log(message);
  var ecs = new AWS.ECS({apiVersion: '2014-11-13'});
   var params = {
       desiredCount: 1,
       serviceName: "ward-neo4j",
       taskDefinition: process.env.DOCKER_TASK_ARN
      };
  console.log(params);
  return ecs.createService(params).promise();
}
