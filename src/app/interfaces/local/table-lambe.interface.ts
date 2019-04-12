export interface TableLambeInterface {
  // cambia el orden de la columa ASC - DESC
  sort(sort: { key: string; value: string });
  // Busca los datos de la tabla
  searchData();
  //Aplcia filtros a la tabla
  search();
}
