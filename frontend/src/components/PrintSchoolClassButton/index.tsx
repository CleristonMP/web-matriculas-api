import { Button } from "semantic-ui-react";
import ReactToPrint from "react-to-print";
import { SchoolClass } from "types/schoolClass";
import { ReactComponent as Printer } from "assets/images/printer.svg";
import { pageStyles } from "./pageStyles";

type PrintButtonProps = {
  componentToPrint: React.MutableRefObject<null>;
  schoolClass?: SchoolClass;
};

const PrintSchoolClassButton = ({ componentToPrint, schoolClass }: PrintButtonProps) => {
  return (
    <ReactToPrint
      trigger={() => <Button color="blue"><Printer /></Button>}
      content={() => componentToPrint.current}
      documentTitle={schoolClass?.name + " " + schoolClass?.period}
      pageStyle={pageStyles}
    />
  );
};

export default PrintSchoolClassButton;
