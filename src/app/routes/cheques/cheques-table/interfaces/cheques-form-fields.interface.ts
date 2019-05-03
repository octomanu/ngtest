import { FilterTag } from 'app/routes/interfaces/filter-tag.interface';

export interface ChequesFormFields {
  razon_social: string | FilterTag;
  calle: string | FilterTag;
  numero: number | FilterTag;
  cuit: string | FilterTag;
}
