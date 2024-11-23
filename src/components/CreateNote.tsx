import React, { useActionState } from 'react';
import { createNoteAction } from '../actions';
import { INoteState } from '../types';

export default function CreateNote() {
  const initialNoteState: INoteState = {
    content: null,
  };

  const [state, formAction, isPending] = useActionState(
    createNoteAction,
    initialNoteState
  );

  if (isPending) {
    return <p>Loading...</p>;
  }

  return (
    <form action={formAction}>
      <input name='note' id='note' type='text' />
      <button type='submit'>Create note</button>

      {state?.error && <span>{state.error}</span>}

      {state?.content && (
        <p>
          Created the note <span>{state.content}</span>
        </p>
      )}
    </form>
  );
}
