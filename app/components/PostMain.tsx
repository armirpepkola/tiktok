"use client"

import { AiFillHeart } from "react-icons/ai"
import { ImMusic } from "react-icons/im"
import Link from "next/link"
import { useEffect } from "react"
import PostMainLikes from "./PostMainLikes"
import useCreateBucketUrl from "../hooks/useCreateBucketUrl"
import { PostMainCompTypes } from "../types"

export default function PostMain({ post }: PostMainCompTypes) {

    useEffect(() => {
    const video = document.getElementById(`video-${post?.id}`) as HTMLVideoElement;
    const postMainElement = document.getElementById(`PostMain-${post.id}`);

    if (!video) {
        console.warn(`Video element not found for ID: video-${post?.id}`);
        return;
    }

    if (!postMainElement) {
        console.warn(`Post container not found for ID: PostMain-${post?.id}`);
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            const entry = entries[0];

            // Play or pause the video based on intersection
            if (entry.isIntersecting) {
                video.play().catch((err) => console.error("Video play error:", err));
            } else {
                video.pause();
            }
        },
        { threshold: [0.6] } // Trigger when 60% of the element is visible
    );

    observer.observe(postMainElement);

    // Cleanup observer on component unmount
    return () => {
        observer.disconnect();  
    };
}, [post?.id]);

    const profileImageUrl = useCreateBucketUrl(post?.profile?.image);
    const videoUrl = useCreateBucketUrl(post?.video_url);

    return (
        <>
            <div id={`PostMain-${post.id}`} className="flex border-b py-6">

                <div className="cursor-pointer">
                    {profileImageUrl ? (
                        <img className="rounded-full max-h-[60px]" width="60" src={profileImageUrl} />
                    ) : (
                        <div className="rounded-full max-h-[60px]" style={{ width: 60, height: 60, backgroundColor: '#ccc' }} />
                    )}
                </div>

                <div className="pl-3 w-full px-4">
                    <div className="flex items-center justify-between pb-0.5">
                        <Link href={`/profile/${post.profile.user_id}`}>
                            <span className="font-bold hover:underline cursor-pointer">
                                {post.profile.name}
                            </span>
                        </Link>

                        <button className="border text-[15px] px-[21px] py-0.5 border-[#F02C56] text-[#F02C56] hover:bg-[#ffeef2] font-semibold rounded-md">
                            Follow
                        </button>
                    </div>
                    <p className="text-[15px] pb-0.5 break-words md:max-w-[400px] max-w-[300px]">{post.text}</p>
                    <p className="text-[14px] text-gray-500 pb-0.5">#fyp #tiktok</p>
                    <p className="text-[14px] pb-0.5 flex items-center font-semibold">
                        <ImMusic size="12"/>
                        <span className="ms-1 px-1">Original audio</span>
                    </p>

                    <div className="mt-2.5 flex">
                        <div
                            className="relative min-h-[480px] max-h-[580px] max-w-[260px] flex items-center bg-black rounded-xl cursor-pointer"
                        >
                            {videoUrl ? (
                                <video 
                                    id={`video-${post.id}`}
                                    loop
                                    controls
                                    muted
                                    className="rounded-xl object-cover mx-auto h-full" 
                                    src="/videos/tiktok_video.mp4"
                                />
                            ) : (
                                <div className="rounded-xl object-cover mx-auto h-full" style={{ backgroundColor: '#000', width: '100%', height: '100%' }} />
                            )}
                            <img 
                                className="absolute right-2 bottom-10" 
                                width="90" 
                                src="/images/tiktok-logo-white.png"
                            />
                        </div>
                        
                        <PostMainLikes post={post} />
                    </div>
                </div>
            </div>
        </>
    )
}