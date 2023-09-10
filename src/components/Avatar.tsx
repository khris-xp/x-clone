import Image from "next/image"

export default function Avatar({ src, alt }: { src: string, alt: string }) {
    return (
        <div className="w-12 h-12 overflow-hidden rounded-full">
            <Image src={src} alt={alt} className="w-full" width={1000} height={1000} />
        </div>
    )
}