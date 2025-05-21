import React, { useState } from 'react';
import { Card, Select, Button, Tooltip, message, ConfigProvider } from 'antd';
import { UsbOutlined } from '@ant-design/icons';
import ptBR from 'antd/lib/locale/pt_BR';

const { Option } = Select;

export default function UsbSelector() {
  const [usbs, setUsbs] = useState([]);
  const [selectedUsb, setSelectedUsb] = useState(null);
  const [mensagem, setMensagem] = useState('Nenhum dispositivo USB conectado.');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const listarUsbs = async () => {
    setLoading(true);
    setErro('');
    setUsbs([]);
    setSelectedUsb(null);

    try {
      const drives = await window.electronAPI.devices();

      if (drives && drives.length) {
        setUsbs(drives);
        message.success('Dispositivos USB encontrados');
      } else {
        setMensagem('Nenhum dispositivo USB detectado.');
        message.error('Nenhum dispositivo USB detectado.');
      }
    } catch (e) {
      setErro('Falha ao buscar dispositivos USB.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatarTamanho = (bytes) => {
    if (!bytes) return 'Tamanho desconhecido';
    const gb = bytes / (1024 ** 3);
    return `${gb.toFixed(2)} GB`;
  };

  const salvar = () => {
    if (!selectedUsb) return;
    message.success(`USB ${selectedUsb} selecionado para operação.`);
  };

  return (
    <ConfigProvider locale={ptBR}>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 32 }}>
        <Card title="Pen Drive (Mídia Física)" style={{ width: 500 }}>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
            <Select
              placeholder="Selecione um dispositivo USB"
              value={selectedUsb}
              onChange={setSelectedUsb}
              style={{ flex: 1 }}
              notFoundContent="Nenhum dispositivo encontrado"
              allowClear
            >
              {usbs.map((usb, index) => (
                <Option key={index} value={usb.letter}>
                  {`${usb.label || 'Sem nome'} - ${usb.letter} (${formatarTamanho(usb.size)})`}
                </Option>
              ))}
            </Select>

            <Tooltip title="Buscar dispositivos">
              <Button
                type="primary"
                shape="circle"
                icon={<UsbOutlined />}
                loading={loading}
                onClick={listarUsbs}
              />
            </Tooltip>
          </div>

          {erro && <div style={{ color: 'red' }}>{erro}</div>}
          {!usbs.length && !loading && !erro && (
            <div style={{ fontStyle: 'italic', color: '#999' }}>{mensagem}</div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 24 }}>
            <Button type="primary" disabled={!selectedUsb} onClick={salvar}>
              Salvar
            </Button>
          </div>
        </Card>
      </div>
    </ConfigProvider>
  );
}
