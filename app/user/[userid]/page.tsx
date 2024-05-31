/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { RootState } from '@/redux/reducers'
import { fetchUser } from '@/redux/users/actions'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function index() {
    const params = useParams()
    const user = useSelector((state: RootState) => state.users.user);
    const dispatch = useDispatch()
    // fetch user details
    useEffect(() => {
        const id = params
        dispatch(fetchUser(id.userid))
    }, [dispatch, params])
    return (
        <div className="p-10 bg-white  rounded-[.95rem] shadow-md">
            <span>
                Avatar :
                <Image src={user?.avatar} alt='user image' width={100} height={100} />
            </span>
            <br />
            <br />
            <span>
                Full Name :
                {user?.firs_name} {user?.last_name}
            </span>
            <br />
            <br />
            <span>
                Email :
                {user?.email}
            </span>
        </div>
    )
}

export default index
