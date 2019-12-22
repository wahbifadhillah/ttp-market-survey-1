import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import Option from '../Option/Option';
import NavButton from '../../components/NavButton/NavButton';

import s from './Questionnaire.module.scss';
import * as actions from '../../store/actions';


class Questionnaire extends Component{
    state={
        selectedOption: " ",
        inputedOption: "",
        startTime: null,
        answers: [],
        valid: true
    }
    componentDidMount(){
        this.startTimer();
        this.setState({
            answers: this.props.ans
        })
    }
    
    startTimer = () => {
        this.setState({
            startTime: new Date()
        })
    }
    
    endTimer = () => {
        const endTime = new Date();
        let timeDiff = endTime - this.state.startTime;
        timeDiff /= 1000;
        const secs = timeDiff; // secs and milisecs
        return secs;
    }

    clearOptionsHandler = () => {
        this.setState({
            selectedOption: " ",
            inputedOption: ""
        })
    }

    setAnswerQuestionHandler = (answer, time) => {
        const answers = [...this.props.ans];
        answers.push(
            {
                no: this.props.pos,
                answer: answer, 
                elpased: time
            }
        );
        if(this.props.pos === 17){
            const data = {
                participantID: this.props.pID,
                answer: answers
            }
            this.storeAnswer(data);
        }else{
            this.setState({answers: answers});
            this.props.onSetAnswersQuestion(answers);
        }
    }

    nextFormQuestionHandler = (e) => {
        const isEnd = this.props.pos === (Object.keys(this.props.que).length - 1);
        if(this.state.valid){
            if(this.state.selectedOption.length === 7 || this.state.selectedOption !== " "){
                this.changedValidHandler();
                this.setAnswerQuestionHandler(this.state.selectedOption, this.endTimer());
                if(isEnd){
                    this.props.history.push("/finished");
                }else{
                    this.props.onNextFormQuestion(this.props.pos);
                    this.clearOptionsHandler();
                    this.startTimer();
                }
            }else{
                this.changedValidHandler();
            }
        }
        e.preventDefault();
    }

    storeAnswer = (answers) => {
        this.props.onStoreAnswer(answers);
    }

    prevFormQuestionHandler = (e) => {
        e.preventDefault();
        this.props.onPrevFormQuestion(this.props.pos);
    }

    optionChangedHandler = (e) => {
        this.setState({
            selectedOption: e.target.value,
            valid: true
        })
    }

    inputChangedHandler = (e) => {
        this.setState({
            inputedOption: e.target.value,
            selectedOption: e.target.value,
            valid: true
            
        })
    }

    priorityChangedHandler = (data) => {
        this.setState({
            selectedOption: data,
            
        })
        this.changedValidHandler();
    }

    changedValidHandler = () => {
        if(this.props.pos === 9){
            if(this.state.selectedOption.length < 6){
                return this.setState({valid: false});                
            }else {
                return this.setState({valid: true});
            }
        }else{
            if(this.state.selectedOption === " "){
                return this.setState({valid: false});
            }else{
                return this.setState({valid: true});
            }
        }
    }
    
    render(){
        return(
            <div className={s.Questionnaire}>
                <form>
                    <Option
                        value={this.state.selectedOption}
                        inputValue={this.state.inputedOption}
                        optionChanged={this.optionChangedHandler}
                        inputChanged={this.inputChangedHandler}
                        priorityChanged={this.priorityChangedHandler}
                        isValid={this.state.valid}
                    />
                    <NavButton
                        bottom={this.props.que[this.props.pos].type === "input" ? false : true}
                        noPrev
                        dynamic={[this.props.pos, Object.keys(this.props.que).length]}
                        dynamicLinkTo={["/start", "/finished"]}
                        formPrevHandler={this.prevFormQuestionHandler}
                        formNextHandler={this.nextFormQuestionHandler}
                    />
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        que: state.questionnaire.question,
        ans: state.questionnaire.answers,
        pos: state.questionnaire.questionPos,
        pID: state.register.participantID

    }
}

const mapDispatchToProps = dispatch => {
    return {
        onNextFormQuestion: (oldPos) => dispatch(actions.nextFormQuestionHandler(oldPos)),
        onPrevFormQuestion: (oldPos) => dispatch(actions.prevFormQuestionHandler(oldPos)),
        onStoreAnswer: (answer) => dispatch(actions.storeAnswer(answer)),
        onSetAnswersQuestion: (answers) => dispatch(actions.setAnswersQuestionHandler(answers))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Questionnaire));