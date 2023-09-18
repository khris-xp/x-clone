import { IUser } from "@/interfaces/user"
import Image from "next/image"

type Props = {
    follow: IUser
}

export default function Follow({ follow }: Props) {
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
                <a href="/" className="float-right">
                    <button className="bg-black hover:bg-gray-500 duration-200 text-white font-semibold hover:text-white py-1 px-6 mt-3 border border-white hover:border-transparent rounded-full">
                        Follow
                    </button>
                </a>
            </div>
        </div>
    )
}