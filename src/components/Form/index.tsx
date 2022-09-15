import { ReactNode, useRef } from "react";
import { Posting } from "../../App";

interface Props {
    values: Posting,
    showDefaultValue: boolean,
    submitPost: () => void,
    onChangeField: (name: string, value: string) => void,
    buttonText: string,
    children?: ReactNode
}


export function Form({ values, showDefaultValue, submitPost, onChangeField, buttonText, children }: Props) {    
    const titleInputRef: any = useRef(null);
    const contentInputRef: any = useRef(null);

    const handleSubmitPost = () => {
        titleInputRef.current.value = ""
        contentInputRef.current.value = ""
        submitPost();
    }

    return (
        <div>
            <div className="flex flex-col">
                <label className="text-black">Title</label>
                <input
                    ref={titleInputRef}
                    name="title"
                    defaultValue={showDefaultValue ? values.title : ''}
                    onChange={({ target }) => onChangeField(target.name, target.value)}
                    placeholder="Hello world"
                    className="border-solid border-[1px] rounded border-gray outline-none px-2 py-1 placeholder:text-light-gray"
                    type={'text'}
                />
            </div>
            <div className="flex flex-col mt-4">
                <label className="text-black">Content</label>
                <textarea
                    ref={contentInputRef}
                    name="content"
                    defaultValue={showDefaultValue ? values.content : ''}
                    onChange={({ target }) => onChangeField(target.name, target.value)}
                    placeholder="Content here"
                    className="border-solid border-[1px] rounded border-gray outline-none px-2 py-1 h-20 placeholder:text-light-gray"
                />
            </div>

            <div className="w-full flex mt-8 justify-end items-center gap-4">
                {children}
                <button
                    onClick={handleSubmitPost}
                    disabled={!(values.content && values.title)}
                    className="px-6 py-2 bg-black text-white text-center font-bold disabled:opacity-60"
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
}