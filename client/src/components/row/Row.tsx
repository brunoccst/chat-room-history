import React from 'react';
import ChatLog from 'types/ChatLog';
import EventType from 'types/EventType';
import './row.scss';

const TimeStamp = ({ timestamp }: ChatLog) => {
    return (
        <div>{timestamp.toLocaleString()}</div>
    )
};

const Information = ({ eventType, userName, data }: ChatLog) => {
    let information: string = "";

    switch (eventType) {
        case EventType.EnterTheRoom:
            information = `${userName} enters the room`;
            break;
        case EventType.Comment:
            information = `${userName} comments: "${data}"`;
            break;
        case EventType.HighFiveAnotherUser:
            information = `${userName} high-fives ${data}`;
            break;
        case EventType.LeaveTheRoom:
            information = `${userName} leaves the room`;
            break;
    }

    return (
        <div>{information}</div>
    );
}

const Row = (chatLog: ChatLog) => {
    return (
        <div className='row'>
            <TimeStamp {...chatLog}></TimeStamp>
            <Information {...chatLog}></Information>
        </div>
    );
}

export default Row;