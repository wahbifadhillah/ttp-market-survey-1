import React, { Component } from 'react';
import Backdrop from '../Backdrop/Backdrop';

import styles from './Modal.module.scss';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }

    render() {
        let title = null;
        let desc = null;
        if(this.props.title){
            title = (
                <div className={styles.Title}>{this.props.title}</div>
            );
        }
        if(this.props.desc){
            desc = (
                <div className={styles.Desc}>{this.props.desc}</div>
            );
        }
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={styles.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {title}
                    {this.props.children}
                    {desc}
                    <div className={styles.closeButton} onClick={this.props.modalClosed}>X</div>
                </div>
            </>
        )
    }
}

export default Modal;