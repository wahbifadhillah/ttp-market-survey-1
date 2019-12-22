import React from 'react';
import s from './Dots.module.scss';

const dots = (props) => {
    let Dots = null;
    if(props.highM){
        Dots = (
            <div className={`${s.Dots} ${s.highMargin}`}>
                <div className=
                {`
                    ${s.dot}
                    ${props.position === 0 ? s.active : null}
                 `}></div>
                 <div className=
                {`
                    ${s.dot}
                    ${props.position === 1 ? s.active : null}
                 `}></div>
                 <div className=
                {`
                    ${s.dot}
                    ${props.position === 2 ? s.active : null}
                 `}></div>
            </div>
        );
    }else{
        Dots = (
            <div className={s.Dots}>
                <div className=
                {`
                    ${s.dot}
                    ${props.position === 0 ? s.active : null}
                 `}></div>
                 <div className=
                {`
                    ${s.dot}
                    ${props.position === 1 ? s.active : null}
                 `}></div>
                 <div className=
                {`
                    ${s.dot}
                    ${props.position === 2 ? s.active : null}
                 `}></div>
            </div>
        );
    }
    return Dots;
}

export default dots;