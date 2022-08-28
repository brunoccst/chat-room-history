import ChatEntry from 'types/ChatEntry';
import './row.scss';

const Row = (chatEntry: ChatEntry) => {
    const timestamp = chatEntry.timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric'
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