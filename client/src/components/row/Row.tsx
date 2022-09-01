import { FormatDate } from "utils";
import './row.scss';

type RowProps = {
    timestamp: string;
    descriptions: string[];
}

const Row = ({timestamp, descriptions}: RowProps) => {
    const formattedTimestamp = FormatDate(new Date(timestamp));

    return (
        <div className="row">
            <div className="timestamp">{formattedTimestamp}</div>
            <div className="description-list">
                {
                    descriptions.map(description => {
                        return <div className="description">{description}</div>;
                    })
                }
            </div>
        </div>
    )
}

export type { RowProps };
export default Row;