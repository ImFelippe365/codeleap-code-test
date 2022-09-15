import { ReactNode } from "react";

interface Props {
    title: string;
    children?: ReactNode;
}

export function Heading({ title, children }: Props) {
    return (
        <div className="bg-black py-[24px] px-[30px] flex flex-row items-center justify-between">
            <h1 className="text-white font-bold text-2xl">{title}</h1>
            {children}
        </div>
    );
}