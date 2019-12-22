import React from 'react';
import {connect} from 'react-redux';
import s from './Finished.module.scss';
import end from '../../assets/images/finish.svg';

const finished = (props) => {
    return (
        <div className={s.Ready}>
            <div className={s.imageContainer}>
                <img src={end} alt="finished"/>
            </div>
            <div className={s.message}>
                <h2 className={s.header}>Terimakasih, {props.nam}</h2>
                <p className={s.caption}>Telah mengikuti survey kami, informasi pemenang giveway bisa dicek melalui Instagram @thetimeplanner</p>
                <p className={s.caption}>Selamat beraktifitas kembali</p>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        nam: state.register.name
    }
}

export default connect(mapStateToProps)(finished);