import "./styles.css";
import { AiOutlinePlus } from "react-icons/ai";
import { Client } from "../../models/client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { URL_API_BACKEND } from "../../utils/request";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const BtnAddSale = (props: any) => {
  //Inicio abrir e fechar modal
  function closeModalAddSale() {
    $("#addSale").modal("hide");
  }
  function openModalAddSale() {
    $("#addSale").modal("show");
  }
  //Fim abrir e fechar modal

  //Listar clientes no dropdown
  const [clients, setClients] = useState<Client[]>([]);
  useEffect(() => {
    axios.get(`${URL_API_BACKEND}/clients/all`).then((response) => {
      setClients(response.data);
    });
  }, []);
  //Fim listar clientes no dropdown

  //Inicio mascara de cnpj
  function addMaskCNPJ(cnpj: string) {
    const cnpjWithMask =
      cnpj.substring(0, 2) +
      "." +
      cnpj.substring(2, 5) +
      "." +
      cnpj.substring(5, 8) +
      "/" +
      cnpj.substring(8, 12) +
      "-" +
      cnpj.substring(12, 14);
    return cnpjWithMask;
  }
  //Fim mascara de cnpj

  //Adicionar venda
  const onSubmit = useCallback(async (data: any) => {
    //id_client
    var idClientSelect = document.getElementById(
      "clients"
    ) as HTMLSelectElement;
    var idClientSelectValue = idClientSelect.value;
    //date
    var dateOfSaleInput = document.getElementById(
      "dateOfSale"
    ) as HTMLInputElement;
    var dateOfSaleInputValue = dateOfSaleInput.value;
    const date = dateOfSaleInputValue;
    const [day, month, year] = date.split("/");
    const dateOfSaleisoDate = [year, month, day].join("-");

    //situation
    var situationInput = document.getElementById(
      "situation"
    ) as HTMLSelectElement;
    var situationInputValue = situationInput.value;

    //saleValue
    var saleValueInput = document.getElementById(
      "saleValue"
    ) as HTMLInputElement;
    var saleValueInputValue = saleValueInput.value;

    axios
      .post(`${URL_API_BACKEND}/sales/add`, {
        client: {
          id: idClientSelectValue,
        },
        date: dateOfSaleisoDate,
        situation: situationInputValue,
        saleValue: saleValueInputValue,
      })
      .then((response) => {
        toast.success("Cliente cadastrado com sucesso!");
        limparCamposCadastro();
      })
      .catch((error) => {
        toast.error("Erro ao cadastrar cliente");
      });
  }, []);
  //Fim adicionar venda

  //Limpar campos modal AddSale
  function limparCamposCadastro() {
    var clients = document.getElementById("clients") as HTMLSelectElement;
    clients.value = "";
    var dateOfSale = document.getElementById("dateOfSale") as HTMLInputElement;
    dateOfSale.value = "";
    var situation = document.getElementById("situation") as HTMLSelectElement;
    situation.value = "";
    var saleValue = document.getElementById("saleValue") as HTMLInputElement;
    saleValue.value = "";
    closeModalAddSale();
  }
  //Fim limpar campos modal AddSale

  //validar campos addSale
  const schema = yup
    .object({
      clients: yup.string().required("Selecione um cliente"),
      situation: yup.string().required("Selecione a situação"),
      saleValue: yup.number().required("O valor da venda é obrigatório"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  //Fim validar campos addSale

  //DatePicker no modal addSale
  const [saleDate, setSaleDate] = useState(new Date());

  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const months = [
    "Janeiro",
    "Fevereiro",
    "Marco",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Septembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const locale = {
    localize: {
      day: (n: any) => days[n],
      month: (n: any) => months[n],
    },
    formatLong: {
      date: () => "mm/dd/yyyy",
    },
  };
  //Fim DatePicker no modal addSale

  return (
    <>
      <div>
        <div>
          <div>
            <div className="input-group"></div>
          </div>
          <div>
            <button
              className="btn btn-outline-secondary btnRegister"
              type="button"
              data-toggle="modal"
              onClick={openModalAddSale}
            >
              <AiOutlinePlus className="icons me-2" />
              Cadastrar Vendas
            </button>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="addSale"
        role="dialog"
        aria-labelledby="addSaleLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header background">
              <h5 className="modal-title" id="addSaleLabel">
                Cadastrar Venda
              </h5>
            </div>
            <div className="modal-body">
              <div>
                <form className="row">
                  <div className="col-12">
                    <p>Cliente: *</p>
                    <div className="input-group flex-nowrap">
                      <select
                        id="clients"
                        className="form-control"
                        {...register("clients")}
                      >
                        <option value=""></option>
                        {clients.map((client) => (
                          <option key={client.id} value={client.id}>
                            {client.name} - {addMaskCNPJ(client.cnpj)}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.clients && (
                      <p className="validationError">
                        {errors.clients.message}
                      </p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>Data da Venda: *</p>
                    <div className="input-group flex-nowrap">
                      <DatePicker
                        selected={saleDate}
                        locale={locale}
                        onChange={(date: Date) => setSaleDate(date)}
                        className="form-control"
                        dateFormat="dd/MM/yyyy"
                        id="dateOfSale"
                      />
                    </div>
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>Situação: *</p>
                    <div className="input-group flex-nowrap">
                      <select
                        id="situation"
                        className="form-control"
                        {...register("situation")}
                      >
                        <option value=""></option>
                        <option value="Aguardando pagamento">
                          Aguardando pagamento
                        </option>
                        <option value="Pagamento aprovado">
                          Pagamento aprovado
                        </option>
                        <option value="Aguardando envio">
                          Aguardando envio
                        </option>
                        <option value="À caminho">À caminho</option>
                        <option value="Finalizado">Finalizado</option>
                      </select>
                    </div>
                    {errors.situation && (
                      <p className="validationError">
                        {errors.situation.message}
                      </p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>Valor da Venda: *</p>
                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        id="saleValue"
                        {...register("saleValue")}
                      />
                    </div>
                    {errors.saleValue && (
                      <p className="validationError">
                        {errors.saleValue.message ==
                        'saleValue must be a `number` type, but the final value was: `NaN` (cast from the value `""`).'
                          ? "O valor da venda é obrigatório"
                          : "Digite apenas números"}
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-left"
                data-dismiss="modal"
                onClick={closeModalAddSale}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary btnSend"
                id="btnSend"
                onClick={handleSubmit(onSubmit)}
                typeof="submit"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default BtnAddSale;
