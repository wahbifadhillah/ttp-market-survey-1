import {participantsRef} from '../../firebase/firebase';
import * as actionTypes from '../actions/actionTypes';

export const nextFormRegisterHandler = (oldPos) => {
    return {
        type: actionTypes.NEXT_FORM_REGISTER,
        oldPos: oldPos
    }
}

export const prevFormRegisterHandler = (oldPos) => {
    return {
        type: actionTypes.PREV_FORM_REGISTER,
        oldPos: oldPos
    }
}

export const setFormRegisterValueHandler = (value, identifier) => {
    return {
        type: actionTypes.SET_FORM_REGISTER_VALUE,
        value: value,
        identifier: identifier
    }
}

export const setParticipantIdHandler = id => {
    return {
        type: actionTypes.SET_PARTICIPANT_ID,
        id: id
    }
}

export const registerStore = participant => async dispatch => {
    const newRef = participantsRef.push();
    const newItem = {
        participantID: newRef.key,
        ...participant
    }
    newRef.set(newItem);
    dispatch(setParticipantIdHandler(newItem.participantID));
}