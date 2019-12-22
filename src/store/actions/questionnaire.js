import {answersRef} from '../../firebase/firebase';
import * as actionTypes from '../actions/actionTypes';

export const nextFormQuestionHandler = (oldPos) => {
    return {
        type: actionTypes.NEXT_FORM_QUESTION,
        oldPos: oldPos
    }
}

export const prevFormQuestionHandler = (oldPos) => {
    return {
        type: actionTypes.PREV_FORM_QUESTION,
        oldPos: oldPos
    }
}

export const setAnswersQuestionHandler = (answers) => {
    return {
        type: actionTypes.SET_QUESTION_ANSWERS,
        answers: answers
    }
}

export const storeAnswer = answer => async dispatch => {
    answersRef.push().set(answer);
}