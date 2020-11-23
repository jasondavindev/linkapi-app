import * as js2xmlparser from 'js2xmlparser';
import { wonDeal } from '../../__mocks__/deals';
import { order } from '../../__mocks__/order';
import {
  convertDealsToOrders,
  convertDealToOrder,
  convertOrdersToXML,
  convertOrderToXML,
} from './bling.converter';

jest.mock('js2xmlparser');

describe('BlingConverter', () => {
  it('should return xml string', () => {
    const xmlContent = '<pedido></pedido>';
    jest.spyOn(js2xmlparser, 'parse').mockReturnValueOnce(xmlContent);
    expect(convertOrderToXML(order)).toEqual(xmlContent);
  });

  it('should return xml string from orders list', () => {
    const xmlContent = '<pedido></pedido>';
    jest.spyOn(js2xmlparser, 'parse').mockReturnValueOnce(xmlContent);
    expect(convertOrdersToXML([order])).toEqual([xmlContent]);
  });

  it('should return object with xml structure', () => {
    const result = convertDealToOrder(wonDeal);
    expect(result.cliente.nome).toEqual(wonDeal.personName);

    const resultOrders = convertDealsToOrders([wonDeal]);
    expect(resultOrders[0].cliente.nome).toEqual(wonDeal.personName);
  });
});
