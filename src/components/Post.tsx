import { IPost } from "@/interfaces/post";
import { DotsHorizontalIcon } from '@heroicons/react/outline';
import Avatar from "./Avatar";
import { LikeIcon, ReplyIcon, RetweetIcon, ShareIcon } from "./Icons";
import Rune from "./Rune";

interface Props {
    post: IPost
    replies: number,
    retweets: number,
    likes: number
}

export default function Post({ post, replies, retweets, likes }: Props) {
    return (
        <div className="border-t-[1px] px-4 pt-3 pb-2 hover:bg-neutral-100 transition-colors duration-500 ease-out">
            <div className="grid grid-cols-[auto,1fr] gap-3">
                <Avatar src={post.image} alt={post.username} />
                <div>
                    <div className="flex gap-1 items-center">
                        <h1 className="font-bold">{post.name}</h1>
                        <h2 className="text-neutral-500 hidden mobile:block">@{post.username}</h2>
                        <span className="text-neutral-500">•</span>
                        <h2 className="text-neutral-500">{post.time}</h2>
                        <div className="p-2 hover:bg-sky-100 ml-auto rounded-full group cursor-pointer transition-colors duration-500 ease-out">
                            <DotsHorizontalIcon className="w-4 h-4 text-neutral-400 group-hover:text-sky-500" />
                        </div>
                    </div>
                    <p>{post.caption}</p>
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