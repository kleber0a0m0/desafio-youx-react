import "./styles.css";
import { MdAttachMoney } from "react-icons/md";
import { BsGraphUp } from "react-icons/bs";
import { Chart } from "react-google-charts";
import axios from "axios";
import { URL_API_BACKEND } from "../../utils/request";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Footer from "../../components/Footer";

const Reports = (props: any) => {
  const [januaryTotalSold, setJanuaryTotalSold] = useState(0);
  const [februaryTotalSold, setFebruaryTotalSold] = useState(0);
  const [marchTotalSold, setMarchTotalSold] = useState(0);
  const [aprilTotalSold, setAprilTotalSold] = useState(0);
  const [mayTotalSold, setMayTotalSold] = useState(0);
  const [juneTotalSold, setJuneTotalSold] = useState(0);
  const [julyTotalSold, setJulyTotalSold] = useState(0);
  const [augustTotalSold, setAugustTotalSold] = useState(0);
  const [septemberTotalSold, setSeptemberTotalSold] = useState(0);
  const [octoberTotalSold, setOctoberTotalSold] = useState(0);
  const [novemberTotalSold, setNovemberTotalSold] = useState(0);
  const [decemberTotalSold, setDecemberTotalSold] = useState(0);

  const [januaryQuantitySold, setJanuaryQuantitySold] = useState(0);
  const [februaryQuantitySold, setFebruaryQuantitySold] = useState(0);
  const [marchQuantitySold, setMarchQuantitySold] = useState(0);
  const [aprilQuantitySold, setAprilQuantitySold] = useState(0);
  const [mayQuantitySold, setMayQuantitySold] = useState(0);
  const [juneQuantitySold, setJuneQuantitySold] = useState(0);
  const [julyQuantitySold, setJulyQuantitySold] = useState(0);
  const [augustQuantitySold, setAugustQuantitySold] = useState(0);
  const [septemberQuantitySold, setSeptemberQuantitySold] = useState(0);
  const [octoberQuantitySold, setOctoberQuantitySold] = useState(0);
  const [novemberQuantitySold, setNovemberQuantitySold] = useState(0);
  const [decemberQuantitySold, setDecemberQuantitySold] = useState(0);

  const [currentYearSold, setCurrentYearSold] = useState(0);

  useEffect(() => {
    http: axios.get(`https://api.npoint.io/1b7f1ff9db778131dec4`).then((response) => {
      setJanuaryTotalSold(response.data.januaryTotalSold);
      setFebruaryTotalSold(response.data.februaryTotalSold);
      setMarchTotalSold(response.data.marchTotalSold);
      setAprilTotalSold(response.data.aprilTotalSold);
      setMayTotalSold(response.data.mayTotalSold);
      setJuneTotalSold(response.data.juneTotalSold);
      setJulyTotalSold(response.data.julyTotalSold);
      setAugustTotalSold(response.data.augustTotalSold);
      setSeptemberTotalSold(response.data.septemberTotalSold);
      setOctoberTotalSold(response.data.octoberTotalSold);
      setNovemberTotalSold(response.data.novemberTotalSold);
      setDecemberTotalSold(response.data.decemberTotalSold);

      setJanuaryQuantitySold(response.data.januaryQuantitySold);
      setFebruaryQuantitySold(response.data.februaryQuantitySold);
      setMarchQuantitySold(response.data.marchQuantitySold);
      setAprilQuantitySold(response.data.aprilQuantitySold);
      setMayQuantitySold(response.data.mayQuantitySold);
      setJuneQuantitySold(response.data.juneQuantitySold);
      setJulyQuantitySold(response.data.julyQuantitySold);
      setAugustQuantitySold(response.data.augustQuantitySold);
      setSeptemberQuantitySold(response.data.septemberQuantitySold);
      setOctoberQuantitySold(response.data.octoberQuantitySold);
      setNovemberQuantitySold(response.data.novemberQuantitySold);
      setDecemberQuantitySold(response.data.decemberQuantitySold);

      setCurrentYearSold(response.data.currentYearSold);
    });
  }, []);

  const data = [
    ["", ""],
    ["jan.", januaryTotalSold],
    ["fev.", februaryTotalSold],
    ["mar.", marchTotalSold],
    ["abr.", aprilTotalSold],
    ["mai.", mayTotalSold],
    ["jun.", juneTotalSold],
    ["jul.", julyTotalSold],
    ["ago.", augustTotalSold],
    ["set.", septemberTotalSold],
    ["out.", octoberTotalSold],
    ["nov.", novemberTotalSold],
    ["dez.", decemberTotalSold],
  ];

  const csvData = [
    ["Mês", "Vendas", "Total"],
    ["Janeiro", januaryQuantitySold, januaryTotalSold],
    ["Fevereiro", februaryQuantitySold, februaryTotalSold],
    ["Março", marchQuantitySold, marchTotalSold],
    ["Abril", aprilQuantitySold, aprilTotalSold],
    ["Maio", mayQuantitySold, mayTotalSold],
    ["Junho", juneQuantitySold, juneTotalSold],
    ["Julho", julyQuantitySold, julyTotalSold],
    ["Agosto", augustQuantitySold, augustTotalSold],
    ["Setembro", septemberQuantitySold, septemberTotalSold],
    ["Outubro", octoberQuantitySold, octoberTotalSold],
    ["Novembro", novemberQuantitySold, novemberTotalSold],
    ["Dezembro", decemberQuantitySold, decemberTotalSold],
  ];

  return (
    <>
      <div className="container mt-3 mb-5">
        <h3 className="titulo mt-5">Relatórios</h3>
        <div className="row mt-5">
          <div className="col-12 col-lg-3 mt-3 col-md-6">
            <div className="shadow rentangle">
              <h5 className="text-center h6 mt-3 mb-4a">VENDAS NO ANO</h5>
              <div className="text-center h3 mt-3">
                <MdAttachMoney className="icon me-1" />
                R${" "}
                {currentYearSold.toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>
          </div>
          <div className=" col-12 col-lg-3  mt-3 col-md-6">
            <div className="rentangle shadow">
              <h6 className="text-center h6 mt-3 mb-4a">
                CLIENTE COM MAIS VENDAS NO MÊS
              </h6>
              <div className="text-center h3 mt-3">
                <BsGraphUp className="icon me-2" />
                XXXXX
                <p className="ms-3 blockquote text-secondary mt-2">
                  *não funcional
                </p>
              </div>
            </div>
          </div>
          <div className=" col-12 col-lg-3 col-md-6 mt-3">
            <div className="rentangle shadow">
              <h6 className="text-center h6 mt-3">
                CLIENTE COM MAIOR FATURAMENTO(MÊS)
              </h6>
              <div className="text-center h3 mt-3">
                <MdAttachMoney className="icon me-1" />
                XXXXX (R$XXX.XX)
                <p className="ms-3 blockquote text-secondary mt-2">
                  *não funcional
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-3 mt-3 col-md-6">
            <div className="rentangle shadow">
              <h6 className="text-center h6 mt-3">
                CLIENTE COM O MAIOR FATURAMENTO (ANO)
              </h6>
              <div className="text-center h3 mt-3">
                <MdAttachMoney className="icon me-1" />
                XXXXX (R$XXX.XX)
                <p className="ms-3 blockquote text-secondary mt-2">
                  *não funcional
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="shadow mt-5 faturamento">
          <div className="container barraSuperior bg-white">
            <div className=" ">
              <h3 className="mt-3 mx-3 titulo2">Faturamento por mês</h3>
              <div className="">
                <div className="row">
                  <div className="col-12 col-lg-6 esquerda">
                    <Chart
                      className="mt-5"
                      chartType="Bar"
                      width="100%"
                      height="400px"
                      data={data}
                    />
                  </div>
                  <div
                    className="col-12 col-lg-4 col-sm-12
                   "
                  >
                    <table className="table table-striped shadow">
                      <thead>
                        <tr>
                          <th scope="col">Mês</th>
                          <th scope="col">Vendas</th>
                          <th scope="col">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Janeiro</td>
                          <td>{januaryQuantitySold}</td>
                          <td>{januaryTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Fevereiro</td>
                          <td>{februaryQuantitySold}</td>
                          <td>{februaryTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Março</td>
                          <td>{marchQuantitySold}</td>
                          <td>{marchTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Abril</td>
                          <td>{aprilQuantitySold}</td>
                          <td>{aprilTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Maio</td>
                          <td>{mayQuantitySold}</td>
                          <td>{mayTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Junho</td>
                          <td>{juneQuantitySold}</td>
                          <td>{juneTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Julho</td>
                          <td>{julyQuantitySold}</td>

                          <td>{julyTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Agosto</td>
                          <td>{augustQuantitySold}</td>
                          <td>{augustTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Setembro</td>
                          <td>{septemberQuantitySold}</td>
                          <td>{septemberTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Outubro</td>
                          <td>{octoberQuantitySold}</td>
                          <td>{octoberTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Novembro</td>
                          <td>{novemberQuantitySold}</td>
                          <td>{novemberTotalSold}</td>
                        </tr>
                        <tr>
                          <td>Dezembro</td>
                          <td>{decemberQuantitySold}</td>
                          <td>{decemberTotalSold}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="col-12 col-lg-2 col-sm-12">
                    <CSVLink
                      className="btn btn-primary"
                      data={csvData}
                      separator={";"}
                      enclosingCharacter={``}
                      filename={"Relatório.csv"}
                    >
                      Exportar CSV
                    </CSVLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Reports;
