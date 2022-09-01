import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import ChatEventGroupContext from 'contexts';
import { AggregationLevel, LoadSpinner, Row, RowProps } from 'components';
import './chat-event-group-list.scss';
import { GetDescriptions, GroupBy } from 'utils';
import { ChatEventGroup, TimeInterval } from 'types';

export const ChatEventGroupList = observer(() => {
    const chatEventGroupContext = useContext(ChatEventGroupContext);

    const Content = observer(() => {
        if (chatEventGroupContext.isLoading)
            return <LoadSpinner />;

        if (chatEventGroupContext.timeInterval === TimeInterval.Hourly) {
            const groups = GroupBy(chatEventGroupContext.chatEventGroups, (chatEventGroup: ChatEventGroup) => chatEventGroup.timestamp);
            return (
                <>
                    {
                        Object.keys(groups).map(key => {
                            const groupList = groups[key];
                            let descriptions: string[] = [];
                            groupList.forEach(group => descriptions = descriptions.concat(GetDescriptions(group)));
                            const props: RowProps = { timestamp: key, descriptions: descriptions };
                            return <Row {...props} />;
                        })
                    }
                </>
            );
        }

        return (
            <>
                {
                    chatEventGroupContext.chatEventGroups.map(group => {
                        const descriptions = GetDescriptions(group);
                        const props: RowProps = { timestamp: group.timestamp, descriptions: descriptions };
                        return <Row {...props} />;
                    })
                }
            </>
        )
    });

    return (
        <div className="chat-event-group-list">
            <AggregationLevel />
            <Content />
        </div>
    );
});