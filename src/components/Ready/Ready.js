import React from 'react';
import {connect} from 'react-redux';
import Button from '../UI/Button/Button';

import s from './Ready.module.scss';
import start from '../../assets/images/start.svg';

const ready = (props) => {
    return (
        <div className={s.Ready}>
            <div className={s.imageContainer}>
                <img src={start} alt="ready"/>
            </div>
            <div className={s.message}>
                <h2 className={s.header}>Oke, {props.nam}</h2>
                <p className={s.caption}>Apakah kamu sudah siap?</p>
            </div>
            <Button shadow full linkTo="/register" lm>Belum, sepertinya ada yang salah</Button>
            <Button primary full linkTo="/questionnaire">Mulai</Button>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        nam: state.register.name
    }
}

export default connect(mapStateToProps)(ready);