## Cenário: Criação Básica de Agendamento

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha um animal de estimação associado ao seu perfil.
3. Escolha um tipo de serviço (por exemplo, banho).
4. Selecione uma data e hora disponíveis.
5. Confirme o agendamento.

**Resultado Esperado:** O agendamento é criado com sucesso e o cliente recebe uma confirmação.

## Cenário: Escolha de Horário Não Disponível

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha um animal de estimação associado ao seu perfil.
3. Escolha um tipo de serviço.
4. Selecione uma data e hora já ocupadas.
5. Tente confirmar o agendamento.

**Resultado Esperado:** O sistema informa que o horário não está disponível para o serviço escolhido.

## Cenário: Agendamento de Urgência

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha um animal de estimação associado ao seu perfil.
3. Escolha um tipo de serviço urgente (por exemplo, urgência veterinária).
4. Selecione a opção de urgência.
5. O sistema deve automaticamente escolher o próximo horário disponível.
6. Confirme o agendamento.

**Resultado Esperado:** O agendamento urgente é criado com sucesso.

## Cenário: Agendamento com Falha de Validação

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha um animal de estimação associado ao seu perfil.
3. Escolha um tipo de serviço.
4. Selecione uma data e hora.
5. Confirme o agendamento sem escolher um horário disponível.

**Resultado Esperado:** O sistema mostra uma mensagem de erro informando que é necessário escolher um horário disponível.

## Cenário: Cancelamento de Agendamento

**Passos:**

1. Faça o login como um cliente registrado.
2. Acesse seus agendamentos.
3. Escolha um agendamento agendado.
4. Cancele o agendamento.

**Resultado Esperado:** O agendamento é marcado como "cancelado" e o horário é liberado para futuros agendamentos.

## Cenário: Confirmação de E-mail ou Notificação

**Passos:**

1. Faça o login como um cliente registrado.
2. Agende um novo serviço.

**Resultado Esperado:** O cliente recebe um e-mail ou notificação com detalhes do agendamento.

## Cenário: Teste de Capacidade Máxima de Agendamentos

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha um animal de estimação associado ao seu perfil.
3. Escolha um tipo de serviço.
4. Tente agendar em um horário já ocupado.

**Resultado Esperado:** O sistema não permite que o agendamento seja feito se a capacidade máxima de agendamentos para o horário já estiver atingida.

## Cenário: Teste de Agendamento com Diferentes Serviços e Animais de Estimação

**Passos:**

1. Faça o login como um cliente registrado.
2. Escolha diferentes tipos de serviços.
3. Escolha diferentes animais de estimação.
4. Agende serviços em datas e horários variados.

**Resultado Esperado:** O sistema permite que o cliente agende diferentes tipos de serviços para diferentes animais de estimação em horários diversos.
