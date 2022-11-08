import { ReactComponent as SearchIcon } from "assets/images/search_icon.svg";
import { Controller, useForm } from "react-hook-form";
import { Period } from "types/schoolClass";
import Select from "react-select";

import "./styles.css";

export type SchoolClassFilterData = {
  name?: string;
  period: Period | null;
};

const periodOptions: Period[] = [
  { id: 1, name: "Matutino" },
  { id: 2, name: "Vespertino" },
  { id: 3, name: "Noturno" },
];

type Props = {
  onSubmitFilter: (data: SchoolClassFilterData) => void;
};

const SchoolClassFilter = ({ onSubmitFilter }: Props) => {
  const { register, handleSubmit, setValue, getValues, control } =
    useForm<SchoolClassFilterData>();

  const onSubmit = (formData: SchoolClassFilterData) => {
    onSubmitFilter(formData);
  };

  const handleFormClear = () => {
    setValue("name", "");
    setValue("period", null);
    setValue("period.name", "");
  };

  const handleChangePeriod = (value: Period) => {
    setValue("period", value);

    const obj: SchoolClassFilterData = {
      name: getValues("name"),
      period: getValues("period"),
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
            placeholder="Buscar turma"
            name="name"
          />
          <button className="filter-search-icon">
            <SearchIcon />
          </button>
        </div>
        <div className="filter-bottom-ctr">
          <div className="filter-period-ctr">
            <Controller
              name="period"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={periodOptions}
                  classNamePrefix="filter-select"
                  getOptionLabel={(pr: Period) => pr.name}
                  getOptionValue={(pr: Period) => String(pr.id)}
                  inputId="period"
                  placeholder="Período"
                  isClearable
                  onChange={(value) => handleChangePeriod(value!)}
                />
              )}
            />
          </div>
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

export default SchoolClassFilter;
