"use client";

import { IUser } from "@/interfaces/user";
import { authService } from "@/services/auth.service";
import Image from "next/image";
import { useEffect, useState } from "react";

type Props = {
    follow: IUser
    userFollowings: string[] | undefined
}

export default function Follow({ follow, userFollowings }: Props) {
    const [followed, setFollowed] = useState<boolean | undefined>(false);

    const handleFollow = async (id: string): Promise<void> => {
        try {
            if (followed) {
                await authService.unFollowUser(id);
                setFollowed(false);
            } else if (!followed) {
                await authService.followUser(id);
                setFollowed(true);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const isFollowing = userFollowings?.some((item) => item === follow._id);
        setFollowed(isFollowing);
    }, [userFollowings, follow._id]);
    return (
        <div className="flex items-center">
            <div className="flex items-center w-48">
                <div>
                    <Image className="inline-block h-10 w-auto rounded-full ml-4 mt-2" src={follow.profilePicture ? follow.profilePicture : 'https://cdn-icons-png.flaticon.com/512/149/149071.png'} alt="" width={1000} height={1000} />
                </div>
                <div className="ml-3 mt-3">
                    <p className="text-base leading-6 font-medium text-black">
                        {follow.fullName}
                    </p>
                    <p className="text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150">
                        {follow.username}
                    </p>
                </div>
            </div>
            <div className="flex-1 px-4 py-2 m-2 mt-3">
                <button onClick={() => handleFollow(follow._id)} className={`${followed ? 'bg-white hover:bg-gray-100 text-black hover:text-gray-800 border-gray-300 hover:border-gray-800' : 'bg-black hover:bg-gray-800 text-white hover:text-white border-white'} font-semibold duration-200 py-1 px-6 mt-3 border hover:border-transparent rounded-full`}>
                    {followed ? 'Unfollow' : 'Follow'}
                </button>
            </div>
        </div>
    )
}