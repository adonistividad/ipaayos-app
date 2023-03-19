import ModalAccountDetails from "./account/ModalAccountDetails";
import ModalFAQs from "./account/ModalFAQs"; 
import ModalSupport from "./account/ModalSupport";
import ModalTerms from "./account/ModalTerms";
import ModalAppointmentsStatus from "./appointments/ModalAppointmentsStatus";
/*****
 Components name (in lower case) must be equal to MODALS name (in upper case)
 eg. job_status === JOB_STATUS
*/
export const Components: any = {
  account: ModalAccountDetails, 
  support: ModalSupport,
  terms: ModalTerms,
  faqs: ModalFAQs,
  task_status: ModalAppointmentsStatus,
};
export enum MODALS {
  ACCOUNT, 
  SUPPORT,
  TERMS,
  FAQS,
  TASK_STATUS,
}
