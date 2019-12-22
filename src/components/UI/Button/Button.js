import React from 'react';
import {Link} from 'react-router-dom';
import s from './Button.module.scss';

const button = (props) => {
    // console.log(props.dynamic, props.dynamicLinkTo);
    let btn = null;
    if(props.linkTo || props.dynamicLinkTo){
        // dynamic[position, length]
        // dynamicLinkTo[back, finish]
        if(props.dynamic){
            const startLinkCheck = props.dynamic[0] === 0;
            const endLinkCheck = props.dynamic[0] === (props.dynamic[1] - 1);
            let link = null;
            if((startLinkCheck && props.previous) || (endLinkCheck && props.next)){
                if(startLinkCheck){link = props.dynamicLinkTo[0]} else {link = props.dynamicLinkTo[1]}
                btn = (
                    <Link to={link} onClick={endLinkCheck ? props.clicked : null}>
                    {/* // <Link to={link} onClick={props.clicked}> */}
                        <button
                            className=
                                {`${s.btn}
                                ${props.next || props.primary ? s.primary : ""}
                                ${props.previous || props.none ? s.none : ""}
                                ${props.shadow ? s.shadow : ""}
                                ${props.full ? s.full : ""}
                                ${props.lm ? s.lessMargin : ""}
                                ${props.tm10 ? s.topMargin10 : ""}
                                ${props.modal ? s.modal : ""}
                                `}
                            >{props.children}
                        </button>
                    </Link>
                );
            }else {
                btn = (
                    <button
                        className=
                            {`${s.btn}
                            ${props.next || props.primary ? s.primary : ""}
                            ${props.previous || props.none ? s.none : ""}
                            ${props.shadow ? s.shadow : ""}
                            ${props.full ? s.full : ""}
                            ${props.lm ? s.lessMargin : ""}
                            ${props.tm10 ? s.topMargin10 : ""}
                            ${props.modal ? s.modal : ""}
                            `}
                        onClick={props.clicked}
                        >{props.children}
                    </button>
                );
            }
        }else{
            btn = (
                <Link to={props.linkTo}>
                    <button
                        className=
                            {`${s.btn}
                            ${props.next || props.primary ? s.primary : ""}
                            ${props.previous || props.none ? s.none : ""}
                            ${props.shadow ? s.shadow : ""}
                            ${props.full ? s.full : ""}
                            ${props.lm ? s.lessMargin : ""}
                            ${props.tm10 ? s.topMargin10 : ""}
                            ${props.modal ? s.modal : ""}
                            `}
                        >{props.children}
                    </button>
                </Link>
            );
        }
    }else{
        btn = (
            <button
                className=
                    {`${s.btn}
                    ${props.next || props.primary ? s.primary : ""}
                    ${props.previous || props.none ? s.none : ""}
                    ${props.shadow ? s.shadow : ""}
                    ${props.full ? s.full : ""}
                    ${props.lm ? s.lessMargin : ""}
                    ${props.tm10 ? s.topMargin10 : ""}
                    ${props.modal ? s.modal : ""}
                    `}
                onClick={props.clicked}
                >{props.children}
            </button>
        );
    }
    
    return btn;
}

export default button;