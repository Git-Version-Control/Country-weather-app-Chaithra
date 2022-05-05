
import { style } from "@mui/system";
import { ChangeEvent, FC } from "react";
import styles from "./index.module.css";

type InputWithLabelProps = {
  //labelName: string;
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: string;
  placeholder: string;
};

const InputWithLabel: FC<InputWithLabelProps> = ({
 // labelName,
  id,
  value,
  placeholder,
  onChange,
}) => (
  <div className={styles.container}>
      
    <input
      className={styles.input}
      id={id}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  </div>
);

export default InputWithLabel;