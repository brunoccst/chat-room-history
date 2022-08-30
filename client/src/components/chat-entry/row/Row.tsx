import { formatToTimeOnly } from "utils";
import './row.scss';

type RowInfo = {
    timestamp: string;
    entries: string[]
}

const Row = ({ timestamp, entries }: RowInfo) => {
    return (
        <div className='row'>
            <div>{formatToTimeOnly(new Date(timestamp))}</div>
            <div className="entries">
                {
                    entries.map((entry: string) => <div>{entry}</div>)
                }
            </div>
        </div>
    )
}

export type { RowInfo };

export default Row;