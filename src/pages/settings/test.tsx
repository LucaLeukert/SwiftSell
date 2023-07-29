import { CreateOrganization, OrganizationProfile } from "@clerk/nextjs";

const Test = () => {
    return (
        <div>
            <OrganizationProfile />
            <CreateOrganization />
        </div>
    );
};

export default Test;
