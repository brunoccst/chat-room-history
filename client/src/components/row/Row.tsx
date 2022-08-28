import ChatEntry from 'types/ChatEntry';
import './row.scss';

const Row = (chatEntry: ChatEntry) => {
    const timestampText = chatEntry.timestamp.toTimeString();
    const informations = chatEntry.informations.map((information: string) => information);

    return (
        <div className='row'>
            <div>{timestampText}</div>
            <div>
                {informations}
            </div>
        </div>
    );
}

export default Row;