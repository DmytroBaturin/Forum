import styles from './index.module.scss'

export const Input = ({onChange, type, placeholder, style, value}) => {
    return(
        <input onChange={onChange} value={value} style={style} placeholder={placeholder} type={type} className={styles.input}/>
    )
}
