import DataSource from "devextreme/data/data_source";
import LocalStore, { Options } from "devextreme/data/local_store";

const getInitialDataSource = ({ data = [], ...otherOptions }: Options = {}) => {
  return new DataSource({
    store: new LocalStore({
      name: "data-store",
      key: "id",
      data,
      ...otherOptions,
    }),
  });
};

export let dataSource = getInitialDataSource();

export const resetDataSource = (options: Options = {}) => {
  return (dataSource = getInitialDataSource(options));
};
