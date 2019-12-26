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

export const answersFetchSuccess = answers => {
    return{
        type: actionTypes.FETCH_ANSWERS_SUCCESS,
        answers: answers
    }
}

export const answersFetchInit = () => async dispatch => {
    answersRef.on("value", snapshot => {
        dispatch(answersFetchSuccess(snapshot.val()));
    })
}