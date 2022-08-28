import ChatEntry from 'types/ChatEntry';
import './row.scss';

const Row = (chatEntry: ChatEntry) => {
    const timestamp = chatEntry.timestamp.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
    });
    const informations = chatEntry.informations.map(information => (
        <div key={information.replaceAll(' ', '')}>{information}</div>
    ));

    return (
        <div className='row'>
            <div>{timestamp}</div>
            <div className="informations">{informations}</div>
        </div>
    );
}

export default Row;