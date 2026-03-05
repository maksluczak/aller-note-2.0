import React from "react";

/**
 *
 * @param {children} will be rendered inside the btn
 * @param {style} white | green | red - btn color
 * @param {onClickon} click callback func
 * @param {type} btn type
 * @returns
 */
export default function ButtonPrimary({ children, style = "white", type = "button", onClick = () => {}, }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`block px-[2.1rem] py-[.7rem]  rounded-[1.13rem] transform hover:scale-105 transition-transform
        ${style == "white" && "text-eden-500 bg-white"}
        ${style == "red" && "bg-red-400 text-white"} ${
                style == "green" && "bg-eden-700 text-white"
            }`}
        >
            {children}
        </button>
    );
}
