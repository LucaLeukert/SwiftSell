import {
    CreateOrganization,
    OrganizationProfile,
    useClerk,
    UserProfile,
} from "@clerk/nextjs";

const Test = () => {
    return (
        <div>
            <OrganizationProfile />
            <CreateOrganization />
        </div>
    );
};

export default Test;
