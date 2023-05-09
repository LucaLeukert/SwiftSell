import {
    AiFillSave,
    AiOutlineSearch,
    BsFillPencilFill,
    HiOutlinePhotograph,
    MdSubject,
    MdViewQuilt
} from "react-icons/all";

export const NarrowSidebar = (props: {
    activeTab: number;
    onChangeActiveTab: (newTab: number) => void;
    onSaveShop: () => void;
}) => {
    return (
      <div className="flex h-full w-20 flex-col justify-between bg-[rgb(25,29,36)]">
          <div>
              <button
                type="button"
                className={`btn w-full rounded-none ${
                  props.activeTab === 0 ? "btn-accent" : ""
                }`}
                onClick={() => props.onChangeActiveTab(0)}
              >
                  <BsFillPencilFill />
              </button>
              <button
                type="button"
                className={`btn w-full rounded-none ${
                  props.activeTab === 1 ? "btn-accent" : ""
                }`}
                onClick={() => props.onChangeActiveTab(1)}
              >
                  <AiOutlineSearch />
              </button>
              <button
                type="button"
                className={`btn w-full rounded-none ${
                  props.activeTab === 2 ? "btn-accent" : ""
                }`}
                onClick={() => props.onChangeActiveTab(2)}
              >
                  <MdViewQuilt />
              </button>
              <button
                type="button"
                className={`btn w-full rounded-none ${
                  props.activeTab === 3 ? "btn-accent" : ""
                }`}
                onClick={() => props.onChangeActiveTab(3)}
              >
                  <MdSubject />
              </button>
              <button
                type="button"
                className={`btn w-full rounded-none ${
                  props.activeTab === 4 ? "btn-accent" : ""
                }`}
                onClick={() => props.onChangeActiveTab(4)}
              >
                  <HiOutlinePhotograph />
              </button>
          </div>
          <div>
              <button
                type="button"
                className={"btn-accent btn w-full rounded-none"}
                onClick={() => props.onSaveShop()}
              >
                  <AiFillSave />
              </button>
          </div>
      </div>
    );
};
