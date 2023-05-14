import { useClerk, UserProfile } from "@clerk/nextjs";
import { client } from "~/utils/api";

const Test = () => {
    const clerk = useClerk();

    void clerk.user?.getSessions().then((sessions) => console.log(sessions));

    return (
        <div>
            <button className="btn w-20">Send Query</button>
            <UserProfile />
        </div>
    );
};

export default Test;
