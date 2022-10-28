import { ReactComponent as SearchIcon } from "assets/images/search_icon.svg";
import { useForm } from "react-hook-form";

export type UserFilterData = {
  name?: string;
};

type Props = {
  onSubmitFilter: (data: UserFilterData) => void;
};

const UserFilter = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, setValue, getValues } =
    useForm<UserFilterData>();

  const onSubmit = (formData: UserFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue("name", "");
  };

  const handleChangeName = (value: string) => {
    setValue("name", value);

    const obj: UserFilterData = {
      name: getValues("name"),
    };

    onSubmitFilter(obj);
  };

  return (
    <div className="base-card filter-ctr">
      <form onSubmit={handleSubmit(onSubmit)} className="filter-form">
        <div className="filter-name-ctr">
          <input
            {...register("name")}
            type="text"
            className={"form-control"}
            placeholder="Nome do usuário"
            name="name"
            onChange={(value) => handleChangeName(value.target.value)}
          />
          <button className="filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="filter-bottom-ctr">
          <button
            onClick={handleFormClear}
            className="btn btn-outline-secondary btn-filter-clear"
          >
            LIMPAR<span className="btn-filter-word"> FILTRO</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserFilter;
