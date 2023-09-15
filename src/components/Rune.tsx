type Props = {
    Icon: React.ReactNode
    color: string
}

export default function Rune({ Icon, color }: Props) {
    return (
        <div className={`${color} w-9 h-9 p-2 rounded-full hover-transition cursor-pointer`}>
            {Icon}
        </div>
    )
}
