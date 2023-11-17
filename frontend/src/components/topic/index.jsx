import styles from './index.module.scss'
import {Category} from "../category";
import {useNavigate} from "react-router-dom";

export const Topic = ({_id, title, created_by, categories, comments}) => {
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/topic/${_id}`);
    };
    return(
        <div onClick={handleNavigate} className={styles.root}>
            <img src="/images/topic.svg" alt="Topic" />
            <div className={styles.container}>
                <div className={styles.right}>
                    <div className={styles.categories}>
                        {categories.map((cat, i) => (
                            <Category key={i} category={cat} />
                        ))}
                    </div>
                    <h1>{title}</h1>
                </div>
                <div className={styles.left}>
                    <p className={styles.createdby}>created by: {created_by?.username}</p>
                    <p>{comments.length} comments</p>
                </div>
            </div>
        </div>
    )
}