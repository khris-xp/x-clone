import Avatar from "@/components/Avatar"
import { EmojiIcon, GifIcon, LocationIcon, MediaIcon, PollIcon, ScheduleIcon } from "@/components/Icons"
import Post from "@/components/Post"
import Rune from "@/components/Rune"
import { posts } from "@/constants/post"
import { ViewBoardsIcon } from '@heroicons/react/solid'

export default function Home() {
  return (
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
  )
}