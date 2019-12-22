import React, {Component} from 'react';
import {connect} from 'react-redux';

import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';

import s from './Option.module.scss';

class Option extends Component{
    state = {
        optionModal: {
            0: false,
            1: false,
            2: false
        },
        priorityPos: 1,
        priority: new Map(),
        checkedCheckBox: new Map(),
        data: [],
        checkboxConfig: []
    }
    componentDidMount(){
        this.CheckboxInit();
    }

    check = (value) => {
        return this.props.value === value;
    }

    modalToggledHandler = (pos) => {
        this.setState(prevState => ({
            optionModal: {
                ...prevState.optionModal,
                [pos]: !prevState.optionModal[pos]
            }
        }));
    }

    setOptionPriority = (e) => {
        const optName = e.target.name;
        const isChecked = e.target.checked;
        const data = [...this.state.data];
        if(!this.state.checkedCheckBox.get(optName)){
            this.setState({
                checkedCheckBox: this.state.checkedCheckBox.set(optName, isChecked)
            });
            this.setPriorityNumber(optName);
            data.push([this.state.priorityPos, optName]);
            this.pushOptionPriority(data);
        }
        this.props.priorityChanged(data);
    }

    pushOptionPriority = (data) => {
        this.setState({
            data: [...data]
        })
    }
    
    setPriorityNumber = (optName) => {
        this.setState({
            priority: this.state.priority.set(optName, this.getPriorityNumber(optName)),
        });
    }

    getPriorityNumber = (option) => {
        if(this.state.checkedCheckBox.get(option)){
            this.setState(prevState => ({
                priorityPos: prevState.priorityPos+1
            }))
        }else{
            this.setState(prevState => ({
                priorityPos: prevState.priorityPos-1
            }))
        }
        return this.state.priorityPos;
    }

    resetPriority = (e) => {
        e.preventDefault();
        this.setState({
            checkedCheckBox: new Map(),
            priority: new Map(),
            priorityPos: 1,
            data: []
        })
    }

    CheckboxInit = () => {
        const checkboxConfig = [];
        this.props.que[9].options.map((opt, i) => {
            const checkbox = {
                name: 'checkbox'+i,
                key: 'checkbox'+i,
                label: opt[1],
                checked: 'false',
                priority: ''
            };
            return checkboxConfig.push(checkbox);
        });
        this.setState({
            checkboxConfig: [...checkboxConfig]
        })
    }

