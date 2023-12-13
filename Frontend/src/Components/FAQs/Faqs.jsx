import React from 'react'
import styles from './Faqs.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import {
    geocode,
    RequestType,
  } from "react-geocode";

const Faqs = () => {
    useEffect(() => {
        const handlePageClick = (event) => {
            if (!(event.target.closest('button[data-specific-attribute="ArrowButton"]'))) {
                for(let i = 0; i<=document.getElementsByClassName(styles.answerDiv).length;i++){
                    document.getElementsByClassName(styles.answerDiv)[i].style.display='none';
                }
            }
        };
        document.addEventListener('click', handlePageClick)
    }, []);
    function OpenFAQAnswer(e){
        var x = e.target.parentNode;
        if(x.nodeName.toLowerCase()==="button"){
            x = x.parentNode.nextSibling;
        }
        else{
            x = x.parentNode.parentNode.nextSibling;
        }
        if(x.style.display!='block'){
            x.style.display='block';
            x.style.borderTop = "solid 1px black";
        }
        else{
            x.style.display='none';
            x.style.borderTop = "none";
        }
        

    }
  return (
    <section className={styles.FaqSec}>
        <h1 className={styles.Faq_Heading}>Frequently asked questions</h1>
        <div className={styles.Faq_grid}>
            <div className={styles.faqLeft}>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>How do I upgrade/downgrade my workplace plan?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>Can I add other information be added to an invoice?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>why should I use a new table vs. a view?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>how can I transfer data from one base to another?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>How do I change my account email address?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
            </div>
            <div className={styles.faqRight}>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>How does billing work?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>Can I share an individual app?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>Can I export list of all collaborators?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>Can invoices be sent other collaborators?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
                <div className={styles.faq_ques_div}>
                    <div className={styles.faq_ques}>
                        <p className={styles.ques}>How do I contact support?</p>
                        <button data-specific-attribute="ArrowButton" onClick={OpenFAQAnswer}><FontAwesomeIcon icon={faArrowDown} /></button>
                    </div>
                    <div className={styles.answerDiv}>
                        <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                    </div>
                </div>
            </div>
            
        </div>

    </section>
  )
}

export default Faqs