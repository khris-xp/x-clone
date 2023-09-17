import { formatDateDifference } from "@/hooks/format";
import { ITweet } from "@/interfaces/tweet";
import { IUser } from "@/interfaces/user";
import { authService } from "@/services/auth.service";
import { tweetService } from "@/services/tweet.service";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
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
    const [showModal, setShowModal] = useState<boolean>(false);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const [isRetweeted, setIsRetweeted] = useState<boolean>(false);
    const [user, setUser] = useState<IUser | null>(null);

    const fetchUserById = async (id: string): Promise<void> => {
        try {
            const response = await authService.getUserById(id);
            setUserData(response);
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }

    const fetchUser = async (): Promise<void> => {
        try {
            const response = await authService.getUserProfile();
            setUser(response);
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }

    const likeTweet = async (id: string): Promise<void> => {
        try {
            await tweetService.likeTweet(id);
            window.location.reload()
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }

    const reTweet = async (id: string): Promise<void> => {
        try {
            await tweetService.reTweet(id);
            window.location.reload()
        } catch (error) {
            const message = (error as Error).message;
            throw new Error(message);
        }
    }

    useEffect(() => {
        fetchUserById(post.createdBy);
        setIsLiked((prevIsLiked) => {
            const newIsLiked = post?.likes.some((like) => like === user?._id);
            return prevIsLiked !== newIsLiked ? newIsLiked : prevIsLiked;
        });
        setIsRetweeted((prevIsRetweeted) => {
            const newIsRetweeted = post?.retweets.some((retweet) => retweet === user?._id);
            return prevIsRetweeted !== newIsRetweeted ? newIsRetweeted : prevIsRetweeted;
        });
        fetchUser();
    }, [post.createdBy, post?.likes, post?.retweets, user?._id]);

    const styledDesc: string = post?.desc?.replace(/#(\w+)/g, '<span class="text-blue-500">#$1</span>');
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
                            <button onClick={() => setShowModal(true)}>
                                <DotsHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
                            </button>
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
                            <button onClick={() => reTweet(post._id)}>
                                <Rune
                                    Icon={<RetweetIcon fill={`group-hover:fill-green-500 ${isRetweeted ? 'fill-green-500' : ''}`} />}
                                    color="group-hover:bg-green-100"
                                />
                            </button>
                            <p className={`text-xs group-hover:text-green-500 ${isRetweeted ? 'text-green-500' : ''}`}>{retweets}</p>
                        </div>
                        <div className="flex gap-1 items-center group tabletpx-4">
                            <button onClick={() => likeTweet(post._id)}>
                                <Rune
                                    Icon={<LikeIcon fill={`group-hover:fill-rose-500 ${isLiked ? 'fill-rose-500' : ''}`} />}
                                    color='group-hover:bg-rose-100'
                                />
                            </button>
                            <p className={`text-xs group-hover:text-rose-500 ${isLiked ? 'text-rose-500' : ''}`}>{likes}</p>
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
            {showModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        Modal Title
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <div className="grid grid-cols-[auto,1fr] gap-3 max-w-7xl p-10">
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
                                                <button onClick={() => setShowModal(true)}>
                                                    <DotsHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
                                                </button>
                                            </div>
                                        </div>
                                        <p dangerouslySetInnerHTML={{ __html: styledDesc }} />
                                        {post.img && <Image src={post.img} className="rounded-2xl mt-3 w-full h-96" height={1000} width={1000} alt="image" />}
                                    </div>
                                </div>
                                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                    <button
                                        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </div>
    )
}