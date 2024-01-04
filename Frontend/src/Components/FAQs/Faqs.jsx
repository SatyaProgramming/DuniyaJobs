import React, { useEffect, useState } from 'react';
import styles from './Faqs.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import FaqData from '../Assets/FAQQuesAndAns.json'

const Faqs = () => {
    const faqData = FaqData;
    const [openQuestion, setOpenQuestion] = useState(null);
    console.log("test");

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
    // Split the data into two halves
    const middleIndex = Math.ceil(faqData.length / 2);
    const firstHalf = faqData.slice(0, middleIndex);
    const secondHalf = faqData.slice(middleIndex);

    return (
        <section className={styles.FaqSec}>
            <h1 className={styles.Faq_Heading}>Frequently asked questions</h1>
            <div className={styles.Faq_grid}>
                <div className={styles.faqLeft}>
                    {firstHalf.map((item) => (
                        <div key={item.id} className={styles.faq_ques_div}>
                            <div className={styles.faq_ques} onClick={(e) => toggleAnswer(item.id, e)}>
                                <p className={styles.ques}>{item.question}</p>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div id={`answer-${item.id}`} className={styles.answerDiv}>
                                <p className={styles.answer}>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.faqRight}>
                    {secondHalf.map((item) => (
                        <div key={item.id} className={styles.faq_ques_div}>
                            <div className={styles.faq_ques} onClick={(e) => toggleAnswer(item.id, e)}>
                                <p className={styles.ques}>{item.question}</p>
                                <FontAwesomeIcon icon={faArrowDown} />
                            </div>
                            <div id={`answer-${item.id}`} className={styles.answerDiv}>
                                <p className={styles.answer}>{item.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faqs;
