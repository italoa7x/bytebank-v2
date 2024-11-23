import { render, screen } from '@testing-library/react';
import UserEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import App from '../paginas/Principal/App';
import AppRoutes from '../routes';

describe('<App/>', () => {
  test('Deve permitir adicionar transação em Extrato', () => {
    render(<App />, { wrapper: BrowserRouter });

    const select = screen.getByRole('combobox');
    const campoValor = screen.getByPlaceholderText('Digite um valor');
    const botaoTransacao = screen.getByRole('button');

    UserEvent.selectOptions(select, ['Depósito']);

    UserEvent.type(campoValor, '100');

    UserEvent.click(botaoTransacao);

    const novaTransacao = screen.getByTestId('lista-transacoes');

    const itemExtrato = screen.getByRole('listitem');

    expect(novaTransacao).toContainElement(itemExtrato);
  });

  test('Deve navegar até a página correspondente ao link clicado', async () => {
    render(<AppRoutes />, { wrapper: BrowserRouter });

    const linkPaginaCartoes = screen.getByText('Cartões');

    expect(linkPaginaCartoes).toBeInTheDocument();

    UserEvent.click(linkPaginaCartoes);

    const tituloPag = await screen.findByText('Meus cartões');

    expect(tituloPag).toBeInTheDocument();
  });
});
