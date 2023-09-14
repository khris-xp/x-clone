"use client"

import { formatDateDifference } from "@/hooks/format";
import { ITweet } from "@/interfaces/tweet";
import { IUser } from "@/interfaces/user";
import { authService } from "@/services/auth.service";
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Image from "next/image";
import { useEffect, useState } from "react";
import Avatar from "./Avatar";
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon } from "./Icons";
import Rune from "./Rune";

interface Props {
    post: ITweet
    replies: number,
    retweets: number,
    likes: number
}

export default function Post({ post, replies, retweets, likes }: Props) {
    let [userData, setUserData] = useState<IUser | null>(null);

    const fetchUserById = async (id: string) => {
        try {
            const response = await authService.getUserById(id);
            setUserData(response);
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }

    useEffect(() => {
        fetchUserById(post.createdBy);
    }, [post.createdBy]);

    const styledDesc: string = post.desc.replace(/#(\w+)/g, '<span class="text-blue-500">#$1</span>');
    return (
        <div className="border-t-[1px] px-4 pt-3 pb-2 hover:bg-neutral-100 transition-colors duration-500 ease-out">
            <div className="grid grid-cols-[auto,1fr] gap-3">
                {userData?.profilePicture ? <Avatar src={userData?.profilePicture} alt={userData?.username} />
                    : <Avatar src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="Avatar" />
                }
                <div>
                    <div className="flex gap-1 items-center">
                        <h1 className="font-bold">{userData?.fullName ? userData?.fullName : 'AI User'}</h1>
                        <h2 className="text-neutral-500 hidden mobile:block">@{userData?.username}</h2>
                        <span className="text-neutral-500 font-extralight">•</span>
                        <h2 className="text-neutral-500">{formatDateDifference(post.createdAt)}.</h2>
                        <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer transition-colors duration-500 ease-out">
                            <DotsHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
                        </div>
                    </div>
                    <p dangerouslySetInnerHTML={{ __html: styledDesc }} />
                    {post.img && <Image src={post.img} className="rounded-2xl mt-3" height={1000} width={1000} alt="image" />}
                    <div className="flex justify-between mt-3 max-w-md cursor-pointer">
                        <div className="flex items-center group tablet:pr-4">
                            <Rune
                                Icon={<ReplyIcon fill="group-hover:fill-sky-500" />}
                                color="group-hover:bg-sky-100"
                            />
                            <p className="text-xs group-hover:text-sky-500">{replies}</p>
                        </div>
                        <div className="flex gap-1 items-center group tabletpx-4">
                            <Rune
                                Icon={<RetweetIcon fill="group-hover:fill-green-500" />}
                                color="group-hover:bg-green-100"
                            />
                            <p className="text-xs group-hover:text-green-500">{retweets}</p>
                        </div>
                        <div className="flex gap-1 items-center group tabletpx-4">
                            <Rune
                                Icon={<LikeIcon fill="group-hover:fill-rose-500" />}
                                color="group-hover:bg-rose-100"
                            />
                            <p className="text-xs group-hover:text-rose-500">{likes}</p>
                        </div>
                        <div className="flex gap-1 items-center group tabletpl-4">
                            <Rune
                                Icon={<ShareIcon fill="group-hover:fill-sky-500" />}
                                color="group-hover:bg-sky-100"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}