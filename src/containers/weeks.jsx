import React, { useEffect, useState } from "react";
import { isEmpty } from "lodash";
import { StackedBarChart } from "./../components/StackedBarChart";
import { RangeWeek } from "./../components/RangeWeek";

export const Weeks = ({ data }) => {
    const [suppliersColor, setSuppliersColor] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [suppliersWeek, setSuppliersWeek] = useState([]);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);

    useEffect(() => {
        if (!isEmpty(data)) {
            setSuppliersColor(data.suppliersColor);
            setSuppliers(data.suppliers);
            setSuppliersWeek(data.suppliersWeek);

            setTo(data.suppliersWeek.length);
            if (data.suppliersWeek.length >= 9) {
                setFrom(data.suppliersWeek.length - 9);
            }
        }
      }, [data]);

    return (
        <div>
            <div className="row justify-content-center p-5 bg-title-plot mt-5">
                <img src="Coccarda.svg" width="100" height="100" alt="Logo" className="img-fluid d-none d-lg-block" style={{ zIndex: 10, position: 'relative', top: -25 }} />
                <h3 className="text-center mt-2">Andamento settimanale delle somministrazioni</h3>
            </div>
            <div className="row position-powerbi m-2 p-2" style={{ backgroundColor: "#F8FBFE", marginTop: 20 }}>
                <div className="col-12 col-md-6 align-items-end testo-info-campania d-none d-sm-none d-md-flex d-lg-flex"></div>
                <div className="col-12 col-md-6  position-relative">
                    <img src="Coccarda.svg" width="100" height="100" alt="Logo" className="d-lg-none sd-sm-block" style={{ zIndex: 20, position: "absolute", right:-40, top:-25}}/>
                    <div className="bg-gradient-bar"></div>
                </div>
                <div className="col-12 col-md-4" style={{ backgroundColor: "#17324D" }}>
                    <div className="p-2 position-relative">
                        <div className="p-4">
                            <img src="group_person.svg" alt="Logo" className="img-fluid" />
                        </div>
                        <div style={{marginTop: 40, marginLeft: 40}}>
                            {suppliers.map((supply, index) => {
                                return (
                                    <div className="row" key={supply}>
                                        <div className="circle" style={{ backgroundColor: suppliersColor[supply] }}></div>
                                        <span className="legend">{supply}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8" style={{ backgroundColor: "#17324D" }}>
                <div style={{color:"#ffffff", textAlign:"center", marginTop: 20}}>*Passa con il mouse sulle barre del grafico per visualizzare i dati della settimana</div>
                    <StackedBarChart
                        title=""
                        xtitle="Somministrazione settimanale"
                        ytitle=""
                        width={780}
                        height={350}
                        marginBottom={10}
                        property={{ xprop: "label", yprop: "total" }}

                        colors={suppliersColor}
                        keys={suppliers}
                        data={suppliersWeek}
                        selectedFrom={from}
                        selectedTo={to}
                    />
                </div>
                {suppliersWeek.length > 0 && (
                    <RangeWeek min={0} max={suppliersWeek.length} from={from} to={to} changeFrom={(value) => setFrom(value)} changeTo={(value) => setTo(value)}  />
                )}
            </div>
                <div style={{color:"#17324D", textAlign:"center"}}>*Fai scorrere i selettori per aumentare o diminuire le settimane da visualizzare</div>
        </div>
    )
};