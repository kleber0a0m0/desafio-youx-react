//Pegar o endereço da API na variavel de ambiente ou se não tiver definir o localhost como padrão
export const URL_API_BACKEND = import.meta.env.VITE_BACKEND_URL ?? "https://desafio-youx.azurewebsites.net";
export const URL_API_IBGE_UF = import.meta.env.VITE_BACKEND_URL ?? "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome";