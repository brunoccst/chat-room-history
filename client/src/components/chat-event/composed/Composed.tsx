import { ChatEventGroup } from "types";
import GetDescriptions from "./DescriptionFactory";

const Composed = (chatEventGroup: ChatEventGroup) => {
    const descriptions = GetDescriptions(chatEventGroup);
    const descriptionsArray = typeof descriptions === "string"
        ? [descriptions]
        : descriptions;

    return (
        <>
            {
                descriptionsArray.map(description => {
                    return (
                        <div className="chat-event composed">
                            {description}
                        </div>
                    )
                })
            }
        </>
    );
}

export default Composed;