import styles from './index.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllTopics} from "../../store/actions/topics";
import {topicsSelector} from "../../store/topicSlice";
import {Topic} from "../../components/topic";
import {Button} from "../../components/button";
import {selectAuthStatus} from "../../store/authSlice";
import {modalState, openModal} from "../../store/modalSlice";
import {Modal} from "../../components/modal";
export const TopicsPage = () => {
    const dispatch = useDispatch()
    const topics = useSelector(topicsSelector)
    const isAuth = useSelector(selectAuthStatus)
    const isModalOpen = useSelector(modalState)

    useEffect(() => {
        dispatch(getAllTopics());
    }, [dispatch]);

    return(
        <div className={styles.root}>
            <div className={styles.options}>
                <h1>Topics</h1>
                {isAuth ? <Button
                text={"Create Topic"}
                style={{
                    color: "green",
                    borderColor: 'green'
                }}
                onClick={() => {
                    dispatch(openModal(true))
                }}
                /> : (null)}
            </div>
            <div className={styles.container}>
                <div className={styles.containerPadding}>
                    {
                        topics.length === 0 ? (
                            <div className={styles.spinWrapper}>
                            <div className={styles.spinner}>
                            </div>
                        </div>) : (
                            topics.map((topic) => (
                               <Topic
                                   {...topic}
                               />
                            ))
                        )
                    }
                </div>
            </div>
            {
                isModalOpen &&
                <Modal/>
            }
        </div>
    )
}
