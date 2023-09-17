"use client"

import Avatar from "@/components/Avatar"
import Follow from "@/components/Follow"
import { EmojiIcon, GifIcon, LocationIcon, MediaIcon, PollIcon, ScheduleIcon } from "@/components/Icons"
import LeftSideBar from "@/components/LeftSideBar"
import Post from "@/components/Post"
import Rune from "@/components/Rune"
import Trend from "@/components/Trend"
import { follow } from "@/constants/follow"
import trends from "@/constants/trend"
import { ITweet, ITweetRequest } from "@/interfaces/tweet"
import { IUser } from "@/interfaces/user"
import { baseUrl } from "@/secret/path"
import { authService } from "@/services/auth.service"
import { tweetService } from "@/services/tweet.service"
import { SearchIcon } from '@heroicons/react/outline'
import { ViewBoardsIcon } from '@heroicons/react/solid'
import axios from "axios"
import Cookies from "js-cookie"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  let [userData, setUserData] = useState<IUser | null>(null);
  const [createTweet, setCreateTweet] = useState<boolean>(false);
  let [tweetData, setTweetData] = useState<ITweet[]>([]);
  let [tweet, setTweet] = useState<ITweetRequest>({
    desc: '',
    img: ''
  });

  const fecthUserProfile = async () => {
    try {
      const response = await authService.getUserProfile();
      setUserData(response);
    } catch (error) {
      window.location.href = '/login'
    }
  }

  const fecthTweet = async (): Promise<void> => {
    try {
      const response = await tweetService.getTweets();
      setTweetData(response.tweets);
    } catch (error) {
      window.location.href = '/login'
    }
  }

  const handleCreateTweet = async (tweet: ITweetRequest): Promise<void> => {
    try {
      const response = await tweetService.createTweets(tweet);
      setTweetData([...tweetData, response]);
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const files = e.target.files;

      if (!files) return alert("File not exist.")

      const file = files[0];

      if (!file) return alert("File not exist.")

      if (file.size > 1024 * 1024)
        return alert("Size too large!")

      if (file.type !== 'image/jpeg' && file.type !== 'image/png')
        return alert("File format is incorrect.")

      let formData = new FormData();
      formData.append('file', file);

      const token = Cookies.get("token");

      const response = await axios.post(`${baseUrl}api/upload`, formData, {
        headers: { 'content-type': 'multipart/form-data', Authorization: token }
      })
      setTweet(prevTweet => ({
        ...prevTweet,
        img: response.data.url
      }));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fecthUserProfile();
    fecthTweet();
    if (tweet.desc.length > 0) {
      setCreateTweet(true);
    } else {
      setCreateTweet(false);
    }
  }, [tweet.desc])
  return (
    <>
      <div className="grid-cols-[auto,1fr] desktop:max-w-7xl laptop:max-w-5xl max-w-2xl mx-auto">
        <LeftSideBar />
        <main>
          <div className="grid grid-cols-[auto,1fr] desktop:ml-72 tablet:ml-20 min-h-screen">
            <div className="max-w-[37.5rem] border-x-[1px]">
              <section className="sticky top-0 px-4 py-6 bg-white ">
                <h1 className="text-[1.25rem] font-bold">Home</h1>
              </section>
              <section className="px-4 py-4 grid grid-cols-[auto,1fr] gap-4 ">
                <Link href="/profile">
                  {userData?.profilePicture ? <Avatar src={userData?.profilePicture} alt={userData?.username} />
                    : <Avatar src="https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png" alt="Avatar" />
                  }
                </Link>
                <div className="space-y-10 w-full">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="What's happening?"
                      className="w-full text-[1.25rem] focus:outline-none"
                      onChange={(e) => setTweet({ ...tweet, desc: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <div className="hover:bg-sky-100 p-2 rounded-full transition-colors duration-500 ease-out cursor-pointer mobile:hidden">
                      <ViewBoardsIcon className="w-5 h-5 text-sky-500" />
                    </div>
                    <>
                      <div className="mobile:flex items-center hidden ">
                        <label htmlFor="file-input">
                          <Rune Icon={<MediaIcon fill="fill-sky-500" />} color="hover:bg-sky-100" />
                          <input
                            type="file"
                            id="file-input"
                            className="hidden"
                            onChange={handleUpload}
                          />
                        </label>
                        <Rune Icon={<GifIcon fill="fill-sky-500" />} color="hover:bg-sky-100" />
                        <Rune
                          Icon={<PollIcon fill="fill-sky-500" />}
                          color="hover:bg-sky-100"
                        />
                        <Rune
                          Icon={<EmojiIcon fill="fill-sky-500" />}
                          color="hover:bg-sky-100"
                        />
                        <Rune
                          Icon={<ScheduleIcon fill="fill-sky-500" />}
                          color="hover:bg-sky-100"
                        />
                        <Rune
                          Icon={<LocationIcon fill="fill-sky-500" />}
                          color="hover:bg-sky-100"
                        />
                      </div>
                      <button onClick={() => handleCreateTweet(tweet)} disabled={!createTweet} className={`${createTweet ? 'bg-sky-500 hover:bg-sky-400' : 'bg-sky-300 hover:bg-sky-200'} hover-transition px-5 py-2 text-white font-bold rounded-full w-full mobile:w-auto`}>
                        Tweet
                      </button>
                    </>
                  </div>
                </div>
              </section>
              <section>
                {tweetData.map((post) => (
                  <Post key={post._id} post={post} replies={0} retweets={post?.retweets?.length} likes={post?.likes?.length} />
                ))}
              </section>
            </div>
            <div className="laptop:block hidden px-8 space-y-2">
              <section className="sticky top-0 py-3 bg-white z-20">
                <div className="flex items-center gap-4 px-4 py-2 bg-gray-100 rounded-full">
                  <SearchIcon className="w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search Twitter"
                    className="text-base placeholder:text-base focus:outline-none bg-transparent"
                  />
                </div>
              </section>
              <section className="bg-gray-50 py-4 rounded-2xl -top-80">
                <h1 className="text-[1.25rem] font-black px-4 pb-4">Trends For You</h1>
                <div>
                  {trends.map((trend) => (
                    <Trend key={trend.id} trend={trend} />
                  ))}
                </div>
              </section>
              <section className="bg-gray-50 py-4 rounded-2xl sticky -top-80">
                <h1 className="text-[1.25rem] font-black px-4 pb-4">Who to follow</h1>
                <div>
                  {follow.map((follow) => (
                    <Follow key={follow.id} follow={follow} />
                  ))}
                </div>
              </section >
              <div className="flow-root m-6">
                <div className="flex-1">
                  <a href="#">
                    <p className="text-sm leading-6 font-medium text-gray-500">Terms Privacy Policy Cookies Imprint Ads info</p>
                  </a>
                </div>
                <div className="flex-2">
                  <p className="text-sm leading-6 font-medium text-gray-600">© 2023 X Corp.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  )
}