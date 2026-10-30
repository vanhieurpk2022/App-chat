interface CardProps {
    imgUrl: string;
    name: string;
    time: string;
    message: string;
    isActive?: boolean;
}

export default function Card({ imgUrl, name, time, message, isActive = false }: CardProps) {
    return (
        <div className={`${isActive && 'active'} card-panel d-flex flex-row gap-3 p-3 rounded-3`}>
            <img src={imgUrl} width={44} height={44} />
            <div className="d-flex flex-column">
                <div className="d-flex">
                    <span className="flex-grow-1 fw-semibold" >{name}</span>
                    <span className="small">{time}</span>
                </div>
                <span className="small text-secondary ">{message}</span>
            </div>
        </div>
    );
}