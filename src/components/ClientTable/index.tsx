import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL_API_BACKEND, URL_API_IBGE_UF } from "../../utils/request";
import { Client } from "../../models/client";
import { IoIosArrowDown } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa";
import Pagination from "../Pagination";
import { BsSearch } from "react-icons/bs";
import BtnAddUser from "../BtnAddClient";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { IbgeUF } from "../../models/ibgeUF";
import mapExample from "../../assets/img/mapExample.jpg";

//Início da mascara de cnpj
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
//Fim da mascara de cnpj

//Inicio da mascara de telefone
function addMaskPhone(phone: string) {
  var phoneWithMask;
  if (phone.length == 11) {
    phoneWithMask =
      "(" +
      phone.substring(0, 2) +
      ") " +
      phone.substring(2, 3) +
      " " +
      phone.substring(3, 7) +
      "-" +
      phone.substring(7, 11);
  } else {
    phoneWithMask =
      "(" +
      phone.substring(0, 2) +
      ") " +
      phone.substring(2, 6) +
      "-" +
      phone.substring(6, 10);
  }
  return phoneWithMask;
}
//Fim da mascara de telefone

function ClientTable(search: any) {
  //Inicio dados relevantea para a paginação
  const SIZE = 10;
  const [totalElements, setTotalElements] = useState({});
  var [offset, setOffset] = useState(0);
  const [clients, setClients] = useState<Client[]>([]);
  //Fim dados relevantes para a paginação

  //Inico atualizar a tabela pela paginação
  useEffect(() => {
    http: axios
      .get(`https://api.npoint.io/f4c6c2a96c07bc6a1b0c`)
      .then((response) => {
        setClients(response.data.content);
        setTotalElements(response.data.totalElements);
      });
  }, [offset]);
  //Fim atualizar a tabela pela paginação

  //Inicio pesquisa
  function pesquisa() {
    var inputSearch = document.getElementById(
      "inputSearch"
    ) as HTMLInputElement;

    http: axios
      .get(
        `${URL_API_BACKEND}/clients/find?search=${
          inputSearch.value
        }&size=${SIZE}&page=${offset / SIZE}`
      )
      .then((response) => {
        setClients(response.data.content);
        setTotalElements(response.data.totalElements);
      });
  }
  //Fim pesquisa

  //Inicio excluir
  const [deleteId, setDeleteId] = useState({});
  function deleteClient(number: any) {
    setDeleteId(number);
    http: axios
      .delete(`${URL_API_BACKEND}/clients/delete/${number}`)
      .then((response) => {
        toast.success("Cliente excluido com sucesso!");
        listar();
      })
      .catch(function (error) {
        if (error.response) {
          toast.error(error.response.data);
        }
      });
  }
  //Fim excluir

  //Inicio listar os dados na tabela
  function listar() {
    http: axios
      .get(`${URL_API_BACKEND}/clients?size=${SIZE}&page=${offset / SIZE}`)
      .then((response) => {
        setClients(response.data.content);
        setTotalElements(response.data.totalElements);
      });
  }
  //Fim listar os dados na tabela

  //Inicio abrir e fechar modal
  function closeModal() {
    $("#editClient").modal("hide");
  }
  function openModal() {
    $("#editClient").modal("show");
  }
  //Fim abrir e fechar modal

  //Inicio editar o cliente, abrir o modal e carregar os dados
  const [nameEditClient, setNameEditClient] = useState("");
  const [cnpjEditClient, setCnpjEditClient] = useState("");
  const [phoneEditClient, setPhoneEditClient] = useState("");
  const [emailEditClient, setEmailEditClient] = useState("");
  const [ufEditClient, setUfEditClient] = useState("");

  const handleChangeEditClient = (event: any) => {
    setNameEditClient(event.target.value);
  };
  const handleChangeEditCnpj = (event: any) => {
    setCnpjEditClient(event.target.value);
  };
  const handleChangeEditPhone = (event: any) => {
    setPhoneEditClient(event.target.value);
  };
  const handleChangeEditEmail = (event: any) => {
    setEmailEditClient(event.target.value);
  };
  const handleChangeEditUf = (event: any) => {
    setUfEditClient(event.target.value);
  };

  const handleClickEditClient = (idNumber: any) => {
    openModal();
    http: axios
      .get(`${URL_API_BACKEND}/clients/findById/${idNumber}`)
      .then((response) => {
        setEditId(idNumber);
        setNameEditClient(response.data.name);
        setCnpjEditClient(response.data.cnpj);
        setPhoneEditClient(response.data.phone);
        setEmailEditClient(response.data.email);
        setUfEditClient(response.data.uf);
      });
  };
  //Fim editar o cliente, abrir o modal e carregar os dados

  //Inicio editar o cliente quando apertar o botão salvar
  const [editId, setEditId] = useState();
  function editClient(number: any) {
    http: axios
      .put(`${URL_API_BACKEND}/clients/update/${number}`, {
        name: nameEditClient,
        cnpj: cnpjEditClient,
        email: emailEditClient,
        phone: phoneEditClient,
        uf: ufEditClient,
      })
      .then((response) => {
        toast.success("Cliente editado com sucesso!");
        listar();
        closeModal();
      });
  }
  //Fim editar o cliente quando apertar o botão salvar

  //Inicio Dropdown de Estados
  const [ufs, setUfs] = useState<IbgeUF[]>([]);
  useEffect(() => {
    axios.get(`${URL_API_IBGE_UF}`).then((response) => {
      setUfs(response.data);
    });
  }, []);
  //Fim Dropdown de Estados

  //Inicio validação dos campos
  const schema = yup
    .object({
      name: yup
        .string()
        .required("Nome é obrigatório")
        .min(3, "Mínimo 3 caracteres"),
      cnpj: yup
        .string()
        .required("CNPJ é obrigatório")
        .min(14, "CNPJ inválido, digite 14 números ex: 01234567891234")
        .max(14, "CNPJ inválido, digite 14 números ex: 01234567891234"),
      email: yup
        .string()
        .required("Email é obrigatório")
        .email("Email inválido"),
      phone: yup
        .string()
        .required("Telefone é obrigatório")
        .min(11, "Telefone inválido, digite 11 ou 12 números ex: 11987654321")
        .max(12, "Telefone inválido, digite 11 ou 12 números ex: 11987654321"),
      uf: yup.string().required("UF é obrigatório"),
    })
    .required();
  //Fim validação dos campos

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <div className="container">
        <h3 className="titulo mt-5">Lista de Clientes</h3>
        <div className="row mt-5">
          <div className="col-xl-8 col-lg-6">
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                id="inputSearch"
                required
                placeholder="Digite o nome ou CNPJ do cliente que deseja pesquisar"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={pesquisa}
                >
                  <BsSearch className="icons" />
                </button>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6">
            <BtnAddUser className="icons" />
          </div>
        </div>

        <div className="table-responsive table-responsive-xl">
          <table className="table-responsive table table-striped">
            <thead>
              <tr>
                <th>Nome</th>
                <th>CNPJ</th>
                <th>E-mail</th>
                <th>Telefone</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => {
                return (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{addMaskCNPJ(client.cnpj)}</td>
                    <td>{client.email}</td>
                    <td>{addMaskPhone(client.phone)}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btndropdown-toggle btn btnAction rounded"
                          data-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          Ações <IoIosArrowDown />
                        </button>
                        <div className="dropdown-menu dropdown-menu-right">
                          <button
                            className="dropdown-item"
                            type="button"
                            data-toggle="modal"
                            onClick={() => handleClickEditClient(client.id)}
                          >
                            <RiPencilFill /> Editar
                          </button>
                          <button
                            className="dropdown-item"
                            type="button"
                            data-toggle="modal"
                            data-target="#deleteModalCenter"
                            onClick={() => setDeleteId(client.id)}
                          >
                            <FaTrash /> Excluir
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <Pagination
            size={SIZE}
            totalElements={totalElements}
            offset={offset}
            setOffset={setOffset}
          />
        </div>
      </div>

      {/* Inicio modal de exclusão */}
      <div
        className="modal fade"
        id="deleteModalCenter"
        role="dialog"
        aria-labelledby="deleteModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered " role="document">
          <div className="modal-content ">
            <div className="modal-header background">
              <h5 className="modal-title" id="deleteModalLongTitle">
                Excluir Cliente
              </h5>
            </div>
            <div className="modal-body">
              Deseja excluir este cliente? Esta ação é irreversível,
              certifique-se de que o cliente não tenha vendas vinculadas a ele,
              caso tenha exclua as vendas primeiro.
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn btnAction"
                data-dismiss="modal"
                onClick={() => deleteClient(deleteId)}
              >
                Excluir
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Fim modal de exclusão */}

      {/*Inicio modal de edição */}
      <div
        className="modal fade"
        id="editClient"
        role="dialog"
        aria-labelledby="editClientLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg" role="document">
          <div className="modal-content">
            <div className="modal-header background">
              <h5 className="modal-title" id="editClientLabel">
                Editar Cliente
              </h5>
            </div>
            <div className="modal-body">
              <div>
                <form className="row">
                  <div className="col-12">
                    <p>Nome: *</p>
                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        id="message"
                        {...register("name")}
                        onChange={handleChangeEditClient}
                        value={nameEditClient}
                      />
                    </div>
                    {errors.name && (
                      <p className="validationError">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>CNPJ: *</p>
                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        id="cnpj"
                        {...register("cnpj")}
                        onChange={handleChangeEditCnpj}
                        value={cnpjEditClient}
                      />
                    </div>
                    {errors.cnpj && (
                      <p className="validationError">{errors.cnpj.message}</p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>Telefone: *</p>
                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        id="phone"
                        {...register("phone")}
                        onChange={handleChangeEditPhone}
                        value={phoneEditClient}
                      />
                    </div>
                    {errors.phone && (
                      <p className="validationError">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>UF: *</p>

                    <div className="input-group flex-nowrap">
                      <select
                        className="form-select"
                        {...register("uf")}
                        id="uf"
                        onChange={handleChangeEditUf}
                        value={ufEditClient}
                      >
                        <option value=""></option>
                        {ufs.map((uf) => (
                          <option key={uf.id} value={uf.sigla}>
                            {uf.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    {errors.uf && (
                      <p style={{ color: "red" }}> {errors.uf.message}</p>
                    )}
                  </div>

                  <div className="col-sm-6 mt-4">
                    <p>Email: *</p>
                    <div className="input-group flex-nowrap">
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        {...register("email")}
                        onChange={handleChangeEditEmail}
                        value={emailEditClient}
                      />
                    </div>
                    {errors.email && (
                      <p className="validationError">{errors.email.message}</p>
                    )}
                  </div>
                </form>
                <div>
                  <img src={mapExample} className="img-fluid mt-5" alt="" />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary text-left"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn btn-primary btnSend"
                id="btnSend"
                onClick={() => editClient(editId)}
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*Fim modal de edição */}
    </>
  );
}
export default ClientTable;
