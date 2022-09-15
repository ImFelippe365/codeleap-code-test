import { Form } from "../Form"
import { useState } from 'react';
import { Posting } from "../../App";

interface ModifiedPost {
    title: string,
    content: string,
}

interface Props {
    id: number,
    handleUpdatePost: (modifiedPost: Posting) => void,
    closeEditingModal: () => void;
}

function initialModifiedPost() {
    return {
        title: '',
        content: ''
    }
}

export function EditItemModal({ id, handleUpdatePost, closeEditingModal }: Props) {

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
            <div className="absolute top-[10%] w-[90%] md:w-[723px] z-20 bg-white px-8 py-7">
                <h1 className="text-[22px] mb-7 font-bold">Edit item</h1>

                <Form
                    values={modifiedPost}
                    submitPost={() => handleUpdatePost(modifiedPost)}
                    onChangeField={handleChangeFields}
                    buttonText="SAVE"
                />
            </div>
        </div>
    );
}