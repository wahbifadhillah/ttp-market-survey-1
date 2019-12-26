import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

import imgName from '../../assets/images/name.svg';
import imgEmail from '../../assets/images/email.svg';
import imgJenjang from '../../assets/images/school.svg';

const initialState = {
    // name: "Wahbi",
    // email: "wahbi@wahbi.wahbi",
    // level: "Kuliah",
    name: "",
    email: "",
    level: "",
    participantID: "",
    participants: [],
    register: {
        0: {
          title: "Tuliskan\nnamamu",
          input: "text",
          name: "name",
          placeholder: "Nama",
          image: imgName,
          validation: {
            required: true
          },
          valid: false
  
        },
        1: {
          title: "Tuliskan\nemailmu",
          caption: "Untuk konfirmasi pemenang hadiah",
          input: "text",
          name: "email",
          placeholder: "Email",
          image: imgEmail,
          validation: {
            required: true,
            isEmail: true
          },
          valid: false
        },
        2: {
          title: "Berada pada\njenjang apa?",
          input: "select",
          options: ["SMP", "SMA", "Kuliah", "Kerja"],
          name: "level",
          placeholder: "Jenjang",
          image: imgJenjang,
          validation: {
            required: true
          },
          valid: false
        }
      },
      registerPos: 0
}

const nextFormRegister = (state, action) => {
  return updateObject(state, {
    registerPos: action.oldPos+1
  })
}

const prevFormRegister = (state, action) => {
  return updateObject(state, {
    registerPos: action.oldPos-1
  })
}

const setFormRegisterValue = (state, action) => {
  return updateObject(state, {
    [action.identifier]: action.value
  })
}

const setParticipantId = (state, action) => {
  return updateObject(state, {
    participantID: action.id
  })
}

const participantsFetchSuccess = (state, action) => {
  const participants = [];
  for (let key in action.participants){
    participants.push({
          id: key,
          ...action.participants[key]
      });
  }
  return updateObject(state, {
    participants: participants
  })
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.NEXT_FORM_REGISTER: return nextFormRegister(state, action);
        case actionTypes.PREV_FORM_REGISTER: return prevFormRegister(state, action);
        case actionTypes.SET_FORM_REGISTER_VALUE: return setFormRegisterValue(state, action);
        case actionTypes.SET_PARTICIPANT_ID: return setParticipantId(state, action);
        case actionTypes.FETCH_PARTICIPANT_SUCCESS: return participantsFetchSuccess(state, action);
        default: return state;
    }
}

export default reducer;