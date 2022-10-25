import { useReducer } from 'react';
import {
    ADD_CASE,
    UPDATE_CASE,
    REMOVE_CASE,
    ADD_NOTE,
    UPDATE_NOTE,
    REMOVE_NOTE,
    ADD_USER_TO_CASE,
    REMOVE_USER_FROM_CASE,
} from './actions';

// Create a function that will handle combining two objects. Accepts state and an action as an argument.
export const reducer = (state, action) => {
    // Depending on the action we create a new version of state after the desired action is preformed
    switch (action.type) {
        case ADD_CASE: {
            const newCase = { ...action.payload }

            return {
                ...state,
                cases: [...state.cases, newCase],
            }
        }

        case UPDATE_CASE: {
            const caseIndex = state.cases.findIndex(
                (currentCase) => currentCase.id === action.payload.id
            );

            const updateCase = {
                ...state.cases[caseIndex],
                ...action.payload,
            };

            const newCaseList = [...state.cases];

            newCaseList[caseIndex] = updateCase;

            return {
                ...state,
                cases: newCaseList,
            };
        }

        case REMOVE_CASE: {
            return {
                ...state,
                cases: [...state.cases].filter(
                    (currentCase) => currentCase.id !== action.payload
                )
            }
        }

        case ADD_NOTE: {
            return {
                ...state,
                notes: [...state.notes, action.payload]
            };
        }

        case UPDATE_NOTE: {
            const noteIndex = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );

            const updatedNote = {
                ...state.notes[noteIndex],
                ...action.payload,
            }

            const newNoteList = [...state.notes];

            newNoteList[noteIndex] = updatedNote;

            return {
                ...state,
                notes: newNoteList
            }
        }

        case REMOVE_NOTE: {
            return {
                ...state,
                notes: [...state.notes.id].filter((note) => note.id !== action.payload.id),
            };
        }

        case ADD_USER_TO_CASE: {
            return {
                ...state,
                users: [...state.users.id, action.payload.id],
            };
        }

        case REMOVE_USER_FROM_CASE: {
            return {
                ...state,
                users: [...state.users.id].filter((user)=> user.id !== action.payload.id),
            }
        }

        default:
            return state;
    }
}

export function useCaseReducer(initialState) {
     return useReducer(reducer, initialState)
}