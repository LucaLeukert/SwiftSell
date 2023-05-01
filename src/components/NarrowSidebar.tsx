export const NarrowSidebar = (props: {
    activeTab: number;
    onChangeActiveTab: (newTab: number) => void;
}) => {
    return (
        <div className="flex h-full w-32 flex-col justify-between bg-slate-600">
            <div>
                <button
                    type="button"
                    className={`btn m-0 w-full  ${
                        props.activeTab === 0 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(0)}
                >
                    <span className="">edit</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 1 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(1)}
                >
                    <span className="">search</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 2 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(2)}
                >
                    <span className="">view_quilt</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 3 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(3)}
                >
                    <span className="">subject</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 4 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(4)}
                >
                    <span className="">insert_photo</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 5 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(5)}
                >
                    <span className="">featured_video</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 6 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(6)}
                >
                    <span className="">perm_contact_calendar</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 7 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(7)}
                >
                    <span className="">table_chart</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 8 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(8)}
                >
                    <span className="">view_agenda</span>
                </button>
            </div>
            <div>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 9 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(9)}
                >
                    <span className="">save</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 10 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(10)}
                >
                    <span className="">settings</span>
                </button>
                <button
                    type="button"
                    className={`btn m-0 ${
                        props.activeTab === 11 ? "btn-primary" : ""
                    }`}
                    onClick={() => props.onChangeActiveTab(11)}
                >
                    <span className="">help_outline</span>
                </button>
            </div>
        </div>
    );
};
