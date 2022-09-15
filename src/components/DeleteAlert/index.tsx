interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export function DeleteAlert({ onCancel, onConfirm }: Props) {
    return (
        <div className="absolute w-full h-full bg-background-blur z-10 flex justify-center bg-fixed">
            <div className="absolute w-[35%] top-[124px] z-20 bg-white px-11 py-9">
                <h4 className="text-[22px] mb-11">Are you sure you want to delete this item?</h4>

                <div className="w-full flex flex-row items-center gap-4 justify-end">
                    <button
                        onClick={onCancel}
                        className="px-8 py-1 bg-white border-black border-solid border-[1px] text-black text-center font-bold hover:bg-black hover:text-white">
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-8 py-1 bg-white border-black border-solid border-[1px] text-black text-center font-bold hover:bg-black hover:text-white">
                        OK
                    </button>
                </div>
            </div>
        </div>
    );
}