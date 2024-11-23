import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class BackendStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const notesTable = new dynamodb.Table(this, "NotesTable", {
      partitionKey: {
        name: "Id",
        type: dynamodb.AttributeType.STRING
      },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY
    })

    new cdk.CfnOutput(this, "NotesTableName", {
      value: notesTable.tableName,
      description: "Notes DynamoDB table name"
    })

    new cdk.CfnOutput(this, "NotesTableArn", {
      value: notesTable.tableArn,
      description: "Notes DynamoDB ARN"
    })

  }
}
