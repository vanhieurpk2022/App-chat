import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface CardProps {
    imgUrl: string;
    name: string;
    time: string;
    message: string;
    isActive?: boolean;
    status?: boolean;
    countMess?: number;
}

export default function Card({ imgUrl, name, time, message, isActive = false, status = false, countMess = 0 }: CardProps) {
    return (
        <div className={`${isActive && 'active'}  card-panel d-flex flex-row gap-3 p-3 rounded-3`}>
            <div className="position-relative d-inline-block">
                <div className="rounded-circle overflow-hidden" style={{ width: 66, height: 66 }}>
                    <img src={imgUrl} width="100%" height="100%" style={{ objectFit: 'cover' }} />
                </div>
                {status && <FontAwesomeIcon className="position-absolute bottom-0 end-0 text-success" stroke="white" strokeWidth={"40"} icon={faCircle} />}
            </div>

            <div className="d-flex flex-column ">
                <div className="d-flex">
                    <span className="flex-grow-1 fw-semibold" >{name}</span>
                    <span className="small">{time}</span>
                </div>

                <div className="d-flex gap-2 py-2">
                    <span className="flex-grow-1 small text-secondary ">{message}</span>
                    {countMess > 0 ? <span className="small bottom-0 end-0 px-2 bg-primary text-white rounded-circle">3</span> : ""}

                </div>


            </div>
        </div>
    );
}