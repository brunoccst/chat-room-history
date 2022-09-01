import { Row, RowProps } from 'components';
import { ChatEventGroup } from 'types';
import { GetDescriptions, GroupBy } from 'utils';

const Composed = (chatEventGroups: ChatEventGroup[]) => {
    const groups = GroupBy(chatEventGroups, (chatEventGroup: ChatEventGroup) => chatEventGroup.timestamp);

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
};

export default Composed;