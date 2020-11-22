export interface OrderVolumeDto {
  volume: {
    service: string;
    codigoRastreamento: string;
  };
}

export interface OrderItemDto {
  item: {
    codigo: string;
    descricao: string;
    un: string;
    qtde: number;
    vlr_unit: number;
  };
}

export interface OrderParcelDto {
  parcela: {
    data: string;
    vlr: number;
    obs: string;
  };
}

export interface OrderDto {
  cliente: {
    nome: string;
  };
  volumes: OrderVolumeDto[];
  itens: OrderItemDto[];
  parcelas: OrderParcelDto[];
}
