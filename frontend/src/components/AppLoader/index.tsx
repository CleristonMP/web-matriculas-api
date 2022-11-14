import { Loader, Dimmer } from "semantic-ui-react";

type Props = {
  isProcessing?: boolean;
}

const AppLoader = ( {isProcessing} : Props ) => {
  return (
    <Dimmer active>
      <Loader inline="centered" size="big">{isProcessing ? "Processando ..." : "" }</Loader>
    </Dimmer>
  );
};

export default AppLoader;
