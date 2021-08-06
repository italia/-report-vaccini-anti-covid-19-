import { React } from "react";
import moment from "moment";

export const Total = (props) => {
    return (
        <div className="h-100 w-100 mt-2 mb-3 max-width-total">
            <div className="timestamp mx-auto">
                <h6 className="text-center pb-4">
                    Report aggiornato al: {" "}
                    {props.summary.timestamp && moment(props.summary.timestamp).format("DD-MM-YYYY HH:mm")}
                </h6>
            </div>
            <div className="d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-center align-items-baseline">
                    <img src="meds.png" alt="Quante dose sono state somministrate finora?" className="pl-2 pr-5" />
                    {" "}
                    <h1 className="pl-2 mt-4 font-weight-light">{props.summary.tot?.toLocaleString('it')}</h1>
                </div>
                <span className="border-top mb-2"></span>
                <div className="d-flex justify-content-center">
                    {" "}
                    <h4 className="pl-2">Totale somministrazioni</h4>
                </div>
            </div>
        </div>
    );
};
