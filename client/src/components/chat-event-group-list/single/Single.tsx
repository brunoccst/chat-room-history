import { Row, RowProps } from 'components';
import { GetDescriptions } from 'utils';
import { ChatEventGroup } from 'types';

const Single = (chatEventGroups: ChatEventGroup[]) => {
    return (
        <>
            {
                chatEventGroups.map(group => {
                    const descriptions = GetDescriptions(group);
                    const props: RowProps = { timestamp: group.timestamp, descriptions: descriptions };
                    return <Row {...props} />;
                })
            }
        </>
    )
};

export default Single;