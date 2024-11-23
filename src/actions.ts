'use server';

import { INoteState } from './types';

export async function createNoteAction(
  prevState: INoteState,
  queryData: FormData
): Promise<INoteState> {
  console.log('prevState: ', prevState);
  const newNote = queryData.get('note');

  if (!newNote || typeof newNote !== 'string') {
    return {
      content: null,
      error: 'Note content is required and must be text',
    };
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Have this note in the API!: ', newNote);
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
