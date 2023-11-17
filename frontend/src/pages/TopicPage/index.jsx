import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import { addComment, deleteTopic, getTopic } from "../../store/actions/topics";
import { Button } from "../../components/button";
import { Comments } from "../../components/comments";

export const TopicPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const [topic, setTopic] = useState();
    const [comment, setComment] = useState('');

    const changeComment = useCallback((event) => {
        setComment(event.target.value);
    }, []);

    useEffect(() => {
        if (id) {
            dispatch(getTopic(id))
                .unwrap()
                .then(response => {
                    setTopic(response.topic);
                })
                .catch(error => {
                    console.error(error);
                });
        }
    }, [dispatch, id]);


    const handleDelete = useCallback(() => {
        dispatch(deleteTopic(id));
    }, [dispatch, id]);

    const handleSubmit = useCallback(() => {
        if (comment.trim() !== '') {
            dispatch(addComment({
                topicId: id,
                comment: comment
            })).unwrap()
                .then(response => {

                    setTopic(response.topic);
                })
                .catch(error => {
                    console.error(error);
                });
            setComment('');
        }
    }, [dispatch, id, comment]);
    return (
        <div className={styles.root}>
            {topic ? (
                <>
                    <div className={styles.options}>
                        <h1>{topic.title}</h1>
                        <Button
                            text='delete'
                            onClick={handleDelete}
                        />
                    </div>
                    <div className={styles.container}>
                        <div className={styles.padding}>
                            <Comments topic={topic} />
                            {topic.comments && topic.comments.map((commentItem) => (
                                <Comments
                                    key={commentItem._id}
                                    topic={commentItem}
                                />
                            ))}
                            <div className={styles.commentInput}>
                                <p>Add comment</p>
                                <textarea
                                    value={comment}
                                    onChange={changeComment}
                                    placeholder='Comments'
                                ></textarea>
                            </div>
                            <Button
                                text='Submit'
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </>
            ) : null}
        </div>
    );
};
