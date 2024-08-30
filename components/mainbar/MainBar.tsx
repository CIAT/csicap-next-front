import { FC } from "react";
import style from "./mainbar.module.css";

interface Props {
    section: string;
    children?: JSX.Element;
}

export const MainBar: FC<Props> = ({ section, children }) => {
    return (
        <div className={style.container}>
            <>
                {children}
                <span style={{ marginLeft: "6px" }}>{section}</span>
            </>
        </div>
    );
};
