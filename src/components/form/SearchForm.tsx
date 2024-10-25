import React, { useState } from 'react'
import Input from './Input'
import { CiSearch } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { MdClose } from 'react-icons/md';

export default function SearchForm() {

    const [q, setQ] = useState("");

    const navigate = useNavigate();

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        setQ("");
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        navigate(`/search?q=` + q);
    }

    return (
        <div className='hidden lg:block relative w-full xl:w-500 group bg-input border-input text-white rounded-full'>
            <form onSubmit={handleSubmit} className='w-full flex items-center group-focus-within:shadow-lg rounded-full'>
                <div className="relative w-full flex items-center justify-between">
                    <Input onChange={(e) => setQ(e.target.value)} value={q} type="search" name="search" placeholder='Search Movie, TV Show...' className='bg-transparent dark:bg-transparent border-none py-2.5 outline-none' />

                    {q.length ?<Button variant={"icon"} size={"icon"} onClick={handleCancel}>
                            <MdClose className="w-6 h-6" />
                        </Button> : ''}
                </div>

                <button type='submit' className='px-4 border-none outline-none bg-transparent'>
                    <CiSearch className="w-6 h-6" />
                </button>
            </form>
        </div>
    )
}
