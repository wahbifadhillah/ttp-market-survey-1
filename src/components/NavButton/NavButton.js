import React from 'react';
import Button from '../UI/Button/Button';
import s from './NavButton.module.scss';

const navButton = (props) => {
    const navBtn = (
        <div 
            className=
                {`
                    ${s.navBtn} 
                    ${props.bottom ? s.bottom : ""}
                `}
            style={
                props.noPrev ?
                {
                    justifyContent: 'flex-end'
                }
                : null
            }
        >
            {props.noPrev ? null : <Button
                previous
                dynamic={props.dynamic}
                dynamicLinkTo={props.dynamicLinkTo}
                clicked={props.formPrevHandler}
                >Kembali</Button>}
            <Button
                next
                dynamic={props.dynamic}
                dynamicLinkTo={props.dynamicLinkTo}
                clicked={props.formNextHandler}
                >Berikutnya</Button>
        </div>
    );
    return navBtn;
}

export default navButton;