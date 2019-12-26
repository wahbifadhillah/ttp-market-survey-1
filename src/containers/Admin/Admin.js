import React, {Component} from 'react';
import s from './Admin.module.scss';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/';


class Admin extends Component{
    state = {
        questions: [],
        detailed: [],
        answers: [],
    }
    componentDidMount(){
        window.scrollTo(0, 0);
        this.questionList();
        this.props.onParticipantsFetchInit();
        this.props.onAnswersFetchInit();
    }

    questionList = () => {
        const questions = [];
        for (let key in this.props.que){
            questions.push({
                id: key,
                question: this.props.que[key].question
            });
        }
        this.setState({
            questions: questions
        })
    }

    participantClickHandler = (id) => {
        // participant details
        const participants = [...this.props.par];
        const detailed = participants.filter(data => data.id === id);

        // survey data
        const surveyData = [...this.props.als];
        const answers = surveyData.filter(data => data.participantID === id);
        // let answers = surveyData.filter(data => data.participantID === id);
        // if(answers.length === 0){
        //     answers = [{
        //         answer: ["Tidak ada"]
        //     }];
        // }
        console.log(answers);
        this.setState({
            detailed: detailed,
            answers: answers
        })
        
    }
    render(){
        let total = this.props.par.length;
        let data = null;
        let answer = "Tidak mengisi";
        let detailed = (
            <h3>Pilih partisipan untuk menampilkan data...</h3>
        );
        if(this.state.detailed.length > 0){
            detailed = (
                <>
                    <div className={s.subTitle}>
                        Informasi
                    </div>
                    <div className={s.Row}>
                        <div className={s.cTitle}>ID</div>
                        <div className={s.cData}>{this.state.detailed[0].id}</div>
                    </div>
                    <div className={s.Row}>
                        <div className={s.cTitle}>Nama</div>
                        <div className={s.cData}>{this.state.detailed[0].name}</div>
                    </div>
                    <div className={s.Row}>
                        <div className={s.cTitle}>Email</div>
                        <div className={s.cData}>{this.state.detailed[0].email}</div>
                    </div>
                    <div className={s.Row}>
                        <div className={s.cTitle}>Jenjang</div>
                        <div className={s.cData}>{this.state.detailed[0].level}</div>
                    </div>
                    <div className={s.Row}>
                        <div className={s.cTitle}>Planning?</div>
                        <div className={s.cData}>n</div>
                    </div>
                </>
            );
            
            if(this.state.answers.length > 0){
                data = (
                    <>
                        <div className={s.subTitle}>
                            Data survey
                        </div>
                        {this.state.questions.map((q, i) => {
                            if(i === 9){
                                answer = (
                                    <>
                                        {this.state.answers[0].answer[9].answer.map(priority => {
                                            return (
                                                <>
                                                    <ul>
                                                        <li className={s.Priority}>{priority[0]}</li>
                                                        <li>{priority[1]}</li>
                                                    </ul>
                                                </>
                                            );
                                        })}
                                    </>
                                );
                            }else{
                                answer = (
                                    this.state.answers[0].answer[i].answer
                                );
                            }
                            return(
                                <div className={s.Data} key={q.id}>
                                    <div className={s.questionNo}>
                                        {i+1}.
                                    </div>
                                    <div className={s.dataContainer}>
                                        <div className={s.Question}>
                                            {q.question}
                                        </div>
                                        <div className={s.Answer}>
                                            {answer}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </>
                );
            }else{
                data = (
                    <>
                        <div className={s.subTitle}>
                            Data survey
                        </div>
                        <p>Tidak mengisi</p>
                    </>
                );
            }
        }
        return(
            <div className={s.Admin}>
                <div className={s.Sidebar}>
                    <div className={s.AppName}>
                        Survey
                    </div>
                    <nav>
                        <ul>
                            <li>
                                <a href="/aw">Participant</a>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className={s.Content}>
                    <h1>Participant ({total})</h1>
                    <div className={s.Participants}>
                        <div className={s.List}>
                            {this.props.par.map(p => {
                                return (
                                    <div className={s.Card} key={p.id} onClick={(id) => this.participantClickHandler(p.id)}>
                                        <div className={s.isPlanning}>n</div>
                                        <div className={s.Brief}>
                                            <div className={s.Name}>{p.name}</div>
                                            <div className={s.Level}>{p.level}</div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className={s.Detail}>
                            <div className={s.Info}>
                                {detailed}
                            </div>
                            <div className={s.Response}>
                                {data}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        // pID: state.register.participantID
        par: state.register.participants,
        que: state.questionnaire.question,
        als: state.questionnaire.answerList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onParticipantsFetchInit: () => dispatch(actions.participantsFetchInit()),
        onAnswersFetchInit: () => dispatch(actions.answersFetchInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);