    render(){
        const position = this.props.pos +1;
        const size = Object.keys(this.props.que).length;
        const question = this.props.que[this.props.pos];
        let options = null;
        let validation = (
            <>
                Pilih salah satu jawaban
            </>
        );
        if(question.type === "yesno"){
            options = (
                <ul>
                    <li>
                        <input 
                            type="radio" 
                            id="option" 
                            name="option" 
                            value="Ya"
                            checked={this.check("Ya")}
                            onChange={(event) => this.props.optionChanged(event)}/>
                        <label htmlFor="option">Ya</label>
                        <div className={s.check}></div>
                    </li>
                    <li>
                        <input 
                            type="radio" 
                            id="option2"
                            name="option" 
                            value="Tidak"
                            checked={this.check("Tidak")}
                            onChange={(event) => this.props.optionChanged(event)}/>
                        <label htmlFor="option2">Tidak</label>
                        <div className={s.check}></div>
                    </li>
                </ul>
            );
        }else if(question.type === "multiple"){
            options = (
                <ul>
                    {question.options.map((option, i) => {
                        return (
                            <li key={option+i}>
                                <input
                                    type="radio" 
                                    id={"option"+ i}
                                    name="option" 
                                    value={option}
                                    checked={this.check(option)}
                                    onChange={(event) => this.props.optionChanged(event)}
                                    />
                                <label htmlFor={"option"+ i}>{option}</label>
                                <div className={s.check}></div>
                            </li>
                        );
                    })}
                </ul>
            );
        }else if(question.type === "input"){
            options = (
                <ul>
                    {question.options.map((option, i) => {
                        let opt = null;
                        if(option === true){
                            opt = (
                                <li key={option+i}>
                                    <input 
                                        type="radio" 
                                        id={"option"+ i} 
                                        name="option" 
                                        value={this.props.inputValue}
                                        checked={this.props.value === this.props.inputValue}
                                        onChange={(event) => this.props.optionChanged(event)}/>
                                    <label htmlFor={"option"+ i}>
                                        <input
                                            className={s.inputOpt} 
                                            type="text"
                                            placeholder="Lainnya"
                                            value={this.props.inputValue}
                                            onChange={(event) => this.props.inputChanged(event)}/>
                                    </label>
                                    <div className={s.check}></div>
                                </li>
                            );
                        }else{    
                            opt =(
                            <li key={option+i}>
                                <input 
                                    type="radio" 
                                    id={"option"+ i} 
                                    name="option" 
                                    value={option}
                                    checked={this.check(option)}
                                    onChange={(event) => this.props.optionChanged(event)}/>
                                <label htmlFor={"option"+ i}>{option}</label>
                                <div className={s.check}></div>
                            </li>
                            );
                        }
                        return opt;
                    })}
                </ul>
            );
        }else if(question.type === "optimage"){
            options = (
                <ul>
                    {question.options.map((option, i) => {
                        return (
                            <div key={option[1]+i}>
                                <Modal
                                    show={this.state.optionModal[i]}
                                    modalClosed={() => this.modalToggledHandler(i)}
                                    title={option[1]}>
                                        <img className={s.imgmodal} src={option[0]} alt={option[1]}></img>
                                </Modal>
                                <li>
                                    <input
                                        type="radio" 
                                        id={"option"+ i}
                                        name="option" 
                                        value={option[1]}
                                        checked={this.check(option[1])}
                                        onChange={(event) => this.props.optionChanged(event)}/>
                                    <label htmlFor={"option"+ i}>
                                        {option[1]} 
                                        <div
                                            onClick={() => this.modalToggledHandler(i)}
                                            className={s.helpLink}
                                            id={"option"+ i}>
                                            Apa ini?
                                        </div>
                                    </label>
                                    <div className={s.check}></div>
                                </li>
                            </div>
                        );
                    })}
                </ul>
            );
        }else if(question.type === "priority"){
            validation = (
                <>
                    {this.state.data.length < 1 ? "Pilih prioritasmu" : "Pilihan prioritasmu kurang "+ (this.state.checkboxConfig.length - this.state.data.length)+" lagi"}
                </>
            );
            options = (                    
                <ul>
                    {this.state.checkboxConfig.map(checkbox => {
                        return (
                            <li key={checkbox.key}>
                                <label className={s.checkbox}>
                                    <input
                                        type="checkbox"
                                        name={checkbox.label}
                                        value={this.state.checkedCheckBox.get(checkbox.label)}
                                        checked={this.state.checkedCheckBox.get(checkbox.label) ? true : false}
                                        onChange={this.setOptionPriority}/>
                                    <span className={s.overlay}>
                                        <span className={s.icon}>
                                        {this.state.priority.get(checkbox.label)}
                                        </span>
                                    </span>
                                    {checkbox.label}
                                </label>
                            </li>
                        );
                    })

                    }
                    <Button shadow full clicked={this.resetPriority} tm10>Ada kesalahan, reset prioritas</Button>
                </ul>
            );
        }
        return (
            <>
                <div className={s.position}>
                    Pertanyaan {position} dari {size}
                </div>
                <div className={s.Card}>
                    <div className={`${s.Error} ${!this.props.isValid ? s.invalid : null}`}>
                        {!this.props.isValid ? validation : null}
                    </div>
                    <div className={s.question}>
                        {question.question}
                    </div>
                    <div className={s.answers}>
                        {options}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        que: state.questionnaire.question,
        ans: state.questionnaire.answers,
        pos: state.questionnaire.questionPos
    }
}

export default connect(mapStateToProps)(Option);