import React, { useState, useEffect } from 'react';
import { Card, Select, TimePicker, Checkbox, Button, Space, Input, Alert, Empty } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Config = () => {
  const navigate = useNavigate();

  const [providerValue, setProviderValue] = useState('');
  const [ckbCompactarArquivo, setCkbCompactarArquivo] = useState(false);
  const [ckbNotificarBackup, setCkbNotificarBackup] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [value, setValue] = useState(dayjs('08:00:00', 'HH:mm:ss'));
  const [enableTime, setEnableTime] = useState(false);
  const [dado, setDado] = useState()
  const [databaseValue, setDataBaseValue] = useState('')

  const goToProvider = () => {
    navigate('/provider');
  };



const onClose = e => {
  console.log(e, 'I was closed.');
};


  return (
    <>
    {dado && (
        <Alert
          message="Configuração do Banco de Dados"
          description="O banco de dados ainda não está configurado. Realize a configuração abaixo para habilitar todas as funcionalidades."
          type="error"
          onClose={onClose}
        />
      )}
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '40px 16px',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ width: '100%', maxWidth: 600 }}>
        {/* Seção 1: Frequência + Horário */}
        <Card title="Agendamento de Backup" style={{ marginBottom: 24 }}>
          <Space direction="vertical" style={{ width: '100%' }}>
            {/* Frequência */}
            <div>
              <label style={{ display: 'block', marginBottom: 4 }}>Frequência</label>
              <Select
                value={selectedValue}
                onChange={setSelectedValue}
                style={{ width: '100%' }}
                placeholder="Selecione a frequência"
                allowClear
              >
                <Option value="day">1 vez por dia</Option>
                <Option value="week">1 vez por semana</Option>
                <Option value="month">1 vez por mês</Option>
                <Option value="year">1 vez por ano</Option>
              </Select>
            </div>

            {/* Horário */}
            <div>
              <label style={{ display: 'block', marginBottom: 4 }}>Horário</label>
              <Space>
                <TimePicker
                  value={value}
                  disabled={!enableTime}
                  format="HH:mm:ss"
                  placeholder="Selecione o horário"
                  showNow={false}
                  onChange={(time) => setValue(time)}
                />
                <Checkbox checked={enableTime} onChange={e => setEnableTime(e.target.checked)}>
                  Ativar horário
                </Checkbox>
              </Space>
            </div>
          </Space>
        </Card>

        <Card title="Informações de saída" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Input
              value={providerValue}
              disabled
              placeholder="Nenhum provider selecionado"
            />
            <Button onClick={goToProvider}>
              {providerValue ? 'Alterar Provider' : 'Selecionar Provider'}
            </Button>
          </div>
        </Card>

        <Card title="Configuração dos dados" style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <Input
              value={databaseValue}
              onChange={e => setDataBaseValue(e.target.value)}
              placeholder="Nome do Banco de Dados"
            />
            <Button >
            Salvar Banco de Dados
          </Button>
          </div>
        </Card>

        <Card title="Opções adicionais">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <Checkbox
              checked={ckbCompactarArquivo}
              onChange={e => setCkbCompactarArquivo(e.target.checked)}
            >
              Compactar os arquivos antes do backup.
            </Checkbox>
            <Checkbox
              checked={ckbNotificarBackup}
              onChange={e => setCkbNotificarBackup(e.target.checked)}
            >
              Notificar sempre que for iniciar um backup.
            </Checkbox>
          </div>
        </Card>

        <div style={{ paddingTop: 24, display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="primary">Salvar Configuração</Button>
        </div>
      </div>
    </div>
    </>

  );
};

export default Config;
