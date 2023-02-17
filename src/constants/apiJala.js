import Axios from "axios";
import { base_uri } from "./BASE_URL";

//Section Price 
export const getListPriceEbbie   =   payload   => Axios.get(`${base_uri}/shrimp_prices?per_page=${payload.per_page}&page=${payload.page}&with=region,creator&region_id=`);
export const getFilterByRegion   =   payload   => Axios.get(`${base_uri}/regions?has=shrimp_prices&search=${payload.search}`);
export const getDetailPriceEbbie =   payload   => Axios.get(`${base_uri}/shrimp_prices/${payload.id}?with=region,creator&region_id=`);

//Section List News
export const getListNewsEbbie      =   payload   => Axios.get(`${base_uri}/posts?per_page=${payload.per_page}}&page=${payload.page}&with=creator`);

//Section List News
export const getListDiseasesEbbie  =   payload   => Axios.get(`${base_uri}/diseases?per_page=${payload.per_page}&page=${payload.page}`);

