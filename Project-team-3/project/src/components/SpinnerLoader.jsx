import React, {useEffect, useState} from "react";
import { ReactComponent as Ring } from '../Assets/ring-resize.svg';
import ringSvg from "../Assets/ring-resize.svg";
import styles from "./components.module.css"
export default function Spinner() {
  return (
    <div>
        <img src={ringSvg} alt="Loading..." className={tyles} />
    </div>
  );
}