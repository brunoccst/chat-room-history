import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEventGroupContext from 'contexts';
import { AggregationLevel, LoadSpinner } from 'components';
import { ChatEventGroup, TimeInterval } from 'types';
import Single from './single';
import Composed from './composed';
import './chat-event-group-list.scss';

type RendererDict = { [timeInterval: string]: (chatEventGroups: ChatEventGroup[]) => JSX.Element }

const Renderers: RendererDict = {
    [TimeInterval.MinuteByMinute]: Single,
    [TimeInterval.Hourly]: Composed
}

export const ChatEventGroupList = observer(() => {
    const chatEventGroupContext = useContext(ChatEventGroupContext);

    const Content = observer(() => {
        if (chatEventGroupContext.isLoading)
            return <LoadSpinner />;

        const Rows = () => Renderers[chatEventGroupContext.timeInterval](chatEventGroupContext.chatEventGroups);
        return <Rows />
    });

    return (
        <div className="chat-event-group-list">
            <AggregationLevel />
            <Content />
        </div>
    );
});