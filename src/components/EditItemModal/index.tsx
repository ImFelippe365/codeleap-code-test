import { Form } from "../Form"
import { useState } from 'react';
import { Posting } from "../../App";

interface ModifiedPost {
    title: string,
    content: string,
}

interface Props {
    initialModifiedPost: Posting,
    handleUpdatePost: (modifiedPost: Posting) => void,
    closeEditingModal: () => void;
}

export function EditItemModal({ initialModifiedPost, handleUpdatePost, closeEditingModal }: Props) {

    const [modifiedPost, setModifiedPost] = useState<ModifiedPost>(initialModifiedPost);

    const handleChangeFields = (name: string, value: string) => {
        setModifiedPost(post => {
            return {
                ...post,
                [name]: value
            }
        })
    }

    return (
        <div className="absolute w-full h-full bg-background-blur z-10 flex justify-center bg-fixed">
            <div style={{ top: window.scrollY + 300 }} className="absolute w-[90%] md:w-[723px] z-20 bg-white px-8 py-7">
                <h1 className="text-[22px] mb-7 font-bold">Edit item</h1>

                <Form
                    values={modifiedPost}
                    showDefaultValue
                    submitPost={() => handleUpdatePost(modifiedPost)}
                    onChangeField={handleChangeFields}
                    buttonText="SAVE"
                >
                    <button
                        onClick={closeEditingModal}
                        className="px-6 py-2 bg-white border-black border-solid border-[1px] text-black text-center font-bold hover:bg-black hover:text-white">
                        Cancel
                    </button>
                </Form>
            </div>
        </div>
    );
}