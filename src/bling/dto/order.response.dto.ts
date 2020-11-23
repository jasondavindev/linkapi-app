import { OrderVolumeDto } from './order.dto';

export interface OrderItemResponseDto {
  numero: string;
  idPedido: number;
  codigos_rastreamento: {
    codigos_rastreamento: string;
  };
  volumes: OrderVolumeDto[];
}

export interface OrderResponseDto {
  retorno: {
    pedidos: OrderItemResponseDto[];
  };
}
