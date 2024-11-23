'use server';

import {
  DynamoDBClient,
  PutItemCommand,
  PutItemCommandInput,
} from '@aws-sdk/client-dynamodb';
import { INoteState } from './types';
import { v4 as uuidv4 } from 'uuid';

export async function createNoteAction(
  _: INoteState,
  queryData: FormData
): Promise<INoteState> {
  const config = {
    credentials: {
      accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY as string,
    },
    region: process.env.REACT_APP_AWS_REGION,
  };

  console.log(config);
  console.log(process.env.REACT_APP_NOTES_TABLE_NAME)

  const client = new DynamoDBClient(config);
  const newNote = queryData.get('note');

  if (!newNote || typeof newNote !== 'string') {
    return {
      content: null,
      error: 'Note content is required and must be text',
    };
  }

  const putInput: PutItemCommandInput = {
    TableName: process.env.REACT_APP_NOTES_TABLE_NAME as string,
    Item: {
      Id: { S: uuidv4() },
      Note: { S: newNote },
    },
  };

  try {
    const putItemCommand = new PutItemCommand(putInput);
    const putItemResponse = await client.send(putItemCommand);

    console.log(putItemResponse);

    if (putItemResponse.$metadata.httpStatusCode === 200) {
      console.log('Successfully added it to le db');
    } else {
      console.error('Failed to put item');
      throw new Error('Response was not 200');
    }
  } catch (err) {
    console.error(`Failed to upsert note to the DB ${err}`);
    return {
      content: null,
      error: 'Failed to create note',
    };
  }

  return {
    content: newNote,
  };
}
