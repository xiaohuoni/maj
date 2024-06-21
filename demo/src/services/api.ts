import { request } from '@alita/request';

export async function fakeAnalysisChartData(data: any): Promise<any> {
  return request('/api/rule', { data });
}
