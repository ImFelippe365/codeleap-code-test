import { Posting } from "../../App";

interface Props {
    values: Posting,
    submitPost: () => void,
    onChangeField: (name: string, value: string) => void,
    buttonText: string,
}


export function Form({ values, submitPost, onChangeField, buttonText }: Props) {
    return (
        <form>
            <div className="flex flex-col">
                <label className="text-black">Title</label>
                <input
                    name="title"
                    onChange={({ target }) => onChangeField(target.name, target.value)}
                    placeholder="Hello world"
                    className="border-solid border-[1px] rounded border-gray outline-none px-2 py-1"
                    type={'text'}
                />
            </div>
            <div className="flex flex-col mt-4">
                <label className="text-black">Content</label>
                <textarea
                    name="content"
                    onChange={({ target }) => onChangeField(target.name, target.value)}
                    placeholder="Content here"
                    className="border-solid border-[1px] rounded border-gray outline-none px-2 py-1 h-20"
                />
            </div>

            <div className="w-full flex mt-8 justify-end">
                <button
                    onClick={() => submitPost()}
                    disabled={!(values.content && values.title)}
                    className="px-6 py-2 bg-black text-white text-center font-bold disabled:opacity-60"
                >
                    {buttonText}
                </button>
            </div>
        </form>
    );
}