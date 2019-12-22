import React, {Component} from 'react';
import Button from '../UI/Button/Button';

import Carousel, {Dots} from '@brainhubeu/react-carousel';

import './Consent.css';
import s from './Consent.module.scss';
import imgWelcome from '../../assets/images/hello.svg';
import logotext from '../../assets/images/logotext.png';

class Consent extends Component {
    state = {
        value: 0,

    }
    onChange = value => this.setState({ value });
    render(){
        return (
            <div className={s.Consent}>
                <div className={s.imageContainer}>
                    <img src={imgWelcome} alt="welcome"></img>
                </div>
                <div className={s.message}>
                    <img className={s.logo} src={logotext} alt="logo"></img>
                    <h3 className={s.header}>Halo sobat!</h3>
                    <Carousel
                        autoPlay={3000}
                        infinite
                        value={this.state.value}
                        onChange={this.onChange}>
                            <p className={s.caption}>
                                Kami adalah The Time Planner, sebuah produk planner yang dapat membantu memaksimalkan potensi kebiasaan baikmu.
                            </p>
                            <p className={s.caption}>
                                Saat ini kami sedang melakukan riset dan pengembangan produk agar benefit yang kami tawarkan bisa pas dengan apa yang sebenarnya paling kamu butuhkan!
                            </p>
                            <p className={s.caption}>
                                Untuk itu, yuk bantu kami dengan mengisi kuesioner singkat dibawah ini!
                            </p>
                    </Carousel>
                    <Dots value={this.state.value} onChange={this.onChange} number={3} />
                </div>
                <Button primary full linkTo="/register">Ikuti</Button>
            </div>
        );
    }
}

export default Consent;