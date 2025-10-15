import React from "react"
import styles from "../pages/Pages.module.css";

export function InputLogin({type,placeholder,Icon, value, onChange}) {
    return (
        <div className={styles.inputbox}>
            <input 
                type={type}
                placeholder={placeholder}
                value={value} 
                onChange={onChange}
                required 
            />
            {Icon && <Icon className={styles.icon} />}
        </div>
    );
}