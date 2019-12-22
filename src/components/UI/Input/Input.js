import React from 'react';
import s from './Input.module.scss';

const input = (props) => {
    let inpt = null;
    switch (props.type) {
        case "text":
            inpt = <input
                        type={props.type} 
                        value={props.value}
                        onSubmit={props.submit}
                        onChange={props.changed}
                        placeholder={props.placeholder}/>;
            break;
        case "select":
            let defVal = props.value || props.placeholder;
            inpt = (
                <select 
                    type={props.type} 
                    onSubmit={props.submit}
                    onChange={props.changed}
                    value={defVal}>
                        <option value={props.placeholder} disabled>{props.placeholder}</option>
                        {props.options.map((option, i) => {
                            return <option value={option} key={option+i}>{option}</option>
                        })}
                </select>
            );
            break;
        default:
            inpt = <input
                type={props.type} 
                value={props.value}
                onSubmit={props.submit}
                onChange={props.changed}
                placeholder={props.placeholder}/>;
            break;
    }
    return (
        <div className={s.Input}>
            {inpt}
        </div>
    );
}

export default input;