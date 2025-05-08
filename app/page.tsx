
'use client';
import { useEffect, useState } from 'react';

const checklist = [
  { id: '1.1', text: 'Construir ou adaptar o forno metálico com sistema de pós-combustão funcional', etapa: 'Preparação técnica' },
  { id: '1.2', text: 'Instalar sensores térmicos (centro, parede, saída de gases)', etapa: 'Preparação técnica' },
  { id: '1.3', text: 'Integrar sistema de aquisição de dados com exportação', etapa: 'Preparação técnica' },
  { id: '1.4', text: 'Registrar curva térmica de uma batelada', etapa: 'Preparação técnica' },
  { id: '1.5', text: 'Analisar rendimento e realizar laudo do biochar', etapa: 'Preparação técnica' },
  { id: '1.6', text: 'Registrar fotos e vídeos da operação real', etapa: 'Preparação técnica' },
  { id: '2.1', text: 'Preencher ficha técnica do forno', etapa: 'Documentação técnica' },
  { id: '2.2', text: 'Atualizar POP com contingências e resfriamento', etapa: 'Documentação técnica' },
  { id: '2.3', text: 'Adicionar diagrama do sistema de sensores', etapa: 'Documentação técnica' },
  { id: '2.4', text: 'Redigir documento de endosso técnico', etapa: 'Documentação técnica' },
  { id: '2.5', text: 'Elaborar plano MRV com plano de amostragem', etapa: 'Documentação técnica' },
  { id: '2.6', text: 'Gerar relatório de operação real (curva + laudo)', etapa: 'Documentação técnica' },
  { id: '2.7', text: 'Elaborar avaliação simplificada de GEE evitado', etapa: 'Documentação técnica' },
  { id: '2.8', text: 'Anexar plano de segurança operacional', etapa: 'Documentação técnica' },
  { id: '3.1', text: 'Contatar verificador autorizado', etapa: 'Pré-submissão' },
  { id: '3.2', text: 'Submeter documentação técnica para análise', etapa: 'Pré-submissão' },
  { id: '3.3', text: 'Receber feedback e implementar ajustes', etapa: 'Pré-submissão' },
  { id: '3.4', text: 'Solicitar endosso formal da tecnologia', etapa: 'Pré-submissão' },
  { id: '4.1', text: 'Incluir forno e POP no PDD', etapa: 'Vinculação ao projeto' },
  { id: '4.2', text: 'Associar tecnologia ao Puro Registry', etapa: 'Vinculação ao projeto' },
  { id: '4.3', text: 'Iniciar produção rastreada conforme MRV', etapa: 'Vinculação ao projeto' },
  { id: '4.4', text: 'Solicitar emissão de CORCs com base nos dados', etapa: 'Vinculação ao projeto' }
];

export default function Home() {
  const [items, setItems] = useState(() =>
    checklist.map(item => ({
      ...item,
      done: typeof window !== 'undefined' ? localStorage.getItem(item.id) === 'true' : false,
      notes: typeof window !== 'undefined' ? localStorage.getItem(item.id + '_notes') || '' : ''
    }))
  );

  useEffect(() => {
    items.forEach(item => {
      localStorage.setItem(item.id, item.done.toString());
      localStorage.setItem(item.id + '_notes', item.notes);
    });
  }, [items]);

  const updateItem = (id: string, key: 'done' | 'notes', value: boolean | string) => {
    setItems(items.map(item => item.id === id ? { ...item, [key]: value } : item));
  };

  const percent = Math.round((items.filter(i => i.done).length / items.length) * 100);

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Checklist de Endosso – Puro.Earth</h1>
      <p>Progresso: {percent}%</p>
      <progress value={percent} max={100} style={{ width: '100%', marginBottom: '1rem' }} />
      {Array.from(new Set(items.map(i => i.etapa))).map(etapa => (
        <section key={etapa}>
          <h2>{etapa}</h2>
          {items.filter(i => i.etapa === etapa).map(item => (
            <div key={item.id} style={{ marginBottom: '1rem' }}>
              <label>
                <input
                  type="checkbox"
                  checked={item.done}
                  onChange={e => updateItem(item.id, 'done', e.target.checked)}
                />{" "}
                <strong>{item.id}</strong> – {item.text}
              </label>
              <br />
              <textarea
                placeholder="Observações / Responsável"
                value={item.notes}
                onChange={e => updateItem(item.id, 'notes', e.target.value)}
                rows={2}
                style={{ width: '100%' }}
              />
            </div>
          ))}
        </section>
      ))}
    </main>
  );
}
