import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Input from '../../components/UI/Input/Input';
import NavButton from '../../components/NavButton/NavButton';
import Dots from '../../components/UI/Dots/Dots';
import Error from '../../components/UI/Error/Error';

import s from './Register.module.scss';
import * as actions from '../../store/actions';
import {updateObject, checkValidity} from '../../shared/utility';

class Register extends Component {
    state = {
        // name: "",
        // email: "",
        // level: "",
        validate: true,
        register: {
            0: {
                value: "",
                validation: {
                    required: true,
                    messages: "Nama tidak boleh kosong"
                },
                valid: false,
                touched: false
            },
            1: {
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                    messages: "Email tidak valid"
                },
                valid: false,
                touched: false
            },
            2: {
                value: "",
                validation: {
                    required: true,
                    messages: "Jenjang tidak boleh kosong"
                },
                valid: false,
                touched: false
            }
        }
    }

    componentDidMount(){
        this.setState(prevState => ({
            register: {
                ...prevState.register,
                0: {
                    ...prevState.register[0],
                    value: this.props.nam,
                    valid: this.props.nam === "" ? false : true
                },
                1: {
                    ...prevState.register[1],
                    value: this.props.ema,
                    valid: this.props.ema === "" ? false : true
                },
                2: {
                    ...prevState.register[2],
                    value: this.props.lev,
                    valid: this.props.lev === "" ? false : true
                }
            }
        }))
    }

    nextFormRegisterHandler = (e) => {
        const isEnd = this.props.pos === (Object.keys(this.props.reg).length - 1);
        if(this.state.register[this.props.pos].valid){
            this.props.onSetFormRegisterValue(this.state.register[this.props.pos].value, this.props.reg[this.props.pos].name);
            if(isEnd){
                this.props.history.push("/start");
                if(this.props.pID === ""){
                    this.storeRegistrar();
                }
            }else{
                this.props.onNextFormRegister(this.props.pos);
            }
        }else{
            this.setState({
                validate: false
            })
        }
        e.preventDefault();
    }

    storeRegistrar = () => {
        const participant = {
            name: this.state.register[0].value,
            email: this.state.register[1].value,
            level: this.state.register[2].value,
            timestamp: new Date().getTime()
        }
        this.props.onRegisterStore(participant);
    }
    prevFormRegisterHandler = (e) => {
        this.props.onPrevFormRegister(this.props.pos);
    }

    inputHandler = (e) => {
        const data = updateObject(this.state.register[this.props.pos], {
            value: e.target.value,
            valid: checkValidity(e.target.value, this.state.register[this.props.pos].validation),
            touched: true
        })

        const d = updateObject(this.state.register, {
            [this.props.pos]: data
        })
        this.setState({
            register: d,
            validate: true
        })
    }

    render(){
        let image = this.props.reg[this.props.pos].image;
        let title = this.props.reg[this.props.pos].title;
        let caption = this.props.reg[this.props.pos].caption;
        let validate = null;
        if(!this.state.validate){
            validate = (
                <div className={`${s.Error} ${s.invalid}`}>
                    {this.state.register[this.props.pos].validation.messages}
                </div>
            );
        }
        let input = (
            <Input
                type={this.props.reg[this.props.pos].input} 
                name={this.props.reg[this.props.pos].name}
                value={this.state.register[this.props.pos].value}
                options={this.props.reg[this.props.pos].options}
                changed={this.inputHandler}
                placeholder={this.props.reg[this.props.pos].placeholder}/>
        );
        return(
            <div className={s.container}>
                <div className={s.imageContainer}>
                    <img src={image} alt={this.props.name}/>
                </div>
                <h1 className={s.title}>{title}</h1>
                <Dots length="3" position={this.props.pos}/>
                <div className={s.caption}>
                    {caption}
                </div>
                {input}
                <NavButton
                    dynamic={[this.props.pos, Object.keys(this.props.reg).length]}
                    dynamicLinkTo={["/", "/start"]}
                    formPrevHandler={this.prevFormRegisterHandler}
                    formNextHandler={this.nextFormRegisterHandler}
                />
                <Error
                    invalid={!this.state.register[this.props.pos].valid}
                    shouldValidate={this.state.register[this.props.pos].validation}
                    touched={this.state.register[this.props.pos].touched}
                    >
                    {this.state.register[this.props.pos].validation.messages}
                </Error>
                {validate}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        reg: state.register.register,
        pos: state.register.registerPos,
        nam: state.register.name,
        ema: state.register.email,
        lev: state.register.level,
        pID: state.register.participantID
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNextFormRegister: (oldPos) => dispatch(actions.nextFormRegisterHandler(oldPos)),
        onPrevFormRegister: (oldPos) => dispatch(actions.prevFormRegisterHandler(oldPos)),
        onRegisterStore: (participant) => dispatch(actions.registerStore(participant)),
        onSetFormRegisterValue: (value, identifier) => dispatch(actions.setFormRegisterValueHandler(value, identifier))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));