import type { Ref } from 'vue';
import type {
  LegalInformationResponse,
  LegalTextsParams,
} from '@plentymarkets/plentymarkets-sdk/packages/api-client/src';

export interface UseLegalInformationState {
  data: LegalInformationResponse;
  loading: boolean;
}

export type GetLegalInformation = (params: LegalTextsParams) => Promise<LegalInformationResponse>;

export interface UseLegalInformationMethods {
  data: Readonly<Ref<UseLegalInformationState['data']>>;
  loading: Readonly<Ref<boolean>>;
  getLegalTexts: GetLegalInformation;
}

export type UseLegalInformationMethodsReturn = () => UseLegalInformationMethods;
