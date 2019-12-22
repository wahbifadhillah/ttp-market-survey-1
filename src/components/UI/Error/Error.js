import React from 'react';
import s from './Error.module.scss';

const error = (props) => {
    // let inputElement = null;
    const inputSyles = [s.Error];
    if(props.invalid && props.shouldValidate && props.touched) {
        inputSyles.push(s.invalid);
    }
    return(
        <div className={inputSyles.join(' ')}>
            {props.children}
        </div>
    );
}

export default error;