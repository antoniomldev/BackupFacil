import React, { useState, useEffect, Suspense, lazy } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Result, Button } from 'antd';

const ProviderLoader = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadError, setLoadError] = useState(false);
  const [ProviderComponent, setProviderComponent] = useState(null);

  useEffect(() => {
    setLoadError(false);
    setProviderComponent(null);

    // Função para carregar o componente dinamicamente
    const loadComponent = async () => {
      try {
        // Import dinâmico do componente baseado no id
        const component = await import(`../providers/${id}/${id}.jsx`);
        setProviderComponent(() => component.default);
      } catch (error) {
        setLoadError(true);
      }
    };

    loadComponent();
  }, [id]);

  const goHome = () => {
    navigate('/provider');
  };

  if (loadError) {
    return (
      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <Result
          status="404"
          title="Provider não encontrado"
          subTitle="Verifique se o ID do provider está correto ou tente novamente mais tarde."
          extra={
            <Button type="primary" onClick={goHome}>
              Voltar
            </Button>
          }
        />
      </div>
    );
  }

  if (!ProviderComponent) {
    return <div>Carregando...</div>; // Pode usar um spinner do AntD aqui
  }

  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <ProviderComponent />
    </Suspense>
  );
};

export default ProviderLoader;
