import Avatar from "@/components/Avatar"
import { EmojiIcon, GifIcon, LocationIcon, MediaIcon, PollIcon, ScheduleIcon } from "@/components/Icons"
import Post from "@/components/Post"
import Rune from "@/components/Rune"
import Trend from "@/components/Trend"
import { posts } from "@/constants/post"
import trends from "@/constants/trend"
import { SearchIcon } from '@heroicons/react/outline'
import { ViewBoardsIcon } from '@heroicons/react/solid'

export default function Home() {
  return (
    <>
      <div className="max-w-[37.5rem] border-x-[1px]">
        <section className="sticky top-0 px-4 py-6 bg-white ">
          <h1 className="text-[1.25rem] font-bold">Home</h1>
        </section>
        <section className="px-4 py-4 grid grid-cols-[auto,1fr] gap-4 ">
          <Avatar
            src="https://avatars.githubusercontent.com/u/84142253?v=4"
            alt="Profile"
          />
          <div className="space-y-10 w-full">
            <div className="flex-1">
              <input
                type="text"
                placeholder="What's happening?"
                className="w-full text-[1.25rem] focus:outline-none"
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="hover:bg-sky-100 p-2 rounded-full transition-colors duration-500 ease-out cursor-pointer mobile:hidden">
                <ViewBoardsIcon className="w-5 h-5 text-sky-500" />
              </div>
              <>
                <div className="mobile:flex items-center hidden ">
                  <Rune
                    Icon={<MediaIcon fill="fill-sky-500" />}
                    color="hover:bg-sky-100"
                  />
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
                <button className="bg-sky-500 hover:bg-sky-400 hover-transition px-5 py-2 text-white font-bold rounded-full w-full mobile:w-auto">
                  Tweet
                </button>
              </>
            </div>
          </div>
        </section>
        <section>
          {posts.map((post) => (
            <Post key={post.id} post={post} replies={post.replies} retweets={post.retweets} likes={post.likes} />
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
        <section className="bg-gray-100 py-4 rounded-2xl sticky -top-80">
          <h1 className="text-[1.25rem] font-black px-4 pb-4">Trends For You</h1>
          <div>
            {trends.map((trend) => (
              <Trend key={trend.id} trend={trend} />
            ))}
          </div>
        </section>
      </div>
    </>
  )
}