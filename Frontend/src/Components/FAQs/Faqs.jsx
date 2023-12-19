import React from 'react'
import styles from './Faqs.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

const Faqs = () => {
    const [openQuestion, setOpenQuestion] = useState(null);
    useEffect(() => {
        const handleClickOutside = () => {
            if (openQuestion) {
                closeAnswer(openQuestion);
            }
        };
        window.addEventListener('click', handleClickOutside);

        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [openQuestion]);
    const toggleAnswer = (questionId, event) => {
        event.stopPropagation();
        if (openQuestion === questionId) {
            closeAnswer(questionId);
        } else {
            if (openQuestion) {
                closeAnswer(openQuestion);
            }
            openAnswer(questionId);
        }
    };
    const openAnswer = (questionId) => {
        const answerDiv = document.getElementById(`answer-${questionId}`);
        if (answerDiv) {
            answerDiv.style.borderTop = 'solid 1px black';
            answerDiv.style.display = 'block';
            answerDiv.previousSibling.children[1].style.transform = "rotate(180deg)";
        }
        setOpenQuestion(questionId);
    };

    const closeAnswer = (questionId) => {
        const answerDiv = document.getElementById(`answer-${questionId}`);
        if (answerDiv) {
            answerDiv.style.borderTop = 'none';
            answerDiv.style.display = 'none';
            answerDiv.previousSibling.children[1].style.transform = "rotate(0deg)";
        }
        setOpenQuestion(null);
    };
    return (
        <section className={styles.FaqSec}>
            <h1 className={styles.Faq_Heading}>Frequently asked questions</h1>
            <div className={styles.Faq_grid}>
                <div className={styles.faqLeft}>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-0', e)}>
                            <p className={styles.ques}>How do I upgrade/downgrade my workplace plan?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-0" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-1', e)}>
                            <p className={styles.ques}>Can I add other information be added to an invoice?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-1" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-2', e)}>
                            <p className={styles.ques}>why should I use a new table vs. a view?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-2" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-3', e)}>
                            <p className={styles.ques}>how can I transfer data from one base to another?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-3" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-4', e)}>
                            <p className={styles.ques}>How do I change my account email address?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-4" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                </div>
                <div className={styles.faqRight}>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-5', e)}>
                            <p className={styles.ques}>How does billing work?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-5" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-6', e)}>
                            <p className={styles.ques}>Can I share an individual app?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-6" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-7', e)}>
                            <p className={styles.ques}>Can I export list of all collaborators?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-7" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-8', e)}>
                            <p className={styles.ques}>Can invoices be sent other collaborators?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-8" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                    <div className={styles.faq_ques_div}>
                        <div className={styles.faq_ques} onClick={(e) => toggleAnswer('question-9', e)}>
                            <p className={styles.ques}>How do I contact support?</p>
                            <FontAwesomeIcon icon={faArrowDown} />
                        </div>
                        <div id="answer-question-9" className={styles.answerDiv}>
                            <p className={styles.answer}>How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan? How do I upgrade/downgrade my workplace plan?</p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    )
}

export default Faqs