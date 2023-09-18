"use client"

import { IUser } from '@/interfaces/user'
import { authService } from '@/services/auth.service'
import {
    BellIcon,
    BookmarkIcon,
    DotsCircleHorizontalIcon,
    HashtagIcon,
    MailIcon,
    UserIcon,
    ViewListIcon,
} from '@heroicons/react/outline'
import { DotsHorizontalIcon, HomeIcon } from '@heroicons/react/solid'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Avatar from './Avatar'
import Path from './Path'

export default function LeftSideBar() {
    let [userData, setUserData] = useState<IUser | null>(null);
    const fecthUserProfile = async () => {
        try {
            const response = await authService.getUserProfile();
            setUserData(response);
        } catch (error) {
            window.location.href = '/login';
        }
    }

    const logout = (): void => {
        Cookies.remove('token');
        window.location.href = '/login';
    }

    useEffect(() => {
        fecthUserProfile();
    }, [])
    return (
        <div className='fixed'>
            <div>
                <nav className="flex-col gap-5 px-2 py-4 min-h-screen justify-between items-center hidden tablet:flex">
                    <div className="flex flex-col gap-5 items-center desktop:items-stretch w-full">
                        <div className="px-4">
                            <div className='w-7 h-7'>
                                <Image src='/logo.png' alt="Logo" className="w-full" width={1000} height={1000} />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <Path Icon={HomeIcon} name="Home" active={true} />
                            <Path Icon={HashtagIcon} name="Explore" active={false} />
                            <Path Icon={BellIcon} name="Notifications" active={false} />
                            <Path Icon={MailIcon} name="Messages" active={false} />
                            <Path Icon={BookmarkIcon} name="Bookmarks" active={false} />
                            <Path Icon={ViewListIcon} name="Lists" active={false} />
                            <Path Icon={UserIcon} name="Profile" active={false} />
                            <Path Icon={DotsCircleHorizontalIcon} name="More" active={false} />
                        </div>
                        <button onClick={() => logout()} className="bg-sky-500 p-3 desktop:py-4 text-base font-bold text-white rounded-full max-w-[13.75rem] hover:bg-sky-400 hover-transition">
                            <span className="desktop:block hidden">{userData ? "Logout" : 'Login'}</span>
                            <div className="desktop:hidden w-6 h-6">
                                <svg viewBox="0 0 24 24" aria-hidden="true" fill="#F8FAFC">
                                    <g>
                                        <path d="M8.8 7.2H5.6V3.9c0-.4-.3-.8-.8-.8s-.7.4-.7.8v3.3H.8c-.4 0-.8.3-.8.8s.3.8.8.8h3.3v3.3c0 .4.3.8.8.8s.8-.3.8-.8V8.7H9c.4 0 .8-.3.8-.8s-.5-.7-1-.7zm15-4.9v-.1h-.1c-.1 0-9.2 1.2-14.4 11.7-3.8 7.6-3.6 9.9-3.3 9.9.3.1 3.4-6.5 6.7-9.2 5.2-1.1 6.6-3.6 6.6-3.6s-1.5.2-2.1.2c-.8 0-1.4-.2-1.7-.3 1.3-1.2 2.4-1.5 3.5-1.7.9-.2 1.8-.4 3-1.2 2.2-1.6 1.9-5.5 1.8-5.7z"></path>
                                    </g>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <Link href='/profile'>
                        {userData && (
                            <div className='flex items-center justify-between desktop:w-[17rem] hover:bg-neutral-200 desktop:px-4 px-3 py-3 rounded-full hover-transition cursor-pointer'>
                                <div className="flex items-center gap-4">
                                    {userData?.profilePicture ? <Avatar src={userData?.profilePicture} alt={userData?.username} /> : <Avatar src='https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png' alt='user-profile' />}
                                    <div className='desktop:block hidden'>
                                        <h1 className="font-bold text-lg">{userData?.fullName ? userData.fullName : 'AI User'}</h1>
                                        <h2 className="text-neutral-500 -mt-1">@{userData?.username}</h2>
                                    </div>
                                </div>
                                <DotsHorizontalIcon className="w-4 h-4 text-neutral-500 desktop:block hidden" />
                            </div>
                        )}
                    </Link>
                </nav>
            </div>
        </div >
    )
}
