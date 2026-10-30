import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchBox {
    keyWord?: string;
}

export default function SearchBox({ keyWord }: SearchBox) {
    return (
        <div className="position-relative w-100">
            <input className="position-relative form-control rounded-3 ps-5 pe-3" value={keyWord} placeholder="Tìm kiếm bạn bè" />
            <FontAwesomeIcon className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" icon={faMagnifyingGlass} />
        </div>
    );
}