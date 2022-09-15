import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { defineUsername } from '../../redux/reducer';

export function SignIn() {

    const [username, setUsername] = useState<string>();

    const dispatch = useDispatch();

    return (
        <div className="absolute w-full h-full bg-background z-10 flex justify-center items-center bg-fixed">
            <div className="absolute w-[90%] sm:w-[500px] z-20 bg-white px-8 py-7">
                <h1 className="text-[22px] mb-7 font-bold">Welcome to CodeLeap network!</h1>

                <div className="flex flex-col">
                    <label className="text-black mb-3">Please enter your username</label>
                    <input
                        onChange={({ target }) => setUsername(target.value)}
                        placeholder="John doe"
                        className="border-solid border-[1px] rounded border-gray outline-none px-2 py-1"
                        type={'text'}
                    />
                </div>

                <div className="w-full flex flex-row gap-4 justify-end mt-5">
                    <button
                        disabled={!username}
                        onClick={() => dispatch(defineUsername(username))}
                        className="px-8 py-1 text-center font-bold bg-black text-white disabled:opacity-60">
                        ENTER
                    </button>
                </div>
            </div>
        </div>
    );
}