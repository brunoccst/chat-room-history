import { formatToTimeOnly } from "utils";
import './row.scss';

type RowInfo = {
    timestamp: string;
    entries: string[];
    includeTimestampOnAll: boolean;
}

const Row = ({ timestamp, entries, includeTimestampOnAll }: RowInfo) => {
    if (includeTimestampOnAll) {
        return (
            <>
                {
                    entries.map((entry: string) => {
                        const rowInfo: RowInfo = {
                            timestamp: timestamp,
                            entries: [entry],
                            includeTimestampOnAll: false
                        }
                        return (
                            <Row {...rowInfo} />
                        );
                    })
                }
            </>
        );
    }
    
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