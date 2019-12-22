import React from 'react';
import s from './Spinner.module.scss';

const spinner = () => {
    return <div className={s.loading}><div></div><div></div><div></div><div></div></div>
}

export default spinner;