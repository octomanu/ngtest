import { SalaryFormComponent } from './salary-form/salary-form.component';
import { SueldosButtonsComponent } from './sueldos-buttons/sueldos-buttons.component';
import { BasicInformationTabComponent } from './salary-form/basic-information-tab/basic-information-tab.component';
import { ContributionsTabComponent } from './salary-form/contributions-tab/contributions-tab.component';
import { ExtraHoursTabComponent } from './salary-form/extra-hours-tab/extra-hours-tab.component';
import { IntermediateSalaryFormComponent } from './intermediate-salary-form/intermediate-salary-form.component';
import { BasicInformationTabComponent as BasicInformationTabComponentIs } from './intermediate-salary-form/basic-information-tab/basic-information-tab.component';
import { ExtraHoursTabComponent as ExtraHoursTabComponentIs } from './intermediate-salary-form/extra-hours-tab/extra-hours-tab.component';
import { VacationFormComponent } from './vacation-form/vacation-form.component';
import { PreviewTabComponent as PreviewTabComponentVacation } from './vacation-form/preview-tab/preview-tab.component';
import { PreviewTabComponent } from './salary-form/preview-tab/preview-tab.component';
import { BasicInformationTabComponent as BasicInformationTabComponentVacation } from './vacation-form/basic-information-tab/basic-information-tab.component';
import { PreviewTabComponent as PreviewTabComponentIntermediate } from './intermediate-salary-form/preview-tab/preview-tab.component';
import { SacFormComponent } from './sac-form/sac-form.component';
import { BasicInformationTabComponent as BasicInformationTabComponentSac } from './sac-form/basic-information-tab/basic-information-tab.component';
import { ExtraHoursTabComponent as ExtraHoursTabComponentSac } from './sac-form/extra-hours-tab/extra-hours-tab.component';
import { PreviewTabComponent as PreviewTabComponentSac } from './sac-form/preview-tab/preview-tab.component';
import { SueldosTableComponent } from './sueldos-table/sueldos-table.component';
import { PreviewSalaryComponent } from './preview-salary/preview-salary.component';

export const COMPONENTS = [
  PreviewSalaryComponent,
  SueldosButtonsComponent,
  BasicInformationTabComponentIs,
  SalaryFormComponent,
  ExtraHoursTabComponentIs,
  ContributionsTabComponent,
  IntermediateSalaryFormComponent,
  PreviewTabComponentVacation,
  ExtraHoursTabComponent,
  VacationFormComponent,
  SueldosTableComponent,
  BasicInformationTabComponent,
  PreviewTabComponent,
  BasicInformationTabComponentVacation,
  BasicInformationTabComponentSac,
  SacFormComponent,
  PreviewTabComponentSac,
  ExtraHoursTabComponentSac,
  PreviewTabComponentIntermediate,
];
