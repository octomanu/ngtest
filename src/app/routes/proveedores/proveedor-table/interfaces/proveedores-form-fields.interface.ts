import { FilterTag } from 'app/routes/interfaces/filter-tag.interface';

export interface ProveedoresFormFields {
  razon_social: string | FilterTag;
  direccion: string | FilterTag;
  cuit: string | FilterTag;
}
